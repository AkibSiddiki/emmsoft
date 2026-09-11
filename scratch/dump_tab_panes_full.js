const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const solStart = html.indexOf('id="solutions"');
const specStart = html.indexOf('id="specializations"');
const solSection = html.substring(solStart, specStart);

const tabPanes = [...solSection.matchAll(/<div class="tab-pane[^"]*" id="([^"]+)"[\s\S]*?(?=<div class="tab-pane|$)/g)];
tabPanes.forEach(tp => {
  console.log(`\n================== PANE: ${tp[1]} ==================`);
  console.log(tp[0]);
});
