const fs = require('fs');
const html = fs.readFileSync('contact.html', 'utf8');

const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart);
console.log(html.substring(scriptStart, scriptEnd + 9));
