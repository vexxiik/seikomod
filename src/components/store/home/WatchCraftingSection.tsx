"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WatchCraftingSection() {
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
            <div className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold tracking-wider uppercase rounded-full border border-primary/10">
              Watch Crafting
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Zakázková <br />
              <span className="text-accent italic">stavba.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Hodinky neskládáme z hotových modelů. Místo toho pečlivě vybíráme a kupujeme samostatné prémiové Seiko díly, ze kterých s chirurgickou přesností sestavujeme unikátní kousky na míru – přesně podle vašich představ.
            </p>
            <ul className="space-y-4">
              {[
                "Ruční montáž každého kusu",
                "Individuální regulace strojku pro maximální přesnost",
                "Tlaková zkouška vodotěsnosti",
                "Finální leštění a kontrola detailů"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-medium text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link href="/about">
                <Button className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                  Objevte náš proces
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
              <video 
                src="/video/seikomod.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover scale-[1.15] origin-center"
              />
            </div>
            
            {/* Floating element */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-background p-6 md:p-8 rounded-2xl shadow-xl border border-border max-w-xs"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="font-bold text-xl">10+ Hodin</div>
                  <div className="text-sm text-muted-foreground">ruční práce na kus</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
