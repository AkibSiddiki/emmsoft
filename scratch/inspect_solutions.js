const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find solutions section
const solStart = html.indexOf('id="solutions"');
const solEnd = html.indexOf('id="specializations"');
const solutionsHtml = html.substring(solStart, solEnd);

// Extract each tab pane
const tabMatches = [...solutionsHtml.matchAll(/<div class="tab-pane[^"]*" id="([^"]+)"[\s\S]*?(?=<div class="tab-pane|$)/g)];

console.log('Found tab panes:', tabMatches.length);
tabMatches.forEach((match, idx) => {
  const id = match[1];
  const paneText = match[0];
  const titleMatch = paneText.match(/<h3>([\s\S]*?)<\/h3>/);
  const badgeMatch = paneText.match(/<span class="pane-badge">([\s\S]*?)<\/span>/);
  console.log(`\n=== TAB ${idx + 1}: ${id} ===`);
  console.log('Badge:', badgeMatch ? badgeMatch[1].trim() : 'N/A');
  console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
  
  // Extract features / architecture highlights / metrics
  const listItems = [...paneText.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Features:', listItems.slice(0, 4));
});

// Also check specializations grid-6
const specStart = html.indexOf('id="specializations"');
const specEnd = html.indexOf('id="tech-stack"');
const specHtml = html.substring(specStart, specEnd);
const cardMatches = [...specHtml.matchAll(/<div class="solution-card"[\s\S]*?<\/div>\s*(?=<div class="solution-card"|<\/div>\s*<\/div>)/g)];
console.log('\n--- Specialization Cards in grid-6:', cardMatches.length);
cardMatches.forEach((match, idx) => {
  const h3 = match[0].match(/<h3>([\s\S]*?)<\/h3>/);
  console.log(`Card ${idx + 1}:`, h3 ? h3[1].trim() : 'N/A');
});
