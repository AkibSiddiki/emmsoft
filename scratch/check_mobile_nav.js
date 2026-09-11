const fs = require('fs');
const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html', 'work.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('mobile-nav') || (l.includes('class="mobile') && l.includes('link'))) {
      console.log(`${f}:${i+1}: ${l.trim()}`);
    }
  });
});
