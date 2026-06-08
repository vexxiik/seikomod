"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function PrecisionSection() {
  const t = useTranslations('About');

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-accent">
                {t('philBadge')}
              </span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
              {t('philTitle')}
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-12">
              <p>{t('philDesc1')}</p>
              <p>{t('philDesc2')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 pt-8 border-t border-border">
              <div className="font-heading font-bold text-xl text-foreground whitespace-nowrap">
                {t('stat1')}
              </div>
              <div className="font-heading font-bold text-xl text-foreground whitespace-nowrap">
                {t('stat2')}
              </div>
              <div className="font-heading font-bold text-xl text-foreground whitespace-nowrap">
                {t('stat3')}
              </div>
            </div>
          </motion.div>
          
          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-muted">
              <Image 
                src="/img/seiko_nh35_movement.png" 
                alt="Seiko Movement" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
