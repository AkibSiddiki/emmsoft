const fs = require('fs');
const lines = fs.readFileSync('contact.html', 'utf8').split(/\r?\n/);
lines.forEach((line, idx) => {
  if (line.includes('data-interest')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
