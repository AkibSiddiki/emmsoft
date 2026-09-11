const fs = require('fs');

const contactNav = fs.readFileSync('contact.html', 'utf8').match(/<nav[\s\S]*?<\/nav>/)[0];
const indexNav = fs.readFileSync('index.html', 'utf8').match(/<nav[\s\S]*?<\/nav>/)[0];

console.log('--- In index.html but not in contact.html: ---');
// Let's check the items in nav-menu
const indexLinks = indexNav.match(/<a[\s\S]*?<\/a>/g) || [];
const contactLinks = contactNav.match(/<a[\s\S]*?<\/a>/g) || [];

console.log('Index links count:', indexLinks.length);
console.log('Contact links count:', contactLinks.length);

indexLinks.forEach(l => {
  const text = l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const href = (l.match(/href="([^"]+)"/) || [])[1];
  console.log(`Index link: [${text}] -> ${href}`);
});
