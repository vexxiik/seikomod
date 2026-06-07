import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const { data, error } = await resend.emails.send({
    from: "Vexx Watch Atelier <info@vexxwatch.cz>",
    to: "jakub.sokol2007@gmail.com",
    subject: "Test Email",
    text: "This is a test email.",
  });

  if (error) {
    console.error("Resend Error:", error);
  } else {
    console.log("Success:", data);
  }
}

test();
