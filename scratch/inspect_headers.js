const fs = require('fs');

const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const navMatch = content.match(/<nav[\s\S]*?<\/nav>/);
  console.log(`=== ${f} ===`);
  console.log('Nav found:', !!navMatch);
  if (navMatch) {
    console.log('Nav length:', navMatch[0].length);
  }
});
