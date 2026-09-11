const fs = require('fs');

const files = ['index.html', 'about.html', 'work.html', 'team.html', 'contact.html', 'ceo-message.html', 'cto-message.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const navStart = content.indexOf('<nav class="nav"');
  const navEnd = content.indexOf('</nav>', navStart);
  if (navStart === -1 || navEnd === -1) {
    console.log(`[!] ${f}: nav not found or different tag`);
    return;
  }
  const navHtml = content.substring(navStart, navEnd + 6);
  // Check links inside mega menu
  const links = [...navHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  const solLinks = links.filter(l => l.includes('solution') || l.includes('tab-') || l.includes('#solutions'));
  console.log(`=== ${f} === (nav length: ${navHtml.length})`);
  console.log('Solution-related links in nav:', [...new Set(solLinks)]);
});
