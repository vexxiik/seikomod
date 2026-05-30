"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { CustomerOrderReceipt } from "@/emails/CustomerOrderReceipt";
import { AdminOrderNotification } from "@/emails/AdminOrderNotification";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";
import { createGoPayPayment } from "@/lib/gopay";
import { configuratorData, BASE_WATCH_PRICE } from "@/lib/configuratorData";

// Initialize Resend with a dummy key if not present in env
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

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
      // Update address if missing or different
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
      const boxPrice = session ? 0 : 499;
      finalItems.push({
        id: "premium-box", // Dummy ID
        name: "Prémiová krabička na hodinky",
        quantity: 1,
        price: boxPrice,
      });
    }

    // Calculate Subtotal from cart items securely
    let calculatedTotal = 0;
    
    // Create a flat map of configurator parts for quick lookup
    const allConfigParts = new Map();
    configuratorData.forEach(cat => cat.options.forEach(opt => allConfigParts.set(opt.id, opt.price)));

    for (const item of finalItems) {
      let securePrice = 0;
      
      if (item.id === "premium-box") {
        securePrice = session ? 0 : 499;
      } else if (item.id.startsWith("custom-watch|")) {
        // Recalculate custom watch price securely based on encoded part IDs
        securePrice = BASE_WATCH_PRICE;
        const parts = item.id.split("|").slice(1);
        for (const partId of parts) {
          if (allConfigParts.has(partId)) {
            securePrice += allConfigParts.get(partId);
          }
        }
      } else {
        // Standard product from DB
        const dbProduct = dbProducts.find(p => p.id === item.id);
        if (!dbProduct) {
          return { error: `Produkt ${item.name} nebyl nalezen.` };
        }
        securePrice = dbProduct.price;
      }
      
      // Override the item's price with the secure price for database storage
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
        
        // Increment usage count
        await prisma.discountCode.update({
          where: { id: validDiscount.id },
          data: { usedCount: { increment: 1 } }
        });
      }
    }

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
        status: "PENDING_PAYMENT", // Změna na čekání na platbu
        packetaBranchId,
        packetaBranchName,
        items: {
          create: finalItems.map(item => {
            const isValid = validProductIds.has(item.id);
            // To satisfy the old Prisma Client which still thinks productId is required and cannot be null,
            // we MUST provide a valid CUID from the database if the user added a dummy product (like "custom").
            // The admin panel will use `productName` anyway.
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

    // 3. Vytvořit platbu u GoPay
    // V Next.js na Vercelu musíme předat absolutní URL. Zkusíme použít NEXTAUTH_URL nebo hardcodovanou pro dev.
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const returnUrl = `${baseUrl}/checkout/success`;
    const notifyUrl = `${baseUrl}/api/gopay/notify`;

    const paymentResponse = await createGoPayPayment(
      String(order.orderNumber),
      calculatedTotal,
      {
        firstName: customer.name.split(" ")[0] || "",
        lastName: customer.name.split(" ").slice(1).join(" ") || "",
        email: email,
        city: city,
        street: address,
        postalCode: zip,
      },
      finalItems.map(item => ({
        name: item.name,
        amount: item.price,
        count: item.quantity,
      })),
      returnUrl,
      notifyUrl
    );

    // 4. Uložit GoPay ID k objednávce
    await prisma.order.update({
      where: { id: order.id },
      data: { 
        gopayPaymentId: String(paymentResponse.id),
        gopayPaymentUrl: paymentResponse.gw_url
      }
    });

    // POZNÁMKA: E-maily se nyní neposílají tady, ale až ve webhooku (api/gopay/notify/route.ts), 
    // jakmile GoPay potvrdí zaplacení (PAID).

    return { success: true, gw_url: paymentResponse.gw_url };
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
