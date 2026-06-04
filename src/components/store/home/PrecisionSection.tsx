"use client";

import { motion } from "framer-motion";
import { Diamond, Settings, Wrench } from "lucide-react";

import { useTranslations } from "next-intl";

const features = [
  {
    icon: Wrench,
    titleKey: "f1Title",
    descKey: "f1Desc"
  },
  {
    icon: Settings,
    titleKey: "f2Title",
    descKey: "f2Desc"
  },
  {
    icon: Diamond,
    titleKey: "f3Title",
    descKey: "f3Desc"
  }
];

export function PrecisionSection() {
  const t = useTranslations('Precision');
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            className="text-primary-foreground/80 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="relative h-24 w-24 mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-colors duration-500" />
                
                {/* Icon Container */}
                <div className="relative h-full w-full rounded-full border border-accent/20 bg-primary/50 backdrop-blur-sm flex items-center justify-center group-hover:border-accent transition-all duration-500 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
                  <feature.icon className="h-10 w-10 text-accent" strokeWidth={1} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">{t(feature.titleKey as any)}</h3>
              <p className="text-primary-foreground/70 leading-relaxed text-sm">
                {t(feature.descKey as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
