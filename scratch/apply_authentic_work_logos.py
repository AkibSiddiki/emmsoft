import re

new_grid_content = """      <div class="projects-grid" id="projectsGrid">

        <!-- 1. bdnews24.com -->
        <a href="https://bangla.bdnews24.com/" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="bdnews24 newsroom cms edge caching anycast digital news breaking">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/bdnews24.png" alt="bdnews24.com Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Newsroom CMS</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">bdnews24.com</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>28M+ Readers · &lt; 40ms TTFB · 100% SLA</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8.3 JIT</span>
            <span class="tech-tag">Redis Cluster</span>
            <span class="tech-tag">Next.js SSR</span>
            <span class="tech-tag">Cloudflare</span>
          </div>
        </a>

        <!-- 2. Channel 24 -->
        <a href="https://www.channel24bd.tv/" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="channel 24 broadcast satellite tv live stream television hls">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/channel24.png" alt="Channel 24 Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Broadcast News</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Channel 24 (channel24bd.tv)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Live HLS Stream · 15M+ Monthly Views</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Go Services</span>
            <span class="tech-tag">HLS Video CDN</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">Kubernetes</span>
          </div>
        </a>

        <!-- 3. Samakal -->
        <a href="https://samakal.com" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="samakal national daily broadsheet bengali news portal newspaper editorial">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/samakal.png" alt="Samakal Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">National Daily</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Samakal (samakal.com)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Top National Daily · High Concurrency</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8.3</span>
            <span class="tech-tag">Percona MySQL</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">NGINX Plus</span>
          </div>
        </a>

        <!-- 4. Daily Janakantha -->
        <a href="https://www.dailyjanakantha.com/" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="janakantha daily newspaper print broadsheet archive divisional">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/janakantha.jpg" alt="Daily Janakantha Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">National Daily</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Daily Janakantha</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>30+ Years News Archive · Sub-50ms TTFB</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8.2</span>
            <span class="tech-tag">Percona MySQL</span>
            <span class="tech-tag">Varnish Cache</span>
            <span class="tech-tag">NGINX Plus</span>
          </div>
        </a>

        <!-- 5. Bangla Vision -->
        <a href="https://www.bvnews24.com/" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="bangla vision bvnews24 television satellite live stream breaking news">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/banglavision.jpg" alt="Bangla Vision Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Satellite TV</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Bangla Vision (bvnews24.com)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Live Broadcast Stream · Sub-1s Publishing</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Headless News CMS</span>
            <span class="tech-tag">Go</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">Cloudflare CDN</span>
          </div>
        </a>

        <!-- 6. Rising BD -->
        <a href="https://www.risingbd.com/" target="_blank" rel="noopener" class="project-card" data-category="newsrooms" data-search="risingbd online portal cricket live sports score syndication news">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/risingbd.png" alt="Rising BD Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">24/7 Digital News</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Rising BD (risingbd.com)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>12M+ Monthly Readers · Live Sports API</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8.2</span>
            <span class="tech-tag">Varnish Cache</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">MySQL</span>
          </div>
        </a>

        <!-- 7. Step Footwear -->
        <a href="https://stepfootwear.com/" target="_blank" rel="noopener" class="project-card" data-category="ecommerce" data-search="step footwear ecommerce shoes fashion retail flash sales courier">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/step_footwear.jpg" alt="Step Footwear Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Footwear Retail</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Step Footwear Storefront</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>10,000+ Orders/hr · Zero Checkout Drops</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Laravel</span>
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">bKash/SSL Gateways</span>
          </div>
        </a>

        <!-- 8. Roma Tiles -->
        <a href="https://www.romatiles.com.bd" target="_blank" rel="noopener" class="project-card" data-category="ecommerce" data-search="roma tiles ceramic tile manufacturing showroom visualizer dealer">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/roma_tiles.png" alt="Roma Tiles Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Manufacturing</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Roma Tiles Product Showroom</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Interactive Visualizer · 500+ SKU Catalog</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Custom Web Engine</span>
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Image Optimizer</span>
          </div>
        </a>

        <!-- 9. Jatra Bangladesh -->
        <a href="https://www.jatrabangladesh.com/" target="_blank" rel="noopener" class="project-card" data-category="ecommerce" data-search="jatra bangladesh craft art fashion eco lifestyle indigenous handloom">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/jatra.png" alt="Jatra Bangladesh Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Artisan E-Commerce</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Jatra Bangladesh</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Heritage Craft Showcase · Global Shipping</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Custom E-Commerce</span>
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Multi-currency</span>
            <span class="tech-tag">SSL</span>
          </div>
        </a>

        <!-- 10. Jatra Biroti -->
        <a href="https://www.jatrabiroti.com/" target="_blank" rel="noopener" class="project-card" data-category="ecommerce" data-search="jatra biroti eco lounge arts culture music booking store">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/jatra_biroti.jpg" alt="Jatra Biroti Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Art &amp; Eco Store</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Jatra Biroti Community Store</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Cultural Lounge &amp; Store · Online Booking</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Web Platform</span>
            <span class="tech-tag">Laravel</span>
            <span class="tech-tag">bKash/Stripe</span>
            <span class="tech-tag">Redis</span>
          </div>
        </a>

        <!-- 11. Lucky Idea BD -->
        <a href="https://www.luckyideabd.com/" target="_blank" rel="noopener" class="project-card" data-category="ecommerce" data-search="lucky idea retail lifestyle goods shopping shopping cart">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/lucky_idea.png" alt="Lucky Idea BD Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Online Retail</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Lucky Idea BD</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Multi-vendor Catalog · Real-time Orders</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">E-Commerce CMS</span>
            <span class="tech-tag">MySQL</span>
            <span class="tech-tag">REST APIs</span>
            <span class="tech-tag">Redis</span>
          </div>
        </a>

        <!-- 12. ITN-BUET -->
        <a href="https://itn.buet.ac.bd/web/" target="_blank" rel="noopener" class="project-card" data-category="academic" data-search="itn buet water sanitation capacity wash training publications research">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/itn_buet.png" alt="ITN-BUET Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Water &amp; Sanitation</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">ITN-BUET Knowledge Portal</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>National WASH Capacity Centre · Publications</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8.2</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Cloudflare</span>
          </div>
        </a>

        <!-- 13. Sanitation Knowledge Repository -->
        <a href="https://www.sanirepo.com/" target="_blank" rel="noopener" class="project-card" data-category="academic" data-search="sanirepo sanitation repository cwis fsm gis mapping municipal data">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/sanirepo.png" alt="Sanirepo Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">National Repository</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Sanirepo (ITN-BUET)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>64 Districts GIS Tracking · CWIS Knowledge Hub</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PostgreSQL GIS</span>
            <span class="tech-tag">PHP 8.2</span>
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Data Visualizer</span>
          </div>
        </a>

        <!-- 14. University of Dhaka (MCA) -->
        <a href="https://www.mcj.du.ac.bd/" target="_blank" rel="noopener" class="project-card" data-category="academic" data-search="university of dhaka du mcj journalism communication academic portal faculty">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/dhaka_university_mca.png" alt="University of Dhaka MCJ Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Higher Education</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">University of Dhaka (MCJ)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Departmental Portal · Academic Archive</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">PHP 8</span>
            <span class="tech-tag">MySQL</span>
            <span class="tech-tag">NGINX Plus</span>
            <span class="tech-tag">Cloudflare SSL</span>
          </div>
        </a>

        <!-- 15. HRC Shipping -->
        <a href="http://www.hrcbd.com/" target="_blank" rel="noopener" class="project-card" data-category="corporate" data-search="hrc shipping maritime logistics container cargo vessel ocean port clearance">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/hrc_shipping.png" alt="HRC Shipping Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Maritime Logistics</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">HRC Shipping (HrcBd.com)</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Global Container Tracking · Automated B/L</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Enterprise Portal</span>
            <span class="tech-tag">REST APIs</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">SSL 256-bit</span>
          </div>
        </a>

        <!-- 16. Angel Group -->
        <a href="http://angelgroup.com.bd/" target="_blank" rel="noopener" class="project-card" data-category="corporate" data-search="angel group conglomerate corporate enterprise business units industrial">
          <div class="project-card-header">
            <div class="project-logo-box">
              <img src="../assets/clients/angel_group.png" alt="Angel Group Logo" loading="lazy" decoding="async">
            </div>
            <span class="category-badge">Enterprise Conglomerate</span>
          </div>
          <div class="project-title-row">
            <h3 class="project-title">Angel Group Enterprise</h3>
            <span class="project-arrow">↗</span>
          </div>
          <div class="project-impact-line">
            <span class="impact-dot"></span>
            <span>Industrial Conglomerate · Multi-subsidiary Hub</span>
          </div>
          <div class="tech-tags-row">
            <span class="tech-tag">Enterprise CMS</span>
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">Cloudflare CDN</span>
            <span class="tech-tag">REST APIs</span>
          </div>
        </a>

      </div>"""

with open('pages/work.html', 'r', encoding='utf-8') as f:
    work_html = f.read()

# Replace projectsGrid
work_html = re.sub(
    r'<div class=\"projects-grid\" id=\"projectsGrid\">.*?</div>\s*(?=<!-- Empty state)',
    new_grid_content + '\n\n      ',
    work_html,
    flags=re.DOTALL
)

with open('pages/work.html', 'w', encoding='utf-8') as f:
    f.write(work_html)

print("Updated pages/work.html with authentic projects and official logos!")
