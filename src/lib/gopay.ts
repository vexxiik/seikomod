export const GOPAY_CLIENT_ID = process.env.GOPAY_CLIENT_ID || "1489066496";
export const GOPAY_CLIENT_SECRET = process.env.GOPAY_CLIENT_SECRET || "1W7SgY5w";
export const GOPAY_GOID = process.env.GOPAY_GOID || "8528991206";
export const GOPAY_URL = process.env.NODE_ENV === "production" ? "https://gate.gopay.cz/api" : "https://gw.sandbox.gopay.com/api";

// Testovací údaje z dokumentace GoPay (https://doc.gopay.com/en/#test-data)
// Pro produkci musí být nahrazeny skutečnými v .env souboru.

/**
 * Získá OAuth2 token z GoPay API.
 */
export async function getGoPayToken() {
  const credentials = Buffer.from(`${GOPAY_CLIENT_ID}:${GOPAY_CLIENT_SECRET}`).toString("base64");
  
  const response = await fetch(`${GOPAY_URL}/oauth2/token`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=payment-create",
    cache: "no-store",
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("GoPay Token Error:", err);
    throw new Error("Failed to authenticate with GoPay.");
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Vytvoří novou platbu u GoPay.
 */
export async function createGoPayPayment(
  orderNumber: string,
  totalAmount: number, // v CZK (celé číslo, GoPay to chce v haléřích)
  customer: { firstName: string; lastName: string; email: string; city: string; street: string; postalCode: string },
  items: { name: string; amount: number; count: number }[],
  returnUrl: string,
  notifyUrl: string
) {
  // MOCK: Pokud uživatel nemá vlastní klíče, simulujeme GoPay
  if (GOPAY_CLIENT_ID === "1489066496") {
    console.log("Používám MOCK GoPay platbu, protože nejsou k dispozici reálné klíče.");
    const mockPaymentId = `3000${Math.floor(Math.random() * 1000000)}`;
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return {
      id: mockPaymentId,
      gw_url: `${baseUrl}/api/gopay/mock-pay?id=${mockPaymentId}&returnUrl=${encodeURIComponent(returnUrl)}&notifyUrl=${encodeURIComponent(notifyUrl)}`
    };
  }

  const token = await getGoPayToken();

  const payload = {
    payer: {
      default_payment_instrument: "PAYMENT_CARD",
      allowed_payment_instruments: ["PAYMENT_CARD", "BANK_ACCOUNT", "APPLE_PAY", "GOOGLE_PAY"],
      contact: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        city: customer.city,
        street: customer.street,
        postal_code: customer.postalCode,
        country_code: "CZE",
      },
    },
    amount: Math.round(totalAmount * 100), // Převod na haléře (např. 100 CZK = 10000)
    currency: "CZK",
    order_number: orderNumber,
    order_description: `Objednávka #${orderNumber} - Seiko Mod Atelier`,
    items: items.map(item => ({
      name: item.name,
      amount: Math.round(item.amount * 100),
      count: item.count,
    })),
    callback: {
      return_url: returnUrl,
      notification_url: notifyUrl,
    },
    lang: "CS",
  };

  const response = await fetch(`${GOPAY_URL}/payments/payment`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ target: { type: "ACCOUNT", goid: GOPAY_GOID }, ...payload }),
    cache: "no-store",
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("GoPay Payment Creation Error:", err);
    throw new Error("Failed to create GoPay payment.");
  }

  const data = await response.json();
  return data; // Obsahuje .id a .gw_url
}

/**
 * Získá stav platby u GoPay.
 */
export async function getGoPayPaymentStatus(paymentId: string) {
  // MOCK: Simulace stavu platby
  if (paymentId.startsWith("3000")) {
    return { state: "PAID" };
  }

  const token = await getGoPayToken();

  const response = await fetch(`${GOPAY_URL}/payments/payment/${paymentId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("GoPay Status Check Error:", err);
    throw new Error("Failed to get GoPay payment status.");
  }

  const data = await response.json();
  return data;
}
