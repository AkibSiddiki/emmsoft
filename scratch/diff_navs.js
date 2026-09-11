const fs = require('fs');

const contactHtml = fs.readFileSync('contact.html', 'utf8');
const contactNav = contactHtml.match(/<nav[\s\S]*?<\/nav>/)[0];

const files = ['index.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'about.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const nav = content.match(/<nav[\s\S]*?<\/nav>/)[0];
  console.log(`\n=================== DIFF: ${f} vs contact.html ===================`);
  if (nav === contactNav) {
    console.log('IDENTICAL!');
  } else {
    console.log(`Length difference: ${f}=${nav.length}, contact=${contactNav.length}`);
    // Check key differences
    if (nav.includes('href="about.html"')) {
      console.log('Has about.html link: yes');
    } else {
      console.log('Has about.html link: NO');
    }
    // Check if dropdowns match
    console.log('Has 6 Pillars badge:', nav.includes('6 Pillars'));
    console.log('Has Newsroom CMS HOT pill:', nav.includes('pill-hot'));
  }
});
