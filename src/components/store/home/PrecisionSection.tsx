"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wrench } from "lucide-react";

import { useTranslations } from "next-intl";

const features = [
  {
    icon: Wrench,
    titleKey: "f1Title",
    descKey: "f1Desc"
  },
  {
    icon: Clock,
    titleKey: "f2Title",
    descKey: "f2Desc"
  },
  {
    icon: Shield,
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
              <div className="h-20 w-20 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg">
                <feature.icon className="h-10 w-10" />
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
