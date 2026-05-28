import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Kontakt</h1>
      
      <p className="text-xl text-muted-foreground leading-relaxed mb-16">
        Máte dotaz ohledně našich hodinek nebo si přejete stavbu na míru? Neváhejte nás kontaktovat. Odpovídáme zpravidla do 24 hodin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">E-mail</h3>
          <p className="text-muted-foreground">info@seikomodatelier.cz</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Telefon</h3>
          <p className="text-muted-foreground">+420 123 456 789</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-8 bg-card/30 rounded-2xl border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Dílna</h3>
          <p className="text-muted-foreground">Praha, Česká republika<br/>(Pouze po předchozí domluvě)</p>
        </div>
      </div>
    </div>
  );
}
