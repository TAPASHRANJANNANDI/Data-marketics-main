import * as babelParser from '@babel/parser';
import { homeFaqs } from './src/data/homeFaqs.js';
import { aboutFaqs } from './src/data/aboutFaqs.js';
import { faqs as featuresFaqs } from './src/data/featuresFaqs.js';
import fs from 'node:fs';
import blogs from './src/data/blogs.js';
import { SEO as technographicSEO } from './src/data/technographicSeo.js';
import {
  pageSchema,
  breadcrumbNode,
  ORG_ID,
  WEBSITE_ID,
  LOGO_URL,
} from './src/data/schema.js';
import { faqs as technographicFaqs } from './src/data/technographicFaqs.js';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { SOCIAL_URLS } from './src/data/social.js';

// Fills the Organization schema's "sameAs" in index.html from the shared
// social profile list, so the icons and the schema can never drift apart.
const socialSameAs = () => ({
    name: 'dm-social-same-as',
    transformIndexHtml(html) {
        const token = '"__SOCIAL_SAME_AS__"';
        if (!html.includes(token)) {
            throw new Error('index.html: the "sameAs" placeholder for the Organization schema is missing');
        }
        return html.replace(token, JSON.stringify(SOCIAL_URLS));
    },
});

const seoSourceHtml = () => ({
  name: 'dm-page-specific-seo-html',
  apply: 'build',

  closeBundle() {
    const dist = path.resolve('dist');
    const template = fs.readFileSync(
      path.join(dist, 'index.html'),
      'utf8'
    );

    // Generate homepage structured data in original HTML.
const homeJsonLd = pageSchema('/', {
  faqs: homeFaqs,
}).replace(/</g, '\\u003c');

const homeHtml = template.replace(
  '</head>',
  `  <script type="application/ld+json" data-react-helmet="true">${homeJsonLd}</script>\n</head>`
);

fs.writeFileSync(
  path.join(dist, 'index.html'),
  homeHtml
);

    const pages = {
  'about-us': 'About.jsx',
  'features': 'Features.jsx',
  'services': 'Services.jsx',
  'contact': 'Contact.jsx',

  'demand-generation': 'DemandGeneration.jsx',
  'b2b-lead-generation': 'B2BLeadGeneration.jsx',
  'data-enrichment': 'DataEnrichment.jsx',
  'intent-data': 'IntentData.jsx',
  'appointment-setting': 'AppointmentSetting.jsx',
  'exhibitors-data': 'ExhibitorsData.jsx',

  'industries/finance': 'industries/FinanceIndustry.jsx',
  'industries/healthcare': 'industries/HealthcareIndustry.jsx',
  'industries/manufacturing': 'industries/ManufacturingIndustry.jsx',
  'industries/saas': 'industries/SaaSIndustry.jsx',
  'industries/technology': 'industries/TechnologyIndustry.jsx',

  'sitemap': 'Sitemap.jsx',
  'privacy-policy': 'PrivacyPolicy.jsx',
  'blog': 'Blog.jsx',
};

// Existing FAQ locations for pages not using shared FAQ files.
const faqFiles = {
  '/appointment-setting': 'AppointmentSetting.jsx',
  '/b2b-lead-generation': 'B2BLeadGeneration.jsx',
  '/data-enrichment': 'DataEnrichment.jsx',
  '/intent-data': 'IntentData.jsx',

  '/industries/finance': 'industries/FinanceIndustry.jsx',
  '/industries/healthcare': 'industries/HealthcareIndustry.jsx',
  '/industries/manufacturing': 'industries/ManufacturingIndustry.jsx',
  '/industries/saas': 'industries/SaaSIndustry.jsx',
  '/industries/technology': 'industries/TechnologyIndustry.jsx',
};

// Read only static FAQ strings; do not execute JSX code.
const readPageFaqs = (filename) => {
  const source = fs.readFileSync(
    path.resolve('src/pages', filename),
    'utf8'
  );

  const ast = babelParser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const declarations = ast.program.body
    .filter(node => node.type === 'VariableDeclaration')
    .flatMap(node => node.declarations)
    .filter(node =>
      node.id.type === 'Identifier' &&
      node.id.name === 'faqs'
    );

  if (
    declarations.length !== 1 ||
    declarations[0].init?.type !== 'ArrayExpression'
  ) {
    throw new Error(`Cannot read FAQ array: ${filename}`);
  }

  const entries = declarations[0].init.elements;

  if (!entries.length) {
    throw new Error(`Empty FAQ array: ${filename}`);
  }

  return entries.map((entry, index) => {
    if (entry?.type !== 'ObjectExpression') {
      throw new Error(`Invalid FAQ ${index + 1}: ${filename}`);
    }

    const getText = (key) => {
      const property = entry.properties.find(prop =>
        prop.type === 'ObjectProperty' &&
        !prop.computed &&
        (prop.key.name ?? prop.key.value) === key
      );

      if (
        property?.value.type !== 'StringLiteral' ||
        !property.value.value.trim()
      ) {
        throw new Error(
          `Invalid FAQ ${key} at item ${index + 1}: ${filename}`
        );
      }

      return property.value.value;
    };

    return {
      q: getText('q'),
      a: getText('a'),
    };
  });
};

    for (const [route, filename] of Object.entries(pages)) {
      const source = fs.readFileSync(
        path.resolve('src/pages', filename),
        'utf8'
      );

      const helmet = source.match(
        /<Helmet>([\s\S]*?)<\/Helmet>/
      )?.[1];

      if (!helmet) {
        throw new Error(`SEO Helmet missing: ${filename}`);
      }

      const title = helmet.match(
        /<title>([\s\S]*?)<\/title>/
      )?.[1]?.trim();

      if (!title) {
        throw new Error(`SEO title missing: ${filename}`);
      }

      let html = template.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${title}</title>`
      );

      const tags = helmet.match(/<meta\b[^>]*\/>/g) || [];

      for (const tag of tags) {
  if (/\bcontent\s*=\s*\{/.test(tag)) {
    throw new Error(
      `Dynamic SEO meta tag needs special handling in ${filename}: ${tag}`
    );
  }
}

      for (const tag of tags) {
        const identity = tag.match(
          /\b(name|property)="([^"]+)"/
        );
        if (!identity) continue;

        const [, attribute, key] = identity;

        const existing = new RegExp(
          `<meta\\b(?=[^>]*\\b${attribute}="${key}")[^>]*>`,
          'gi'
        );

        html = html.replace(existing, '');
        const helmetTag = tag.replace(
  /\s*\/>$/,
  ' data-react-helmet="true" />'
);

html = html.replace(
  '</head>',
  `${helmetTag}\n</head>`
);
      }

      const canonical = helmet.match(
        /<link\s+rel="canonical"[^>]*\/>/
      )?.[0];

      if (canonical) {
        html = html.replace(
          /<link\b(?=[^>]*\brel="canonical")[^>]*>/gi,
          ''
        );
        const helmetCanonical = canonical.replace(
  /\s*\/>$/,
  ' data-react-helmet="true" />'
);

html = html.replace(
  '</head>',
  `${helmetCanonical}\n</head>`
);
      }

      // Place Title, Description and Keywords together
const moveMetaTag = (name) => {
  const regex = new RegExp(
    `<meta\\b(?=[^>]*\\bname="${name}")[^>]*>`,
    'i'
  );

  const match = html.match(regex);

  if (!match) {
    throw new Error(`Missing SEO meta tag: ${name}`);
  }

  html = html.replace(regex, '');
  return match[0];
};

const descriptionTag = moveMetaTag('description');
const keywordsTag = moveMetaTag('keywords');

html = html.replace(
  /(<title>[\s\S]*?<\/title>)/i,
  `$1\n  ${descriptionTag}\n  ${keywordsTag}`
);
// Add page-specific structured data to the original HTML.
const routePath = `/${route}`;

const pageFaqs = routePath === '/features'
  ? featuresFaqs.map(f => ({
      q: f.question,
      a: f.answer,
    }))
  : routePath === '/about-us'
    ? aboutFaqs
    : faqFiles[routePath]
      ? readPageFaqs(faqFiles[routePath])
      : undefined;

const pageJsonLd = pageSchema(
  routePath,
  { faqs: pageFaqs }
).replace(/</g, '\\u003c');

html = html.replace(
  '</head>',
  `  <script type="application/ld+json" data-react-helmet="true">${pageJsonLd}</script>\n</head>`
);
      const output = path.join(dist, route, 'index.html');

      fs.mkdirSync(path.dirname(output), {
        recursive: true,
      });

      fs.writeFileSync(output, html);
      console.log(`Generated SEO HTML: /${route}`);
    }
        // Generate SEO HTML for individual blog articles.
    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    for (const post of blogs) {
      for (const field of [
        'slug', 'title', 'metaTitle', 'metaDescription',
        'metaKeywords', 'heroImage', 'date'
      ]) {
        if (!post[field]) {
          throw new Error(`Blog SEO missing ${field}: ${post.slug || 'unknown'}`);
        }
      }

      const canonical = `https://datamarketics.com/blog/${post.slug}`;
      const imageUrl = `https://datamarketics.com${post.heroImage}`;

      let html = template.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(post.metaTitle)}</title>`
      );

      // Replace homepage description and keywords.
      html = html.replace(
        /<meta\b(?=[^>]*\bname="(?:description|keywords)")[^>]*>\s*/gi,
        ''
      );

      html = html.replace(
        /(<title>[\s\S]*?<\/title>)/i,
        `$1
  <meta name="description" content="${escapeHtml(post.metaDescription)}" />
  <meta name="keywords" content="${escapeHtml(post.metaKeywords)}" />`
      );

      // Remove homepage image-specific metadata.
      html = html.replace(
        /<meta\b(?=[^>]*\bproperty="og:image:[^"]+")[^>]*>\s*/gi,
        ''
      );

      html = html.replace(
        /<meta\b(?=[^>]*\bname="twitter:image:alt")[^>]*>\s*/gi,
        ''
      );

      const setMeta = (attribute, key, value) => {
        const existing = new RegExp(
          `<meta\\b(?=[^>]*\\b${attribute}="${key}")[^>]*>\\s*`,
          'gi'
        );

        html = html.replace(existing, '');
        html = html.replace(
          '</head>',
          `  <meta ${attribute}="${key}" content="${escapeHtml(value)}" />\n</head>`
        );
      };

      for (const [attribute, key, value] of [
        ['property', 'og:type', 'article'],
        ['property', 'og:title', post.title],
        ['property', 'og:description', post.metaDescription],
        ['property', 'og:url', canonical],
        ['property', 'og:image', imageUrl],
        ['property', 'article:published_time', post.date],
        ['name', 'twitter:card', 'summary_large_image'],
        ['name', 'twitter:title', post.title],
        ['name', 'twitter:description', post.metaDescription],
        ['name', 'twitter:image', imageUrl],
      ]) {
        setMeta(attribute, key, value);
      }

      html = html.replace(
        /<link\b(?=[^>]*\brel="canonical")[^>]*>\s*/gi,
        ''
      );

      html = html.replace(
        '</head>',
        `  <link rel="canonical" href="${escapeHtml(canonical)}" />\n</head>`
      );
      // Add BlogPosting and BreadcrumbList structured data.
const articleJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: post.title,
      description: post.metaDescription,
      image: imageUrl,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Data Marketics',
      },
      publisher: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Data Marketics',
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL,
        },
      },
      mainEntityOfPage: canonical,
      isPartOf: { '@id': WEBSITE_ID },
      inLanguage: 'en',
      keywords: [
        post.primaryKeyword,
        ...(post.secondaryKeywords || []),
      ].join(', '),
    },
    breadcrumbNode(
      [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        {
          name: post.title,
          path: `/blog/${post.slug}`,
        },
      ],
      `${canonical}#breadcrumb`
    ),
  ],
}).replace(/</g, '\\u003c');

html = html.replace(
  '</head>',
  `  <script type="application/ld+json" data-react-helmet="true">${articleJsonLd}</script>\n</head>`
);
// Prevent duplicate SEO tags when React Helmet loads.
const markHelmetTag = (tag) =>
  /data-react-helmet\s*=/.test(tag)
    ? tag
    : tag.replace(
        /(\s*\/?>)$/,
        ' data-react-helmet="true"$1'
      );

html = html.replace(
  /<meta\b(?=[^>]*\bname="(?:description|keywords)")[^>]*>/gi,
  markHelmetTag
);

html = html.replace(
  /<link\b(?=[^>]*\brel="canonical")[^>]*>/gi,
  markHelmetTag
);

      const output = path.join(dist, 'blog', post.slug, 'index.html');

      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, html);

      console.log(`Generated SEO HTML: /blog/${post.slug}`);
    }
        // Generate SEO HTML for Technographic Data.
    let techHtml = template.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(technographicSEO.title)}</title>`
    );

    // Remove the homepage description and keywords.
    techHtml = techHtml.replace(
      /<meta\b(?=[^>]*\bname="(?:description|keywords)")[^>]*>\s*/gi,
      ''
    );

    // Place the correct tags directly after the title.
    techHtml = techHtml.replace(
      /(<title>[\s\S]*?<\/title>)/i,
      `$1
  <meta name="description" content="${escapeHtml(technographicSEO.description)}" />
  <meta name="keywords" content="${escapeHtml(technographicSEO.keywords)}" />`
    );

    const techTags = [
      ['property', 'og:type', 'website'],
      ['property', 'og:title', technographicSEO.title],
      ['property', 'og:description', technographicSEO.description],
      ['property', 'og:url', technographicSEO.url],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', technographicSEO.title],
      ['name', 'twitter:description', technographicSEO.description],
    ];

    for (const [attribute, key, value] of techTags) {
      const existing = new RegExp(
        `<meta\\b(?=[^>]*\\b${attribute}="${key}")[^>]*>\\s*`,
        'gi'
      );

      techHtml = techHtml.replace(existing, '');
      techHtml = techHtml.replace(
        '</head>',
        `  <meta ${attribute}="${key}" content="${escapeHtml(value)}" />\n</head>`
      );
    }

    // Set the correct canonical URL.
    techHtml = techHtml.replace(
      /<link\b(?=[^>]*\brel="canonical")[^>]*>\s*/gi,
      ''
    );

    techHtml = techHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${escapeHtml(technographicSEO.url)}" />\n</head>`
    );
// Add Technographic Data page-specific structured data.
const techJsonLd = pageSchema('/technographic-data', {
  faqs: technographicFaqs,
}).replace(/</g, '\\u003c');

techHtml = techHtml.replace(
  '</head>',
  `  <script type="application/ld+json" data-react-helmet="true">${techJsonLd}</script>\n</head>`
);
// Prevent duplicate Technographic Data SEO tags.
const markTechHelmetTag = (tag) =>
  /data-react-helmet\s*=/.test(tag)
    ? tag
    : tag.replace(
        /(\s*\/?>)$/,
        ' data-react-helmet="true"$1'
      );

techHtml = techHtml.replace(
  /<meta\b(?=[^>]*\bname="(?:description|keywords)")[^>]*>/gi,
  markTechHelmetTag
);

techHtml = techHtml.replace(
  /<link\b(?=[^>]*\brel="canonical")[^>]*>/gi,
  markTechHelmetTag
);
    const techOutput = path.join(
      dist,
      'technographic-data',
      'index.html'
    );

    fs.mkdirSync(path.dirname(techOutput), { recursive: true });
    fs.writeFileSync(techOutput, techHtml);

    console.log('Generated SEO HTML: /technographic-data');
    // Generate page-specific HTML for Thank You (noindex).
let thankYouHtml = template
  .replace(
    /<title>[\s\S]*?<\/title>/i,
    '<title>Thank You | Data Marketics</title>'
  )
  .replace(
    /<meta\b(?=[^>]*\bname="description")[^>]*>/i,
    '<meta name="description" content="Thanks for reaching out — the Data Marketics team will get back to you within 24 hours." data-react-helmet="true" />'
  )
  .replace(
    /<meta\b(?=[^>]*\bname="keywords")[^>]*>\s*/i,
    ''
  )
  .replace(
    /<link\b(?=[^>]*\brel="canonical")[^>]*>/i,
    '<link rel="canonical" href="https://datamarketics.com/thank-you" data-react-helmet="true" />'
  )
  .replace(
    /<meta\b(?=[^>]*\bname="robots")[^>]*>/i,
    '<meta name="robots" content="noindex, follow" data-react-helmet="true" />'
  )
  .replace(
    /<meta\b(?=[^>]*\bproperty="og:[^"]*")[^>]*>\s*/gi,
    ''
  )
  .replace(
    /<meta\b(?=[^>]*\bname="twitter:[^"]*")[^>]*>\s*/gi,
    ''
  );

const thankYouOutput = path.join(dist, 'thank-you', 'index.html');

fs.mkdirSync(path.dirname(thankYouOutput), { recursive: true });
fs.writeFileSync(thankYouOutput, thankYouHtml);

console.log('Generated SEO HTML: /thank-you');
// Organize View Page Source for every indexable page and Thank You.
const formatSeoHead = (source) => source.replace(
  /(<head>)([\s\S]*?)(<\/head>)/i,
  (_, open, originalHead, close) => {
    const title = originalHead.match(
      /<title\b[^>]*>[\s\S]*?<\/title>/i
    )?.[0];

    if (!title) throw new Error('SEO formatter: missing title');

    let head = originalHead.replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/i,
      '__DM_SEO_TITLE__'
    );

    const take = (regex) => {
      const found = [];
      head = head.replace(regex, (tag) => {
        found.push(tag.trim());
        return '';
      });
      return found;
    };

    const description = take(/<meta\b(?=[^>]*\bname="description")[^>]*>/gi);
    const keywords = take(/<meta\b(?=[^>]*\bname="keywords")[^>]*>/gi);
    const canonical = take(/<link\b(?=[^>]*\brel="canonical")[^>]*>/gi);
    const robots = take(/<meta\b(?=[^>]*\bname="robots")[^>]*>/gi);
    const og = take(/<meta\b(?=[^>]*\bproperty="og:[^"]+")[^>]*>/gi);
    const twitter = take(/<meta\b(?=[^>]*\bname="twitter:[^"]+")[^>]*>/gi);
    const schemas = take(
      /<script\b(?=[^>]*\btype="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/gi
    );

    if (
      description.length !== 1 ||
      canonical.length !== 1 ||
      robots.length !== 1
    ) {
      throw new Error('SEO formatter: missing or duplicate core tag');
    }

    // Remove old section headings before recreating them.
    head = head.replace(
      /^[ \t]*<!--\s*(?:SEO Meta Tags|Open Graph Meta Tags|Twitter Card Meta Tags|Organization \+ WebSite Schema[^\r\n]*|Structured Data)\s*-->[ \t]*\r?\n/gim,
      ''
    );

    const prettySchemas = schemas.map((tag) => {
      const opening = tag.match(/^<script\b[^>]*>/i)[0];
      const json = tag.slice(opening.length, -'</script>'.length);

      const formatted = JSON.stringify(
        JSON.parse(json),
        null,
        2
      ).replace(/</g, '\\u003c');

      return `${opening}\n${formatted.split('\n').map(line => '    ' + line).join('\n')}\n  </script>`;
    });

    const sections = [
      [
        '<!-- SEO Meta Tags -->',
        title,
        ...description,
        ...keywords,
        ...canonical,
        ...robots
      ].join('\n  '),

      og.length
        ? ['<!-- Open Graph Meta Tags -->', ...og].join('\n  ')
        : '',

      twitter.length
        ? ['<!-- Twitter Card Meta Tags -->', ...twitter].join('\n  ')
        : '',

      prettySchemas.length
        ? ['<!-- Structured Data -->', ...prettySchemas].join('\n  ')
        : ''
    ].filter(Boolean);

    head = head.replace(
      '__DM_SEO_TITLE__',
      sections.join('\n\n  ')
    );

    head = head.replace(/(?:\r?\n[ \t]*){3,}/g, '\n\n');

    return open + head + close;
  }
);

// Include exactly the public sitemap pages and Thank You.
const sitemapXml = fs.readFileSync(
  path.join(dist, 'sitemap.xml'),
  'utf8'
);

const sitemapUrls = [
  ...sitemapXml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)
];

const seoHtmlFiles = [
  ...sitemapUrls.map((match) => {
    const route = new URL(match[1]).pathname
      .replace(/^\/+|\/+$/g, '');

    return path.join(dist, route, 'index.html');
  }),
  thankYouOutput
];

for (const file of new Set(seoHtmlFiles)) {
  const original = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, formatSeoHead(original));
}

console.log(
  `Organized View Page Source: ${new Set(seoHtmlFiles).size} pages`
);
  },
});


export default defineConfig({
    base: '/',
    plugins: [react(), socialSameAs(), seoSourceHtml()],
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
