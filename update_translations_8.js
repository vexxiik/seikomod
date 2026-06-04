const fs = require('fs');
const path = require('path');

function updateTranslations() {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // Update Navbar
  if (csData.Navbar) csData.Navbar.about = "O nás";
  if (enData.Navbar) enData.Navbar.about = "About Us";

  // Completely overwrite About namespace
  csData.About = {
    heroBadge: "Mistrovství a Preciznost",
    heroTitle: "Umění",
    heroTitleAccent: "stavby.",
    heroSubtitle: "V Vexx Watch Atelier nevěříme na kompromisy. Z prázdného pouzdra vytváříme unikátní časomíry s respektem k tradičnímu hodinářství.",
    heroScroll: "Objevte náš příběh",
    
    philBadge: "Naše filozofie",
    philTitle: "Každý detail má svůj význam",
    philDesc1: "Naše cesta začala vášní pro mechanické hodinky. Nespokojíme se s konfekcí. Věříme, že hodinky jsou vyjádřením osobnosti svého nositele.",
    philDesc2: "Proto každý kus sestavujeme ručně, dílek po dílku. Pečlivě vybíráme materiály nejvyšší kvality a kombinujeme je tak, abychom dosáhli dokonalé harmonie mezi designem a spolehlivostí.",
    philStat1Val: "100%",
    philStat1Label: "Ruční montáž",
    philStat2Val: "904L",
    philStat2Label: "Prémiová ocel",
    
    materialsBadge: "Materiály a zpracování",
    materialsTitle: "Nekompromisní kvalita",
    m1: "Safírové sklo",
    d1: "Extrémní odolnost proti poškrábání a antireflexní vrstva pro perfektní čitelnost za všech podmínek.",
    m2: "Keramické lunety",
    d2: "Odolnost proti UV záření, trvalý lesk a absolutní odolnost proti oděru.",
    m3: "Spolehlivé kalibry",
    d3: "Srdcem našich staveb jsou osvědčené automatické strojky Seiko (NH35, NH34 GMT), kalibrované na maximální přesnost.",
    m4: "Prémiová ocel",
    d4: "Používáme pouzdra a tahy z nerezové oceli (316L nebo 904L) pro dlouhověkost a nádherný lesk.",
    
    ctaTitle: "Připraveni na vlastní příběh?",
    ctaDesc: "Navrhněte si hodinky, které vás budou provázet celým životem.",
    ctaBtn: "Otevřít konfigurátor"
  };

  enData.About = {
    heroBadge: "Mastery & Precision",
    heroTitle: "The Art of",
    heroTitleAccent: "Crafting.",
    heroSubtitle: "At Vexx Watch Atelier, we don't believe in compromises. From an empty case, we create unique timepieces with respect to traditional watchmaking.",
    heroScroll: "Discover our story",
    
    philBadge: "Our Philosophy",
    philTitle: "Every detail matters",
    philDesc1: "Our journey began with a passion for mechanical watches. We are not satisfied with mass production. We believe a watch is an expression of its wearer's personality.",
    philDesc2: "That's why every piece is hand-assembled, part by part. We carefully select the highest quality materials and combine them to achieve perfect harmony between design and reliability.",
    philStat1Val: "100%",
    philStat1Label: "Hand Assembled",
    philStat2Val: "904L",
    philStat2Label: "Premium Steel",
    
    materialsBadge: "Materials & Craftsmanship",
    materialsTitle: "Uncompromising Quality",
    m1: "Sapphire Crystal",
    d1: "Extreme scratch resistance and anti-reflective coating for perfect readability in all conditions.",
    m2: "Ceramic Bezels",
    d2: "UV resistance, lasting shine, and absolute scratch resistance.",
    m3: "Reliable Calibers",
    d3: "The heart of our builds are proven Seiko automatic movements (NH35, NH34 GMT), calibrated for maximum precision.",
    m4: "Premium Steel",
    d4: "We use stainless steel cases and bracelets (316L or 904L) for longevity and beautiful shine.",
    
    ctaTitle: "Ready for your own story?",
    ctaDesc: "Design a watch that will accompany you for a lifetime.",
    ctaBtn: "Open Configurator"
  };

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('About page translations updated.');
}

updateTranslations();
