const fs = require('fs');

const files = ['contact.html', 'index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Find navbar CSS section
  const cssMatch = content.match(/\/\* =+[\r\n\s]+NAVBAR[\s\S]*?\/\* =+/i);
  console.log(`=== ${f} ===`);
  if (cssMatch) {
    console.log('Navbar CSS length:', cssMatch[0].length);
  } else {
    console.log('Navbar CSS section NOT found by regex');
  }
});
