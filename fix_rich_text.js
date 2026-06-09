const fs = require('fs');

const csFile = './messages/cs.json';
const enFile = './messages/en.json';

const csData = JSON.parse(fs.readFileSync(csFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Fix rich text format (requires tags like <terms>...</terms> not {terms})
csData.Cart.agreeTerms = "Souhlasím s <terms>obchodními podmínkami</terms> a beru na vědomí <privacy>zásady zpracování osobních údajů</privacy>.";
// Remove the now-unneeded separate link texts as they are embedded in the chunks
// (though it doesn't hurt to keep them)

enData.Cart.agreeTerms = "I agree to the <terms>Terms and Conditions</terms> and acknowledge the <privacy>Privacy Policy</privacy>.";

fs.writeFileSync(csFile, JSON.stringify(csData, null, 2), 'utf8');
fs.writeFileSync(enFile, JSON.stringify(enData, null, 2), 'utf8');

console.log("Rich text format fixed!");
