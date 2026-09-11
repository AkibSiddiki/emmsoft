const fs = require('fs');

const standardNavCss = `    /* ==========================================================================
       NAVBAR (Synchronized System)
       ========================================================================== */
    .nav {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 200;
      background: rgba(251, 252, 251, 0.92);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-light);
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .nav.is-scrolled {
      background: rgba(255, 255, 255, 0.98);
      border-bottom-color: rgba(227, 232, 229, 0.8);
      box-shadow: 0 4px 20px -2px rgba(18, 25, 34, 0.05);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
      gap: clamp(14px, 2.2vw, 32px);
    }

    .brand-link {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .nav-logo {
      height: 22px;
      width: auto;
      object-fit: contain;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: clamp(12px, 1.8vw, 28px);
      flex-wrap: nowrap;
    }

    .nav-link {
      font-family: var(--font-heading);
      font-size: 0.94rem;
      font-weight: 600;
      color: var(--ink-secondary);
      transition: color 0.18s ease;
      padding: 6px 0;
      white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link.is-active {
      color: var(--brand-emerald-dark);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* Dropdown & Mega Menu System */
    .nav-item-dropdown {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 76px;
    }

    .nav-item-dropdown .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
    }

    .dropdown-chevron {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: inline-block;
    }

    .nav-item-dropdown:hover .dropdown-chevron,
    .nav-item-dropdown:focus-within .dropdown-chevron {
      transform: rotate(180deg);
      color: var(--brand-emerald);
    }

    .mega-menu-bridge {
      position: absolute;
      top: 100%;
      left: -150px;
      right: -150px;
      height: 18px;
      content: "";
      display: block;
      pointer-events: auto;
    }

    .mega-menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 50%;
      transform: translateX(-40%) translateY(12px);
      width: 760px;
      max-width: 92vw;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(28px) saturate(190%);
      -webkit-backdrop-filter: blur(28px) saturate(190%);
      border: 1px solid rgba(227, 232, 229, 0.9);
      border-radius: var(--radius-lg);
      box-shadow: 0 24px 56px -12px rgba(18, 25, 34, 0.16), 0 4px 16px rgba(4, 148, 73, 0.06);
      padding: 22px;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  visibility 0.25s;
      z-index: 300;
    }

    .mega-menu.mega-menu-left {
      left: 0;
      transform: translateY(12px);
    }

    .nav-item-dropdown:hover .mega-menu,
    .nav-item-dropdown:focus-within .mega-menu {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateX(-40%) translateY(0);
    }

    .nav-item-dropdown:hover .mega-menu.mega-menu-left,
    .nav-item-dropdown:focus-within .mega-menu.mega-menu-left {
      transform: translateY(0);
    }

    .pill-hot {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      background: #ef4444;
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      line-height: 1.1;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.35);
    }

    .mega-menu-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 20px;
    }

    .mega-menu-col-left {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .mega-menu-label {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--brand-emerald-dark);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }

    .mega-links-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mega-link-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--radius-md);
      background: var(--bg-surface);
      border: 1px solid transparent;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      text-align: left;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }

    .mega-link-card:hover {
      background: var(--brand-emerald-tint);
      border-color: var(--brand-emerald-border);
      transform: translateX(4px);
    }

    .mega-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--brand-emerald);
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(4, 148, 73, 0.2);
    }

    .mega-link-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: var(--brand-emerald-tint);
      color: var(--brand-emerald-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .mega-link-card:hover .mega-link-icon-wrap {
      background: var(--brand-emerald);
      color: #ffffff;
    }

    .mega-link-card-body {
      flex: 1;
      min-width: 0;
    }

    .mega-link-card-body .mega-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-heading);
      font-size: 0.94rem;
      font-weight: 700;
      color: var(--ink-primary);
      margin-bottom: 2px;
    }

    .mega-link-card:hover .mega-title {
      color: var(--brand-emerald-dark);
    }

    .mega-link-card-body .mega-desc {
      font-size: 0.8rem;
      color: var(--ink-muted);
      line-height: 1.35;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mega-arrow {
      font-size: 0.85rem;
      color: var(--brand-emerald);
      opacity: 0;
      transform: translateX(-4px);
      transition: all 0.2s ease;
    }

    .mega-link-card:hover .mega-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .mega-feature-card {
      background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-alt) 100%);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-decoration: none;
      color: inherit;
      position: relative;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }

    .mega-feature-card:hover {
      border-color: var(--brand-emerald);
      box-shadow: 0 12px 30px rgba(4, 148, 73, 0.14);
      transform: translateY(-2px);
    }

    .mega-feature-thumb {
      position: relative;
      width: 100%;
      height: 140px;
      overflow: hidden;
    }

    .mega-feature-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .mega-feature-card:hover .mega-feature-thumb img {
      transform: scale(1.05);
    }

    .mega-feature-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: #ffffff;
      background: rgba(11, 15, 21, 0.85);
      backdrop-filter: blur(6px);
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.04em;
      z-index: 2;
    }

    .mega-feature-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .mega-feature-title {
      font-family: var(--font-heading);
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--ink-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mega-feature-desc {
      font-size: 0.82rem;
      color: var(--ink-secondary);
      line-height: 1.45;
      margin: 0;
    }

    .mega-feature-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--brand-emerald-dark);
      margin-top: auto;
      padding-top: 10px;
    }

    /* Mobile Drawer */
    .nav-burger {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 32px;
      height: 32px;
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .nav-burger span {
      width: 100%;
      height: 2px;
      background: var(--ink-primary);
      border-radius: 2px;
      transition: var(--transition);
    }

    .mobile-panel {
      display: none;
      position: fixed;
      top: 76px;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--bg-surface);
      z-index: 190;
      padding: 24px;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
      border-top: 1px solid var(--border-light);
    }

    .mobile-panel.is-open {
      display: flex;
    }

    .mobile-panel a {
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--ink-primary);
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: var(--transition);
      border-bottom: 1px solid var(--border-subtle);
    }

    .mobile-panel a:hover {
      background: var(--brand-emerald-tint);
      color: var(--brand-emerald-dark);
      padding-left: 20px;
    }

    @media (max-width: 900px) {
      .nav-menu { display: none; }
      .nav-burger { display: flex; }
    }`;

// 1. Update contact.html navbar CSS
let contact = fs.readFileSync('contact.html', 'utf8');
const contactCssRegex = /\/\* =+[\r\n\s]+NAVBAR \(Synchronized System\)[\s\S]*?@media \(max-width: 900px\) \{[\s\S]*?\.nav-burger \{ display: flex; \}\s*\}/;
contact = contact.replace(contactCssRegex, standardNavCss.trim());
fs.writeFileSync('contact.html', contact, 'utf8');
console.log('Updated contact.html navbar CSS');

// 2. Update index.html
let index = fs.readFileSync('index.html', 'utf8');
const indexCssRegex = /\/\* =+[\r\n\s]+NAVIGATION BAR[\s\S]*?(?=\/\* =+[\r\n\s]+HERO SECTION)/;
if (indexCssRegex.test(index)) {
  index = index.replace(indexCssRegex, standardNavCss + '\n\n    ');
  fs.writeFileSync('index.html', index, 'utf8');
  console.log('Updated index.html navbar CSS');
} else {
  console.error('Could not find index.html navbar CSS range');
}

// 3. Update team.html
let team = fs.readFileSync('team.html', 'utf8');
const teamCssRegex = /\/\* =+[\r\n\s]+NAVBAR[\s\S]*?(?=\/\* =+[\r\n\s]+HERO SECTION)/;
if (teamCssRegex.test(team)) {
  team = team.replace(teamCssRegex, standardNavCss + '\n\n    ');
  fs.writeFileSync('team.html', team, 'utf8');
  console.log('Updated team.html navbar CSS');
} else {
  console.error('Could not find team.html navbar CSS range');
}

// 4. Update ceo-message.html
let ceo = fs.readFileSync('ceo-message.html', 'utf8');
const ceoCssRegex = /\/\* =+[\r\n\s]+NAVBAR[\s\S]*?(?=\/\* =+[\r\n\s]+CEO MESSAGE HERO)/;
if (ceoCssRegex.test(ceo)) {
  ceo = ceo.replace(ceoCssRegex, standardNavCss + '\n\n    ');
  fs.writeFileSync('ceo-message.html', ceo, 'utf8');
  console.log('Updated ceo-message.html navbar CSS');
} else {
  console.error('Could not find ceo-message.html navbar CSS range');
}

// 5. Update cto-message.html
let cto = fs.readFileSync('cto-message.html', 'utf8');
const ctoCssRegex = /\/\* =+[\r\n\s]+NAVBAR[\s\S]*?(?=\/\* =+[\r\n\s]+CTO MESSAGE HERO)/;
if (ctoCssRegex.test(cto)) {
  cto = cto.replace(ctoCssRegex, standardNavCss + '\n\n    ');
  fs.writeFileSync('cto-message.html', cto, 'utf8');
  console.log('Updated cto-message.html navbar CSS');
} else {
  console.error('Could not find cto-message.html navbar CSS range');
}

// 6. Update about.html
let about = fs.readFileSync('about.html', 'utf8');
const aboutCssRegex = /\/\* =+[\r\n\s]+NAVBAR \(Synchronized System\)[\s\S]*?(?=\/\* =+[\r\n\s]+QUICK)/;
if (aboutCssRegex.test(about)) {
  about = about.replace(aboutCssRegex, standardNavCss + '\n\n    ');
  fs.writeFileSync('about.html', about, 'utf8');
  console.log('Updated about.html navbar CSS');
} else {
  console.error('Could not find about.html navbar CSS range');
}

console.log('CSS Synchronization complete.');
