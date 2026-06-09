const fs = require('fs');

const csFile = './messages/cs.json';
const enFile = './messages/en.json';

const csData = JSON.parse(fs.readFileSync(csFile, 'utf8'));

// VOP Text
const vopText = `Všeobecné obchodní podmínky (dále jen "VOP")

1. Úvodní ustanovení
1.1. Tyto obchodní podmínky upravují vzájemná práva a povinnosti smluvních stran vzniklé v souvislosti nebo na základě kupní smlouvy (dále jen "kupní smlouva") uzavírané mezi provozovatelem e-shopu Jakub Sokol, se sídlem Sportovní 158, Staré Hradiště 533 52 (dále jen "prodávající") a jinou fyzickou osobou (dále jen "kupující") prostřednictvím internetového obchodu Vexx Watch Atelier.
1.2. Ustanovení odchylná od obchodních podmínek je možné sjednat v kupní smlouvě. Odchylná ujednání v kupní smlouvě mají přednost před ustanoveními obchodních podmínek.

2. Uživatelský účet
2.1. Na základě registrace kupujícího na webové stránce může kupující přistupovat do svého uživatelského rozhraní, ze kterého může provádět objednávání zboží.
2.2. Při registraci a objednávání zboží je kupující povinen uvádět správně a pravdivě všechny údaje.

3. Uzavření kupní smlouvy
3.1. Veškerá prezentace zboží umístěná na webu e-shopu je informativního charakteru a prodávající není povinen uzavřít kupní smlouvu ohledně tohoto zboží.
3.2. Kupní smlouva vzniká odesláním objednávky kupujícím a přijetím objednávky prodávajícím (zasláním potvrzovacího e-mailu).

4. Cena zboží a Platební podmínky
4.1. Cenu zboží a případné náklady spojené s dodáním může kupující uhradit následujícími způsoby:
- bezhotovostně platební kartou online (přes platební bránu Stripe)
- v hotovosti nebo kartou na dobírku při převzetí zboží.
4.2. V případě platby online je kupní cena splatná bezprostředně po odeslání objednávky.

5. Přeprava a dodání zboží
5.1. Zboží je doručováno prostřednictvím služby Zásilkovna na zvolené výdejní místo.
5.2. Pokud je zboží skladem, je obvykle expedováno do 2 pracovních dnů. V případě zakázkové stavby (Seiko Mod na míru) je doba dodání sjednána individuálně, obvykle 2-4 týdny.

6. Odstoupení od smlouvy
6.1. Kupující spotřebitel má právo odstoupit od kupní smlouvy do 14 dnů od převzetí zboží, pokud jde o modely běžně skladem.
6.2. DŮLEŽITÉ UPOZORNĚNÍ: Právo na odstoupení od smlouvy ve 14denní lhůtě NELZE uplatnit u zboží, které bylo upraveno podle přání kupujícího nebo pro jeho osobu (tzv. zakázkové stavby na míru sestavené přesně dle specifikací zákazníka v konfigurátoru nebo přes poptávku), v souladu s § 1837 písm. d) občanského zákoníku.

7. Práva z vadného plnění (Reklamace)
7.1. Prodávající odpovídá kupujícímu, že zboží při převzetí nemá vady. Na hodinky se vztahuje záruka 24 měsíců.
7.2. Záruka se nevztahuje na opotřebení věci způsobené jejím obvyklým užíváním, případně mechanické poškození (pád, náraz, nedodržení voděodolnosti).

8. Závěrečná ustanovení
8.1. Veškerá ujednání mezi prodávajícím a kupujícím se řídí platným právním řádem České republiky.
8.2. Tyto obchodní podmínky nabývají účinnosti dnem jejich zveřejnění na webu.`;

// GDPR Text
const gdprText = `Zásady ochrany osobních údajů (GDPR)

1. Základní ustanovení
1.1. Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen "GDPR") je Jakub Sokol, sídlem Sportovní 158, Staré Hradiště 533 52 (dále jen "správce").
1.2. Kontaktní údaje správce jsou: e-mail: info@vexxwatch.cz.

2. Zdroje a kategorie zpracovávaných údajů
2.1. Správce zpracovává osobní údaje, které jste mu poskytl/a, nebo údaje, které získal na základě plnění Vaší objednávky: jméno a příjmení, e-mailová adresa, poštovní adresa, telefonní číslo, platební údaje.

3. Zákonný důvod a účel zpracování
3.1. Zákonným důvodem zpracování je:
- plnění smlouvy mezi Vámi a správcem (čl. 6 odst. 1 písm. b) GDPR),
- plnění právních povinností správce (vystavování faktur, daně).
3.2. Účelem zpracování je vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu.

4. Doba uchovávání údajů
4.1. Správce uchovává osobní údaje po dobu nezbytnou k výkonu práv a povinností (max. 10 let z důvodu daňových zákonů).
4.2. Po uplynutí této doby údaje správce bezpečně smaže.

5. Příjemci osobních údajů
5.1. Příjemci osobních údajů jsou:
- osoby podílející se na dodání zboží (Zásilkovna / Packeta),
- osoby zajišťující realizaci plateb (Stripe),
- poskytovatel e-mailových a cloudových služeb (Vercel, Resend).

6. Vaše práva
6.1. Za podmínek stanovených v GDPR máte:
- právo na přístup ke svým údajům,
- právo na opravu nebo výmaz osobních údajů,
- právo vznést námitku proti zpracování,
- právo na přenositelnost údajů.
6.2. Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů, pokud se domníváte, že bylo porušeno Vaše právo na ochranu údajů.

7. Podmínky zabezpečení
7.1. Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů (šifrování hesel, SSL certifikát, zabezpečené databáze).`;

csData.Terms.content = vopText;
csData.Privacy.content = gdprText;

fs.writeFileSync(csFile, JSON.stringify(csData, null, 2), 'utf8');

// Also update English translations to match length-wise just in case
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

enData.Terms.content = `Terms and Conditions (T&C)\n\n1. General Provisions\nThese conditions govern the relationship between the seller (Jakub Sokol, Sportovní 158, Staré Hradiště 533 52) and the buyer.\n\n2. User Account\nBuyers can register to manage orders.\n\n3. Purchase Agreement\nThe agreement is concluded upon order confirmation.\n\n4. Payments\nPayments are processed securely via Stripe or Cash on Delivery.\n\n5. Shipping\nOrders are shipped via Packeta. Custom builds take 2-4 weeks.\n\n6. Returns\n14-day return policy applies ONLY to in-stock items. Custom modified watches (Seiko Mods built to order) CANNOT be returned under the 14-day policy as they are customized goods.\n\n7. Warranty\nA 24-month warranty covers manufacturing defects.\n\n8. Final Provisions\nGoverned by the laws of the Czech Republic.`;

enData.Privacy.content = `Privacy Policy (GDPR)\n\n1. Data Controller\nThe data controller is Jakub Sokol, Sportovní 158, Staré Hradiště 533 52.\n\n2. Collected Data\nWe collect names, addresses, and emails necessary for order fulfillment.\n\n3. Purpose of Processing\nData is processed to fulfill the purchase agreement and legal tax obligations.\n\n4. Data Retention\nData is kept for the time required by tax laws (up to 10 years).\n\n5. Third Parties\nData is shared with Packeta (shipping), Stripe (payments), and Resend (emails).\n\n6. Your Rights\nYou have the right to access, rectify, or erase your data.\n\n7. Security\nWe use industry-standard security (SSL, encryption) to protect your data.`;

fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');

console.log("Legal texts fully generated!");
