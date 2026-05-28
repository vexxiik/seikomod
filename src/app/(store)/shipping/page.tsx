export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">Doprava a platba</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Způsoby doručení</h2>
          <p className="text-muted-foreground mb-4">
            Vzhledem k povaze našeho zboží dbáme na maximální bezpečnost při přepravě. Všechny zásilky jsou plně pojištěny na plnou hodnotu hodinek.
          </p>
          <ul className="space-y-4 list-disc pl-6 text-muted-foreground">
            <li><strong>PPL / DPD kurýr na adresu:</strong> Zdarma pro všechny objednávky. Doručení obvykle do 24 hodin od expedice.</li>
            <li><strong>Osobní předání:</strong> Možné po předchozí domluvě v Praze.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Doba dodání</h2>
          <p className="text-muted-foreground">
            Pokud jsou hodinky označené jako "Skladem", expedujeme je obvykle do 2 pracovních dnů (probíhá finální kontrola a tlaková zkouška). U zakázkových staveb na míru je doba dodání obvykle 2-4 týdny v závislosti na dostupnosti specifických prémiových dílů.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 border-b pb-2">Možnosti platby</h2>
          <ul className="space-y-4 list-disc pl-6 text-muted-foreground">
            <li><strong>Bankovní převod:</strong> Po potvrzení objednávky vám zašleme údaje k platbě. Zboží expedujeme po připsání částky na náš účet.</li>
            <li><strong>Záloha na zakázkovou stavbu:</strong> U staveb na míru požadujeme nevratnou zálohu ve výši 50 % z celkové ceny před zahájením prací. Zbytek se doplácí před odesláním hotových hodinek.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
