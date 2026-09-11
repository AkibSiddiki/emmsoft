const fs = require('fs');

let html = fs.readFileSync('contact.html', 'utf8');

// 1. Add Web Applications & SaaS chip if not present
if (!html.includes('data-interest="Web Applications & SaaS"')) {
  const insertTarget = `<button type="button" class="chip-btn" data-interest="Mobile App">`;
  const newChip = `<button type="button" class="chip-btn" data-interest="Web Applications & SaaS">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  Web Applications &amp; SaaS
                </button>\n                `;
  html = html.replace(insertTarget, newChip + insertTarget);
  console.log('Added Web Applications & SaaS chip to contact.html');
}

// 2. Add URL Param auto-selection script
const scriptTarget = `hiddenSolutionsInput.value = Array.from(selectedInterests).join(', ');
      });
    });`;

const urlParamCode = `hiddenSolutionsInput.value = Array.from(selectedInterests).join(', ');
      });
    });

    // 5. Auto-select solution from URL parameters (?solution=... or ?service=...)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const solParam = urlParams.get('solution') || urlParams.get('service');
      if (solParam) {
        const query = solParam.toLowerCase().replace(/[^a-z0-9]/g, '');
        chipButtons.forEach(btn => {
          const interest = (btn.getAttribute('data-interest') || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (interest.includes(query) || query.includes(interest) ||
              (query.includes('newsroom') && interest.includes('newsroom')) ||
              (query.includes('commerce') && interest.includes('commerce')) ||
              (query.includes('cloud') && interest.includes('cloud')) ||
              (query.includes('devops') && interest.includes('devops')) ||
              (query.includes('enterprise') && interest.includes('enterprise')) ||
              (query.includes('mobile') && interest.includes('mobile')) ||
              ((query.includes('webapp') || query.includes('saas')) && interest.includes('webapp')) ||
              ((query.includes('microservice') || query.includes('custom') || query.includes('sla')) && interest.includes('microservice'))) {
            selectedInterests.add(btn.getAttribute('data-interest'));
            btn.classList.add('is-selected');
          }
        });
        if (selectedInterests.size > 0) {
          hiddenSolutionsInput.value = Array.from(selectedInterests).join(', ');
        }
        // Smooth scroll to the proposal form
        const formElement = document.getElementById('projectProposalForm');
        if (formElement) {
          setTimeout(() => {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 350);
        }
      }
    } catch (e) {
      console.error('Error auto-selecting solution chip:', e);
    }`;

if (html.includes(scriptTarget) && !html.includes('// 5. Auto-select solution from URL parameters')) {
  html = html.replace(scriptTarget, urlParamCode);
  console.log('Added URL param auto-selection to contact.html');
}

fs.writeFileSync('contact.html', html, 'utf8');
console.log('Saved updated contact.html');
