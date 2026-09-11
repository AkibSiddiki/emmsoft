const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const specStart = html.indexOf('id="specializations"');
const card2Start = html.indexOf('E-Commerce Solutions', specStart);
console.log(html.substring(card2Start, card2Start + 500));
