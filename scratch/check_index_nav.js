const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const navStart = html.indexOf('<nav class="nav" id="siteNav">');
const navEnd = html.indexOf('</nav>', navStart) + 6;
const navHtml = html.substring(navStart, navEnd);

console.log('index.html nav length:', navHtml.length);
console.log('Contains solution-newsroom-cms.html:', navHtml.includes('solution-newsroom-cms.html'));
console.log('Contains solution-ecommerce.html:', navHtml.includes('solution-ecommerce.html'));
console.log('Contains solution-cloud-devops.html:', navHtml.includes('solution-cloud-devops.html'));
