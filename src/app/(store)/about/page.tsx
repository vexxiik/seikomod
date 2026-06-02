import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Wrench, Diamond } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=2000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-sm" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl pt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6 border border-primary/20 uppercase">
            Naše Filozofie
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Umění <span className="text-accent italic">stavby.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            V Vexx Watch Atelier nevěříme na kompromisy. Neskládáme z hotových modelů – každé hodinky stavíme zcela od nuly z těch nejlepších dostupných prémiových dílů.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-20 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-lg border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group">
              <CardContent className="p-10 md:p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Diamond className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Prémiové materiály</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Používáme výhradně safírová sklíčka s antireflexní úpravou, keramické lunety a pouzdra z nerezové oceli 316L, která jsou ručně kartáčována a leštěna.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-lg border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group">
              <CardContent className="p-10 md:p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Wrench className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Ruční montáž</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Každý kus je sestavován ručně s maximální pečlivostí v bezprašném prostředí. Věnujeme desítky hodin tomu, aby byl každý detail dokonalý.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-lg border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group">
              <CardContent className="p-10 md:p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Kalibry Seiko</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Srdcem našich staveb jsou osvědčené automatické strojky Seiko (např. NH35, NH34 GMT), které individuálně regulujeme pro maximální přesnost.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-lg border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group">
              <CardContent className="p-10 md:p-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold mb-4">Záruka kvality</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Před odesláním prochází všechny hodinky tlakovou zkouškou vodotěsnosti a důkladnou vizuální kontrolou. Za svou práci absolutně ručíme.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
