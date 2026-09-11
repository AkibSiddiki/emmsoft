const fs = require('fs');
const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html'];
let totalBroken = 0;

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1].split('?')[0];
    if (!fs.existsSync(src)) {
      console.error(f + ' -> BROKEN IMG: ' + src);
      totalBroken++;
    }
  }
});
console.log('Total broken images across all files:', totalBroken);
