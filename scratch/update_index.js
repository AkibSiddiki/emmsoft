const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update tab panes with CTA buttons
const tabReplacements = [
  {
    id: 'id="tab-newsroom"',
    slug: 'solution-newsroom-cms.html',
    title: 'Newsroom CMS Architecture & Details',
    solParam: 'Newsroom+CMS'
  },
  {
    id: 'id="tab-ecommerce"',
    slug: 'solution-ecommerce.html',
    title: 'E-Commerce Architecture & Details',
    solParam: 'E-Commerce+Platform'
  },
  {
    id: 'id="tab-cloud"',
    slug: 'solution-cloud-devops.html',
    title: 'Cloud & DevOps Architecture & Details',
    solParam: 'Cloud+%26+DevOps'
  },
  {
    id: 'id="tab-cms"',
    slug: 'solution-enterprise-cms.html',
    title: 'Enterprise Headless CMS Details',
    solParam: 'Enterprise+CMS'
  },
  {
    id: 'id="tab-webapp"',
    slug: 'solution-web-applications.html',
    title: 'Web Applications & SaaS Details',
    solParam: 'Custom+Microservices'
  },
  {
    id: 'id="tab-mobile"',
    slug: 'solution-mobile-apps.html',
    title: 'Mobile Apps & Flutter Details',
    solParam: 'Mobile+App'
  }
];

tabReplacements.forEach(tab => {
  const paneIdx = html.indexOf(tab.id);
  if (paneIdx === -1) {
    console.error(`Tab pane not found: ${tab.id}`);
    return;
  }
  // Find </div followed by </div>\s*<div class="pane-visual">
  // Look for the stack-pills div in this pane
  const stackIdx = html.indexOf('class="stack-pills"', paneIdx);
  const stackEnd = html.indexOf('</div>', stackIdx) + 6;
  
  // Check if pane-actions already inserted
  if (!html.substring(stackEnd, stackEnd + 300).includes('pane-actions')) {
    const actionHtml = `\n          <div class="pane-actions" style="margin-top: 22px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <a href="${tab.slug}" class="btn btn-primary btn-sm">Explore ${tab.title} →</a>
            <a href="contact.html?solution=${tab.solParam}" class="btn btn-secondary btn-sm">Request Tech Proposal</a>
          </div>`;
    html = html.substring(0, stackEnd) + actionHtml + html.substring(stackEnd);
    console.log(`Added pane-actions to ${tab.id}`);
  }
});

// 2. Update specializations cards
html = html.replace(
  '<a href="#contact" class="card-action" onclick="selectInterest(\'Newsroom CMS\')">Configure Newsroom CMS →</a>',
  '<a href="solution-newsroom-cms.html" class="card-action">Explore Newsroom CMS Details →</a>'
);
html = html.replace(
  '<a href="#contact" class="card-action" onclick="selectInterest(\'E-Commerce Platform\')">Build E-Commerce System →</a>',
  '<a href="solution-ecommerce.html" class="card-action">Explore E-Commerce Details →</a>'
);
html = html.replace(
  /<a href="#contact" class="card-action" onclick="selectInterest\('Cloud Solutions'\)">Design Cloud Architecture\s*→<\/a>/,
  '<a href="solution-cloud-devops.html" class="card-action">Explore Cloud & DevOps Details →</a>'
);
html = html.replace(
  /<a href="#contact" class="card-action" onclick="selectInterest\('Enterprise CMS'\)">Explore CMS Architecture\s*→<\/a>/,
  '<a href="solution-enterprise-cms.html" class="card-action">Explore Enterprise CMS Details →</a>'
);
html = html.replace(
  '<a href="#contact" class="card-action" onclick="selectInterest(\'Web Application\')">Build Web Application →</a>',
  '<a href="solution-web-applications.html" class="card-action">Explore Web Apps & SaaS Details →</a>'
);
html = html.replace(
  '<a href="#contact" class="card-action" onclick="selectInterest(\'Mobile App\')">Launch Mobile App →</a>',
  '<a href="solution-mobile-apps.html" class="card-action">Explore Mobile Apps Details →</a>'
);

// 3. Update spotlight cards
html = html.replace(
  '<a href="#contact" class="btn btn-primary" onclick="selectInterest(\'Newsroom CMS\')">Request Newsroom CMS\n            Demo</a>',
  `<div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px;">
              <a href="solution-newsroom-cms.html" class="btn btn-primary">Explore Full Newsroom Solution →</a>
              <a href="contact.html?solution=Newsroom+CMS" class="btn btn-secondary">Request Tech Proposal</a>
            </div>`
);
html = html.replace(
  '<a href="#contact" class="btn btn-primary" onclick="selectInterest(\'E-Commerce\')">Audit Your E-Commerce\n            Stack</a>',
  `<div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px;">
              <a href="solution-ecommerce.html" class="btn btn-primary">Explore E-Commerce Architecture →</a>
              <a href="contact.html?solution=E-Commerce+Platform" class="btn btn-secondary">Request Tech Proposal</a>
            </div>`
);

// 4. Update Footer Core Solutions column
const footCoreOld = `        <div class="footer-col">
          <h4>Core Solutions</h4>
          <ul>
            <li><a href="#solutions" onclick="activateTab('tab-newsroom')">Newsroom CMS</a></li>
            <li><a href="#solutions" onclick="activateTab('tab-ecommerce')">E-Commerce Platforms</a></li>
            <li><a href="#solutions" onclick="activateTab('tab-cloud')">Cloud Solutions &amp; DevOps</a></li>
            <li><a href="#solutions" onclick="activateTab('tab-cms')">Enterprise Headless CMS</a></li>
            <li><a href="#solutions" onclick="activateTab('tab-webapp')">Web Applications &amp; SaaS</a></li>
            <li><a href="#solutions" onclick="activateTab('tab-mobile')">Cross-Platform Mobile Apps</a></li>
          </ul>
        </div>`;

const footCoreNew = `        <div class="footer-col">
          <h4>Core Solutions</h4>
          <ul>
            <li><a href="solution-newsroom-cms.html">Newsroom CMS (Headless)</a></li>
            <li><a href="solution-ecommerce.html">E-Commerce Platforms</a></li>
            <li><a href="solution-cloud-devops.html">Cloud Solutions &amp; DevOps</a></li>
            <li><a href="solution-enterprise-cms.html">Enterprise Headless CMS</a></li>
            <li><a href="solution-web-applications.html">Web Applications &amp; SaaS</a></li>
            <li><a href="solution-mobile-apps.html">Mobile Apps (iOS &amp; Android)</a></li>
          </ul>
        </div>`;

if (html.includes(footCoreOld)) {
  html = html.replace(footCoreOld, footCoreNew);
  console.log('Updated Core Solutions in index.html footer');
} else {
  console.warn('footCoreOld not matched in index.html');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved updated index.html');
