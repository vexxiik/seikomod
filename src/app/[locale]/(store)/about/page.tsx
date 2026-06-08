"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Diamond, Wrench, Clock, Shield, ArrowDown, Settings, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations('About');
  const tNav = useTranslations('Navigation');
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* 1. Cinematic Hero - Light Theme */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/img/about-hero.png')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-none tracking-tighter text-white drop-shadow-2xl">
              {t('heroTitle')}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600 italic">
                {t('heroTitleAccent')}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {t('heroSubtitle')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold">{t('heroScroll')}</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Storytelling / Philosophy */}
      <section className="py-32 md:py-48 relative z-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side text */}
            <motion.div 
              className="lg:col-span-5 space-y-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 text-accent tracking-[0.2em] text-xs uppercase font-bold">
                <span className="w-8 h-[1px] bg-accent"></span>
                {t('philBadge')}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary">
                {t('philTitle')}
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg lg:text-xl font-light leading-relaxed">
                <p>{t('philDesc1')}</p>
                <p>{t('philDesc2')}</p>
              </div>
              
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-2">{t('philStat1Val')}</div>
                  <div className="text-sm text-accent uppercase tracking-widest">{t('philStat1Label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-2">{t('philStat2Val')}</div>
                  <div className="text-sm text-accent uppercase tracking-widest">{t('philStat2Label')}</div>
                </div>
              </div>
            </motion.div>

            {/* Right side Images */}
            <div className="lg:col-span-7 relative h-[500px] md:h-[700px] w-full mt-10 lg:mt-0">
              <motion.div 
                className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-[url('/img/about-macro.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-background"
                initial={{ opacity: 0, y: 50, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-[url('/img/about-tools.png')] bg-cover bg-center" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Materials & Craftsmanship */}
      <section className="py-32 md:py-48 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 md:mb-32">
            <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-6 block">
              {t('materialsBadge')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              {t('materialsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Col - Materials Image */}
            <motion.div 
              className="relative aspect-[3/4] md:aspect-square lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-[url('/img/onas2.webp')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Right Col - List of materials */}
            <div className="flex flex-col justify-center space-y-12 md:space-y-16">
              {[
                { icon: Diamond, title: t('m1'), desc: t('d1') },
                { icon: Shield, title: t('m4'), desc: t('d4') },
                { icon: Settings, title: t('m2'), desc: t('d2') },
                { icon: Clock, title: t('m3'), desc: t('d3') },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full border border-primary/10 bg-white flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500 shadow-sm">
                      <item.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-500">{item.title}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-32 md:py-48 relative overflow-hidden bg-background">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 text-primary">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/configurator">
                <Button size="lg" className="h-16 px-8 md:px-12 text-base md:text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-bold uppercase tracking-widest shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_-10px_rgba(251,191,36,0.5)] transition-all group">
                  {t('ctaBtn')}
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="h-16 px-8 md:px-12 text-base md:text-lg rounded-full font-bold uppercase tracking-widest border-2 border-primary/20 hover:border-primary text-primary transition-all group">
                  {tNav('products')}
                  <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
