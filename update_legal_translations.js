const fs = require('fs');

const csFile = './messages/cs.json';
const enFile = './messages/en.json';

const csData = JSON.parse(fs.readFileSync(csFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Add Terms and Privacy to cs.json
csData.Terms = {
  "title": "Obchodní podmínky (VOP)",
  "content": "Zde budou vloženy kompletní obchodní podmínky pro prodej zboží na dálku. Provozovatel: Jakub Sokol, Sportovní 158, Staré Hradiště 533 52."
};

csData.Privacy = {
  "title": "Ochrana osobních údajů (GDPR)",
  "content": "Zde budou vloženy zásady zpracování osobních údajů v souladu s nařízením GDPR. Správcem údajů je Jakub Sokol, Sportovní 158, Staré Hradiště 533 52."
};

csData.Cart.agreeTerms = "Souhlasím s {terms} a beru na vědomí {privacy}.";
csData.Cart.termsLink = "obchodními podmínkami";
csData.Cart.privacyLink = "zásady zpracování osobních údajů";
csData.Cart.errTerms = "Pro dokončení objednávky musíte souhlasit s obchodními podmínkami.";

// Add Terms and Privacy to en.json
enData.Terms = {
  "title": "Terms and Conditions",
  "content": "Terms and conditions for remote sales. Operator: Jakub Sokol, Sportovní 158, Staré Hradiště 533 52, Czech Republic."
};

enData.Privacy = {
  "title": "Privacy Policy (GDPR)",
  "content": "Privacy policy in accordance with GDPR. Data controller: Jakub Sokol, Sportovní 158, Staré Hradiště 533 52, Czech Republic."
};

enData.Cart.agreeTerms = "I agree to the {terms} and acknowledge the {privacy}.";
enData.Cart.termsLink = "Terms and Conditions";
enData.Cart.privacyLink = "Privacy Policy";
enData.Cart.errTerms = "You must agree to the Terms and Conditions to complete the order.";

fs.writeFileSync(csFile, JSON.stringify(csData, null, 2), 'utf8');
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');

console.log("Translations updated");
