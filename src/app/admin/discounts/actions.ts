"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDiscountCode(formData: FormData): Promise<void> {
  const code = formData.get("code") as string;
  const discount = parseFloat(formData.get("discount") as string);
  const type = formData.get("type") as string;

  if (!code || isNaN(discount) || !type) {
    return;
  }

  try {
    await prisma.discountCode.create({
      data: {
        code: code.trim().toUpperCase(),
        discount,
        type,
      }
    });
    revalidatePath("/admin/discounts");
  } catch (error) {
    // Coupon already exists or other error
  }
}

export async function toggleDiscountCode(id: string, isActive: boolean) {
  await prisma.discountCode.update({
    where: { id },
    data: { isActive }
  });
  revalidatePath("/admin/discounts");
}

export async function deleteDiscountCode(id: string) {
  await prisma.discountCode.delete({
    where: { id }
  });
  revalidatePath("/admin/discounts");
}
