const fs = require('fs');

// 1. In index.html, remove the #projects section
let indexContent = fs.readFileSync('index.html', 'utf8');

const startMarker = '  <!-- ==========================================================================\n     PRODUCTION CASE STUDIES (Selected Work)\n     ========================================================================== -->\n  <section class="section-pad" id="projects" style="background:var(--bg-alt);">';
const endMarker = '  </section>\n\n  <!-- ==========================================================================\n     TECH STACK & ARCHITECTURE ECOSYSTEM';

const startIndex = indexContent.indexOf(startMarker);
const endIndex = indexContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  // We want to delete from startMarker up to the start of the endMarker section
  const sectionEnd = endIndex + '  </section>\n\n'.length;
  indexContent = indexContent.slice(0, startIndex) + indexContent.slice(sectionEnd);
  console.log('Successfully removed #projects section from index.html!');
} else {
  console.error('Failed to locate section in index.html! startIndex:', startIndex, 'endIndex:', endIndex);
}

fs.writeFileSync('index.html', indexContent, 'utf8');

// 2. Wire navigation and footer links across all HTML files
const files = ['index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html', 'contact.html', 'work.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let html = fs.readFileSync(f, 'utf8');

  // Replace navbar link
  html = html.replace(/<a href=["']index\.html#projects["'] class=["']nav-link["']>Work<\/a>/g, '<a href="work.html" class="nav-link">Work</a>');
  
  // Replace footer links
  html = html.replace(/<a href=["'](?:index\.html)?#projects["']>([^<]+)<\/a>/g, '<a href="work.html">$1</a>');

  // Ensure mobile panel has Work link
  const mobileDrawerPattern = /(<div class=["']mobile-panel["'][^>]*>[\s\S]*?)(<\/div>)/;
  const match = html.match(mobileDrawerPattern);
  if (match) {
    let panelInner = match[1];
    if (!panelInner.includes('href="work.html"')) {
      // Add work link after Team link if present
      if (panelInner.includes('team.html')) {
        panelInner = panelInner.replace(
          /(<a href=["']team\.html["']>.*?<\/a>)/,
          '$1\n      <a href="work.html">Work / Case Studies <span>→</span></a>'
        );
      } else {
        panelInner += '\n      <a href="work.html">Work / Case Studies <span>→</span></a>';
      }
      html = html.replace(match[0], panelInner + match[2]);
      console.log(`Added work.html to mobile panel in ${f}`);
    }
  }

  fs.writeFileSync(f, html, 'utf8');
  console.log(`Updated links in ${f}`);
});
