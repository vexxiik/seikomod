import { useTranslations } from "next-intl";

export default function LegalPage() {
  const t = useTranslations('Legal');
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">{t('title')}</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('h1')}</h2>
          <p className="text-muted-foreground">
            {t('p1')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('h2')}</h2>
          <p className="text-muted-foreground">
            {t('p2')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('h3')}</h2>
          <p className="text-muted-foreground">
            {t('p3')}
          </p>
          <p className="text-muted-foreground mt-4">
            {t('p4')}
          </p>
        </section>

      </div>
    </div>
  );
}
