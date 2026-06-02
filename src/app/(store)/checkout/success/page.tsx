import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let orderStatus = "UNKNOWN";

  if (session_id) {
    // Najít objednávku podle Stripe session ID
    const order = await prisma.order.findFirst({ where: { stripeSessionId: session_id } });
    if (order) {
      orderStatus = order.status;
      // Pokud se webhook ještě nespustil, zkusíme ověřit stav přímo u Stripe
      if (orderStatus === "PENDING_PAYMENT") {
        try {
          const session = await stripe.checkout.sessions.retrieve(session_id);
          if (session.payment_status === "paid") {
            // Aktualizujeme objednávku na PAID (webhook to pak případně přeskočí)
            await prisma.order.update({
              where: { id: order.id },
              data: { status: "PAID" },
            });
            orderStatus = "PAID";
          }
        } catch (e) {
          console.error("Error checking Stripe session:", e);
        }
      }
    }
  } else {
    orderStatus = "PAID";
  }

  const isSuccess = orderStatus === "PAID" || orderStatus === "COMPLETED";
  const isPending = orderStatus === "PENDING_PAYMENT" || orderStatus === "UNKNOWN";
  const isCancelled = orderStatus === "CANCELLED";

  return (
    <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
        isSuccess ? "bg-green-100 dark:bg-green-900/30 text-green-600" :
        isPending ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" :
        "bg-red-100 dark:bg-red-900/30 text-red-600"
      }`}>
        {isSuccess && <CheckCircle className="w-12 h-12" />}
        {isPending && <Clock className="w-12 h-12" />}
        {isCancelled && <XCircle className="w-12 h-12" />}
      </div>
      
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
        {isSuccess ? "Objednávka zaplacena!" :
         isPending ? "Zpracováváme platbu..." :
         "Platba se nezdařila"}
      </h1>
      
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
        {isSuccess ? "Děkujeme za váš nákup. Na váš e-mail jsme zaslali potvrzení objednávky. Naši hodináři se brzy pustí do přípravy vašeho unikátního kousku." :
         isPending ? "Čekáme na potvrzení platby od banky. Odeslání e-mailu proběhne jakmile platbu úspěšně zaevidujeme." :
         "Vaše platba byla bohužel zrušena nebo vypršel časový limit. Můžete to zkusit znovu nebo nás kontaktovat."}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products">
          <Button className="h-14 px-8 text-lg rounded-xl shadow-lg hover:-translate-y-1 transition-transform">
            Pokračovat v nákupu
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="h-14 px-8 text-lg rounded-xl">
            Zpět na hlavní stranu
          </Button>
        </Link>
      </div>
    </div>
  );
}
