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
  const footStart = c.indexOf('<h4>Core Solutions</h4>');
  const footEnd = c.indexOf('</div>', footStart + 100);
  const highlighted = [...c.substring(footStart, footEnd).matchAll(/<a [^>]*style="[^"]*color:var\(--brand-emerald-accent\)[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log(`${p}: footer highlight =`, highlighted);
});
