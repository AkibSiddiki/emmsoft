const fs = require('fs');
const solHtml = fs.readFileSync('solution-newsroom-cms.html', 'utf8');
const mobileStart = solHtml.indexOf('<div class="mobile-panel"');
const mobileEnd = solHtml.indexOf('</nav>', mobileStart);
console.log(solHtml.substring(mobileStart, mobileEnd));
