"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { PasswordResetEmail } from "@/emails/PasswordResetEmail";
import crypto from "crypto";
import { registerSchema } from "@/lib/validations";

export async function registerUser(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validationResult = registerSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
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

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  if (!email) return { error: 'E-mail je povinný' };

  const user = await prisma.customer.findUnique({ where: { email } });
  if (!user) {
    return { success: true }; // Z bezpečnostních důvodů nevyzrazujeme, že uživatel neexistuje
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hodina

  await prisma.passwordResetToken.deleteMany({ where: { email } });
  await prisma.passwordResetToken.create({ data: { email, token, expires } });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.vexxwatch.cz'}/cs/reset-password?token=${token}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
    await resend.emails.send({
      from: 'Jakub z Vexx Watch <podpora@vexxwatch.cz>',
      to: email,
      subject: 'Obnova hesla k vašemu účtu',
      react: PasswordResetEmail({ resetUrl }),
    });
  } catch (error) {
    console.error('Failed to send email', error);
  }

  return { success: true };
}

export async function resetPassword(formData: FormData) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!token || !password) return { error: 'Neplatný požadavek' };

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.expires < new Date()) {
    return { error: 'Odkaz pro obnovení hesla je neplatný nebo vypršel' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.customer.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: resetToken.id },
  });

  return { success: true };
}
