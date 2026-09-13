import re

with open('pages/work.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CSS: Hero & Stats
old_hero_css = """    .work-hero {
      background: var(--bg-surface);
      padding: clamp(64px, 8vw, 104px) 0 clamp(48px, 6vw, 76px);
      border-bottom: 1px solid var(--border-light);
      position: relative;
    }

    .work-hero-inner {
      text-align: center;
      max-width: 860px;
      margin: 0 auto;
    }

    .work-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--brand-emerald-dark);
      background: var(--brand-emerald-tint);
      border: 1px solid var(--brand-emerald-border);
      padding: 5px 14px;
      border-radius: var(--radius-full);
      margin-bottom: 24px;
    }

    .work-hero-title {
      font-size: clamp(2.4rem, 4.6vw, 3.6rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.035em;
      color: var(--ink-primary);
      margin-bottom: 20px;
    }

    .work-hero-title .text-emerald {
      color: var(--brand-emerald-dark);
      background: linear-gradient(135deg, #049449 0%, #10b981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .work-hero-desc {
      font-size: clamp(1.05rem, 1.4vw, 1.18rem);
      color: var(--ink-secondary);
      line-height: 1.7;
      margin: 0 auto 40px;
      max-width: 720px;
      font-weight: 400;
    }

    /* Minimalist Metrics Strip */
    .work-metrics-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: clamp(16px, 3vw, 40px);
      padding: 20px 28px;
      background: var(--bg-main);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      max-width: 820px;
      margin: 0 auto;
    }

    .work-metric-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }

    .metric-val {
      font-family: var(--font-heading);
      font-size: 1.65rem;
      font-weight: 800;
      color: var(--ink-primary);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .metric-lbl {
      font-size: 0.78rem;
      color: var(--ink-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }

    .metric-sep {
      width: 1px;
      height: 32px;
      background: var(--border-light);
    }

    @media (max-width: 680px) {
      .metric-sep {
        display: none;
      }
      .work-metrics-strip {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding: 20px;
      }
    }"""

new_hero_css = """    .work-hero {
      background: var(--bg-surface);
      padding: clamp(44px, 5.5vw, 68px) 0 clamp(32px, 4vw, 48px);
      border-bottom: 1px solid var(--border-light);
      position: relative;
    }

    .work-hero-inner {
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
    }

    .work-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--brand-emerald-dark);
      background: var(--brand-emerald-tint);
      border: 1px solid var(--brand-emerald-border);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      margin-bottom: 14px;
    }

    .work-hero-title {
      font-size: clamp(2rem, 3.8vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--ink-primary);
      margin-bottom: 10px;
    }

    .work-hero-desc {
      font-size: clamp(0.96rem, 1.2vw, 1.08rem);
      color: var(--ink-secondary);
      line-height: 1.55;
      margin: 0 auto 20px;
      max-width: 560px;
      font-weight: 400;
    }

    /* Minimalist Inline Stat Ribbon */
    .work-hero-stats {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 6px 14px;
      padding: 7px 18px;
      background: var(--bg-main);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-full);
      font-size: 0.80rem;
      color: var(--ink-muted);
      font-family: var(--font-mono);
    }

    .work-hero-stats strong {
      color: var(--ink-primary);
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.88rem;
    }

    .work-hero-stats .stat-dot {
      color: var(--border-medium);
    }"""

assert old_hero_css in content, "old_hero_css not found!"
content = content.replace(old_hero_css, new_hero_css, 1)

# 2. Update CSS: Card styling (padding, gaps, no project-desc)
old_card_css = """.project-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      padding: 26px;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      position: relative;
      transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
    }

    .project-card:hover {
      border-color: rgba(4, 148, 73, 0.35);
      transform: translateY(-3px);
      box-shadow: 0 16px 36px -10px rgba(16, 24, 40, 0.08), 0 4px 12px rgba(4, 148, 73, 0.04);
    }

    .project-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }

    .project-logo-box {
      height: 36px;
      max-width: 150px;
      display: flex;
      align-items: center;
    }

    .project-logo-box img {
      max-height: 32px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      filter: grayscale(10%) contrast(1.02);
      transition: filter 0.2s ease;
    }

    .project-card:hover .project-logo-box img {
      filter: none;
    }

    .project-logo-monogram {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--ink-primary);
    }

    .project-logo-monogram .mono-icon {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 0.82rem;
      font-weight: 800;
    }

    .category-badge {
      font-family: var(--font-mono);
      font-size: 0.70rem;
      font-weight: 600;
      color: var(--ink-muted);
      background: var(--bg-alt);
      border: 1px solid var(--border-subtle);
      padding: 3px 9px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .project-card:hover .category-badge {
      color: var(--brand-emerald-dark);
      background: var(--brand-emerald-tint);
      border-color: var(--brand-emerald-border);
    }

    .project-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }

    .project-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: var(--ink-primary);
      line-height: 1.3;
      letter-spacing: -0.015em;
      margin: 0;
      transition: color 0.2s ease;
    }

    .project-card:hover .project-title {
      color: var(--brand-emerald-dark);
    }

    .project-arrow {
      color: var(--ink-faint);
      font-size: 1.05rem;
      line-height: 1;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
      flex-shrink: 0;
      margin-top: 3px;
    }

    .project-card:hover .project-arrow {
      color: var(--brand-emerald);
      transform: translate(3px, -3px);
    }

    .project-desc {
      font-size: 0.89rem;
      color: var(--ink-secondary);
      line-height: 1.6;
      margin: 0 0 16px 0;
      flex-grow: 1;
    }

    /* Minimalist Highlight Metric */
    .project-impact-line {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--bg-alt);
      border-radius: var(--radius-sm);
      margin-bottom: 16px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--brand-emerald-dark);
      letter-spacing: -0.01em;
      transition: background 0.2s ease;
    }

    .project-card:hover .project-impact-line {
      background: var(--brand-emerald-tint);
    }

    .impact-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--brand-emerald);
      flex-shrink: 0;
    }

    /* Quiet Tech Stack Tags */
    .tech-tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: auto;
      padding-top: 14px;
      border-top: 1px solid var(--border-light);
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.70rem;
      font-weight: 500;
      color: var(--ink-muted);
      background: transparent;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      transition: all 0.2s ease;
    }"""

new_card_css = """.project-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: 14px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      position: relative;
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    .project-card:hover {
      border-color: rgba(4, 148, 73, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -8px rgba(16, 24, 40, 0.06), 0 2px 8px rgba(4, 148, 73, 0.04);
    }

    .project-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .project-logo-box {
      height: 30px;
      max-width: 140px;
      display: flex;
      align-items: center;
    }

    .project-logo-box img {
      max-height: 28px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      filter: grayscale(10%) contrast(1.02);
      transition: filter 0.2s ease;
    }

    .project-card:hover .project-logo-box img {
      filter: none;
    }

    .project-logo-monogram {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.90rem;
      color: var(--ink-primary);
    }

    .project-logo-monogram .mono-icon {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 800;
    }

    .category-badge {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--ink-muted);
      background: var(--bg-alt);
      border: 1px solid var(--border-subtle);
      padding: 3px 8px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .project-card:hover .category-badge {
      color: var(--brand-emerald-dark);
      background: var(--brand-emerald-tint);
      border-color: var(--brand-emerald-border);
    }

    .project-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 12px;
    }

    .project-title {
      font-size: 1.10rem;
      font-weight: 700;
      color: var(--ink-primary);
      line-height: 1.3;
      letter-spacing: -0.015em;
      margin: 0;
      transition: color 0.2s ease;
    }

    .project-card:hover .project-title {
      color: var(--brand-emerald-dark);
    }

    .project-arrow {
      color: var(--ink-faint);
      font-size: 1rem;
      line-height: 1;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .project-card:hover .project-arrow {
      color: var(--brand-emerald);
      transform: translate(2px, -2px);
    }

    /* Minimalist Highlight Metric */
    .project-impact-line {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 10px;
      background: var(--bg-alt);
      border-radius: var(--radius-sm);
      margin-bottom: 12px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--brand-emerald-dark);
      letter-spacing: -0.01em;
      transition: background 0.2s ease;
    }

    .project-card:hover .project-impact-line {
      background: var(--brand-emerald-tint);
    }

    .impact-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--brand-emerald);
      flex-shrink: 0;
    }

    /* Quiet Tech Stack Tags */
    .tech-tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid var(--border-light);
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 500;
      color: var(--ink-muted);
      background: transparent;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      transition: all 0.2s ease;
    }"""

assert old_card_css in content, "old_card_css not found!"
content = content.replace(old_card_css, new_card_css, 1)

# 3. Update list view CSS to remove project-desc reference cleanly
old_list_css = """    .projects-grid.is-list-view .project-card {
      padding: 16px 22px;
      border-radius: var(--radius-md);
      display: grid;
      grid-template-columns: 170px 1.4fr 1.3fr auto;
      align-items: center;
      gap: 20px;
    }

    @media (max-width: 960px) {
      .projects-grid.is-list-view .project-card {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .projects-grid.is-list-view .project-card-header {
      margin-bottom: 0;
    }

    .projects-grid.is-list-view .project-desc {
      display: none;
    }

    .projects-grid.is-list-view .project-impact-line {
      margin-bottom: 0;
      background: transparent;
      padding: 0;
    }"""

new_list_css = """    .projects-grid.is-list-view .project-card {
      padding: 14px 20px;
      border-radius: var(--radius-md);
      display: grid;
      grid-template-columns: 160px 1.4fr 1.3fr auto;
      align-items: center;
      gap: 18px;
    }

    @media (max-width: 960px) {
      .projects-grid.is-list-view .project-card {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .projects-grid.is-list-view .project-card-header {
      margin-bottom: 0;
    }

    .projects-grid.is-list-view .project-title-row {
      margin-bottom: 0;
    }

    .projects-grid.is-list-view .project-impact-line {
      margin-bottom: 0;
      background: transparent;
      padding: 0;
    }"""

assert old_list_css in content, "old_list_css not found!"
content = content.replace(old_list_css, new_list_css, 1)

# 4. Update Spotlight CSS
old_spotlight_css = """    .spotlight-content h2 {
      color: #ffffff;
      font-size: clamp(2rem, 3.4vw, 2.7rem);
      line-height: 1.2;
      letter-spacing: -0.025em;
      margin-bottom: 18px;
    }

    .spotlight-content p {
      color: #94a3b8;
      font-size: 1.02rem;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .spotlight-stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 32px 0 28px;
      padding-top: 24px;
      border-top: 1px solid var(--dark-800);
    }"""

new_spotlight_css = """    .spotlight-content h2 {
      color: #ffffff;
      font-size: clamp(1.8rem, 3vw, 2.4rem);
      line-height: 1.2;
      letter-spacing: -0.025em;
      margin-bottom: 14px;
    }

    .spotlight-content p {
      color: #94a3b8;
      font-size: 0.96rem;
      line-height: 1.65;
      margin-bottom: 0;
    }

    .spotlight-stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 26px 0 22px;
      padding-top: 20px;
      border-top: 1px solid var(--dark-800);
    }"""

assert old_spotlight_css in content, "old_spotlight_css not found!"
content = content.replace(old_spotlight_css, new_spotlight_css, 1)

# 5. Update HTML: Hero Section
old_hero_html = """  <!-- ==========================================================================
     HERO: OUR WORK & PORTFOLIO (MINIMALIST EDITORIAL)
     ========================================================================== -->
  <section class="work-hero">
    <div class="container work-hero-inner">
      <div class="work-eyebrow">
        <span class="pulse-dot"></span>
        Selected Engineering &amp; Production Deployments
      </div>
      <h1 class="work-hero-title">
        Production systems built for <span class="text-emerald">national scale</span> &amp; resilience.
      </h1>
      <p class="work-hero-desc">
        High-concurrency media engines, national repositories, institutional portals, and enterprise commerce platforms engineered and maintained by eMMSOFT.
      </p>

      <div class="work-metrics-strip">
        <div class="work-metric-item">
          <span class="metric-val">250+</span>
          <span class="metric-lbl">Systems Deployed</span>
        </div>
        <div class="metric-sep"></div>
        <div class="work-metric-item">
          <span class="metric-val">120M+</span>
          <span class="metric-lbl">Monthly Readers</span>
        </div>
        <div class="metric-sep"></div>
        <div class="work-metric-item">
          <span class="metric-val">500k+</span>
          <span class="metric-lbl">Peak Concurrency</span>
        </div>
        <div class="metric-sep"></div>
        <div class="work-metric-item">
          <span class="metric-val">99.99%</span>
          <span class="metric-lbl">Production SLA</span>
        </div>
      </div>
    </div>
  </section>"""

new_hero_html = """  <!-- ==========================================================================
     HERO: SELECTED WORK (CLEAN & MINIMAL)
     ========================================================================== -->
  <section class="work-hero">
    <div class="container work-hero-inner">
      <div class="work-eyebrow">Selected Work</div>
      <h1 class="work-hero-title">Engineering at Scale</h1>
      <p class="work-hero-desc">
        Production platforms engineered for high concurrency, national scale, and resilience.
      </p>
      <div class="work-hero-stats">
        <span><strong>250+</strong> Deployed</span>
        <span class="stat-dot">·</span>
        <span><strong>120M+</strong> Readers</span>
        <span class="stat-dot">·</span>
        <span><strong>500k+</strong> Peak CCU</span>
        <span class="stat-dot">·</span>
        <span><strong>99.99%</strong> SLA</span>
      </div>
    </div>
  </section>"""

assert old_hero_html in content, "old_hero_html not found!"
content = content.replace(old_hero_html, new_hero_html, 1)

# 6. Update HTML: Filter chips
old_chips_html = """      <div class="filter-chips-list" id="categoryFilterList" role="tablist">
        <button class="filter-chip is-active" data-cat="all">All <span class="chip-count">16</span></button>
        <button class="filter-chip" data-cat="newsrooms">Newsrooms &amp; Media <span class="chip-count">6</span></button>
        <button class="filter-chip" data-cat="ecommerce">Enterprise &amp; Retail <span class="chip-count">5</span></button>
        <button class="filter-chip" data-cat="academic">Academia &amp; Repositories <span class="chip-count">3</span></button>
        <button class="filter-chip" data-cat="corporate">Logistics &amp; Corporate <span class="chip-count">2</span></button>
      </div>"""

new_chips_html = """      <div class="filter-chips-list" id="categoryFilterList" role="tablist">
        <button class="filter-chip is-active" data-cat="all">All <span class="chip-count">16</span></button>
        <button class="filter-chip" data-cat="newsrooms">Newsrooms <span class="chip-count">6</span></button>
        <button class="filter-chip" data-cat="ecommerce">Enterprise <span class="chip-count">5</span></button>
        <button class="filter-chip" data-cat="academic">Academia <span class="chip-count">3</span></button>
        <button class="filter-chip" data-cat="corporate">Corporate <span class="chip-count">2</span></button>
      </div>"""

assert old_chips_html in content, "old_chips_html not found!"
content = content.replace(old_chips_html, new_chips_html, 1)

# 7. Update HTML: Spotlight Section
old_spotlight_html = """        <div class="spotlight-content">
          <div class="spotlight-eyebrow">
            Flagship Production Architecture
          </div>
          <h2>How eMMSOFT Powers 28M+ Readers with Zero Crashes</h2>
          <p>
            During breaking news events such as national elections or cyclone warnings, news portals typically experience traffic bursts of 500,000+ simultaneous readers. Standard databases lock up under write contention.
          </p>
          <p>
            Our architecture solves this through an Anycast edge caching mesh paired with a Redis in-memory query bus and Go microservices. Over 94% of page hits are absorbed at the edge without touching core application servers.
          </p>
          <div class="spotlight-stats-row">
            <div class="spotlight-stat-item">
              <div class="val">&lt; 40ms</div>
              <div class="lbl">Edge TTFB Response</div>
            </div>
            <div class="spotlight-stat-item">
              <div class="val">94.8%</div>
              <div class="lbl">Edge Cache Hit Ratio</div>
            </div>
            <div class="spotlight-stat-item">
              <div class="val">99.99%</div>
              <div class="lbl">Guaranteed SLA Uptime</div>
            </div>
          </div>
          <div style="margin-top:24px;">
            <a href="contact.html" class="btn btn-primary">Engineer Your Platform With Us →</a>
          </div>
        </div>"""

new_spotlight_html = """        <div class="spotlight-content">
          <div class="spotlight-eyebrow">
            Architecture Spotlight
          </div>
          <h2>Powering 28M+ Readers with Zero Crashes</h2>
          <p>
            Architected a high-concurrency headless newsroom with Anycast edge caching and an in-memory Redis bus — absorbing 94%+ of traffic at the edge with sub-40ms response times during national breaking events.
          </p>
          <div class="spotlight-stats-row">
            <div class="spotlight-stat-item">
              <div class="val">&lt; 40ms</div>
              <div class="lbl">Edge TTFB Response</div>
            </div>
            <div class="spotlight-stat-item">
              <div class="val">94.8%</div>
              <div class="lbl">Edge Cache Hit Ratio</div>
            </div>
            <div class="spotlight-stat-item">
              <div class="val">99.99%</div>
              <div class="lbl">Guaranteed SLA Uptime</div>
            </div>
          </div>
          <div style="margin-top:20px;">
            <a href="contact.html" class="btn btn-primary">Start a Project With Us →</a>
          </div>
        </div>"""

assert old_spotlight_html in content, "old_spotlight_html not found!"
content = content.replace(old_spotlight_html, new_spotlight_html, 1)

# 8. Update HTML: CTA Section
old_cta_html = """  <!-- ==========================================================================
     CALL TO ACTION (MINIMALIST)
     ========================================================================== -->
  <section class="cta-banner">
    <div class="container" style="max-width:740px;">
      <h2>
        Ready to take your next product to production?
      </h2>
      <p>
        Partner directly with eMMSOFT's Senior Systems Architects for a comprehensive architectural roadmap, scalability feasibility study, and production proposal within 4 business hours.
      </p>
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
        <a href="contact.html" class="btn btn-primary" style="padding:14px 28px;">Start a Project Proposal →</a>
        <a href="about.html" class="btn btn-secondary" style="background:transparent; color:#ffffff; border-color:var(--dark-600); padding:14px 26px;">Explore Our Story &amp; Tech</a>
      </div>
    </div>
  </section>"""

new_cta_html = """  <!-- ==========================================================================
     CALL TO ACTION (MINIMALIST)
     ========================================================================== -->
  <section class="cta-banner">
    <div class="container" style="max-width:640px;">
      <h2>
        Ready to build your next platform?
      </h2>
      <p>
        Architectural roadmaps, scalability analysis, and production proposals delivered within 4 business hours.
      </p>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <a href="contact.html" class="btn btn-primary" style="padding:12px 24px;">Start a Project →</a>
        <a href="about.html" class="btn btn-secondary" style="background:transparent; color:#ffffff; border-color:var(--dark-600); padding:12px 22px;">About eMMSOFT</a>
      </div>
    </div>
  </section>"""

assert old_cta_html in content, "old_cta_html not found!"
content = content.replace(old_cta_html, new_cta_html, 1)

# 9. Strip <p class="project-desc">...</p> from all cards and add data-search keywords
# Let's inspect the cards
search_keywords = {
    "bdnews24.com": "newsroom headless cms anycast edge caching election breaking news",
    "channel24bd.tv": "broadcast live video streaming television hls transcoding",
    "dhaka tribune": "broadsheet english newspaper daily multimedia reporting",
    "daily janakantha": "bengali newspaper print legacy news archive divisional",
    "walton": "electronics manufacturing product catalog distribution retail dealer",
    "step footwear": "shoes footwear retail checkout flash sales courier order dispatch",
    "pran-rfl": "fmcg food consumer goods global export brand supply chain",
    "itn-buet": "sanirepo sanitation cwis fsm national repository buet gis",
    "university of dhaka": "higher education university portal admission student academic",
    "hrc shipping": "ocean shipping maritime container tracking vessel bill of lading port",
    "diamond world": "diamond jewelry luxury gold rate vault checkout fraud defense",
    "ha-meem group": "garments textile apparel export conglomerate buyer compliance factory",
    "roma tiles": "ceramic tile manufacturing visualizer showroom dealer wholesale catalog",
    "banglavision": "satellite tv channel live stream breaking video broadcast television",
    "risingbd": "digital news online portal cricket live sports score syndication",
    "astronomical association": "astronomy space science celestial telescope observation"
}

# Regex to match each card and remove .project-desc
def clean_card(match):
    card_html = match.group(0)
    # Extract title
    title_m = re.search(r'<h3 class=\"project-title\">(.*?)</h3>', card_html)
    title = title_m.group(1).lower() if title_m else ""
    
    # Find keyword
    extra_keywords = ""
    for k, v in search_keywords.items():
        if k in title:
            extra_keywords = v
            break
            
    # Add data-search to <a ...>
    if extra_keywords:
        card_html = re.sub(r'<a\s+([^>]*class=\"project-card\"[^>]*)>', 
                           rf'<a \1 data-search="{extra_keywords}">', 
                           card_html, count=1)
                           
    # Remove <p class="project-desc">...</p> including surrounding whitespace/newlines
    card_html = re.sub(r'\s*<p class=\"project-desc\">.*?</p>\s*', '\n          ', card_html, flags=re.DOTALL)
    return card_html

content = re.sub(r'<a\s+[^>]*class=\"project-card\"[^>]*>.*?</a>', clean_card, content, flags=re.DOTALL)

# 10. Update JS to include data-search in search matching
old_js_search = """        const cat = card.getAttribute('data-category');
        const cardText = card.textContent.toLowerCase();

        const matchesCat = (currentCategory === 'all' || cat === currentCategory);
        const matchesQuery = (!query || cardText.includes(query));"""

new_js_search = """        const cat = card.getAttribute('data-category');
        const cardText = (card.textContent + ' ' + (card.getAttribute('data-search') || '')).toLowerCase();

        const matchesCat = (currentCategory === 'all' || cat === currentCategory);
        const matchesQuery = (!query || cardText.includes(query));"""

assert old_js_search in content, "old_js_search not found!"
content = content.replace(old_js_search, new_js_search, 1)

# Write output
with open('pages/work.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated pages/work.html!")
