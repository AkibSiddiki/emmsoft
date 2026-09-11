const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="projects"') || l.includes('Products we have taken to production') || l.includes('The Daily WireDesk')) {
    console.log(i + 1, l.trim());
  }
});
