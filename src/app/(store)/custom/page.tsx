import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomWatchPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Návrh na míru</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Nenašli jste v našem katalogu to, co hledáte? Postavíme vám hodinky přesně podle vašich představ. Vyplňte formulář níže a my se vám ozveme s cenovou nabídkou a možnostmi realizace.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Vaše vize</h3>
                <p className="text-muted-foreground">Popište nám, jaké materiály, barvy a styl si představujete.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Konzultace</h3>
                <p className="text-muted-foreground">Spojíme se s vámi, probereme dostupné prémiové díly a sladíme detaily.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold shrink-0">3</div>
              <div>
                <h3 className="font-bold text-xl mb-2">Realizace</h3>
                <p className="text-muted-foreground">Vámi navržené hodinky ručně sestavíme a odešleme k vám.</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-card/50 border-none shadow-lg">
          <CardContent className="p-8 md:p-10">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Jméno a příjmení</Label>
                <Input id="name" placeholder="Jan Novák" className="h-12 bg-background" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="jan@email.cz" className="h-12 bg-background" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Preferovaný styl (volitelné)</Label>
                <Input id="style" placeholder="Např. Potápěčské (Submariner styl), Společenské..." className="h-12 bg-background" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Vaše představa</Label>
                <Textarea 
                  id="message" 
                  placeholder="Popište barvu ciferníku, typ ručiček, materiál lunety..." 
                  className="min-h-[150px] bg-background resize-none"
                />
              </div>

              <Button type="button" className="w-full h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl shadow-md">
                Odeslat nezávaznou poptávku
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
