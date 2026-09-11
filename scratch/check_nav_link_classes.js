const fs = require('fs');
const files = ['contact.html', 'index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'work.html'];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const matches = [...c.matchAll(/class="(nav-link[^"]*)"/g)].map(m => m[1]);
  console.log(f, matches);
});
