const fs = require('fs');
const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');
const navStart = solHtml.indexOf('<nav');
const navEnd = solHtml.indexOf('</nav>') + 6;
console.log('Nav tag attributes:', solHtml.substring(navStart, solHtml.indexOf('>', navStart) + 1));
console.log('Nav inner HTML (first 1000 chars):');
console.log(solHtml.substring(navStart, navStart + 1000));

// Also find mobile drawer/menu
const menuIdx = solHtml.indexOf('mobile');
console.log('\nMobile index:', menuIdx);
if (menuIdx !== -1) {
  console.log(solHtml.substring(menuIdx - 50, menuIdx + 500));
}
