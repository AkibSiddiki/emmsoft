const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const pillIdx = html.indexOf('.stack-pills');
console.log(html.substring(pillIdx, pillIdx + 800));
