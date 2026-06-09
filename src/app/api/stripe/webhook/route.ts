import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { CustomerOrderReceipt } from "@/emails/CustomerOrderReceipt";
import { AdminOrderNotification } from "@/emails/AdminOrderNotification";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import { InvoiceTemplate, InvoiceData } from "@/components/admin/InvoiceTemplate";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in Stripe session metadata");
      return NextResponse.json({ error: "No orderId" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true, items: true },
    });

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Pokud už je vyřízeno, ignorujeme
    if (order.status === "PAID" || order.status === "COMPLETED") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    // Označit objednávku jako PAID
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });

    // Odeslat e-maily
    try {
      const fullName = order.customer.name;
      const customerEmail = order.customer.email;
      const adminEmail = process.env.ADMIN_EMAIL || "jakub.sokol2007@gmail.com";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Vexx Watch Atelier <info@vexxwatch.cz>";

      const finalItems = order.items.map((i) => ({
        id: i.id,
        name: i.productName,
        quantity: i.quantity,
        price: i.price,
      }));

      // Generate PDF Invoice
      let numericId = order.id.replace(/\D/g, '').slice(-8);
      if (!numericId || numericId.length < 4) {
        numericId = Math.floor(Math.random() * 1000000).toString();
      }
      const orderNumStr = order.orderNumber ? order.orderNumber.toString() : numericId;
      const currentYear = new Date(order.createdAt).getFullYear();
      const invoiceNumber = `${currentYear}${orderNumStr.padStart(4, '0')}`;
      const dueDate = new Date(order.createdAt);
      dueDate.setDate(dueDate.getDate() + 14);

      const invoiceData: InvoiceData = {
        invoiceNumber,
        issueDate: new Date(order.createdAt),
        dueDate,
        orderNumber: orderNumStr,
        variableSymbol: orderNumStr,
        customer: {
          name: fullName,
          address: order.customer.address || "Nezadána adresa",
          email: customerEmail,
        },
        items: finalItems,
        total: order.total,
        paymentMethod: order.stripeSessionId ? "Kartou online (Stripe)" : "Převodem na účet",
      };

      const pdfStream = await renderToStream(React.createElement(InvoiceTemplate, { data: invoiceData }) as any);
      const chunks: Uint8Array[] = [];
      for await (const chunk of pdfStream) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk as Uint8Array);
      }
      const pdfBuffer = Buffer.concat(chunks);

      await resend.emails.send({
        from: fromEmail,
        to: customerEmail,
        subject: "Potvrzení vaší objednávky",
        react: CustomerOrderReceipt({
          orderId: String(order.orderNumber || order.id),
          customerName: fullName,
          items: finalItems,
          total: order.total,
          packetaBranchName: order.packetaBranchName || undefined,
        }),
        attachments: [
          {
            filename: `faktura-${invoiceNumber}.pdf`,
            content: pdfBuffer,
          }
        ]
      });

      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `Nová zaplacená objednávka! - ${fullName}`,
        react: AdminOrderNotification({
          orderId: String(order.orderNumber || order.id),
          customerName: fullName,
          customerEmail: order.customer.email,
          address: order.customer.address || "Neuvedeno",
          items: finalItems,
          total: order.total,
          packetaBranchName: order.packetaBranchName || undefined,
        }),
      });

      console.log(`Emails sent for PAID order ${order.orderNumber}`);
    } catch (err) {
      console.error("Failed to send emails for PAID order:", err);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
