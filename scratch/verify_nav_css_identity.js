const fs = require('fs');

const files = ['contact.html', 'index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'work.html'];

const csss = {};
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match the standard navbar CSS block
  const match = content.match(/\/\* =+[\r\n\s]+NAVBAR \(Synchronized System\)[\s\S]*?\.nav-burger\s*\{\s*display:\s*flex;\s*\}\s*\}/);
  if (!match) {
    console.error(`Nav CSS not found in ${f}`);
  } else {
    csss[f] = match[0].replace(/\r\n/g, '\n').trim();
  }
});

const baseCss = csss['contact.html'];
let allIdentical = true;

files.forEach(f => {
  if (csss[f] && csss[f] === baseCss) {
    console.log(`[NAV CSS MATCH] ${f} is 100% IDENTICAL to contact.html (${csss[f].length} chars)`);
  } else {
    allIdentical = false;
    console.error(`[NAV CSS MISMATCH] ${f} differs from contact.html! (Length: ${csss[f]?.length} vs ${baseCss?.length})`);
  }
});

console.log('All nav CSS identical:', allIdentical);
