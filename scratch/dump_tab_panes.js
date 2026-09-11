const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const paneRegex = /<div class="tab-pane[^"]*" id="([^"]+)"[\s\S]*?(?=<div class="tab-pane|<div class="container" id="tab-controls"|<\/section>)/g;
let m;
while ((m = paneRegex.exec(html)) !== null) {
  console.log('====================================');
  console.log('PANE ID:', m[1]);
  console.log(m[0].substring(0, 800));
  console.log('... [total length:', m[0].length, 'chars]');
}
