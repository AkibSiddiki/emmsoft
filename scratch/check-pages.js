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
  console.log(p, {
    hasCss: c.includes('.footer-watermark'),
    hasSvg: c.includes('footer-watermark'),
    siteFooterPosRel: c.includes('.site-footer') && c.includes('position: relative;'),
    countFooter: (c.match(/<\/footer>/g) || []).length
  });
}
