import { useTranslations } from "next-intl";

export default function ReturnsPage() {
  const t = useTranslations('Returns');
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
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
          <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.raw('p2') }} />
          <p className="text-muted-foreground text-destructive/80 font-medium" dangerouslySetInnerHTML={{ __html: t.raw('p3') }} />
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('h3')}</h2>
          <ol className="space-y-4 list-decimal pl-6 text-muted-foreground">
            <li dangerouslySetInnerHTML={{ __html: t.raw('l1') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('l2') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('l3') }} />
          </ol>
        </section>
      </div>
    </div>
  );
}
