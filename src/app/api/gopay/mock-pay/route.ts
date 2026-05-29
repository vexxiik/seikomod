import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const paymentId = searchParams.get("id");
  const returnUrl = searchParams.get("returnUrl");
  const notifyUrl = searchParams.get("notifyUrl");

  if (!paymentId || !returnUrl || !notifyUrl) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // MOCK PLATBA: Simulujeme úspěšnou platbu
  // 1. Zpožděně zavoláme webhook, jako by to udělala opravdová GoPay
  setTimeout(async () => {
    try {
      await fetch(`${notifyUrl}?id=${paymentId}`);
      console.log("Mock Webhook triggered for:", paymentId);
    } catch (e) {
      console.error("Mock Webhook failed:", e);
    }
  }, 1000);

  // 2. Přesměrujeme uživatele ihned zpět na eshop
  const finalReturnUrl = `${returnUrl}?id=${paymentId}`;
  return NextResponse.redirect(finalReturnUrl);
}
