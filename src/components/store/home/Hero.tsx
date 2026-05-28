"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent dark:from-background/95 dark:via-background/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm border border-primary/20">
              MISTROVSKÉ DÍLO NA ZÁPĚSTÍ
            </span>
          </motion.div>
          
          <motion.h1 
            className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Unikátní hodinky, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              váš osobní styl.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Objevte zakázkovou stavbu hodinek na míru z prémiových Seiko dílů. Od potápěčských ikon po elegantní modely sestavené s maximální precizností přímo pro vás.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg w-full sm:w-auto shadow-lg shadow-accent/20 rounded-xl transition-all duration-300 hover:-translate-y-1 group">
                Prozkoumat kolekci
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/custom">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300">
                Návrh na míru
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
