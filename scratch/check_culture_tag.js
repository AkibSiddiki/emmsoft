const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');

const target = 'A Deep-Work Sanctuary for Software Craftsmanship';
const idx = html.indexOf(target);
console.log(html.substring(idx - 300, idx + 100));
