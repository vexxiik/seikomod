"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProductFaq() {
  const t = useTranslations('ProductFaq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { title: t('faq1Title'), content: t('faq1Content') },
    { title: t('faq2Title'), content: t('faq2Content') },
    { title: t('faq3Title'), content: t('faq3Content') }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 border-t border-border/50 pt-8 mb-6">
      <h3 className="font-heading text-2xl font-bold mb-6">{t('title')}</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-border/60 rounded-xl bg-card overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-4 text-left font-semibold hover:bg-muted/30 transition-colors focus:outline-none"
            >
              <span className="text-foreground">{faq.title}</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {faq.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
