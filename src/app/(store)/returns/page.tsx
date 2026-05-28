export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">Reklamace a vrácení</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Záruka</h2>
          <p className="text-muted-foreground">
            Na všechny naše hodinky (sestavené kusy i zakázkové stavby) poskytujeme záruku 24 měsíců na výrobní vady a přesnost chodu v rámci tolerancí daného strojku Seiko. Záruka se nevztahuje na běžné opotřebení, poškození neopatrným zacházením nebo pád na tvrdý povrch.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Vrácení zboží (Odstoupení od smlouvy)</h2>
          <p className="text-muted-foreground mb-4">
            <strong>Modely z katalogu (Skladem):</strong> Máte právo odstoupit od smlouvy bez udání důvodu do 14 dnů od převzetí zboží. Hodinky musí být nenošené, nepoškozené a v původním obalu.
          </p>
          <p className="text-muted-foreground text-destructive/80 font-medium">
            <strong>Zakázkové stavby na míru:</strong> U hodinek sestavených přesně podle vašich individuálních požadavků (zakázková výroba) právo na odstoupení od smlouvy ve 14denní lhůtě zaniká, jelikož se jedná o zboží upravené podle přání spotřebitele.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Jak postupovat při reklamaci</h2>
          <ol className="space-y-4 list-decimal pl-6 text-muted-foreground">
            <li>Kontaktujte nás nejprve e-mailem na <strong>info@seikomodatelier.cz</strong> s popisem závady a případně fotografiemi.</li>
            <li>Vyčkejte na naše pokyny k odeslání. Hodinky vždy dobře zabalte, ideálně do původní krabičky.</li>
            <li>Reklamaci vyřídíme co nejrychleji, nejpozději však do zákonné lhůty 30 dnů. Většinou to ale zvládáme mnohem rychleji, protože veškerý servis děláme my sami v naší dílně.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
