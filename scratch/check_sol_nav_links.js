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
  const navEnd = c.indexOf('</nav>', navStart);
  const navHtml = c.substring(navStart, navEnd);
  const hasNewsroom = navHtml.includes('solution-newsroom-cms.html');
  const hasEcom = navHtml.includes('solution-ecommerce.html');
  const hasCloud = navHtml.includes('solution-cloud-devops.html');
  const hasEnt = navHtml.includes('solution-enterprise-cms.html');
  const hasWeb = navHtml.includes('solution-web-applications.html');
  const hasMob = navHtml.includes('solution-mobile-apps.html');
  console.log(`${p}: nr=${hasNewsroom}, ec=${hasEcom}, cl=${hasCloud}, ent=${hasEnt}, web=${hasWeb}, mob=${hasMob}`);
});
