"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations";

export async function registerUser(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validationResult = registerSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.errors[0].message };
  }

  const { name, email, password } = validationResult.data;

  // Check if user exists
  const existingUser = await prisma.customer.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.password) {
      return { error: "Uživatel s tímto e-mailem již existuje." };
    } else {
      // User checked out as guest before, now registering. Set password.
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.customer.update({
        where: { email },
        data: { name, password: hashedPassword }
      });
      return { success: true };
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.customer.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
