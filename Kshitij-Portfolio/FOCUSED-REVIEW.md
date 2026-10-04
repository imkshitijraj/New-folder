# Focused production review — 2026-10-04

## Assessment

**NEEDS FIXES for deployment sign-off:** nested missing URLs still receive GitHub's default 404. The targeted local frontend changes pass the available regression checks. No new P0 issue was confirmed. This pass did not publish or push the site.

## Inspection and changes

Inspected `index.html`, `404.html`, all CSS, `main.js`, `theme-init.js`, README, the earlier audit, the resume and existing asset inventory (original portrait, two WebP variants, favicon, local fonts/licenses), and repository/configuration context. No framework or production dependency was added.

Changed:

- `index.html`: reduced repeated descriptions across five sections (approximately 1,094 to 778 words using the saved counting script). Work describes artifacts/evidence; Experience retains roles, dates and responsibilities; Domains states capabilities; About provides personal direction. Replaced broad process captions with concrete actions. Contact now explicitly prepares an email draft without sending it.
- `assets/css/style.css`: consolidated late overrides into their components and existing breakpoints; corrected About's two-fact grid; fixed enlarged-text wrapping/header geometry and a skip link that became partially visible at 200% text. The decorative monogram stays legible while the actual brand text scales.
- `assets/js/main.js`: scroll-spy activation derives from shared scroll padding/header geometry; header switches to compact controls if enlarged text no longer fits; desktop drawer recovery follows actual control visibility; clipboard failures and draft feedback state the next action clearly.
- `README.md` and this report: documented the contact contract, fresh QA and unresolved deployment requirement.

Preserved: masthead, portrait, palette, local fonts, varied case-study compositions, resume PDF/access, static architecture, empty `FORM_ENDPOINT`, two-step Prepare Email → Open email draft flow, no-JavaScript email access, drawer dialog/inertness/focus/scroll behavior and restrained motion.

Before intentional layout fixes, CSS consolidation was compared against the original across 22 theme/viewport combinations and 38 computed properties on every body element: zero differences in the sampled properties. This is bounded computed-style evidence, not a pixel-identical proof.

## Fresh regression evidence

Raw JSON, screenshots, scripts, PDF and Lighthouse HTML reports are saved locally in `tmp/focused-qa/` (ignored by Git; retain/copy this directory when sharing the audit). These are new runs, not the earlier report's scores.

| Area | Results and evidence |
| --- | --- |
| Responsive | Both themes at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 and 1200/1201; also 820, 993 and 1000. No horizontal overflow/header collision; portrait loaded. `layout-results.json`, full-page screenshots. |
| Enlarged text | 200% root text at all 11 requested widths in both themes: no overflow/clipped header controls. Labels wrap at narrow widths. `stress-results.json`, `text200-*.png`. Native browser UI zoom: NOT VERIFIED; this test specifically enlarges CSS text. |
| Stress | 568×320, 667×280 and 320×240 drawers support reverse/forward wrapping and visible last control. Long contact values reflow. Reduced viewport simulates keyboard obstruction and retains input; physical virtual keyboard behavior: NOT VERIFIED. |
| Functional browsers | Fresh Edge and Chrome behavioral suites: 67 assertions each. Skip link/destination focus, drawer semantics/inertness/Escape/focus return/resize, theme persistence, clipboard success, validation, encoded draft, retained values, reduced motion, print rules, metadata, PDF and local 404 covered. `behavior-msedge.json`, `behavior-chrome.json`. |
| Failure handling | Blocked storage fallback and no-JavaScript email access pass. Clipboard denial/absent API have explicit feedback. Configured endpoint tests use interception only: acceptance, HTTP error, network failure, timeout, duplicate guard and draft retention. No real provider enabled; actual delivery: NOT VERIFIED. |
| Accessibility | axe at 390/1440 in both themes: zero violations; local custom 404 audits also zero. Error associations/live status checked in Chromium accessibility tree. Info/error/success contrast checked in both themes. Decorative-dot contrast needs human interpretation, not meaningful text. Spoken screen-reader announcements: NOT VERIFIED. |
| Static resources | No duplicate IDs, broken internal anchors, missing described-by targets, undefined classes or failing local resources. No external font/icon requests or page JS exceptions observed. `static-results.json`. |
| Print | Fresh six-page PDF rendered and visually reviewed; readable monochrome layout, content and contact/resume access retained. `print.pdf`, `print-sheet.png`. Physical printer output: NOT VERIFIED. |

Firefox and WebKit executables are unavailable; Safari and physical mobile devices unavailable: **NOT VERIFIED**. Chrome reports version 154.0.8037.93. Automated browser checks do not establish complete assistive-technology compatibility.

## Fresh Lighthouse measurements

| Build | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Local mobile | 95 | 100 | 100 | 100 |
| Local desktop | 100 | 100 | 100 | 100 |
| Existing live mobile | 98 | 100 | 100 | 100 |
| Existing live desktop | 100 | 100 | 100 | 100 |

Raw reports: `lighthouse-{local,live}-{mobile,desktop}.{json,html}`. These are lab measurements, not field Core Web Vitals or a guarantee on physical phones. The live build was measured separately; local edits were not deployed by this pass. Local measurements preceded the final skip-link/monogram-only CSS correction, which received targeted regression checks.

Portrait hover and header blur were profiled before deciding whether to change them: four 1440×900 lab runs with effects on/off had median frame intervals ~16.7 ms, p95 16.8–16.9 ms and no sampled intervals over 34 ms. Preserved both effects. Raw traces and `effect-profile.json` record the bounded desktop experiment; low-end mobile GPU behavior is NOT VERIFIED.

## Deployment and links

Confirmed base: `https://imkshitijraj.github.io/New-folder/Kshitij-Portfolio/` returns 200. Deployed canonical and social-image URLs use this prefix; image URL returns 200.

- Nested `/New-folder/Kshitij-Portfolio/missing/audit-oct04` returns HTTP 404 **but displays GitHub's default page**.
- Direct `/New-folder/Kshitij-Portfolio/404.html` returns 200 with the correct custom appearance, loaded assets and correct home/contact links.
- `/New-folder/404.html` returns GitHub's default 404. The publication-root custom error page is missing. Install the custom page there as part of deployment, then repeat the nested-route test. Host-level publication configuration is outside this child project's current files.

GitHub profile, INCUBES site, college-web and Project-Nexus repositories returned 200. LinkedIn returned 403 to automated access: **NOT VERIFIED**, not confirmed broken. All local resume links return the actual PDF. Raw `external-links.json`, `live-deployment.json`, `live-browser.json` and live screenshots retain evidence.

## Owner content and intentionally unchanged items

- Resume's **15+ months** remains unchanged; owner confirmation/start month is still required. A year range alone does not invalidate it.
- QA defect-report sample and ML notebook/results have not been supplied. Their independent-practice/technical-learning labels remain explicit. No evidence or outcomes were invented.
- NEXUS remains a concept/prototype; no production users or working integrations claimed.
- Responsibilities, dates, internship and education are owner-supplied/self-reported; independent substantiation is **NOT VERIFIED**. Public code/site links prove artifacts exist, not every contribution or employment claim.
- A better genuine portrait is optional. No AI image or speculative screenshot was added.
- A real form endpoint is optional; the honest email-draft workflow works without one. An enabled provider would require real acceptance/delivery testing.

Next release gate: publish the effective custom 404, deploy the reviewed files, and rerun the nested-route check. Obtain owner evidence as available; perform Safari/Firefox, physical mobile and spoken screen-reader checks before claiming coverage of those environments.
