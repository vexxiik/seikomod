import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_dummy_key_123456789", {
  apiVersion: "2026-05-27.dahlia",
});
