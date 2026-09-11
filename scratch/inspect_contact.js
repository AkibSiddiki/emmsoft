const fs = require('fs');
const html = fs.readFileSync('contact.html', 'utf8');

console.log('File length:', html.length);
const inputs = [...html.matchAll(/<(input|select|textarea|button)[^>]*>/gi)].map(m => m[0]);
console.log('Inputs/Selects/Buttons count:', inputs.length);
inputs.slice(0, 15).forEach(i => console.log(' ', i));

const headings = [...html.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings:', headings);
