const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const lines = indexHtml.split('\n');

console.log('--- Lines 4790-4840 ---');
for (let i = 4785; i < 4845; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

console.log('--- Lines 5050-5080 ---');
for (let i = 5045; i < 5080; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
