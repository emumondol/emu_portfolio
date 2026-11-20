# Emdadul Haque Emu — Developer Portfolio

A responsive static portfolio with a Vercel Function for the optional SENTI AI assistant. The site uses the existing navy/cyan design, semantic HTML, accessible interactions, and responsive layouts.

## Local preview

```sh
node build.mjs
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173`. The chat uses its built-in verified-profile replies when the API is unavailable.

To run the Vercel Function locally, install the Vercel CLI and run `vercel dev` from this directory. Set `GEMINI_API_KEY` in Vercel Project Settings or in a private local environment file. Do not commit credentials.

## Build and tests

```sh
node build.mjs
node --test
node --check main.js
node --check api/chat.mjs
```

The build copies the static site into `dist/`. When `SITE_URL` is set, or Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is available, it also generates the canonical URL, social preview URLs, `robots.txt`, and `sitemap.xml`. The generated Person structured data is included in the HTML. On Vercel the production domain is used automatically; set `SITE_URL` to override it when using a custom domain.

## Deploy to Vercel

1. Import the repository into Vercel, or run `vercel` from this project directory.
2. If the repository contains multiple projects, set this folder as the Vercel **Root Directory**.
3. Keep the build settings from `vercel.json`: build command `node build.mjs`, output directory `dist`.
4. Add `GEMINI_API_KEY` in Vercel Project Settings > Environment Variables to enable live AI replies. `GEMINI_MODEL` is optional and defaults to `gemini-3.5-flash`.
5. Deploy. The `/api/chat` endpoint is deployed as a Vercel Function. If the key is not configured or the service is unavailable, SENTI clearly indicates that it is using local profile answers.

Vercel injects the production URL into the build so the canonical link, Open Graph metadata, `robots.txt`, and sitemap use the deployed domain. Make sure **System Environment Variables** are enabled in Vercel; otherwise set `SITE_URL` to the assigned HTTPS production domain. For a custom domain, set `SITE_URL` to its HTTPS origin and redeploy.

## Portfolio facts

Emu supplied **HTML (85%)**, **JavaScript (70%)**, **Java (75%)**, **CSS (80%)**, and **C (85%)** as skill estimates. He is a Software Engineering student at Daffodil International University, with expected completion on **December 31, 2028**. The supplied PDFs verify Intellipaat's **Free SQL Certification Course**, issued **March 24, 2026** (certificate ID **25871-443-619275**), and participation in DIU's **Day Long Seminar on Career Planning Roadmap** on **April 16, 2026**.

## Main files

- `index.html` — metadata, structured content, navigation, contact form, and SENTI markup
- `stylesheet.css` — responsive visual design and animations
- `main.js` — navigation, theme persistence, form behavior, certificate previews, and SENTI
- `api/chat.mjs` — validated Vercel Function for the Gemini API
- `build.mjs` — static build and SEO URL generation
- `vercel.json` — Vercel build, function, and security-header configuration
- `test/chat-api.test.mjs` — API validation and provider-response tests
- `.env.example` — environment variable names only; no credentials
