import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Heslo", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          // Hardcoded Admin Check
          if (email === "admin@seikomod.com" && password === "DefN0tVexx") {
            return {
              id: "admin-id",
              name: "Administrátor",
              email: "admin@seikomod.com",
              role: "ADMIN" as const,
            };
          }

        const user = await prisma.customer.findUnique({
          where: { email: email }
        });

        if (!user || !user.password) {
          throw new Error("Nesprávný email nebo heslo");
        }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Nesprávný email nebo heslo");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: "USER" as const,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Neplatné údaje");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "seiko_mod_secret_key_12345",
};
