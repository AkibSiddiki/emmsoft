const fs = require('fs');
const c = fs.readFileSync('work.html', 'utf8');
const clientMatches = [...c.matchAll(/<h3 class="project-title">(.*?)<\/h3>/g)].map(m => m[1]);
console.log('Projects in work.html (' + clientMatches.length + '):');
clientMatches.forEach((name, idx) => console.log(`${idx + 1}. ${name}`));
