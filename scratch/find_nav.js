const fs = require('fs');
const html = fs.readFileSync('contact.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('<nav') || line.includes('siteNav') || line.includes('class="nav"') || line.includes('</nav>')) {
    console.log(i + 1, line);
  }
});
