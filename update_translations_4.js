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
  "Returns": {
    "title": "Reklamace a vrácení",
    "h1": "Záruka",
    "p1": "Na všechny naše hodinky (sestavené kusy i zakázkové stavby) poskytujeme záruku 24 měsíců na výrobní vady a přesnost chodu v rámci tolerancí daného strojku Seiko. Záruka se nevztahuje na běžné opotřebení, poškození neopatrným zacházením nebo pád na tvrdý povrch.",
    "h2": "Vrácení zboží (Odstoupení od smlouvy)",
    "p2": "<strong>Modely z katalogu (Skladem):</strong> Máte právo odstoupit od smlouvy bez udání důvodu do 14 dnů od převzetí zboží. Hodinky musí být nenošené, nepoškozené a v původním obalu.",
    "p3": "<strong>Zakázkové stavby na míru:</strong> U hodinek sestavených přesně podle vašich individuálních požadavků (zakázková výroba) právo na odstoupení od smlouvy ve 14denní lhůtě zaniká, jelikož se jedná o zboží upravené podle přání spotřebitele.",
    "h3": "Jak postupovat při reklamaci",
    "l1": "Kontaktujte nás nejprve e-mailem na <strong>info@seikomodatelier.cz</strong> s popisem závady a případně fotografiemi.",
    "l2": "Vyčkejte na naše pokyny k odeslání. Hodinky vždy dobře zabalte, ideálně do původní krabičky.",
    "l3": "Reklamaci vyřídíme co nejrychleji, nejpozději však do zákonné lhůty 30 dnů. Většinou to ale zvládáme mnohem rychleji, protože veškerý servis děláme my sami v naší dílně."
  },
  "Products": {
    "title": "Katalog hodinek",
    "description": "Objevte naši aktuální nabídku ručně modifikovaných hodinek Seiko.",
    "filter": "Filtrovat:",
    "all": "Vše",
    "viewDetail": "Zobrazit detail",
    "noProducts": "Zvolené kategorii neodpovídají žádné modely."
  },
  "ProductDetail": {
    "noCategory": "Kategorie nezadána",
    "notSpecified": "Neuvedeno",
    "inStock": "Skladem, připraveno k odeslání",
    "onOrder": "Na objednávku",
    "specs": "Technické parametry",
    "movement": "Strojek",
    "glass": "Sklíčko",
    "bracelet": "Náramek",
    "case": "Pouzdro",
    "waterResistance": "Voděodolnost",
    "warranty": "Záruka 2 roky",
    "shipping": "Doručení na Zásilkovnu",
    "returns": "14 dní na vrácení"
  },
  "Auth": {
    "loginTitle": "Přihlášení",
    "loginDesc": "Vítejte zpět v Vexx Watch Atelier",
    "email": "E-mail",
    "password": "Heslo",
    "loginBtn": "Přihlásit se",
    "loginBtnLoading": "Přihlašování...",
    "noAccount": "Nemáte ještě účet?",
    "registerLink": "Zaregistrujte se",
    "registerTitle": "Registrace",
    "registerDesc": "Vytvořte si účet a získejte prémiovou krabičku zdarma",
    "fullName": "Celé jméno",
    "passwordMin": "Minimálně 6 znaků.",
    "registerBtn": "Vytvořit účet",
    "registerBtnLoading": "Vytvářím účet...",
    "hasAccount": "Už máte účet?",
    "loginLink": "Přihlaste se",
    "registerSuccessError": "Registrace proběhla, ale přihlášení selhalo. Zkuste se přihlásit ručně.",
    "genericError": "Něco se pokazilo. Zkuste to prosím znovu."
  }
};

const newEn = {
  "Returns": {
    "title": "Claims and Returns",
    "h1": "Warranty",
    "p1": "We provide a 24-month warranty on all our watches (assembled pieces and custom builds) for manufacturing defects and accuracy within the tolerances of the given Seiko movement. The warranty does not cover normal wear and tear, damage caused by careless handling, or dropping on a hard surface.",
    "h2": "Returns (Right of Withdrawal)",
    "p2": "<strong>Catalog models (In stock):</strong> You have the right to withdraw from the contract without giving any reason within 14 days of receiving the goods. The watch must be unworn, undamaged, and in its original packaging.",
    "p3": "<strong>Custom builds:</strong> For watches assembled exactly according to your individual requirements (custom production), the right to withdraw from the contract within the 14-day period expires, as this is goods modified according to the consumer's wishes.",
    "h3": "How to proceed with a claim",
    "l1": "First, contact us by email at <strong>info@seikomodatelier.cz</strong> with a description of the defect and possibly photos.",
    "l2": "Wait for our shipping instructions. Always pack the watch well, ideally in the original box.",
    "l3": "We will process the claim as quickly as possible, but no later than the legal deadline of 30 days. We usually manage it much faster, as we do all the servicing ourselves in our workshop."
  },
  "Products": {
    "title": "Watch Catalog",
    "description": "Discover our current range of hand-modified Seiko watches.",
    "filter": "Filter:",
    "all": "All",
    "viewDetail": "View detail",
    "noProducts": "No models match the selected category."
  },
  "ProductDetail": {
    "noCategory": "Category not specified",
    "notSpecified": "Not specified",
    "inStock": "In stock, ready to ship",
    "onOrder": "On order",
    "specs": "Technical Specifications",
    "movement": "Movement",
    "glass": "Glass",
    "bracelet": "Bracelet",
    "case": "Case",
    "waterResistance": "Water Resistance",
    "warranty": "2-year warranty",
    "shipping": "Packeta delivery",
    "returns": "14-day returns"
  },
  "Auth": {
    "loginTitle": "Login",
    "loginDesc": "Welcome back to Vexx Watch Atelier",
    "email": "E-mail",
    "password": "Password",
    "loginBtn": "Log in",
    "loginBtnLoading": "Logging in...",
    "noAccount": "Don't have an account yet?",
    "registerLink": "Register",
    "registerTitle": "Registration",
    "registerDesc": "Create an account and get a premium box for free",
    "fullName": "Full Name",
    "passwordMin": "Minimum 6 characters.",
    "registerBtn": "Create Account",
    "registerBtnLoading": "Creating account...",
    "hasAccount": "Already have an account?",
    "loginLink": "Log in",
    "registerSuccessError": "Registration successful, but login failed. Try logging in manually.",
    "genericError": "Something went wrong. Please try again."
  }
};

updateTranslations(newCs, newEn);
