"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateAdminPassword(adminEmail: string, formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password !== confirmPassword || password.length < 6) {
    return { error: "Hesla se neshodují nebo jsou příliš krátká (min 6 znaků)." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.customer.update({
    where: { email: adminEmail },
    data: { password: hashedPassword }
  });

  return { success: "Heslo bylo úspěšně změněno." };
}

export async function updateContactEmail(formData: FormData) {
  const email = formData.get("contact_email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Zadejte platný e-mail." };
  }

  await prisma.setting.upsert({
    where: { key: "contact_email" },
    update: { value: email },
    create: { key: "contact_email", value: email }
  });

  revalidatePath("/admin/settings");
  return { success: "Notifikační e-mail byl aktualizován." };
}
