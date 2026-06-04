"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = Number(formData.get("price"));
  const type = formData.get("type") as string;
  const movement = formData.get("movement") as string;
  const glass = formData.get("glass") as string;
  const bracelet = formData.get("bracelet") as string;
  const images = formData.get("images") as string;
  const stock = Number(formData.get("stock"));

  if (!name || !description || isNaN(price) || !type) return;

  await prisma.product.create({
    data: {
      name,
      nameEn: nameEn || null,
      description,
      descriptionEn: descriptionEn || null,
      price,
      type,
      movement: movement || "",
      glass: glass || "",
      bracelet: bracelet || "",
      images: images || "[]",
      stock: isNaN(stock) ? 0 : stock,
    }
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const nameEn = formData.get("nameEn") as string;
  const description = formData.get("description") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const price = Number(formData.get("price"));
  const type = formData.get("type") as string;
  const movement = formData.get("movement") as string;
  const glass = formData.get("glass") as string;
  const bracelet = formData.get("bracelet") as string;
  const images = formData.get("images") as string;
  const stock = Number(formData.get("stock"));

  if (!name || !description || isNaN(price) || !type) return;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      nameEn: nameEn || null,
      description,
      descriptionEn: descriptionEn || null,
      price,
      type,
      movement: movement || "",
      glass: glass || "",
      bracelet: bracelet || "",
      images: images || "[]",
      stock: isNaN(stock) ? 0 : stock,
    }
  });

  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  redirect("/admin/products");
}
