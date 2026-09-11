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

// Let's get the current nav from contact.html
let contactContent = fs.readFileSync('contact.html', 'utf8');
const navStart = contactContent.indexOf('<nav class="nav" id="siteNav">');
const navEnd = contactContent.indexOf('</nav>') + 6;
let navHtml = contactContent.slice(navStart, navEnd);

// Remove hardcoded is-active from Contact link if present
navHtml = navHtml.replace('<a href="contact.html" class="nav-link is-active">Contact</a>', '<a href="contact.html" class="nav-link">Contact</a>');
navHtml = navHtml.replace('<a href="index.html#projects" class="nav-link">Work</a>', '<a href="work.html" class="nav-link">Work</a>');

// Ensure mobile panel has Work link
if (!navHtml.includes('href="work.html" style') && !navHtml.includes('<a href="work.html">Work / Portfolio')) {
  navHtml = navHtml.replace(
    '<a href="team.html">Team <span>→</span></a>',
    '<a href="team.html">Team <span>→</span></a>\n      <a href="work.html">Work / Portfolio <span>→</span></a>'
  );
}

// Add the auto active highlight script inside the nav if not already present
if (!navHtml.includes('siteNavActiveHighlight')) {
  const scriptTag = `
    <script id="siteNavActiveHighlight">
      (function() {
        try {
          var p = window.location.pathname.split('/').pop() || 'index.html';
          var links = document.querySelectorAll('#siteNav .nav-links .nav-link');
          links.forEach(function(link) {
            link.classList.remove('is-active');
            var href = link.getAttribute('href');
            if (href === p) {
              link.classList.add('is-active');
            } else if ((p === 'about.html' || p === 'ceo-message.html' || p === 'cto-message.html') && href === 'about.html') {
              link.classList.add('is-active');
            }
          });
        } catch(e) {}
      })();
    </script>
  `;
  navHtml = navHtml.replace('</nav>', scriptTag + '</nav>');
}

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const s = content.indexOf('<nav class="nav" id="siteNav">');
  const e = content.indexOf('</nav>') + 6;
  if (s === -1 || e === -1) {
    console.error(`Nav not found in ${f}`);
    return;
  }
  content = content.slice(0, s) + navHtml + content.slice(e);
  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated nav in ${f}`);
});
