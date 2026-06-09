const fs = require('fs');

const csFile = './messages/cs.json';
const enFile = './messages/en.json';

const csData = JSON.parse(fs.readFileSync(csFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

const csCare = `Ve Vexx Watch Atelier dbáme na nejvyšší kvalitu našich zakázkových staveb, aby vám vydržely co nejdéle. Abyste své hodinky udrželi v perfektním stavu a zajistili jejich optimální chod, doporučujeme dodržovat následující pokyny pro správnou péči:

1. Správné zacházení s korunkou
Ujistěte se, že je šroubovací korunka vždy pevně zašroubovaná a správně nasazená. Tím zaručíte maximální voděodolnost a ochranu vnitřního mechanismu před prachem a vlhkostí.

2. Kontakt s vodou a teplotní šoky
Naše hodinky jsou stavěné na odolnost, nicméně se jedná o ručně kompletované zakázkové stavby. Nevystavujte je extrémně horkému prostředí (např. sauny) ani prudkým výkyvům teplot. Náhlá změna teploty může způsobit kondenzaci vlhkosti uvnitř pouzdra, což může ovlivnit průhlednost sklíčka a přesnost strojku Seiko.

3. Ochrana před chemikáliemi
Zabraňte kontaktu hodinek s agresivními chemikáliemi, parfémy nebo čisticími prostředky, které by mohly poškodit těsnění nebo povrchovou úpravu oceli. V případě znečištění hodinky jemně otřete suchým hadříkem z mikrovlákna.

4. Nárazy a mechanické poškození
Ačkoliv používáme odolná safírová sklíčka a kvalitní ocelová pouzdra, automatický strojek uvnitř je jemný mechanický nástroj. Vyvarujte se pádům na tvrdý povrch a silným nárazům, které by mohly strojek poškodit nebo rozhodit jeho přesnost.

5. Pravidelná údržba
Pro zachování spolehlivosti doporučujeme hodinky jednou za pár let nechat zkontrolovat, vyčistit a případně seřídit. Prodloužíte tak výrazně jejich životnost.

6. Správné skladování
Pokud hodinky delší dobu nenosíte, uložte je na suchém místě se stálou teplotou, ideálně v originální krabičce. Pokud se jedná o model s automatickým nátahem, můžete využít natahovač hodinek.

Dodržováním těchto jednoduchých pravidel zajistíte, že vám budou hodinky Vexx Watch Atelier dělat radost po mnoho let. V případě nesprávného používání nebo nedodržení těchto pokynů se na případná poškození nemusí vztahovat záruka.

Přejeme vám spoustu skvělých okamžiků s vašimi novými hodinkami! Váš tým Vexx Watch Atelier.`;

const enCare = `At Vexx Watch Atelier, we ensure the highest quality of our custom builds so they last as long as possible. To keep your watch in perfect condition and ensure optimal performance, we recommend following these care instructions:

1. Proper Crown Handling
Ensure that the screw-down crown is always tightly secured. This guarantees maximum water resistance and protects the internal mechanism from dust and moisture.

2. Water Exposure and Thermal Shocks
Our watches are built for durability, but they are hand-assembled custom pieces. Do not expose them to extremely hot environments (e.g., saunas) or sudden temperature fluctuations. Sudden temperature changes can cause moisture condensation inside the case, affecting the crystal's clarity and the Seiko movement's accuracy.

3. Protection from Chemicals
Avoid contact with harsh chemicals, perfumes, or cleaning agents, which could damage the gaskets or the steel finish. If soiled, gently wipe the watch with a dry microfiber cloth.

4. Shocks and Mechanical Damage
Although we use durable sapphire crystals and high-quality steel cases, the automatic movement inside is a delicate mechanical instrument. Avoid dropping the watch on hard surfaces or subjecting it to strong impacts, which could damage the movement or disrupt its accuracy.

5. Regular Maintenance
To maintain reliability, we recommend having your watch checked, cleaned, and adjusted by a reliable watchmaker every few years. This significantly extends its lifespan.

6. Proper Storage
If you are not wearing the watch for an extended period, store it in a dry place with a stable temperature, ideally in its original box. For automatic models, you can use a watch winder.

By following these simple rules, you will ensure that your Vexx Watch Atelier timepiece brings you joy for many years. Damage caused by improper use or failure to follow these instructions may not be covered by the warranty.

We wish you many great moments with your new watch! Your Vexx Watch Atelier team.`;

csData.Care = {
  title: "Péče o hodinky",
  content: csCare
};

enData.Care = {
  title: "Watch Care",
  content: enCare
};

// Add to Footer links
csData.Footer.watchCare = "Péče o hodinky";
enData.Footer.watchCare = "Watch Care";

fs.writeFileSync(csFile, JSON.stringify(csData, null, 2) + '\n');
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2) + '\n');

console.log('Care translations added!');
