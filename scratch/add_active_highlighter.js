const fs = require('fs');

const files = ['contact.html', 'index.html', 'about.html', 'team.html', 'ceo-message.html', 'cto-message.html'];

const activeSnippet = `
    // Active Navigation Highlighter
    (() => {
      const curPath = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
        link.classList.remove('is-active');
        const href = link.getAttribute('href');
        if (href === curPath || (curPath === '' && href === 'index.html')) {
          link.classList.add('is-active');
        }
      });
      if (['about.html', 'ceo-message.html', 'cto-message.html'].includes(curPath)) {
        const aboutLink = document.querySelector('.nav-item-dropdown > a[href="about.html"]');
        if (aboutLink) aboutLink.classList.add('is-active');
      }
    })();
`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('// Active Navigation Highlighter')) {
    console.log(`${f} already has Active Navigation Highlighter`);
    return;
  }

  // Insert right after burgerBtn event listener
  const target = "document.body.style.overflow = isOpen ? 'hidden' : '';\n    });";
  if (content.includes(target)) {
    content = content.replace(target, target + activeSnippet);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Added active highlighter to ${f}`);
  } else {
    console.warn(`Could not find target insertion point in ${f}`);
  }
});
