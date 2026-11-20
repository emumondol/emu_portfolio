# Emdadul Haque Emu — Developer Portfolio

This site rebrands the repository's HTML/CSS/JavaScript starter for Emdadul Haque Emu. Clear Inter/Poppins typography, the navy/cyan palette, Boxicons styling, Typed.js headline effect, rounded buttons, and slide animations keep the original visual language. The starter wallpaper included another person's portrait, so the hero uses a matching abstract glow background and centered CSS rings. The light theme uses high-contrast text with frosted, glossy surfaces. The required portfolio sections and SENTI assistant extend that same style.

## Local development

To run the Netlify Function locally:

1. Install Node.js and the [Netlify CLI](https://docs.netlify.com/cli/get-started/).
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to a private Gemini API key. Never place a real key in browser code or commit it.
3. Run `netlify dev` from this folder and open the local URL it prints.

Without the function or an API key, SENTI uses built-in answers from verified portfolio information. The contact form validates entries and opens the visitor's email app with a prepared draft; it does not send email directly.

## Production build and deployment

- Run `node build.mjs` to create the static site in `dist/`. The build includes the abstract hero background and Emu's supplied profile image and certificate.
- Deploy this repository to Netlify using `netlify.toml`. Netlify runs the build script, publishes `dist/`, and deploys `netlify/functions/chat.mjs` separately.
- Set `GEMINI_API_KEY` in Netlify environment variables. Optionally set `GEMINI_MODEL` to a model enabled for that key; the current default is `gemini-3.6-flash`.
- Redeploy after setting environment variables. SENTI falls back to local portfolio answers if the function is unavailable.

## Verified content

GitHub's public profile API reported zero public repositories at inspection time. The Projects section offers clearly labeled interactive concepts until Emu can provide completed work; it does not present them as built projects. Emu supplied **HTML (85%)**, **JavaScript (70%)**, **Java (75%)**, **CSS (80%)**, and **C (85%)** as skill proficiency estimates. His academic details are **Software Engineering student at Daffodil International University**, with expected completion on **December 31, 2028**. The supplied PDFs verify Intellipaat's **Free SQL Certification Course**, issued **March 24, 2026** (certificate ID **25871-443-619275**), and participation in DIU's **Day Long Seminar on Career Planning Roadmap** on **April 16, 2026**.

The portrait in `assets/emu-profile-optimized.jpg` is a compressed copy of the supplied image; the original remains in the workspace root. `assets/certificate.pdf` and `assets/diu-career-planning-roadmap.pdf` are the supplied certificates and can be previewed from the Certifications section.

## Main files

- `index.html` — identity, required sections, navigation, contact form, and SENTI markup
- `stylesheet.css` — original visual language plus matching styles for new sections and mobile layouts
- `main.js` — Typed.js, navigation, theme persistence, contact draft, certificate preview, and SENTI behavior
- `netlify/functions/chat.mjs` — validated server-side Gemini integration and portfolio knowledge
- `build.mjs` — dependency-free production copy step
- `netlify.toml` — Netlify publish/function configuration and response headers
- `.env.example` — environment variable names only; no credentials

No Gemini API key was supplied, so live provider responses have not been tested. The existing Git remote still points to the starter author's repository; confirm or update it before pushing to a personal remote.
