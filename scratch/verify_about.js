const fs = require('fs');
const html = fs.readFileSync('about.html', 'utf8');

// Check all img src
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
let missingImages = 0;
const checkedImages = new Set();
while ((match = imgRegex.exec(html)) !== null) {
  const src = match[1].split('?')[0];
  if (checkedImages.has(src)) continue;
  checkedImages.add(src);
  if (!fs.existsSync(src)) {
    console.error('MISSING IMAGE:', src);
    missingImages++;
  } else {
    console.log('OK image:', src);
  }
}

// Check all anchor targets with hash
const anchors = ['#origin-story', '#architecture-infographic', '#evolution-timeline', '#methodology-sdlc', '#comparison-matrix', '#client-sectors', '#leadership-squad', '#faq'];
let missingAnchors = 0;
anchors.forEach(a => {
  const id = a.substring(1);
  if (!html.includes('id="' + id + '"')) {
    console.error('MISSING ANCHOR ID:', id);
    missingAnchors++;
  } else {
    console.log('OK anchor ID:', id);
  }
});

console.log('=== TEST RESULT ===');
console.log('Missing images:', missingImages);
console.log('Missing anchors:', missingAnchors);
