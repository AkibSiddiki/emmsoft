const fs = require('fs');

const checks = {
  'index.html': ['.hero', '.clients-strip-section', '.stats-strip', '.solutions-section', '.spotlight-section', '.stack-grid'],
  'about.html': ['.about-hero', '.about-hero-grid', '.hero-content', '.section-pad', '.container'],
  'team.html': ['.team-hero', '.team-grid', 'aspect-ratio: 1 / 1', '.filter-bar', '.exec-spotlight', '.culture-section'],
  'ceo-message.html': ['.message-hero', '.letter-container', '.letter-body', '.ceo-meta-bar'],
  'cto-message.html': ['.message-hero', '.letter-container', '.letter-body', '.cto-meta-bar'],
  'contact.html': ['.contact-hero', '.contact-form-card', '.interest-chips', '.sla-highlights'],
  'work.html': ['.work-hero', '.project-card', '.filter-chips-list', '.metric-badge', '.tech-stack-row']
};

let allPassed = true;

for (const [file, selectors] of Object.entries(checks)) {
  const content = fs.readFileSync(file, 'utf8');
  const styleStart = content.indexOf('<style>');
  const styleEnd = content.indexOf('</style>');
  const styles = content.slice(styleStart, styleEnd);

  console.log(`\n=== Checking ${file} (Style Length: ${styles.length}) ===`);
  selectors.forEach(sel => {
    const found = styles.includes(sel);
    console.log(`  ${found ? '✔' : '❌'} ${sel}`);
    if (!found) allPassed = false;
  });
}

console.log('\nAll page-specific styles verified:', allPassed);
