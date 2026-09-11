const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function showContext(str, radius = 200) {
  let idx = 0;
  while ((idx = html.indexOf(str, idx)) !== -1) {
    const start = Math.max(0, idx - 50);
    const end = Math.min(html.length, idx + radius);
    console.log('--- FOUND AT ' + idx + ' ---');
    console.log(html.substring(start, end));
    idx += str.length;
  }
}

console.log('=== ID="SOLUTIONS" ===');
showContext('id="solutions"');

console.log('=== ID="SPECIALIZATIONS" ===');
showContext('id="specializations"');
