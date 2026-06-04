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
  "CheckoutSuccess": {
    "paid": "Objednávka zaplacena!",
    "processing": "Zpracováváme platbu...",
    "failed": "Platba se nezdařila",
    "paidDesc": "Děkujeme za váš nákup. Na váš e-mail jsme zaslali potvrzení objednávky. Naši hodináři se brzy pustí do přípravy vašeho unikátního kousku.",
    "processingDesc": "Čekáme na potvrzení platby od banky. Odeslání e-mailu proběhne jakmile platbu úspěšně zaevidujeme.",
    "failedDesc": "Vaše platba byla bohužel zrušena nebo vypršel časový limit. Můžete to zkusit znovu nebo nás kontaktovat.",
    "continue": "Pokračovat v nákupu",
    "backHome": "Zpět na hlavní stranu"
  },
  "Configurator": {
    "loading": "Načítám...",
    "title": "Sestavte si vlastní hodinky",
    "step": "Krok",
    "included": "V ceně",
    "totalPrice": "Celková cena",
    "addToCart": "Do košíku"
  }
};

const newEn = {
  "CheckoutSuccess": {
    "paid": "Order paid successfully!",
    "processing": "Processing payment...",
    "failed": "Payment failed",
    "paidDesc": "Thank you for your purchase. We have sent an order confirmation to your e-mail. Our watchmakers will soon start preparing your unique piece.",
    "processingDesc": "We are waiting for payment confirmation from the bank. The e-mail will be sent as soon as we successfully record the payment.",
    "failedDesc": "Unfortunately, your payment was cancelled or timed out. You can try again or contact us.",
    "continue": "Continue shopping",
    "backHome": "Back to Home"
  },
  "Configurator": {
    "loading": "Loading...",
    "title": "Build your own watch",
    "step": "Step",
    "included": "Included",
    "totalPrice": "Total price",
    "addToCart": "Add to cart"
  }
};

updateTranslations(newCs, newEn);
