const fs = require('fs');

['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let navStart = -1;
  let navEnd = -1;
  lines.forEach((line, i) => {
    if (line.includes('.nav {') && navStart === -1) {
      navStart = i;
    }
    if (navStart !== -1 && line.includes('@media (max-width: 900px)') && navEnd === -1) {
      // Find closing bracket
      for (let j = i; j < i + 10; j++) {
        if (lines[j] && lines[j].includes('nav-burger { display: flex; }')) {
          navEnd = j + 1;
          break;
        }
      }
    }
  });
  console.log(`${f}: navStart=${navStart + 1}, navEnd=${navEnd + 1}`);
});
