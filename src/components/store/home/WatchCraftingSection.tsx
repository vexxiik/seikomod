"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function WatchCraftingSection() {
  const t = useTranslations('WatchCrafting');
  return (
    <section className="py-24 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('title1')} <br />
              <span className="text-accent italic">{t('title2')}</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">{t('t1')}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg" dangerouslySetInnerHTML={{ __html: t.raw('d1') }} />
              </div>

              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">{t('t2')}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg" dangerouslySetInnerHTML={{ __html: t.raw('d2') }} />
              </div>

              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">{t('t3')}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg" dangerouslySetInnerHTML={{ __html: t.raw('d3') }} />
              </div>
            </div>
            <div className="pt-4">
              <Link href="/about">
                <Button className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                  {t('explore')}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl bg-muted">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <Image 
                src="/img/o_nas.webp" 
                alt="Watch Crafting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover origin-center"
              />
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
