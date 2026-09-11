const fs = require('fs');

['index.html', 'team.html', 'ceo-message.html', 'cto-message.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('.nav-burger') || line.includes('.mobile-panel')) {
      console.log(`${f} [${i+1}]: ${line.trim()}`);
    }
  });
});
