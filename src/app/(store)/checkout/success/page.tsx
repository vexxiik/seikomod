import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-8">
        <CheckCircle className="w-12 h-12" />
      </div>
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Objednávka byla úspěšná!</h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
        Děkujeme za váš nákup. Na váš e-mail jsme zaslali potvrzení objednávky. Naši hodináři se brzy pustí do přípravy vašeho unikátního kousku.
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
