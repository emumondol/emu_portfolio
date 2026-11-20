import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
const configuredSiteUrl = process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`);
let siteOrigin = '';

if (configuredSiteUrl) {
  let url;
  try {
    url = new URL(configuredSiteUrl);
  } catch {
    throw new Error('SITE_URL must be a valid absolute URL.');
  }
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && url.hostname === 'localhost')) {
    throw new Error('SITE_URL must use HTTPS (HTTP is allowed only for localhost).');
  }
  siteOrigin = url.origin;
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['stylesheet.css', 'main.js']) {
  await cp(new URL(`./${file}`, import.meta.url), new URL(`./dist/${file}`, import.meta.url));
}
await cp(new URL('./assets/', import.meta.url), new URL('./dist/assets/', import.meta.url), { recursive: true });

const sourceHtml = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emdadul Haque Emu',
  jobTitle: 'Software Engineering Student',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Daffodil International University'
  },
  knowsAbout: ['HTML', 'JavaScript', 'Java', 'CSS', 'C', 'SQL'],
  sameAs: [
    'https://github.com/emumondol',
    'https://www.linkedin.com/in/emdadul-haque-emu-93574b256'
  ]
};
if (siteOrigin) personSchema.url = `${siteOrigin}/`;

const seoMetadata = siteOrigin ? [
  `<link rel="canonical" href="${siteOrigin}/">`,
  `<meta property="og:url" content="${siteOrigin}/">`,
  `<meta property="og:image" content="${siteOrigin}/assets/emu-profile-optimized.jpg">`,
  '<meta property="og:image:type" content="image/jpeg">',
  '<meta property="og:image:width" content="1102">',
  '<meta property="og:image:height" content="1427">',
  '<meta property="og:image:alt" content="Portrait of Emdadul Haque Emu">',
  `<meta name="twitter:image" content="${siteOrigin}/assets/emu-profile-optimized.jpg">`
].join('\n  ') : '';
const html = sourceHtml
  .replace('<!-- BUILD_SEO_METADATA -->', seoMetadata)
  .replace('<!-- BUILD_PERSON_SCHEMA -->', `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`);
if (html.includes('<!-- BUILD_')) throw new Error('A build-time SEO marker was not replaced.');
await writeFile(new URL('./dist/index.html', import.meta.url), html);

const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/'];
if (siteOrigin) robots.push(`Sitemap: ${siteOrigin}/sitemap.xml`);
await writeFile(new URL('./dist/robots.txt', import.meta.url), `${robots.join('\n')}\n`);

if (siteOrigin) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteOrigin}/</loc></url>\n</urlset>\n`;
  await writeFile(new URL('./dist/sitemap.xml', import.meta.url), sitemap);
}

console.log('Production site copied to dist/');
console.log(siteOrigin
  ? `SEO canonical and sitemap generated for ${siteOrigin}`
  : 'No public site URL is configured; Vercel will inject its production domain during deployment.');
