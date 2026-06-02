export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">Právní doložka a transparentnost</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Nezávislost značky</h2>
          <p className="text-muted-foreground">
            Vexx Watch Atelier nemá žádné obchodní, organizační ani právní spojení se značkou Seiko® ani žádnými jinými zmíněnými značkami. Nejsme autorizovaným prodejcem, partnerem ani držitelem licence. Veškeré názvy značek uvedené na tomto webu slouží výhradně k objektivnímu popisu stylu, kompatibility nebo technických vlastností.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Právní upozornění</h2>
          <p className="text-muted-foreground">
            Naše zakázkové stavby (Seiko Mods) vznikají zcela nezávisle a bez jakékoliv autorizace či schválení od společnosti Seiko®. Design našich hodinek je inspirován ikonickými styly a modely, avšak jedná se o nezávislou rukodělnou tvorbu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Co jsou to zakázkové stavby (Seiko Mods)?</h2>
          <p className="text-muted-foreground">
            Naše hodinky jsou postaveny na originálních automatických strojcích Seiko (např. kalibry NH35, NH34 atd.), které následně propojujeme s pečlivě vybranými neoriginálními (aftermarket) prémiovými díly. To zahrnuje použití individuálně vybraných komponentů, jako jsou pouzdra, ciferníky, ručičky, lunety a řemínky. 
          </p>
          <p className="text-muted-foreground mt-4">
            Každá naše stavba na míru je ručně sestavený originál. Záměrně se odlišuje od sériově vyráběných modelů, představuje unikátní umělecké vyjádření svého nositele a v žádném případě se nejedná o padělek.
          </p>
        </section>

      </div>
    </div>
  );
}
