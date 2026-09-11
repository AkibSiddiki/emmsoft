const fs = require('fs');
const nav = fs.readFileSync('scratch/template_nav.html', 'utf8');

// Check the top-level links
const topLevelLinks = [...nav.matchAll(/<a href="([^"]+)" class="nav-link([^"]*)"/g)].map(m => ({ href: m[1], active: m[2].includes('is-active') }));
console.log('Top level links in template nav:', topLevelLinks);

// Check mobile links
const mobileStart = nav.indexOf('<div class="mobile-panel"');
console.log('\nMobile panel:');
console.log(nav.substring(mobileStart, mobileStart + 800));
