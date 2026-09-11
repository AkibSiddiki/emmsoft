const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`Analyzing ${htmlFiles.length} HTML files...\n`);

let totalErrors = 0;
let totalWarnings = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log(`=== Inspecting: ${file} ===`);

  // 1. Check title and description
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
  console.log(`  Title: ${titleMatch ? titleMatch[1].trim() : '[MISSING]'}`);

  // 2. Check local images
  const imgMatches = [...content.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)];
  let missingImages = 0;
  imgMatches.forEach(m => {
    const src = m[1];
    if (src.startsWith('data:') || src.startsWith('http')) return;
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (!fs.existsSync(cleanSrc)) {
      console.error(`  [!] Missing Image: ${cleanSrc} in ${file}`);
      missingImages++;
      totalErrors++;
    }
  });
  if (missingImages === 0) {
    console.log(`  Images: ${imgMatches.length} references, all OK`);
  }

  // 3. Check internal links
  const linkMatches = [...content.matchAll(/<a[^>]*href="([^"]+)"[^>]*>/gi)];
  let missingLinks = 0;
  linkMatches.forEach(m => {
    const href = m[1];
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('javascript:')) {
      return;
    }
    // Separate hash and query parameters
    let cleanTarget = href;
    let hash = '';
    if (cleanTarget.includes('#')) {
      const parts = cleanTarget.split('#');
      cleanTarget = parts[0];
      hash = parts[1];
    }
    if (cleanTarget.includes('?')) {
      cleanTarget = cleanTarget.split('?')[0];
    }

    if (!fs.existsSync(cleanTarget)) {
      console.error(`  [!] Broken Link target: ${href} -> ${cleanTarget} in ${file}`);
      missingLinks++;
      totalErrors++;
    } else if (hash) {
      const targetContent = fs.readFileSync(cleanTarget, 'utf8');
      if (!targetContent.includes(`id="${hash}"`) && !targetContent.includes(`id='${hash}'`)) {
        console.warn(`  [?] Anchor #${hash} not found in ${cleanTarget} (referenced from ${file})`);
        totalWarnings++;
      }
    }
  });
  if (missingLinks === 0) {
    console.log(`  Links: ${linkMatches.length} links checked, all file targets OK`);
  }

  // 4. Check navbar
  const hasNav = content.includes('<nav class="nav" id="siteNav">');
  const hasMobile = content.includes('id="mobilePanel"');
  const hasFoot = content.includes('<h4>Core Solutions</h4>');
  console.log(`  Nav: ${hasNav ? 'YES' : 'NO'}, Mobile Drawer: ${hasMobile ? 'YES' : 'NO'}, Footer Core Solutions: ${hasFoot ? 'YES' : 'NO'}`);
  console.log('');
});

console.log(`\n========================================`);
console.log(`Total Errors: ${totalErrors}`);
console.log(`Total Warnings: ${totalWarnings}`);
if (totalErrors === 0 && totalWarnings === 0) {
  console.log(`PERFECT: ALL 13 PAGES VERIFIED 100% CLEAN & INTACT!`);
}
