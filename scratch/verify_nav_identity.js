const fs = require('fs');

const files = [
  'contact.html',
  'index.html',
  'about.html',
  'team.html',
  'ceo-message.html',
  'cto-message.html',
  'work.html'
];

function extractNav(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const start = content.indexOf('<nav class="nav" id="siteNav">');
  const end = content.indexOf('</nav>') + 6;
  if (start === -1 || end === -1) {
    throw new Error(`Nav not found in ${filename}`);
  }
  return content.slice(start, end);
}

const baseline = extractNav(files[0]);
let allMatch = true;

files.forEach(f => {
  const nav = extractNav(f);
  if (nav === baseline) {
    console.log(`[NAV HTML MATCH] ${f} is 100% IDENTICAL to ${files[0]}`);
  } else {
    console.log(`[NAV HTML MISMATCH] ${f} differs from ${files[0]}`);
    allMatch = false;
  }
});

console.log('All nav HTML identical:', allMatch);
