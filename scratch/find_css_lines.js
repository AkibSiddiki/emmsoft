const fs = require('fs');

['index.html', 'team.html', 'ceo-message.html', 'cto-message.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  console.log(`\n=== ${f} ===`);
  lines.forEach((l, i) => {
    if (l.includes('.nav {') || l.includes('.nav-inner') || l.includes('/* NAVBAR') || l.includes('/* ==========================================================================\n       NAVBAR')) {
      console.log(`Line ${i+1}: ${l}`);
    }
  });
});
