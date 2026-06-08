import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('Contact');
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">{t('title')}</h1>
      
      <p className="text-xl text-muted-foreground leading-relaxed mb-16">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">{t('email')}</h3>
          <p className="text-muted-foreground">info@vexxwatch.cz</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">{t('phone')}</h3>
          <p className="text-muted-foreground">+420 604 256 988</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-2">{t('workshop')}</h3>
          <a href="https://instagram.com/vexxwatch.cz" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium" dangerouslySetInnerHTML={{ __html: t.raw('workshopDesc') }} />
        </div>
      </div>
    </div>
  );
}
