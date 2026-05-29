import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGoPayPaymentStatus } from "@/lib/gopay";
import { Resend } from "resend";
import { CustomerOrderReceipt } from "@/emails/CustomerOrderReceipt";
import { AdminOrderNotification } from "@/emails/AdminOrderNotification";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });
    }

    // Získat stav platby od GoPay
    const paymentStatus = await getGoPayPaymentStatus(paymentId);
    const state = paymentStatus.state; // Např. PAID, CANCELED, TIMEOUT, PAYMENT_METHOD_CHOSEN

    // Najít odpovídající objednávku v DB
    const order = await prisma.order.findFirst({
      where: { gopayPaymentId: paymentId },
      include: { customer: true, items: true }
    });

    if (!order) {
      console.error(`Order not found for payment ID: ${paymentId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Pokud už je vyřízeno, ignorujeme
    if (order.status === "PAID" || order.status === "COMPLETED") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    if (state === "PAID") {
      // Platba proběhla úspěšně -> Označit objednávku jako PAID a odeslat e-maily
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" }
      });

      // Odeslat e-maily
      try {
        const fullName = order.customer.name;
        const testEmail = "jakub.sokol2007@gmail.com";
        const finalItems = order.items.map(i => ({
          name: i.productName,
          quantity: i.quantity,
          price: i.price,
        }));

        await resend.emails.send({
          from: "Seiko Mod Atelier <onboarding@resend.dev>",
          to: testEmail,
          subject: "Potvrzení objednávky - Zaplaceno - Seiko Mod Atelier",
          react: CustomerOrderReceipt({
            orderId: String(order.orderNumber || order.id),
            customerName: fullName,
            items: finalItems,
            total: order.total,
            packetaBranchName: order.packetaBranchName || undefined,
          }),
        });

        await resend.emails.send({
          from: "E-shop Systém <onboarding@resend.dev>",
          to: testEmail,
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

    } else if (state === "CANCELED" || state === "TIMEOUT") {
      // Platba byla zrušena
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED" }
      });
    }

    return NextResponse.json({ success: true, state }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
