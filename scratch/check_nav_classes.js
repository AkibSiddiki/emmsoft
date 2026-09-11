const fs = require('fs');
const files = ['index.html', 'work.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html'];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/<nav class="nav" id="siteNav">[\s\r\n]*<div class="([^"]*)">/);
  console.log(f, '->', m ? m[1] : 'not found');
});
