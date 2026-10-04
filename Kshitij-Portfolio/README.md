# Kshitij Raj — Personal Portfolio

An editorial portfolio built with HTML, CSS, and vanilla JavaScript. The existing dark/light palette, oversized typography, portrait, and varied section layouts are intentional.

Production URL confirmed by the owner: **https://imkshitijraj.github.io/New-folder/Kshitij-Portfolio/**

## Project structure

- `index.html`: content, metadata, inline SVG icons, and Person JSON-LD.
- `404.html`: noindex page with deployment-aware asset and home links.
- `assets/css/style.css`: tokens, local fonts, layout, responsiveness, reduced motion, and print styles.
- `assets/js/theme-init.js`: early theme selection with safe storage fallback.
- `assets/js/main.js`: themes, modal navigation, scroll spy, clipboard, contact.
- `assets/fonts/`: Latin WOFF2 subsets of Inter and Plus Jakarta Sans, with OFL licenses.
- `assets/images/`: original portrait JPEG plus 320px and 640px WebP variants of the same photo.
- `assets/Kshitij-Raj-Resume.pdf`: supplied one-page resume; all resume links open this file.

No build step or production package dependencies are required. Serve the directory with any static server, for example `python -m http.server 3000`. For local 404 testing, mount the site at `/New-folder/Kshitij-Portfolio/` and serve `404.html` with HTTP 404 status for missing paths.

## Contact form configuration

`FORM_ENDPOINT` in `assets/js/main.js` is intentionally empty. The page explains that it prepares a draft for the visitor's email app, validates the fields, and creates an explicit **Open email draft** link after **Prepare Email**. Nothing is sent from this page. Direct email works without JavaScript.

To enable submission, set `FORM_ENDPOINT` to a real HTTPS service accepting JSON `{ name, email, message }`. It must allow this origin through CORS and return a successful HTTP status only when it accepts the submission. Adapt request/response handling if the chosen provider uses another contract; providers are not interchangeable. Never put secret API keys in frontend code.

The client prevents duplicate requests, makes fields read-only while sending, times out after 15 seconds, preserves drafts on failure, and resets only after HTTP success. Success means **accepted by the service**, not independently verified inbox delivery. Test the provider and actual mailbox before enabling it publicly.

## Content and evidence

- INCUBES: [university website](https://tint.edu.in/incubes) and [source repository](https://github.com/imkshitijraj/college-web).
- Free Fire MAX: independent practice; no public bug-report sample supplied. It is not presented as publisher employment.
- NEXUS: [concept/prototype repository](https://github.com/imkshitijraj/Project-Nexus); no claim of production deployment, users, or working integrations.
- ML: internship practice described in the supplied resume. No public notebook or measured results supplied.

Role descriptions and dates in the resume are self-reported, not independent verification. Avoid adding attendance figures, durations, awards, certificates, or performance outcomes without supporting evidence. No project screenshots are fabricated.

## Deployment notes

If the production URL changes, update canonical, OG/Twitter URLs and images, Person JSON-LD, and the deployment prefix in `404.html`. The current 404 page must also be installed at the hosting provider's effective error-page location. GitHub Pages may require a `404.html` at the repository publishing root; this workspace is a subdirectory, so verify routing after deployment.

Fresh verification on 2026-10-04 found that nested missing URLs return HTTP 404 with GitHub's default page. The custom page at `/New-folder/Kshitij-Portfolio/404.html` loads successfully, but `/New-folder/404.html` is missing. Install a copy of the custom page at the publishing root during deployment, retaining its existing portfolio prefix, then retest a nested missing URL. Editing the portfolio's child directory alone does not fix host-level error routing.

The portrait JPEG remains as an image fallback and social preview. Fonts are hosted locally under their included open licenses. The site makes no external font or icon requests.

## QA

See `FOCUSED-REVIEW.md` for the latest targeted pass and fresh test evidence. `PRODUCTION-READINESS.md` is the earlier audit. Temporary audit tools and artifacts live under ignored `tmp/`; they are not production dependencies.
