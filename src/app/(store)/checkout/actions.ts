"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { CustomerOrderReceipt } from "@/emails/CustomerOrderReceipt";
import { AdminOrderNotification } from "@/emails/AdminOrderNotification";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations";

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
    let calculatedTotal = finalItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        status: "PENDING",
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

    // 3. Send Emails via Resend
    try {
      // Send to Customer (Forced to your email for testing)
      const testEmail = "jakub.sokol2007@gmail.com";
      
      const { data: customerData, error: customerError } = await resend.emails.send({
        from: "Seiko Mod Atelier <onboarding@resend.dev>", // Using resend dev domain for testing
        to: testEmail, // Originally `email`, forced to test email because of Resend Sandbox limits
        subject: "Potvrzení objednávky - Seiko Mod Atelier",
        react: CustomerOrderReceipt({
          orderId: String(order.orderNumber || order.id),
          customerName: fullName,
          items: finalItems,
          total: calculatedTotal,
          packetaBranchName: packetaBranchName,
        }),
      });

      if (customerError) {
        console.error("Resend Customer Email Error:", customerError);
      }

      // Send to Admin
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: "E-shop Systém <onboarding@resend.dev>", // Using resend dev domain for testing
        to: testEmail, // Admin email
        subject: `Nová objednávka! - ${fullName}`,
        react: AdminOrderNotification({
          orderId: String(order.orderNumber || order.id),
          customerName: fullName,
          customerEmail: email,
          address: fullAddress,
          items: finalItems,
          total: calculatedTotal,
          packetaBranchName: packetaBranchName,
        }),
      });

      if (adminError) {
        console.error("Resend Admin Email Error:", adminError);
      }

      if (!customerError && !adminError) {
        console.log("Emails sent successfully.");
      }
    } catch (error) {
      console.error("Failed to send emails:", error);
      // We don't throw here to ensure the user still gets redirected to success page
      // if only the email fails due to missing API keys.
    }

    return { success: true, orderId: String(order.orderNumber || order.id) };
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
