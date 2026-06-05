const fs = require('fs');

const csFile = './messages/cs.json';
const enFile = './messages/en.json';

const csData = JSON.parse(fs.readFileSync(csFile, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

const faqEn = {
  "title": "Frequently Asked Questions",
  "faq1Title": "Shipping & Returns",
  "faq1Content": "Free Express Shipping on all orders. We offer a 14-day return policy on all orders. To initiate a return, please contact our customer service team at info@vexxwatch.cz.",
  "faq2Title": "Can I service any of your watches locally?",
  "faq2Content": "Absolutely. We use world-respected Seiko movements from Japan. Since these are a gold standard in the watch world, they are easy to service. Any local watch shop can help you out, so you never have to worry about finding a pro to keep it running like clockwork.",
  "faq3Title": "Are your watches fakes and will they feel cheap in hand?",
  "faq3Content": "Those famous designs belong to everyone. Big brands just keep them \"off-limits\" so they can charge you 10x more for a name. We use the exact same \"legendary\" materials - 904L steel, sapphire glass, and rock-solid automatic motors. When you hold it, you'll feel the weight of a real watch, not a \"cheap\" toy. These aren't fakes. They are custom builds for people who want an iconic watch at an affordable price."
};

const faqCs = {
  "title": "Často kladené dotazy",
  "faq1Title": "Doprava a vrácení",
  "faq1Content": "Doprava zdarma na všechny objednávky. Nabízíme 14denní lhůtu na vrácení. Pro zahájení vrácení prosím kontaktujte naši zákaznickou podporu na info@vexxwatch.cz.",
  "faq2Title": "Může mi hodinky servisovat jakýkoliv hodinář?",
  "faq2Content": "Rozhodně. Používáme celosvětově uznávané strojky Seiko z Japonska. Jelikož jsou zlatým standardem ve světě hodinek, velmi snadno se servisují. Kterékoliv místní hodinářství vám dokáže pomoci, takže se nikdy nemusíte bát, že nenajdete profesionála, který je udrží v chodu.",
  "faq3Title": "Jsou to jen levné napodobeniny?",
  "faq3Content": "Tyto slavné designy patří všem. Velké značky je drží \"mimo dosah\", jen aby si mohly za jméno účtovat desetkrát víc. My používáme naprosto stejné \"legendární\" materiály – chirurgickou ocel (316L/904L), safírová sklíčka a spolehlivé automatické strojky. Když je držíte v ruce, cítíte váhu skutečných hodinek, ne \"levné\" hračky. Toto nejsou padělky. Jsou to zakázkové stavby (custom builds) pro lidi, kteří chtějí ikonické hodinky za dostupnou cenu."
};

enData.ProductFaq = faqEn;
csData.ProductFaq = faqCs;

fs.writeFileSync(enFile, JSON.stringify(enData, null, 2));
fs.writeFileSync(csFile, JSON.stringify(csData, null, 2));

console.log("Translations updated");
