const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<a[^>]+href=["'][^"']*solution[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  console.log(`=== File: ${file} ===`);
  while ((match = regex.exec(content)) !== null) {
    console.log(`  Link: href="${match[0].match(/href=["']([^"']*)["']/)[1]}" | text: "${match[1].replace(/<[^>]+>/g, '').trim()}"`);
  }
});
