const fs = require('fs');

const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=== ${f} ===`);
  // Check for nav rules
  const hasNav = content.includes('.nav {');
  const hasNavInner = content.includes('.nav-inner {');
  const hasMegaMenu = content.includes('.mega-menu {');
  const hasNavBurger = content.includes('.nav-burger {');
  const hasMobilePanel = content.includes('.mobile-panel {');
  console.log({ hasNav, hasNavInner, hasMegaMenu, hasNavBurger, hasMobilePanel });
});
