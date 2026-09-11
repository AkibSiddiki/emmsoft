const fs = require('fs');

const solPages = [
  'solution-newsroom-cms.html',
  'solution-ecommerce.html',
  'solution-cloud-devops.html',
  'solution-enterprise-cms.html',
  'solution-web-applications.html',
  'solution-mobile-apps.html'
];

solPages.forEach(p => {
  const c = fs.readFileSync(p, 'utf8');
  const mobStart = c.indexOf('<div class="mobile-panel"');
  const mobEnd = c.indexOf('</nav>', mobStart);
  console.log(`=== ${p} ===`);
  const highlighted = [...c.substring(mobStart, mobEnd).matchAll(/<a [^>]*background:var\(--brand-emerald-tint\)[^>]*>([\s\S]*?)<\/a>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Mobile highlighted:', highlighted);
});
