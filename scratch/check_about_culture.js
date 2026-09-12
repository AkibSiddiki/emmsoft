const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');

const cultureIdx = html.indexOf('office.png');
if (cultureIdx !== -1) {
  console.log('office.png context:');
  console.log(html.substring(cultureIdx - 200, cultureIdx + 200));
}

const headingMatches = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in about.html:', headingMatches);
