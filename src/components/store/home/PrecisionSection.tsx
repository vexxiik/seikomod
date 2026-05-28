"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wrench } from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "Ruční sestavení",
    description: "Každé hodinky jsou pečlivě složeny našimi hodináři s dlouholetou zkušeností. Důraz na absolutní čistotu a přesnost."
  },
  {
    icon: Clock,
    title: "Prémiové strojky",
    description: "Používáme výhradně osvědčené kalibry Seiko (NH35/NH34) s vynikající spolehlivostí a rezervou chodu."
  },
  {
    icon: Shield,
    title: "Safírová sklíčka",
    description: "Základem našich staveb na míru je vysoce odolné safírové sklíčko s antireflexní úpravou pro dokonalou čitelnost."
  }
];

export function PrecisionSection() {
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
            Preciznost v každém detailu
          </motion.h2>
          <motion.p 
            className="text-primary-foreground/80 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Zakázková stavba hodinek není jen o vzhledu. Jde o dokonalou synergii kvalitních prémiových dílů, ověřených strojků a precizní lidské práce.
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
              <h3 className="text-xl font-semibold mb-3 font-heading">{feature.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
