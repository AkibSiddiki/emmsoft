const fs = require('fs');

const webHtml = fs.readFileSync('solution-web-applications.html', 'utf8');
console.log('web microservices:', webHtml.includes('id="microservices"'));

const cloudHtml = fs.readFileSync('solution-cloud-devops.html', 'utf8');
console.log('cloud audits:', cloudHtml.includes('id="audits"'));
