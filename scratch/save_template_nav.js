const fs = require('fs');
const html = fs.readFileSync('solution-newsroom-cms.html', 'utf8');

const navStart = html.indexOf('<nav class="nav" id="siteNav">');
const navEnd = html.indexOf('</nav>', navStart) + 6;
console.log('Nav HTML length:', navEnd - navStart);
fs.writeFileSync('scratch/template_nav.html', html.substring(navStart, navEnd), 'utf8');
console.log('Saved scratch/template_nav.html');
