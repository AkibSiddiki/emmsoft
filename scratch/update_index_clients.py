with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

single_set = """              <!-- 1. bdnews24.com -->
              <div class="client-logo-item" title="bdnews24.com - Bangladesh's First 24/7 Internet Newspaper">
                <img src="assets/clients/bdnews24.png" alt="bdnews24.com" loading="lazy" decoding="async">
              </div>

              <!-- 2. Channel 24 -->
              <div class="client-logo-item" title="Channel 24 - Leading 24/7 News & Infotainment Network">
                <img src="assets/clients/channel24.png" alt="Channel 24" loading="lazy" decoding="async">
              </div>

              <!-- 3. Samakal -->
              <div class="client-logo-item" title="Samakal - Top National Daily Broadsheet">
                <img src="assets/clients/samakal.png" alt="Samakal" loading="lazy" decoding="async">
              </div>

              <!-- 4. Daily Janakantha -->
              <div class="client-logo-item" title="Daily Janakantha - National Bengali Daily">
                <img src="assets/clients/janakantha.jpg" alt="Daily Janakantha" loading="lazy" decoding="async">
              </div>

              <!-- 5. Bangla Vision -->
              <div class="client-logo-item" title="Bangla Vision - Satellite TV & Digital News">
                <img src="assets/clients/banglavision.jpg" alt="Bangla Vision" loading="lazy" decoding="async">
              </div>

              <!-- 6. Rising BD -->
              <div class="client-logo-item" title="Rising BD - 24/7 Digital News Portal">
                <img src="assets/clients/risingbd.png" alt="Rising BD" loading="lazy" decoding="async">
              </div>

              <!-- 7. Step Footwear -->
              <div class="client-logo-item" title="Step Footwear - National Footwear Retail Brand">
                <img src="assets/clients/step_footwear.jpg" alt="Step Footwear" loading="lazy" decoding="async">
              </div>

              <!-- 8. Roma Tiles -->
              <div class="client-logo-item" title="Roma Tiles - Ceramic Tile Manufacturer & Visualizer">
                <img src="assets/clients/roma_tiles.png" alt="Roma Tiles" loading="lazy" decoding="async">
              </div>

              <!-- 9. Jatra Bangladesh -->
              <div class="client-logo-item" title="Jatra Bangladesh - Artisan Heritage & E-Commerce">
                <img src="assets/clients/jatra.png" alt="Jatra Bangladesh" loading="lazy" decoding="async">
              </div>

              <!-- 10. ITN-BUET -->
              <div class="client-logo-item" title="ITN-BUET - Centre for Water Supply & Waste Management">
                <img src="assets/clients/itn_buet.png" alt="ITN-BUET" loading="lazy" decoding="async">
              </div>

              <!-- 11. Sanirepo -->
              <div class="client-logo-item" title="Sanirepo - National Sanitation Knowledge Repository">
                <img src="assets/clients/sanirepo.png" alt="Sanirepo" loading="lazy" decoding="async">
              </div>

              <!-- 12. University of Dhaka -->
              <div class="client-logo-item" title="University of Dhaka (MCJ) - Department of Mass Communication & Journalism">
                <img src="assets/clients/dhaka_university_mca.png" alt="University of Dhaka MCJ" loading="lazy" decoding="async">
              </div>

              <!-- 13. HRC Shipping -->
              <div class="client-logo-item" title="HRC Shipping - Maritime Ocean Logistics Conglomerate">
                <img src="assets/clients/hrc_shipping.png" alt="HRC Shipping" loading="lazy" decoding="async">
              </div>

              <!-- 14. Angel Group -->
              <div class="client-logo-item" title="Angel Group - Industrial & Enterprise Conglomerate">
                <img src="assets/clients/angel_group.png" alt="Angel Group" loading="lazy" decoding="async">
              </div>"""

new_track = f"""            <div class="clients-track" id="clientsTrack">
{single_set}

              <!-- Seamless Infinite Loop Duplicate Set -->
{single_set}
            </div>"""

import re
content = re.sub(r'<div class=\"clients-track\" id=\"clientsTrack\">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>',
                 f'{new_track}\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>',
                 content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html clients track with authentic logos!")
