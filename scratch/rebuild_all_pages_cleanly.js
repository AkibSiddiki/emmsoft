const { execSync } = require('child_process');
const fs = require('fs');

// 1. Extract the synchronized NAVBAR CSS from index.html (lines 338 to 844)
const indexHtml = fs.readFileSync('index.html', 'utf8');
const navCssMarkerStart = '/* ==========================================================================\n     NAVBAR (Synchronized System)\n     ========================================================================== */';
const navCssMarkerEnd = '    @media (max-width: 960px) {\n      .nav-links,\n      .nav-actions .btn {\n        display: none;\n      }\n      .nav-burger {\n        display: flex;\n      }\n    }';

const navCssStartIdx = indexHtml.indexOf(navCssMarkerStart);
const navCssEndIdx = indexHtml.indexOf(navCssMarkerEnd);

if (navCssStartIdx === -1 || navCssEndIdx === -1) {
  console.error('Failed to locate navbar CSS in index.html!');
  process.exit(1);
}

const synchronizedNavCss = indexHtml.slice(navCssStartIdx, navCssEndIdx + navCssMarkerEnd.length);
console.log('Synchronized Nav CSS length:', synchronizedNavCss.length);

// 2. Extract the synchronized Navbar HTML from index.html
const navHtmlStartIdx = indexHtml.indexOf('<nav class="nav" id="siteNav">');
const navHtmlEndIdx = indexHtml.indexOf('</nav>') + 6;
const synchronizedNavHtml = indexHtml.slice(navHtmlStartIdx, navHtmlEndIdx);
console.log('Synchronized Nav HTML length:', synchronizedNavHtml.length);

// Define file sources
const sources = {
  'about.html': {
    headContent: execSync('git show HEAD:about.html').toString(),
    pageCssMarker: '/* ==========================================================================\n       ABOUT PAGE HERO & SECTIONS'
  },
  'team.html': {
    headContent: execSync('git show HEAD:team.html').toString(),
    pageCssMarker: '/* ==========================================================================\n       HERO SECTION (BRAC IT Inspired Header, eMMSOFT Theme)'
  },
  'ceo-message.html': {
    headContent: execSync('git show HEAD:ceo-message.html').toString(),
    pageCssMarker: '/* ==========================================================================\n       CEO MESSAGE HERO'
  },
  'cto-message.html': {
    headContent: execSync('git show HEAD:cto-message.html').toString(),
    pageCssMarker: '/* ==========================================================================\n       CTO MESSAGE HERO'
  },
  'contact.html': {
    headContent: execSync('git show HEAD:contact.html').toString(),
    pageCssMarker: '/* ==========================================================================\n       CONTACT & PROPOSAL PAGE SPECIFIC STYLES'
  },
  'work.html': {
    headContent: fs.readFileSync('scratch/original_work.html', 'utf8'),
    pageCssMarker: '/* ==========================================================================\n       WORK HERO SECTION'
  }
};

for (const [filename, info] of Object.entries(sources)) {
  const orig = info.headContent;
  
  // 1. Get base tokens (from start of file to start of navbar CSS in original)
  let baseCssEndIdx = -1;
  const possibleNavComments = [
    '/* ==========================================================================\n       NAVBAR',
    '/* ==========================================================================\n     NAVBAR',
    '/* Navbar */',
    '/* ==========================================================================\n       NAVBAR (Synchronized with index.html)'
  ];
  for (const c of possibleNavComments) {
    const idx = orig.indexOf(c);
    if (idx !== -1) {
      baseCssEndIdx = idx;
      break;
    }
  }

  if (baseCssEndIdx === -1) {
    console.error(`Could not find base CSS end in ${filename}`);
    continue;
  }

  const basePart = orig.slice(0, baseCssEndIdx);

  // 2. Get page-specific CSS (from pageCssMarker to </style>)
  const pageCssStartIdx = orig.indexOf(info.pageCssMarker);
  if (pageCssStartIdx === -1) {
    console.error(`Could not find page CSS marker in ${filename}`);
    continue;
  }
  const styleEndIdx = orig.indexOf('</style>', pageCssStartIdx);
  const pageCssPart = orig.slice(pageCssStartIdx, styleEndIdx);

  // 3. Assemble complete new style tag:
  const combinedHead = `${basePart}    ${synchronizedNavCss}\n\n    ${pageCssPart}\n  </style>`;

  // 4. Get HTML body: from </style> to </head><body><nav...>
  // We replace the original <nav ... </nav> with synchronizedNavHtml
  const origNavStart = orig.indexOf('<nav class="nav" id="siteNav">');
  const origNavEnd = orig.indexOf('</nav>', origNavStart) + 6;

  if (origNavStart === -1 || origNavEnd === -1) {
    console.error(`Could not find nav in body of ${filename}`);
    continue;
  }

  const headToNav = orig.slice(styleEndIdx + '</style>'.length, origNavStart);
  let afterNav = orig.slice(origNavEnd);

  // Ensure footer links in afterNav point to work.html
  afterNav = afterNav.replace(/<a href=["'](?:index\.html)?#projects["']>([^<]+)<\/a>/g, '<a href="work.html">$1</a>');

  const finalHtml = combinedHead + headToNav + synchronizedNavHtml + afterNav;
  fs.writeFileSync(filename, finalHtml, 'utf8');
  console.log(`Successfully rebuilt ${filename} (Size: ${finalHtml.length} bytes, Style length: ${synchronizedNavCss.length + pageCssPart.length})`);
}
