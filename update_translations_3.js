const fs = require('fs');
const path = require('path');

function updateTranslations(newCs, newEn) {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  Object.assign(csData, newCs);
  Object.assign(enData, newEn);

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('Translations updated successfully.');
}

const newCs = {
  "Contact": {
    "title": "Kontakt",
    "description": "Máte dotaz ohledně našich hodinek nebo si přejete stavbu na míru? Neváhejte nás kontaktovat. Odpovídáme zpravidla do 24 hodin.",
    "email": "E-mail",
    "phone": "Telefon",
    "workshop": "Dílna",
    "workshopDesc": "Praha, Česká republika<br/>(Pouze po předchozí domluvě)"
  },
  "Custom": {
    "title": "Návrh na míru",
    "description": "Nenašli jste v našem katalogu to, co hledáte? Postavíme vám hodinky přesně podle vašich představ. Vyplňte formulář níže a my se vám ozveme s cenovou nabídkou a možnostmi realizace.",
    "step1Title": "Vaše vize",
    "step1Desc": "Popište nám, jaké materiály, barvy a styl si představujete.",
    "step2Title": "Konzultace",
    "step2Desc": "Spojíme se s vámi, probereme dostupné prémiové díly a sladíme detaily.",
    "step3Title": "Realizace",
    "step3Desc": "Vámi navržené hodinky ručně sestavíme a odešleme k vám.",
    "successTitle": "Poptávka odeslána!",
    "successDesc": "Děkujeme za váš zájem. Vaši vizi jsme přijali a co nejdříve se vám ozveme na zadaný e-mail s možnostmi realizace.",
    "sendAnother": "Odeslat další poptávku",
    "name": "Jméno a příjmení",
    "email": "E-mail",
    "style": "Preferovaný styl (volitelné)",
    "stylePlaceholder": "Např. Potápěčské (Submariner styl), Společenské...",
    "idea": "Vaše představa",
    "ideaPlaceholder": "Popište barvu ciferníku, typ ručiček, materiál lunety...",
    "submitting": "Odesílám...",
    "submit": "Odeslat nezávaznou poptávku"
  },
  "Legal": {
    "title": "Právní doložka a transparentnost",
    "h1": "Nezávislost značky",
    "p1": "Vexx Watch Atelier nemá žádné obchodní, organizační ani právní spojení se značkou Seiko® ani žádnými jinými zmíněnými značkami. Nejsme autorizovaným prodejcem, partnerem ani držitelem licence. Veškeré názvy značek uvedené na tomto webu slouží výhradně k objektivnímu popisu stylu, kompatibility nebo technických vlastností.",
    "h2": "Právní upozornění",
    "p2": "Naše zakázkové stavby (Seiko Mods) vznikají zcela nezávisle a bez jakékoliv autorizace či schválení od společnosti Seiko®. Design našich hodinek je inspirován ikonickými styly a modely, avšak jedná se o nezávislou rukodělnou tvorbu.",
    "h3": "Co jsou to zakázkové stavby (Seiko Mods)?",
    "p3": "Naše hodinky jsou postaveny na originálních automatických strojcích Seiko (např. kalibry NH35, NH34 atd.), které následně propojujeme s pečlivě vybranými neoriginálními (aftermarket) prémiovými díly. To zahrnuje použití individuálně vybraných komponentů, jako jsou pouzdra, ciferníky, ručičky, lunety a řemínky.",
    "p4": "Každá naše stavba na míru je ručně sestavený originál. Záměrně se odlišuje od sériově vyráběných modelů, představuje unikátní umělecké vyjádření svého nositele a v žádném případě se nejedná o padělek."
  },
  "Shipping": {
    "title": "Doprava a platba",
    "h1": "Způsoby doručení",
    "p1": "Vzhledem k povaze našeho zboží dbáme na maximální bezpečnost při přepravě. Všechny zásilky jsou plně pojištěny na plnou hodnotu hodinek.",
    "l1": "<strong>PPL / DPD kurýr na adresu:</strong> Zdarma pro všechny objednávky. Doručení obvykle do 24 hodin od expedice.",
    "l2": "<strong>Osobní předání:</strong> Možné po předchozí domluvě v Praze.",
    "h2": "Doba dodání",
    "p2": "Pokud jsou hodinky označené jako \"Skladem\", expedujeme je obvykle do 2 pracovních dnů (probíhá finální kontrola a tlaková zkouška). U zakázkových staveb na míru je doba dodání obvykle 2-4 týdny v závislosti na dostupnosti specifických prémiových dílů.",
    "h3": "Možnosti platby",
    "l3": "<strong>Bankovní převod:</strong> Po potvrzení objednávky vám zašleme údaje k platbě. Zboží expedujeme po připsání částky na náš účet.",
    "l4": "<strong>Záloha na zakázkovou stavbu:</strong> U staveb na míru požadujeme nevratnou zálohu ve výši 50 % z celkové ceny před zahájením prací. Zbytek se doplácí před odesláním hotových hodinek."
  }
};

const newEn = {
  "Contact": {
    "title": "Contact",
    "description": "Do you have a question about our watches or would you like a custom build? Do not hesitate to contact us. We usually reply within 24 hours.",
    "email": "E-mail",
    "phone": "Phone",
    "workshop": "Workshop",
    "workshopDesc": "Prague, Czech Republic<br/>(By prior arrangement only)"
  },
  "Custom": {
    "title": "Custom Design",
    "description": "Didn't find what you are looking for in our catalog? We will build a watch exactly to your liking. Fill out the form below and we will get back to you with a quote and realization options.",
    "step1Title": "Your Vision",
    "step1Desc": "Describe the materials, colors, and style you envision.",
    "step2Title": "Consultation",
    "step2Desc": "We will connect with you, discuss available premium parts, and align on details.",
    "step3Title": "Realization",
    "step3Desc": "We will hand-assemble your designed watch and ship it to you.",
    "successTitle": "Request sent!",
    "successDesc": "Thank you for your interest. We have received your vision and will contact you as soon as possible via the provided e-mail with realization options.",
    "sendAnother": "Send another request",
    "name": "Full Name",
    "email": "E-mail",
    "style": "Preferred Style (optional)",
    "stylePlaceholder": "E.g. Dive watch (Submariner style), Dress watch...",
    "idea": "Your Idea",
    "ideaPlaceholder": "Describe the dial color, type of hands, bezel material...",
    "submitting": "Submitting...",
    "submit": "Submit Non-binding Request"
  },
  "Legal": {
    "title": "Legal Notice & Transparency",
    "h1": "Brand Independence",
    "p1": "Vexx Watch Atelier has no commercial, organizational, or legal affiliation with the Seiko® brand or any other mentioned brands. We are not an authorized dealer, partner, or licensee. All brand names mentioned on this website serve exclusively to objectively describe style, compatibility, or technical features.",
    "h2": "Legal Disclaimer",
    "p2": "Our custom builds (Seiko Mods) are created entirely independently and without any authorization or approval from Seiko®. The design of our watches is inspired by iconic styles and models, but it is independent handcrafted work.",
    "h3": "What are custom builds (Seiko Mods)?",
    "p3": "Our watches are built on original automatic Seiko movements (e.g., NH35, NH34 calibers, etc.), which we then pair with carefully selected non-original (aftermarket) premium parts. This includes the use of individually selected components such as cases, dials, hands, bezels, and straps.",
    "p4": "Each of our custom builds is a hand-assembled original. It intentionally differs from mass-produced models, represents a unique artistic expression of its wearer, and is in no way a counterfeit."
  },
  "Shipping": {
    "title": "Shipping and Payment",
    "h1": "Delivery Methods",
    "p1": "Given the nature of our goods, we ensure maximum security during transport. All shipments are fully insured for the full value of the watch.",
    "l1": "<strong>PPL / DPD Courier to Address:</strong> Free for all orders. Delivery usually within 24 hours of dispatch.",
    "l2": "<strong>Personal Pickup:</strong> Possible by prior arrangement in Prague.",
    "h2": "Delivery Time",
    "p2": "If watches are marked as \"In Stock\", we usually dispatch them within 2 working days (after final inspection and pressure testing). For custom builds, delivery time is usually 2-4 weeks depending on the availability of specific premium parts.",
    "h3": "Payment Options",
    "l3": "<strong>Bank Transfer:</strong> After confirming your order, we will send you payment details. Goods are dispatched after the amount is credited to our account.",
    "l4": "<strong>Deposit for Custom Build:</strong> For custom builds, we require a non-refundable deposit of 50% of the total price before starting work. The remainder is paid before shipping the finished watch."
  }
};

updateTranslations(newCs, newEn);
