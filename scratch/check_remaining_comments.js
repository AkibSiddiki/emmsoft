const fs = require('fs');

['ceo-message.html', 'cto-message.html', 'about.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=== ${f} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('/* ===') || l.includes('HERO') || l.includes('NAVBAR')) {
      console.log(`Line ${i+1}: ${l}`);
    }
  });
});
