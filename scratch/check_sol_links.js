const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const solStart = html.indexOf('id="solutions"');
const specStart = html.indexOf('id="specializations"');
const specEnd = html.indexOf('id="tech-stack"');

console.log('=== SOLUTIONS SECTION ===');
const solChunk = html.substring(solStart, specStart);
// Look for buttons or links in each tab pane
const tabPanes = [...solChunk.matchAll(/<div class="tab-pane[^"]*" id="([^"]+)"[\s\S]*?(?=<div class="tab-pane|$)/g)];
tabPanes.forEach(tp => {
  console.log(`\nTab Pane ID: ${tp[1]}`);
  const links = [...tp[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));
  console.log('Links:', links);
});

console.log('\n=== SPECIALIZATIONS SECTION ===');
const specChunk = html.substring(specStart, specEnd !== -1 ? specEnd : specStart + 15000);
const specCards = [...specChunk.matchAll(/<div class="solution-card"[\s\S]*?(?=<div class="solution-card"|<\/div>\s*<\/section>)/g)];
console.log('Total spec cards found:', specCards.length);
specCards.forEach((sc, i) => {
  const h3 = sc[0].match(/<h3>([\s\S]*?)<\/h3>/);
  const links = [...sc[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));
  console.log(`Card ${i + 1}: ${h3 ? h3[1].trim() : 'Unknown'}`, links);
});
