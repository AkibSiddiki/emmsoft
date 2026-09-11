const fs = require('fs');
const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');

const navStart = solHtml.indexOf('<nav class="navbar"');
const navEnd = solHtml.indexOf('</nav>') + 6;
console.log('=== SOLUTION NAVBAR ===');
console.log(solHtml.substring(navStart, Math.min(navStart + 3500, navEnd)));

const drawerStart = solHtml.indexOf('<div class="mobile-drawer"');
const drawerEnd = solHtml.indexOf('</div>', drawerStart + 500);
console.log('\n=== MOBILE DRAWER START ===');
console.log(solHtml.substring(drawerStart, drawerStart + 1500));
