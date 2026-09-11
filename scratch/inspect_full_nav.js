const fs = require('fs');
const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');

const navStart = solHtml.indexOf('<nav class="nav" id="siteNav">');
const navEnd = solHtml.indexOf('</nav>', navStart) + 6;
console.log('Nav length:', navEnd - navStart);

// Mobile panel
const mobileStart = solHtml.indexOf('<div class="mobile-panel"');
const mobileEnd = solHtml.indexOf('</div>', solHtml.indexOf('Schedule Consultation', mobileStart)) + 6;
console.log('Mobile panel length:', mobileEnd - mobileStart);

console.log('\n--- MOBILE PANEL CONTENT ---');
console.log(solHtml.substring(mobileStart, mobileEnd));
