import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("Privacy");
  return {
    title: `${t("title")} | Vexx Watch Atelier`,
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  return (
    <div className="container py-16 md:py-24 max-w-4xl">
      <h1 className="text-3xl font-serif text-primary mb-8">{t("title")}</h1>
      <div className="prose prose-sm md:prose-base prose-slate dark:prose-invert">
        <p className="whitespace-pre-wrap">{t("content")}</p>
        
        {/* Zde by byl kompletní text GDPR. Pro teď používáme zástupný text z překladů, který si majitel může později rozšířit. */}
        
      </div>
    </div>
  );
}
