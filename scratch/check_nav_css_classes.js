const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'work.html',
  'team.html',
  'contact.html',
  'ceo-message.html',
  'cto-message.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasMegaGrid = content.includes('.mega-menu-grid');
  const hasMegaCol = content.includes('.mega-menu-col');
  const hasMegaFooter = content.includes('.mega-menu-footer');
  console.log(`${f}: grid=${hasMegaGrid}, col=${hasMegaCol}, footer=${hasMegaFooter}`);
});
