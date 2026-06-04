import { z } from "zod";

// Zod schema for Registration
export const registerSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky").max(100, "Jméno je příliš dlouhé").regex(/^[a-zA-Zá-žÁ-Ž\s]+$/, "Jméno může obsahovat pouze písmena a mezery"),
  email: z.string().email("Neplatný formát e-mailu").max(255),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků").max(100),
});

// Zod schema for Login
export const loginSchema = z.object({
  email: z.string().email("Neplatný formát e-mailu"),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků"),
});

// Zod schema for Checkout
export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Jméno musí mít alespoň 2 znaky").max(50).regex(/^[a-zA-Zá-žÁ-Ž\s]+$/, "Pouze písmena"),
  lastName: z.string().min(2, "Příjmení musí mít alespoň 2 znaky").max(50).regex(/^[a-zA-Zá-žÁ-Ž\s]+$/, "Pouze písmena"),
  email: z.string().email("Neplatný formát e-mailu").max(255),
  address: z.string().min(5, "Adresa je příliš krátká").max(200).regex(/^[a-zA-Zá-žÁ-Ž0-9\s,.-]+$/, "Adresa obsahuje neplatné znaky"),
  city: z.string().min(2, "Město musí mít alespoň 2 znaky").max(100).regex(/^[a-zA-Zá-žÁ-Ž\s.-]+$/, "Neplatné jméno města"),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/, "PSČ musí být ve formátu 123 45 nebo 12345"),
  includeWatchBox: z.boolean().optional().default(false),
  discountCode: z.string().optional(),
  packetaBranchId: z.string().min(1, "Prosím vyberte výdejní místo Zásilkovny"),
  packetaBranchName: z.string().min(1, "Prosím vyberte výdejní místo Zásilkovny"),
  paymentMethod: z.enum(["card", "cod"]),
});
