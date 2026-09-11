const fs = require('fs');
const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html', 'work.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const matches1 = [...c.matchAll(/href=["'][^"']*projects[^"']*["']/g)].map(m => m[0]);
    const matches2 = [...c.matchAll(/href=["'][^"']*work\.html[^"']*["']/g)].map(m => m[0]);
    console.log(f, '-> projects refs:', matches1, '-> work refs:', matches2.length);
  }
});
