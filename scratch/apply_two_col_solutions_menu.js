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

// The standard complete Navbar HTML
const newNavHtml = `<nav class="nav" id="siteNav">
    <div class="container nav-inner">
      <a href="index.html" class="nav-brand" aria-label="eMMSOFT Home">
        <img src="logo.png" alt="eMMSOFT" class="nav-logo">
      </a>

      <div class="nav-links">
        <!-- Solutions Dropdown - Two Columns: Services & Products/Solutions -->
        <div class="nav-item-dropdown">
          <a href="index.html#solutions" class="nav-link" aria-haspopup="true" aria-expanded="false">
            Solutions
            <svg class="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          <div class="mega-menu-bridge"></div>
          <div class="mega-menu" role="region" aria-label="Solutions Navigation">
            <div class="mega-menu-grid">
              <!-- Column 1: Services -->
              <div class="mega-menu-col">
                <div class="mega-menu-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
                  Services
                </div>
                <div class="mega-links-list">
                  <a href="index.html#cloud-apps" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Cloud Solutions &amp; DevOps</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">AWS / GCP migration, Kubernetes &amp; CI/CD</p>
                    </div>
                  </a>

                  <a href="index.html#tech-stack" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>API &amp; Microservices</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">High-throughput REST, GraphQL &amp; caching</p>
                    </div>
                  </a>

                  <a href="index.html#solutions" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Architecture &amp; Code Audits</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Low-latency tuning, database indexing &amp; security</p>
                    </div>
                  </a>

                  <a href="index.html#specializations" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Custom Software Engineering</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Bespoke platforms &amp; legacy system modernization</p>
                    </div>
                  </a>

                  <a href="contact.html" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>24/7 SLA &amp; Support</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">99.99% uptime monitoring &amp; mission-critical ops</p>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Column 2: Products & Solutions -->
              <div class="mega-menu-col">
                <div class="mega-menu-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  Products &amp; Solutions
                </div>
                <div class="mega-links-list">
                  <a href="index.html#specializations" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span style="display:inline-flex; align-items:center; gap:6px;">Newsroom CMS <span class="pill-hot">HOT</span></span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Headless publishing, 28M+ readers, Anycast edge</p>
                    </div>
                  </a>

                  <a href="index.html#solutions" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Web Applications &amp; SaaS</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Reactive web portals, dashboards &amp; tools</p>
                    </div>
                  </a>

                  <a href="index.html#solutions" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Mobile Applications</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">iOS &amp; Android Flutter apps with offline-first sync</p>
                    </div>
                  </a>

                  <a href="index.html#ecommerce" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Inventory &amp; ERP Systems</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Multi-warehouse sync, POS &amp; supply chain flow</p>
                    </div>
                  </a>

                  <a href="index.html#ecommerce" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>E-Commerce Platforms</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Flash-sale resilience &amp; global retail stores</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Bottom Strip -->
            <div class="mega-menu-footer">
              <div class="mega-footer-left">
                <span class="pulse-dot"></span>
                <span>Powering 50M+ monthly transactions &amp; readers across Bangladesh &amp; global</span>
              </div>
              <a href="work.html" class="mega-footer-link">
                View All Case Studies <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <!-- About Us Dropdown -->
        <div class="nav-item-dropdown">
          <a href="about.html" class="nav-link" aria-haspopup="true" aria-expanded="false">
            About Us
            <svg class="dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          <div class="mega-menu-bridge"></div>
          <div class="mega-menu" role="region" aria-label="About Us Navigation">
            <div class="mega-menu-grid">
              <div class="mega-menu-col">
                <div class="mega-menu-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  Leadership &amp; Studio Team
                </div>
                <div class="mega-links-list">
                  <a href="about.html" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>About eMMSOFT</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Founding story, values &amp; engineering ethos</p>
                    </div>
                  </a>

                  <a href="ceo-message.html" class="mega-link-card">
                    <img src="assets/team/member_1.jpg" alt="Md. Zikrul Ahsan (Shawon), CEO" class="mega-avatar">
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>CEO's Message</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Md. Zikrul Ahsan (Shawon) — Vision &amp; ethos</p>
                    </div>
                  </a>
                  <a href="cto-message.html" class="mega-link-card">
                    <img src="assets/team/member_2.jpg" alt="Nurul Afsar Polash, CTO" class="mega-avatar">
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>CTO's Message</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Nurul Afsar Polash — Architecture &amp; low-latency stack</p>
                    </div>
                  </a>
                  <a href="team.html" class="mega-link-card">
                    <div class="mega-link-icon-wrap">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                    </div>
                    <div class="mega-link-card-body">
                      <div class="mega-title">
                        <span>Meet Our Full Team</span>
                        <span class="mega-arrow">→</span>
                      </div>
                      <p class="mega-desc">Explore our 12+ engineers &amp; architects</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="mega-menu-col">
                <a href="team.html#studio-culture" class="mega-feature-card">
                  <div class="mega-feature-thumb">
                    <img src="assets/work_culture.jpg" alt="eMMSOFT Studio Workspace" loading="lazy">
                    <span class="mega-feature-badge">Inside eMMSOFT</span>
                  </div>
                  <div class="mega-feature-body">
                    <div class="mega-feature-title">
                      <span>Work Environment</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                    <p class="mega-feature-desc">See how we collaborate and engineer mission-critical systems.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <a href="team.html" class="nav-link">Team</a>
        <a href="work.html" class="nav-link">Work</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </div>

      <div class="nav-actions">
        <a href="contact.html" class="btn btn-primary btn-sm">Start a Project</a>
        <button class="nav-burger" id="burgerBtn" aria-label="Toggle navigation menu" aria-expanded="false"
          aria-controls="mobilePanel">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div class="mobile-panel" id="mobilePanel">
      <a href="index.html">Home <span>→</span></a>
      <a href="about.html">About Us <span>→</span></a>
      <a href="team.html">Team <span>→</span></a>
      <a href="work.html">Work / Portfolio <span>→</span></a>
      <a href="ceo-message.html">CEO Message <span>→</span></a>
      <a href="cto-message.html">CTO Message <span>→</span></a>
      <a href="contact.html" style="color:var(--brand-emerald-dark); font-weight:700;">Start a Project / Contact <span>→</span></a>
    </div>

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
  </nav>`;

// The standardized Complete Navbar CSS Block
const newNavCss = `/* ==========================================================================
     NAVBAR (Synchronized System)
     ========================================================================== */
    .nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
      transition: box-shadow 0.25s ease, background 0.25s ease;
    }

    .nav.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      background: rgba(255, 255, 255, 0.98);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
      gap: clamp(14px, 2.2vw, 32px);
      position: relative;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      text-decoration: none;
    }

    .nav-logo {
      height: 22px;
      width: auto;
      object-fit: contain;
      display: block;
    }

    .nav-links {
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

    /* Dropdown & Mega Menu System - Symmetrically Centered in Header */
    .nav-item-dropdown {
      position: static;
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
      display: none;
      position: absolute;
      top: 56px;
      left: 0;
      right: 0;
      height: 28px;
      content: "";
      pointer-events: auto;
      z-index: 290;
    }

    .nav-item-dropdown:hover .mega-menu-bridge,
    .nav-item-dropdown:focus-within .mega-menu-bridge {
      display: block;
    }

    .mega-menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%) translateY(12px);
      width: 820px;
      max-width: 94vw;
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

    .mega-menu::before {
      content: "";
      position: absolute;
      top: -16px;
      left: 0;
      right: 0;
      height: 20px;
      background: transparent;
    }

    .mega-menu.mega-menu-left {
      left: 50%;
      transform: translateX(-50%) translateY(12px);
    }

    .nav-item-dropdown:hover .mega-menu,
    .nav-item-dropdown:focus-within .mega-menu {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }

    .nav-item-dropdown:hover .mega-menu.mega-menu-left,
    .nav-item-dropdown:focus-within .mega-menu.mega-menu-left {
      transform: translateX(-50%) translateY(0);
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
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }

    .mega-menu-col,
    .mega-menu-col-left,
    .mega-menu-col-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      gap: 5px;
    }

    .mega-link-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px;
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
      width: 38px;
      height: 38px;
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
      font-size: 0.90rem;
      font-weight: 700;
      color: var(--ink-primary);
      margin-bottom: 2px;
    }

    .mega-link-card:hover .mega-title {
      color: var(--brand-emerald-dark);
    }

    .mega-link-card-body .mega-desc {
      font-size: 0.76rem;
      color: var(--ink-muted);
      line-height: 1.3;
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

    .mega-menu-footer {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .mega-footer-left {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--ink-muted);
      font-size: 0.80rem;
    }

    .mega-footer-link {
      font-family: var(--font-heading);
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--brand-emerald-dark);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition);
      white-space: nowrap;
    }

    .mega-footer-link:hover {
      color: var(--brand-emerald-light);
      transform: translateX(2px);
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
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mega-feature-card:hover {
      border-color: var(--brand-emerald-border);
      box-shadow: 0 8px 24px rgba(4, 148, 73, 0.12);
      transform: translateY(-2px);
    }

    .mega-feature-thumb {
      height: 140px;
      width: 100%;
      position: relative;
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
      top: 10px;
      left: 10px;
      background: rgba(16, 22, 32, 0.82);
      color: #34d399;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      backdrop-filter: blur(8px);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: 1px solid rgba(52, 211, 153, 0.3);
    }

    .mega-feature-body {
      padding: 14px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .mega-feature-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-heading);
      font-size: 0.94rem;
      font-weight: 700;
      color: var(--ink-primary);
      margin-bottom: 4px;
    }

    .mega-feature-card:hover .mega-feature-title {
      color: var(--brand-emerald-dark);
    }

    .mega-feature-desc {
      font-size: 0.8rem;
      color: var(--ink-muted);
      margin: 0;
      line-height: 1.4;
    }

    .nav-burger {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--bg-alt);
      border: 1px solid var(--border-light);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      padding: 0;
      transition: var(--transition);
    }

    .nav-burger span {
      width: 20px;
      height: 2px;
      background: var(--ink-primary);
      border-radius: 2px;
      transition: var(--transition);
    }

    .nav-burger.is-active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .nav-burger.is-active span:nth-child(2) {
      opacity: 0;
    }

    .nav-burger.is-active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .mobile-panel {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-light);
      padding: 16px 24px 24px;
      box-shadow: var(--shadow-lg);
      flex-direction: column;
      gap: 12px;
      animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .mobile-panel.is-open {
      display: flex;
    }

    .mobile-panel a {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ink-primary);
      text-decoration: none;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mobile-panel a:last-child {
      border-bottom: none;
    }

    @media (max-width: 960px) {
      .nav-links,
      .nav-actions .btn {
        display: none;
      }
      .nav-burger {
        display: flex;
      }
    }`;

// Apply across all 7 files
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // 1. Replace CSS
  const cssPattern = /\/\* =+[\r\n\s]+NAVBAR \(Synchronized System\)[\s\S]*?\.nav-burger \{ display: flex; \}\s*\}/;
  if (!cssPattern.test(content)) {
    console.error(`CSS pattern failed in ${f}`);
  } else {
    content = content.replace(cssPattern, newNavCss);
  }

  // 2. Replace HTML
  const navStart = content.indexOf('<nav class="nav" id="siteNav">');
  const navEnd = content.indexOf('</nav>') + 6;
  if (navStart === -1 || navEnd === -1) {
    console.error(`HTML nav not found in ${f}`);
  } else {
    content = content.slice(0, navStart) + newNavHtml + content.slice(navEnd);
  }

  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f}`);
});
