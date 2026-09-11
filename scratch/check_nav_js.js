const fs = require('fs');

const files = ['contact.html', 'index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasBurger = content.includes('burgerBtn') && content.includes('mobilePanel');
  const hasScroll = content.includes('siteNav') && content.includes('is-scrolled');
  console.log(`${f}: hasBurger=${hasBurger}, hasScroll=${hasScroll}`);
});
