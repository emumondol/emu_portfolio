# Emdadul Haque Emu — Developer Portfolio

A responsive static portfolio with SENTI, an offline FAQ assistant. SENTI answers questions about Emu's portfolio in English, Bangla, and Banglish; unrelated questions receive a brief scope message. No API key, external AI service, or backend is needed.

## Local preview

```sh
node build.mjs
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173`. The FAQ works locally and after deployment without environment variables.

## Build and tests

```sh
node build.mjs
node --test
node --check main.js
node --check faq.mjs
```

The build copies the static site into `dist/`. When `SITE_URL` is set, or Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is available, it generates the canonical URL, social preview URLs, `robots.txt`, and `sitemap.xml`. The generated Person structured data is included in the HTML.

## Deploy to Vercel

1. Import the repository into Vercel, or run `vercel` from the repository root.
2. The repository root and this portfolio folder both have Vercel configuration. At the repository root, the root `vercel.json` builds and serves this nested project; if you select this folder as **Root Directory**, its local `vercel.json` is used instead.
3. Keep the build command and output directory from the matching `vercel.json`; do not override them in Project Settings.
4. Deploy. No API key or environment variables are required for the portfolio or FAQ assistant.

Vercel injects the production URL into the build so the canonical link, Open Graph metadata, `robots.txt`, and sitemap use the deployed domain. Make sure **System Environment Variables** are enabled; otherwise set `SITE_URL` to the assigned HTTPS production domain. For a custom domain, set `SITE_URL` to its HTTPS origin and redeploy.

## Portfolio facts

Emu supplied **HTML (85%)**, **JavaScript (70%)**, **Java (75%)**, **CSS (80%)**, and **C (85%)** as skill estimates. He is a Software Engineering student at Daffodil International University, with expected completion on **December 31, 2028**. The supplied PDFs verify Intellipaat's **Free SQL Certification Course**, issued **March 24, 2026** (certificate ID **25871-443-619275**), and participation in DIU's **Day Long Seminar on Career Planning Roadmap** on **April 16, 2026**.

## Main files

- `index.html` — metadata, structured content, navigation, contact form, and SENTI markup
- `stylesheet.css` — responsive visual design and animations
- `main.js` — navigation, theme persistence, form behavior, certificate previews, and FAQ UI
- `faq.mjs` — offline FAQ topics, answers, and portfolio-only scope
- `build.mjs` — static build and SEO URL generation
- `vercel.json` — Vercel build and security-header configuration
- `test/faq.test.mjs` — FAQ behavior tests
- `.env.example` — optional custom-domain value for local builds; no API credentials
