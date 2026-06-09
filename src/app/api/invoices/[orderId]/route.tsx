import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { renderToStream } from "@react-pdf/renderer";
import { InvoiceTemplate, InvoiceData } from "@/components/admin/InvoiceTemplate";
import React from "react";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Fetch order from DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Determine Invoice Number and Variable Symbol
    // We use orderNumber if available, otherwise fallback to last 6 chars of order ID (only numbers if possible, but ID is cuid which has letters).
    // Let's generate a numeric string from order ID if orderNumber is missing.
    let numericId = order.id.replace(/\D/g, '').slice(-8);
    if (!numericId || numericId.length < 4) {
      numericId = Math.floor(Math.random() * 1000000).toString(); // Fallback
    }

    const orderNumStr = order.orderNumber ? order.orderNumber.toString() : numericId;
    const currentYear = new Date(order.createdAt).getFullYear();
    const invoiceNumber = `${currentYear}${orderNumStr.padStart(4, '0')}`;
    const variableSymbol = orderNumStr;

    const dueDate = new Date(order.createdAt);
    dueDate.setDate(dueDate.getDate() + 14); // 14 days due date

    // Map DB data to InvoiceData
    const invoiceData: InvoiceData = {
      invoiceNumber: invoiceNumber,
      issueDate: new Date(order.createdAt),
      dueDate: dueDate,
      orderNumber: orderNumStr,
      variableSymbol: variableSymbol,
      customer: {
        name: order.customer.name,
        address: order.customer.address || "Nezadána adresa",
        email: order.customer.email,
      },
      items: order.items.map(item => ({
        id: item.id,
        name: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      paymentMethod: order.stripeSessionId ? "Kartou online (Stripe)" : "Převodem na účet",
    };

    // Render PDF to stream
    const stream = await renderToStream(React.createElement(InvoiceTemplate, { data: invoiceData }) as any);

    // Return the stream as response
    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="faktura-${invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json({ error: "Failed to generate invoice", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
