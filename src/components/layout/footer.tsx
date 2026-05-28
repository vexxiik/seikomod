import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">SEIKO MOD Atelier</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Zakázková stavba hodinek z prémiových Seiko dílů na míru. Každý kus je unikátní mistrovské dílo s důrazem na absolutní preciznost a detail.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produkty</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/products?type=Dress" className="hover:text-accent transition-colors">Daydate</Link></li>
              <li><Link href="/products?type=GMT" className="hover:text-accent transition-colors">GMT</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Zákaznický servis</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/contact" className="hover:text-accent transition-colors">Kontakt</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Doprava a platba</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Reklamace a vrácení</Link></li>
              <li><Link href="/legal" className="hover:text-accent transition-colors">Právní doložka</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sledujte nás</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-center items-center text-sm text-primary-foreground/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Seiko Mod Atelier. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
