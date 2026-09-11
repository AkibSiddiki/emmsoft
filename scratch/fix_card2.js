const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  '<a href="#contact" class="card-action" onclick="selectInterest(\'E-Commerce\')">Build E-Commerce System →</a>',
  '<a href="solution-ecommerce.html" class="card-action">Explore E-Commerce Details →</a>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed Card 2 in index.html');
