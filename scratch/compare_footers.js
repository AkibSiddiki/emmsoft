const fs = require('fs');
const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

function getFooter(content) {
  const start = content.indexOf('<footer');
  const end = content.indexOf('</footer>', start) + 9;
  return content.substring(start, end);
}

console.log('=== FOOTER IN SOLUTION PAGE ===');
console.log(getFooter(solHtml));

console.log('\n=== FOOTER IN INDEX PAGE ===');
console.log(getFooter(indexHtml));
