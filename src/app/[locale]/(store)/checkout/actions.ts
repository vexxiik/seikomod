"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";
import { stripe } from "@/lib/stripe";
import { configuratorData, BASE_WATCH_PRICE } from "@/lib/configuratorData";

type CheckoutData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  includeWatchBox: boolean;
  discountCode?: string;
  packetaBranchId: string;
  packetaBranchName: string;
};

export async function submitOrder(data: CheckoutData, cartItems: { id: string; name: string; quantity: number; price: number }[], total: number) {
  try {
    const rawData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      city: data.city,
      zip: data.zip,
      includeWatchBox: data.includeWatchBox,
      discountCode: data.discountCode,
      packetaBranchId: data.packetaBranchId,
      packetaBranchName: data.packetaBranchName,
    };

    const validationResult = checkoutSchema.safeParse(rawData);

    if (!validationResult.success) {
      return { error: validationResult.error.issues[0].message };
    }

    const { firstName, lastName, email, address, city, zip, includeWatchBox, discountCode, packetaBranchId, packetaBranchName } = validationResult.data;

    const session = await getServerSession(authOptions);

    const fullName = `${firstName} ${lastName}`;
    const fullAddress = `${address}, ${zip} ${city}`;

    // 1. Create or connect Customer
    let customer = await prisma.customer.findUnique({
      where: { email }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: fullName,
          email,
          address: fullAddress,
        }
      });
    } else {
      await prisma.customer.update({
        where: { email },
        data: { name: fullName, address: fullAddress }
      });
    }

    // Validate products against DB to avoid foreign key constraints
    const dbProducts = await prisma.product.findMany();
    const validProductIds = new Set(dbProducts.map(p => p.id));
    const fallbackProductId = dbProducts.length > 0 ? dbProducts[0].id : null;

    // Add Watch Box to items if requested
    const finalItems = [...cartItems];
    if (includeWatchBox) {
      const boxPrice = session ? 200 : 600;
      finalItems.push({
        id: "premium-box",
        name: "Prémiová krabička na hodinky",
        quantity: 1,
        price: boxPrice,
      });
    }

    // Calculate Subtotal from cart items securely
    let calculatedTotal = 0;
    
    const allConfigParts = new Map();
    configuratorData.forEach(cat => cat.options.forEach(opt => allConfigParts.set(opt.id, opt.price)));

    for (const item of finalItems) {
      let securePrice = 0;
      
      if (item.id === "premium-box") {
        securePrice = session ? 200 : 600;
      } else if (item.id.startsWith("custom-watch|")) {
        securePrice = BASE_WATCH_PRICE;
        const parts = item.id.split("|").slice(1);
        for (const partId of parts) {
          if (allConfigParts.has(partId)) {
            securePrice += allConfigParts.get(partId);
          }
        }
      } else {
        const dbProduct = dbProducts.find(p => p.id === item.id);
        if (!dbProduct) {
          return { error: `Produkt ${item.name} nebyl nalezen.` };
        }
        securePrice = dbProduct.price;
      }
      
      item.price = securePrice;
      calculatedTotal += (securePrice * item.quantity);
    }

    // Validate and apply discount
    let finalDiscountCode = null;
    if (discountCode) {
      const validDiscount = await prisma.discountCode.findUnique({
        where: { code: discountCode }
      });
      if (validDiscount && validDiscount.isActive) {
        finalDiscountCode = validDiscount;
        if (validDiscount.type === "PERCENTAGE") {
          calculatedTotal = calculatedTotal - (calculatedTotal * (validDiscount.discount / 100));
        } else if (validDiscount.type === "FIXED") {
          calculatedTotal = Math.max(0, calculatedTotal - validDiscount.discount);
        }
        
        await prisma.discountCode.update({
          where: { id: validDiscount.id },
          data: { usedCount: { increment: 1 } }
        });
      }
    }

    // Add shipping
    const shippingCost = 89;
    calculatedTotal += shippingCost;

    // Generate orderNumber safely
    const lastOrder = await prisma.order.findFirst({
      orderBy: { orderNumber: 'desc' }
    });
    const nextOrderNumber = (lastOrder?.orderNumber || 1000) + 1;

    // 2. Create Order
    const order = await prisma.order.create({
      data: {
        orderNumber: nextOrderNumber,
        customerId: customer.id,
        total: calculatedTotal,
        status: "PENDING_PAYMENT",
        packetaBranchId,
        packetaBranchName,
        items: {
          create: finalItems.map(item => {
            const isValid = validProductIds.has(item.id);
            const finalProductId = isValid ? item.id : fallbackProductId;
            
            return {
              ...(finalProductId ? { productId: finalProductId } : {}),
              productName: item.name,
              quantity: item.quantity,
              price: item.price,
            };
          })
        }
      }
    });



    // 3. Vytvořit Stripe Checkout Session
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const stripeSession = await stripe.checkout.sessions.create({
      // Omit payment_method_types to allow Apple Pay, Google Pay, etc. based on Dashboard settings
      mode: "payment",
      customer_email: email,
      line_items: finalItems
        .filter(item => item.price > 0)
        .map(item => ({
          price_data: {
            currency: "czk",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe chce v haléřích
          },
          quantity: item.quantity,
        }))
        .concat([
          {
            price_data: {
              currency: "czk",
              product_data: { name: "Doprava (Zásilkovna)" },
              unit_amount: shippingCost * 100,
            },
            quantity: 1,
          },
        ]),
      metadata: {
        orderId: order.id,
        orderNumber: String(order.orderNumber),
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    // 4. Uložit Stripe session ID k objednávce
    await prisma.order.update({
      where: { id: order.id },
      data: { 
        stripeSessionId: stripeSession.id,
      }
    });

    return { success: true, url: stripeSession.url };
  } catch (e: any) {
    console.error("Order submit failed:", e);
    return { error: e.message || "Při vytváření objednávky došlo k neznámé chybě." };
  }
}

export async function validateDiscountCode(code: string) {
  if (!code) return { error: "Zadejte kód" };
  
  const discount = await prisma.discountCode.findUnique({
    where: { code: code.trim().toUpperCase() }
  });

  if (!discount || !discount.isActive) {
    return { error: "Neplatný nebo expirovaný kód" };
  }

  return { success: true, discount };
}
