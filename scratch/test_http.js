const http = require('http');

const urls = [
  'http://localhost:5050/',
  'http://localhost:5050/solution-newsroom-cms.html',
  'http://localhost:5050/solution-ecommerce.html',
  'http://localhost:5050/solution-cloud-devops.html',
  'http://localhost:5050/solution-enterprise-cms.html',
  'http://localhost:5050/solution-web-applications.html',
  'http://localhost:5050/solution-mobile-apps.html',
  'http://localhost:5050/contact.html?solution=Newsroom+CMS'
];

let remaining = urls.length;
urls.forEach(u => {
  http.get(u, res => {
    console.log(`${res.statusCode} OK: ${u}`);
    remaining--;
    if (remaining === 0) process.exit(0);
  }).on('error', err => {
    console.error(`FAIL: ${u} - ${err.message}`);
    process.exit(1);
  });
});
