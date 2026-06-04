const fs = require('fs');
const path = require('path');

function updateTranslations() {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // CS Cart
  csData.Cart.shippingCalcNextStep = "Vypočteno v dalším kroku";
  csData.Cart.paymentMethod = "Způsob platby";
  csData.Cart.paymentOnline = "Platba online (Karta, Apple Pay)";
  csData.Cart.paymentOnlineDesc = "Rychlá a bezpečná platba přes Stripe.";
  csData.Cart.paymentCOD = "Dobírka";
  csData.Cart.paymentCODDesc = "Platba při převzetí u kurýra nebo na výdejním místě.";
  csData.Cart.paymentFee = "Poplatek za platbu";

  // EN Cart
  enData.Cart.shippingCalcNextStep = "Calculated in next step";
  enData.Cart.paymentMethod = "Payment Method";
  enData.Cart.paymentOnline = "Online Payment (Card, Apple Pay)";
  enData.Cart.paymentOnlineDesc = "Fast and secure payment via Stripe.";
  enData.Cart.paymentCOD = "Cash on Delivery";
  enData.Cart.paymentCODDesc = "Payment upon receipt at the courier or pick-up point.";
  enData.Cart.paymentFee = "Payment Fee";

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('COD translations added.');
}

updateTranslations();
