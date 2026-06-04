const fs = require('fs');
const path = require('path');

function updateTranslations() {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // CS
  csData.CheckoutSuccess.codTitle = "Objednávka přijata!";
  csData.CheckoutSuccess.codDesc = "Děkujeme za váš nákup. Objednávka na dobírku byla úspěšně zaznamenána. Naši hodináři se brzy pustí do přípravy a balíček zaplatíte až při převzetí.";

  // EN
  enData.CheckoutSuccess.codTitle = "Order Received!";
  enData.CheckoutSuccess.codDesc = "Thank you for your purchase. Your Cash on Delivery order has been successfully recorded. Our watchmakers will soon start preparing it and you will pay upon receipt.";

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('COD success translations added.');
}

updateTranslations();
