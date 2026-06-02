"use server";

import { prisma } from "@/lib/prisma";
import { createPacketaShipment } from "@/lib/packeta";
import { revalidatePath } from "next/cache";

export async function submitToPacketa(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true, items: true }
    });

    if (!order) {
      return { error: "Objednávka nenalezena" };
    }

    if (!order.packetaBranchId) {
      return { error: "Objednávka nemá vybrané výdejní místo Zásilkovny" };
    }

    if (order.packetaBarcode) {
      return { error: "Zásilka již byla do Zásilkovny odeslána" };
    }

    const result = await createPacketaShipment(order, order.customer, order.items);

    if (result.success && result.barcode) {
      await prisma.order.update({
        where: { id: orderId },
        data: { packetaBarcode: result.barcode }
      });
      revalidatePath(`/admin/orders/${orderId}`);
      revalidatePath(`/admin/orders`);
      return { success: true, barcode: result.barcode };
    } else {
      return { error: result.error || "Chyba při odesílání do Zásilkovny" };
    }
  } catch (error: any) {
    console.error("Manual Packeta submission error:", error);
    return { error: error.message || "Interní chyba serveru" };
  }
}
