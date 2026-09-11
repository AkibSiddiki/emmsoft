const fs = require('fs');
const path = require('path');

const files = ['index.html', 'team.html', 'ceo-message.html', 'cto-message.html'];

let totalErrors = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n=== Checking ${file} ===`);

  // Check CEO & CTO links
  const hasCeoLink = content.includes('ceo-message.html');
  const hasCtoLink = content.includes('cto-message.html');
  const hasTeamLink = content.includes('team.html');
  console.log(`  Links to ceo-message.html: ${hasCeoLink}`);
  console.log(`  Links to cto-message.html: ${hasCtoLink}`);
  console.log(`  Links to team.html: ${hasTeamLink}`);

  // Regex check for href and src attributes
  const hrefRegex = /href="([^"#:]+)(\.html)?"/g;
  const srcRegex = /src="([^"]+)"/g;

  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    let target = match[1] + (match[2] || '');
    if (target.endsWith('.html')) {
      if (!fs.existsSync(target)) {
        console.error(`  [BROKEN HREF] in ${file}: ${target}`);
        totalErrors++;
      }
    }
  }

  while ((match = srcRegex.exec(content)) !== null) {
    let target = match[1];
    if (target.startsWith('assets/')) {
      if (!fs.existsSync(target)) {
        console.error(`  [BROKEN SRC] in ${file}: ${target}`);
        totalErrors++;
      }
    }
  }
});

console.log(`\nTotal Errors Found: ${totalErrors}`);
