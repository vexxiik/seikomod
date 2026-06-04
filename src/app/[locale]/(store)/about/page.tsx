"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Diamond, Wrench, Clock, Shield, ArrowDown, Settings, Target } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations('About');
  const heroRef = useRef(null);
  
  // Parallax pro hero obrázek
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      
      {/* 1. Hero Sekce s Parallaxem */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-12">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Image (Left) */}
            <motion.div 
              style={{ y, opacity }}
              className="w-full lg:w-1/2 aspect-square max-h-[600px] rounded-[3rem] overflow-hidden shadow-2xl relative order-2 lg:order-1"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
            </motion.div>
            
            {/* Text (Right) */}
            <motion.div
              className="w-full lg:w-1/2 text-left order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-bold tracking-widest mb-6 border border-accent/20 uppercase shadow-sm">
                {t('heroBadge')}
              </span>
              <h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight tracking-tighter">
                {t('heroTitle')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600 italic pr-2">
                  {t('heroTitleAccent')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-xl mb-12">
                {t('heroSubtitle')}
              </p>
            </motion.div>

          </div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-semibold">{t('heroScroll')}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Naše filozofie (Storytelling Split Section) */}
      <section className="py-24 md:py-32 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center max-w-7xl mx-auto">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/img/o_nas.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
              


            </motion.div>

            <motion.div 
              className="lg:w-1/2 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-sm">
                <span className="w-12 h-[2px] bg-accent"></span>
                {t('philBadge')}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                {t('philTitle')}
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>{t('philDesc1')}</p>
                <p>{t('philDesc2')}</p>
              </div>
              
              <div className="pt-8 border-t border-border/50 flex items-center justify-between gap-4">
                <div className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground tracking-tight whitespace-nowrap">{t('stat1')}</div>
                <div className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground tracking-tight whitespace-nowrap">{t('stat2')}</div>
                <div className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground tracking-tight whitespace-nowrap">{t('stat3')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Materiály a zpracování (Bento Grid) */}
      <section className="py-24 md:py-32 bg-muted/30 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">
              {t('materialsBadge')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              {t('materialsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Diamond, title: t('m1'), desc: t('d1'), delay: 0 },
              { icon: Settings, title: t('m2'), desc: t('d2'), delay: 0.1 },
              { icon: Clock, title: t('m3'), desc: t('d3'), delay: 0.2 },
              { icon: Shield, title: t('m4'), desc: t('d4'), delay: 0.3 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                className="bg-background border border-border/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-accent group-hover:text-background transition-colors" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Sekce */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div 
          className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-fixed bg-center mix-blend-overlay"
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto bg-background/40 backdrop-blur-xl border border-accent/20 p-12 md:p-16 rounded-[3rem] shadow-2xl"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-10 font-light">
              {t('ctaDesc')}
            </p>
            <Link href="/configurator">
              <Button size="lg" className="h-14 px-10 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-lg hover:shadow-accent/25 hover:-translate-y-1 transition-all">
                <Wrench className="w-5 h-5 mr-3" />
                {t('ctaBtn')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
