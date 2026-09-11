const fs = require('fs');

const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

function getMegaMenu(content) {
  const start = content.indexOf('<div class="mega-menu"');
  const end = content.indexOf('<!-- Column 2', start) + 1500;
  return content.substring(start, start + 3000);
}

console.log('=== FROM solution-newsroom-cms.html ===');
console.log(getMegaMenu(solHtml).substring(0, 1500));

console.log('\n=== FROM index.html ===');
console.log(getMegaMenu(indexHtml).substring(0, 1500));
