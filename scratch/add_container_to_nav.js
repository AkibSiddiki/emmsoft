const fs = require('fs');

const files = [
  'contact.html',
  'index.html',
  'about.html',
  'team.html',
  'ceo-message.html',
  'cto-message.html',
  'work.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Replace <div class="nav-inner"> with <div class="container nav-inner"> inside siteNav
  if (content.includes('<nav class="nav" id="siteNav">\n    <div class="nav-inner">')) {
    content = content.replace(
      '<nav class="nav" id="siteNav">\n    <div class="nav-inner">',
      '<nav class="nav" id="siteNav">\n    <div class="container nav-inner">'
    );
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Added container to nav-inner in ${f}`);
  } else if (content.includes('<nav class="nav" id="siteNav">\r\n    <div class="nav-inner">')) {
    content = content.replace(
      '<nav class="nav" id="siteNav">\r\n    <div class="nav-inner">',
      '<nav class="nav" id="siteNav">\r\n    <div class="container nav-inner">'
    );
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Added container to nav-inner in ${f}`);
  } else {
    // fallback with regex
    content = content.replace(
      /(<nav class="nav" id="siteNav">[\s\S]*?)<div class="nav-inner">/,
      '$1<div class="container nav-inner">'
    );
    fs.writeFileSync(f, content, 'utf8');
    console.log(`(Regex) Added container to nav-inner in ${f}`);
  }
});
