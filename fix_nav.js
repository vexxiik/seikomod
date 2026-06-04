const fs = require('fs');
const path = require('path');

function fixNav() {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  if (csData.Navigation) csData.Navigation.about = "O nás";
  if (enData.Navigation) enData.Navigation.about = "About Us";

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('Navigation translation fixed.');
}

fixNav();
