const fs = require('fs');
const path = require('path');
const c = fs.readFileSync('work.html', 'utf8');
const imgMatches = [...c.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);

console.log('Total img src in work.html:', imgMatches.length);
imgMatches.forEach(src => {
  if (src.startsWith('http') || src.startsWith('data:')) {
    console.log('External/Data:', src.slice(0, 30));
  } else {
    const exists = fs.existsSync(src);
    console.log(`${exists ? 'OK' : 'MISSING'}: ${src}`);
  }
});
