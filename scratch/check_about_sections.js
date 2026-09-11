const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');

console.log('culture mentions:');
const matches = [...html.matchAll(/(culture|studio|engineering-ethos|values)/gi)].map(m => m[0]);
console.log(matches.slice(0, 10));

const secMatches = [...html.matchAll(/<section[^>]*id="([^"]+)"/gi)].map(m => m[1]);
console.log('Sections in about.html:', secMatches);
