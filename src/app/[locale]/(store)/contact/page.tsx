import { Mail, MapPin, Phone } from "lucide-react";
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
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">{t('workshop')}</h3>
          <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('workshopDesc') }} />
        </div>
      </div>
    </div>
  );
}
