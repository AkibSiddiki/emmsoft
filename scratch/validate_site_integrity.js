const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'team.html',
  'ceo-message.html',
  'cto-message.html',
  'contact.html',
  'work.html'
];

let totalIssues = 0;

files.forEach(f => {
  if (!fs.existsSync(f)) {
    console.error(`MISSING FILE: ${f}`);
    totalIssues++;
    return;
  }
  const content = fs.readFileSync(f, 'utf8');

  // Check local images
  const imgMatches = [...content.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  imgMatches.forEach(src => {
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      const cleanSrc = src.split('?')[0].split('#')[0];
      if (!fs.existsSync(cleanSrc)) {
        console.error(`[${f}] Broken image: ${src}`);
        totalIssues++;
      }
    }
  });

  // Check local page links
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  hrefMatches.forEach(href => {
    if (!href.startsWith('http') && !href.startsWith('data:') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:')) {
      const page = href.split('#')[0].split('?')[0];
      if (page && !fs.existsSync(page)) {
        console.error(`[${f}] Broken local link: ${href}`);
        totalIssues++;
      }
    }
  });
});

console.log(`Validation complete. Total issues found: ${totalIssues}`);
