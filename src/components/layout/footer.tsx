import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">Vexx Watch Atelier</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('products')}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/products?type=Datejust" className="hover:text-accent transition-colors">Datejust</Link></li>
              <li><Link href="/products?type=GMT" className="hover:text-accent transition-colors">GMT</Link></li>
              <li><Link href="/products?type=Nautilus" className="hover:text-accent transition-colors">Nautilus</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('customerService')}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/contact" className="hover:text-accent transition-colors">{t('contact')}</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">{t('shipping')}</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">{t('returns')}</Link></li>
              <li><Link href="/legal" className="hover:text-accent transition-colors">{t('legal')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="https://instagram.com/vexxwatch" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram (@vexxwatch)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-center items-center text-sm text-primary-foreground/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Vexx Watch Atelier. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
