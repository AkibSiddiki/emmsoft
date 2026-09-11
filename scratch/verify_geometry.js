const fs = require('fs');

const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasRelativeNavInner = content.includes('.nav-inner {') && content.includes('position: relative;');
  const hasStaticDropdown = content.includes('.nav-item-dropdown {') && content.includes('position: static;');
  const hasCenteredMega = content.includes('.mega-menu {') && content.includes('transform: translateX(-50%)');
  console.log(`${f} -> navInner: ${hasRelativeNavInner}, dropdown: ${hasStaticDropdown}, centered: ${hasCenteredMega}`);
});
