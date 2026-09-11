const { execSync } = require('child_process');
const fs = require('fs');

const origFiles = {
  'about.html': execSync('git show HEAD:about.html').toString(),
  'team.html': execSync('git show HEAD:team.html').toString(),
  'ceo-message.html': execSync('git show HEAD:ceo-message.html').toString(),
  'cto-message.html': execSync('git show HEAD:cto-message.html').toString(),
  'contact.html': execSync('git show HEAD:contact.html').toString(),
  'work.html': fs.readFileSync('scratch/original_work.html', 'utf8')
};

for (const [name, content] of Object.entries(origFiles)) {
  const sTag = content.indexOf('<style>');
  const eTag = content.indexOf('</style>');
  const styleText = content.slice(sTag, eTag);
  
  // Find where page-specific styles start
  // In each file, let's see where the navbar styles were
  console.log(`\n=== ${name} (Total style length: ${styleText.length}) ===`);
  const lines = styleText.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('/* ==========================================================================')) {
      console.log(`Line ${i}: ${lines[i+1]?.trim()}`);
    }
  });
}
