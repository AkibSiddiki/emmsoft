const fs = require('fs');

const contactContent = fs.readFileSync('contact.html', 'utf8');

// Extract Navbar CSS
const cssRegex = /(\/\* =+[\r\n\s]+NAVBAR \(Synchronized System\)[\s\S]*?@media \(max-width: 900px\) \{\s*\.nav-menu \{ display: none; \}\s*\.nav-burger \{ display: flex; \}\s*\})/;
const cssMatch = contactContent.match(cssRegex);

if (!cssMatch) {
  console.error('Navbar CSS regex did not match in contact.html!');
  process.exit(1);
}

const navCss = cssMatch[1];
console.log('Extracted Nav CSS length:', navCss.length);

// Extract Navbar HTML
const htmlRegex = /(<!-- =+[\r\n\s]+HEADER \/ NAVIGATION \(Synchronized eMMSOFT Navbar\)[\s\S]*?<\/nav>)/;
const htmlMatch = contactContent.match(htmlRegex);

if (!htmlMatch) {
  console.error('Navbar HTML regex did not match in contact.html!');
  process.exit(1);
}

const navHtml = htmlMatch[1];
console.log('Extracted Nav HTML length:', navHtml.length);

fs.writeFileSync('scratch/extracted_nav.css', navCss);
fs.writeFileSync('scratch/extracted_nav.html', navHtml);
console.log('Successfully saved extracted navbar CSS and HTML.');
