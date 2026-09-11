const fs = require('fs');

const contactHtml = fs.readFileSync('contact.html', 'utf8');
const navStart = contactHtml.indexOf('<nav class="nav" id="siteNav">');
const navEnd = contactHtml.indexOf('</nav>') + 6;
const exactNav = contactHtml.slice(navStart, navEnd);

let workHtml = fs.readFileSync('work.html', 'utf8');
const workNavStart = workHtml.indexOf('<nav class="nav" id="siteNav">');
const workNavEnd = workHtml.indexOf('</nav>') + 6;

workHtml = workHtml.slice(0, workNavStart) + exactNav + workHtml.slice(workNavEnd);
fs.writeFileSync('work.html', workHtml, 'utf8');

console.log('Nav synchronized into work.html');
