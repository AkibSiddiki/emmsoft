const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('id="tab-newsroom"');
const end = html.indexOf('id="tab-ecommerce"');
console.log(html.substring(start, end));
