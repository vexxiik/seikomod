const fs = require('fs');
const path = require('path');

function updateTranslations() {
  const csPath = path.join(__dirname, 'messages', 'cs.json');
  const enPath = path.join(__dirname, 'messages', 'en.json');

  const csData = JSON.parse(fs.readFileSync(csPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // CS
  if (!csData.Auth.login) csData.Auth.login = "Přihlášení";
  if (!csData.Auth.register) csData.Auth.register = "Registrace";
  if (!csData.Auth.myAccount) csData.Auth.myAccount = "Můj účet";
  if (!csData.Auth.adminPanel) csData.Auth.adminPanel = "Administrace";
  if (!csData.Auth.logout) csData.Auth.logout = "Odhlásit se";

  // EN
  if (!enData.Auth.login) enData.Auth.login = "Login";
  if (!enData.Auth.register) enData.Auth.register = "Register";
  if (!enData.Auth.myAccount) enData.Auth.myAccount = "My Account";
  if (!enData.Auth.adminPanel) enData.Auth.adminPanel = "Admin Panel";
  if (!enData.Auth.logout) enData.Auth.logout = "Logout";

  fs.writeFileSync(csPath, JSON.stringify(csData, null, 2));
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log('Missing Auth translations added.');
}

updateTranslations();
