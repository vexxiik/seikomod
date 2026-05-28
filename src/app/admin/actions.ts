"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteExpense(id: string) {
  await prisma.expense.delete({ where: { id } });
  revalidatePath("/admin/expenses");
  revalidatePath("/admin");
}

export async function addExpense(formData: FormData) {
  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount"));
  const dateStr = formData.get("date") as string;
  
  if (!name || isNaN(amount)) return;

  await prisma.expense.create({
    data: {
      name,
      amount,
      date: dateStr ? new Date(dateStr) : new Date(),
    }
  });

  revalidatePath("/admin/expenses");
  revalidatePath("/admin");
}

export async function deleteCustomer(id: string) {
  // Delete all orders for this customer first
  await prisma.orderItem.deleteMany({
    where: { order: { customerId: id } }
  });
  await prisma.order.deleteMany({
    where: { customerId: id }
  });
  
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/admin/customers");
  revalidatePath("/admin");
}

export async function deleteOrder(id: string) {
  await prisma.orderItem.deleteMany({ where: { orderId: id } });
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateOrderStatus(id: string, status: string) {
  await prisma.order.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/orders");
}

export async function deleteProduct(id: string) {
  // Delete order items that reference this product
  await prisma.orderItem.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}
