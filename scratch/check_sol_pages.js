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
  const navStart = c.indexOf('<nav class="nav" id="siteNav">');
  const footStart = c.indexOf('<h4>Core Solutions</h4>');
  const mobileStart = c.indexOf('<div class="mobile-panel" id="mobilePanel">');
  console.log(`${p}: nav=${navStart !== -1} foot=${footStart !== -1} mobile=${mobileStart !== -1}`);
});
