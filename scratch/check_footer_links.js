const fs = require('fs');

const files = ['index.html', 'about.html', 'work.html', 'team.html', 'contact.html', 'ceo-message.html', 'cto-message.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const coreSolIdx = content.indexOf('<h4>Core Solutions</h4>');
  if (coreSolIdx !== -1) {
    const ulStart = content.indexOf('<ul>', coreSolIdx);
    const ulEnd = content.indexOf('</ul>', ulStart) + 5;
    console.log(`=== ${f} ===`);
    console.log(content.substring(coreSolIdx, ulEnd));
  } else {
    console.log(`=== ${f} === Core Solutions NOT found in footer`);
  }
});
