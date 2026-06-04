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
  "About": {
    "badge": "Naše Filozofie",
    "title1": "Umění",
    "title2": "stavby.",
    "subtitle": "V Vexx Watch Atelier nevěříme na kompromisy. Neskládáme z hotových modelů – každé hodinky stavíme zcela od nuly z těch nejlepších dostupných prémiových dílů.",
    "m1": "Prémiové materiály",
    "d1": "Používáme výhradně safírová sklíčka s antireflexní úpravou, keramické lunety a pouzdra z nerezové oceli 316L, která jsou ručně kartáčována a leštěna.",
    "m2": "Ruční montáž",
    "d2": "Každý kus je sestavován ručně s maximální pečlivostí v bezprašném prostředí. Věnujeme desítky hodin tomu, aby byl každý detail dokonalý.",
    "m3": "Kalibry Seiko",
    "d3": "Srdcem našich staveb jsou osvědčené automatické strojky Seiko (např. NH35, NH34 GMT), které individuálně regulujeme pro maximální přesnost.",
    "m4": "Záruka kvality",
    "d4": "Před odesláním prochází všechny hodinky tlakovou zkouškou vodotěsnosti a důkladnou vizuální kontrolou. Za svou práci absolutně ručíme."
  },
  "Cart": {
    "loading": "Načítám košík...",
    "titleCart": "Váš košík",
    "titleCheckout": "Dokončení objednávky",
    "emptyCart": "Váš košík je zatím prázdný.",
    "inStock": "Skladem",
    "deliveryData": "Doručovací údaje",
    "deliveryMethod": "Způsob doručení",
    "packetaTitle": "Zásilkovna - Výdejní místo",
    "noBranchSelected": "Zatím nebylo vybráno výdejní místo",
    "changeBranch": "Změnit pobočku",
    "selectBranch": "Vybrat pobočku",
    "packetaRequired": "Doručení přes Zásilkovnu je povinné.",
    "firstName": "Jméno",
    "lastName": "Příjmení",
    "email": "E-mail",
    "address": "Ulice a číslo popisné",
    "city": "Město",
    "zip": "PSČ",
    "summary": "Shrnutí objednávky",
    "subtotal": "Mezisoučet",
    "shippingPacketa": "Doprava (Zásilkovna)",
    "premiumBox": "Prémiová krabička",
    "free": "Zdarma",
    "boxInfo": "Pro přihlášené zákazníky je krabička zdarma.",
    "login": "Přihlaste se",
    "discountCode": "Slevový kód",
    "enterCode": "ZADEJTE KÓD...",
    "cancel": "Zrušit",
    "apply": "Použít",
    "applying": "...",
    "total": "Celkem",
    "safeShopping": "Bezpečný nákup se 14denní zárukou vrácení peněz",
    "continueToCheckout": "Pokračovat k pokladně",
    "processing": "Zpracovávám...",
    "finishAndPay": "Dokončit a zaplatit",
    "backToCart": "Zpět do košíku",
    "errSelectBranch": "Vyberte prosím výdejní místo Zásilkovny.",
    "errLoadWidget": "Widget Zásilkovny se nepodařilo načíst. Zkuste to prosím znovu.",
    "errVerify": "Chyba při ověřování",
    "errGeneric": "Něco se pokazilo. Zkuste to prosím znovu.",
    "discountApplied": "Aplikována sleva"
  }
};

const newEn = {
  "About": {
    "badge": "Our Philosophy",
    "title1": "The art of",
    "title2": "crafting.",
    "subtitle": "At Vexx Watch Atelier, we don't believe in compromises. We don't assemble from ready-made models – we build every watch entirely from scratch using the best available premium parts.",
    "m1": "Premium Materials",
    "d1": "We exclusively use sapphire crystals with anti-reflective coating, ceramic bezels, and 316L stainless steel cases, which are hand-brushed and polished.",
    "m2": "Hand Assembly",
    "d2": "Every piece is assembled by hand with maximum care in a dust-free environment. We spend dozens of hours to make sure every detail is perfect.",
    "m3": "Seiko Calibers",
    "d3": "The heart of our builds are proven automatic Seiko movements (e.g., NH35, NH34 GMT), which we individually regulate for maximum accuracy.",
    "m4": "Quality Guarantee",
    "d4": "Before shipping, all watches undergo a pressure test for water resistance and a thorough visual inspection. We absolutely stand by our work."
  },
  "Cart": {
    "loading": "Loading cart...",
    "titleCart": "Your Cart",
    "titleCheckout": "Checkout",
    "emptyCart": "Your cart is currently empty.",
    "inStock": "In Stock",
    "deliveryData": "Delivery Details",
    "deliveryMethod": "Delivery Method",
    "packetaTitle": "Packeta - Pick-up Point",
    "noBranchSelected": "No pick-up point selected yet",
    "changeBranch": "Change branch",
    "selectBranch": "Select branch",
    "packetaRequired": "Delivery via Packeta is required.",
    "firstName": "First Name",
    "lastName": "Last Name",
    "email": "E-mail",
    "address": "Street and House Number",
    "city": "City",
    "zip": "ZIP Code",
    "summary": "Order Summary",
    "subtotal": "Subtotal",
    "shippingPacketa": "Shipping (Packeta)",
    "premiumBox": "Premium Box",
    "free": "Free",
    "boxInfo": "The box is free for logged-in customers.",
    "login": "Log in",
    "discountCode": "Discount Code",
    "enterCode": "ENTER CODE...",
    "cancel": "Cancel",
    "apply": "Apply",
    "applying": "...",
    "total": "Total",
    "safeShopping": "Safe shopping with a 14-day money-back guarantee",
    "continueToCheckout": "Continue to Checkout",
    "processing": "Processing...",
    "finishAndPay": "Complete and Pay",
    "backToCart": "Back to Cart",
    "errSelectBranch": "Please select a Packeta pick-up point.",
    "errLoadWidget": "Packeta widget failed to load. Please try again.",
    "errVerify": "Verification error",
    "errGeneric": "Something went wrong. Please try again.",
    "discountApplied": "Discount applied"
  }
};

updateTranslations(newCs, newEn);
