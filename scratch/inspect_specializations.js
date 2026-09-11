const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const specStart = html.indexOf('id="specializations"');
const specEnd = html.indexOf('id="tech-stack"');
console.log(html.substring(specStart, specEnd !== -1 ? specEnd : specStart + 10000));
