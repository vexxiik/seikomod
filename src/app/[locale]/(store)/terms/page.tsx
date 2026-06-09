import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("Terms");
  return {
    title: `${t("title")} | Vexx Watch Atelier`,
  };
}

export default async function TermsPage() {
  const t = await getTranslations("Terms");
  const content = t("content");
  const sections = content.split('\n\n');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">{t("title")}</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        {sections.map((section, idx) => {
          const lines = section.split('\n');
          const heading = lines[0];
          const paragraphs = lines.slice(1);

          // Pokud blok nezačíná číslem (např. úvodní text), vyrendrujeme jen jako odstavec
          if (!heading.match(/^\d+\./)) {
            return (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {lines.map((line, lIdx) => (
                  <span key={lIdx}>
                    {line}
                    {lIdx < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          }

          return (
            <section key={idx}>
              <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">{heading}</h2>
              <div className="space-y-4">
                {paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
