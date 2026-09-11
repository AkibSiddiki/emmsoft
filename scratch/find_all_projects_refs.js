const fs = require('fs');
const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html', 'work.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // find all lines mentioning #projects or projects
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('#projects') || (l.includes('projects') && l.includes('href'))) {
      console.log(`${f}:${i+1}: ${l.trim()}`);
    }
  });
});
