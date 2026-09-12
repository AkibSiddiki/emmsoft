const fs = require('fs');
const pages = [
  'index.html',
  'pages/about.html',
  'pages/blog-details.html',
  'pages/blog.html',
  'pages/ceo-message.html',
  'pages/contact.html',
  'pages/cto-message.html',
  'pages/gallery.html',
  'pages/team.html',
  'pages/work.html'
];
for (const p of pages) {
  const c = fs.readFileSync(p, 'utf8');
  const footerIdx = c.indexOf('site-footer');
  const footerSection = c.substring(footerIdx, footerIdx + 3000);
  const closingIdx = footerSection.indexOf('</footer>');
  const piece = footerSection.substring(closingIdx - 200, closingIdx + 20);
  console.log('=== ' + p + ' ===');
  console.log(piece.trim());
}
