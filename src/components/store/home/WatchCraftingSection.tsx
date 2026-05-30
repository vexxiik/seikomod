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
              Proč zvolit <br />
              <span className="text-accent italic">Seiko Mod Atelier?</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Srdce, které nikdy nevynechá úder</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  Základem každého našeho <strong>Seiko modu</strong> je nekompromisní spolehlivost. Využíváme výhradně <strong>originální strojek Seiko NH35</strong> a jeho varianty. Tento legendární japonský kalibr zaručuje, že vaše <strong>vlastní hodinky Seiko</strong> nejen perfektně vypadají, ale stanou se přesným společníkem na dlouhá desetiletí.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Materiály nejvyšší třídy</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  Pro naše <strong>Seiko diver mody</strong> i elegantní modely využíváme výhradně <strong>prémiové díly na hodinky</strong>. Extrémně tvrdá safírová sklíčka, nevyblednutelné keramické lunety a masivní tahy z chirurgické oceli 904L povyšují každý <strong>Seiko Datejust mod</strong> nebo sportovní <strong>Seiko Nautilus mod</strong> na úroveň skutečného luxusu.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl text-foreground mb-2">Ruční montáž a absolutní unikátnost</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  Jsme přední specialisté na <strong>Seiko modding CZ</strong>. Pomocí našeho intuitivního <strong>konfigurátoru hodinek</strong> si sami zvolíte každý detail. Následně probíhá pečlivá ruční montáž. Výsledkem jsou dokonalé <strong>hodinky na míru</strong>, u kterých máte jistotu, že stejný kus nikdo jiný nemá.
                </p>
              </div>
            </div>
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
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
