# Production-readiness report — 4 October 2026

Outcome: **NEEDS FIXES before an unconditional production sign-off.** The local frontend pass is complete. Remaining gates are hosting the custom 404 correctly and confirming the self-reported experience/resume claims. Email-only contact is intentionally usable; a form backend is optional.

## 1. Files inspected

Every original project file: `index.html`, `404.html`, `assets/css/style.css`, `assets/js/main.js`, `README.md`, `assets/favicon.svg`, `assets/images/kshitij-portrait.jpg`, and `assets/Kshitij-Raj-Resume.pdf`. Read the full source, inspected the portrait, extracted the one-page PDF text, rendered it, and reviewed its layout. Inspected file inventory, Git status/history/remotes, and checked for project instructions/configuration. No framework, package manifest, deployment workflow, CNAME, or project AGENTS.md was present at the initial inspection.

Also inspected public INCUBES HTML, the owner's public repository listing, college-web repository contents/source, and Project-Nexus README/package metadata. Public source is evidence that an artifact exists, not independent proof of every responsibility claimed by its owner.

## 2. Files changed / added

Changed: `index.html`, `404.html`, `assets/css/style.css`, `assets/js/main.js`, `README.md`.

Added: `.gitignore` (ignores temporary QA files), `assets/js/theme-init.js`, `assets/fonts/inter-latin.woff2`, `assets/fonts/plus-jakarta-sans-latin.woff2`, their two OFL license files, `assets/images/kshitij-portrait-320.webp`, `assets/images/kshitij-portrait-640.webp`, and this report.

Original JPEG, favicon SVG, and supplied resume PDF remain unchanged. Temporary test scripts, screenshots, print rendering, reports, and audit-only npm tools are under ignored `tmp/qa/`; no production package dependencies were added.

## 3. Issues fixed

1. Empty-endpoint contact state is explained before entry; the button says Prepare Email.
2. Valid input creates an explicit encoded mailto draft, without automatic app launch or a sent-message claim.
3. Configured HTTPS endpoints receive JSON only after validation; success requires HTTP 2xx and says accepted by the service, not guaranteed inbox delivery.
4. Duplicate requests are guarded; fields become read-only while submitting; busy/disabled states reset in finally.
5. Network errors, HTTP errors, invalid configuration, and a 15-second timeout preserve the draft and expose email fallback.
6. Required fields and email validity are checked; all field errors are associated, aria-invalid is updated, and focus reaches the first invalid field.
7. No-JavaScript form submission is disabled with an explanatory direct-email fallback, preventing accidental query-string submission of the message.
8. Mobile dialog has its own close control, forward/reverse focus wrapping, background inertness, Escape, scroll locking, and focus restoration.
9. Section navigation focuses its destination; switching to desktop closes the drawer and restores focus to visible branding rather than a hidden button.
10. Scroll spy initializes immediately, updates after load/resize/scroll, and sets aria-current on desktop/mobile links.
11. Theme initialization validates saved values and tolerates unavailable storage on both pages. The 404 reuses the working theme controller and SVG icon.
12. Header switches to the drawer through 1200px, removing narrow-desktop collisions; branding, theme, and menu remain visible at 320px.
13. Removed page-wide overflow-x:hidden. Fixed actual wrapping/min-width constraints in contact links, tags, footer navigation, project buttons, and the compact project row.
14. Enlarged copy, navigation, secondary links, and social link hit areas to approximately 44px without enlarging their text.
15. Dark/light input borders, placeholders, focus outlines, and form feedback remain readable. Darkened the light-theme vermilion accent for small text contrast.
16. Removed the decorative active-production panel and duplicate project summary, preserving the original varied editorial compositions.
17. INCUBES now links directly to the reachable university website and verified public source repository. Its stack includes Bootstrap, observed in the published HTML.
18. NEXUS is explicitly a concept/frontend prototype and links directly to its public repository; proposed integrations are not represented as working services.
19. QA is clearly independent practice, with no publisher employment implication and no fabricated proof. Removed the unsourced duration statistic from the website.
20. ML copy now describes preprocessing/model evaluation from the supplied resume, without a predictive-performance claim or fake repository link.
21. Removed unsupported attendance, rankings, certification/ISO references, educational marks, awards/training entries, and Verified Roles wording. Removed obsolete exaggerated README claims as well.
22. Corrected canonical, OG/Twitter URLs/images, and Person URL to the owner-confirmed production URL. Replaced alumniOf with affiliation for a current undergraduate and removed unsupported employment structured data.
23. Corrected heading level for the ML project, retained the skip link/alt text, and removed obsolete metadata.
24. Replaced the blocking external icon font with inline SVG. Self-hosted the same typefaces with licenses; no runtime external font/icon requests remain.
25. Added WebP srcset and fetch priority while keeping the original portrait, crop, dimensions, JPEG fallback, and social preview. Original JPEG: 63,169 bytes; WebP: 13,826 bytes at 320px and 37,798 bytes at 640px.
26. Fixed 404 deployment-prefix asset/home links, undefined branding/icon classes, theme labels, skip link, noindex, mobile header spacing, and horizontal content padding.
27. Removed obsolete print-trigger JavaScript, unused panel CSS, duplicate declarations, and a noninteractive row hover shift. No transition:all or static inline style attributes remain.
28. Print now uses dark text on white paper in both themes, hides navigation/form/toasts, and avoids several awkward content splits. The printed website remains distinct from the one-page resume.

## 4. Intentionally preserved

Approved hero, oversized KSHITIJ RAJ typography, original portrait, desktop two-column composition, existing tablet stacking, editorial section layouts, token system, dark default, restrained light theme, minimal animation, resume PDF, and vanilla architecture. No artificial project visuals, invented achievements, frameworks, or backend infrastructure were introduced.

The casual portrait is the only genuine photo supplied. The PDF is an owner-supplied document and was not silently rewritten. No repository publish/push or hosting configuration change was performed by this task.

## 5. Remaining issues

- **Custom production 404 routing:** the live host returns GitHub Pages' default page for a nested missing URL. The revised custom page works in local nested-route tests, but must be placed/configured at the effective publishing root. This workspace is a subdirectory of the repository. Post-deployment custom routing: **NOT VERIFIED**.
- **Independent verification of experience:** resume-supported role descriptions/dates remain self-reported. Certificates, QA logs, and contribution records were not supplied.
- **Resume duration:** the unchanged PDF still says 15+ months. The site no longer repeats that duration; confirm the underlying dates or supply a corrected resume.
- **LinkedIn:** HTTP 403 prevented profile verification; do not interpret this as proof the profile is broken.
- **Form service:** intentionally unconfigured. Actual third-party service behavior and inbox delivery: **NOT VERIFIED**. Direct email is the supported current contact path.
- Hosting cache/compression behavior for the final build and real-user performance: **NOT VERIFIED**. Local Lighthouse flags cache policy and optional minification; these do not justify a framework/build migration.

## 6. Information/assets still needed

Confirm the TEC role and dates, Euphoria internship dates/scope, exact INCUBES contribution, and current BCA dates. Supply a redacted genuine QA report, NEXUS requirements document if it is to be advertised separately, and an ML notebook if that project should have public evidence. Provide certificates only if the removed training/award entries should return. Confirm the phone number and LinkedIn profile. Confirm or update the resume's 15+ months wording. A better genuine professional photograph is optional. A real form endpoint is needed only if direct submission is desired.

## 7. Responsive results

Chromium/Edge viewport emulation in both dark and light themes:

| Width | Main-page horizontal overflow | Header collision | Nested local 404 |
|---|---|---|---|
| 320 | None | None | Pass |
| 375 | None | None | Pass |
| 390 | None | None | Pass |
| 430 | None | None | Pass |
| 768 | None | None | Pass |
| 820 | None | None | Pass |
| 1024 | None | None | Pass |
| 1280 | None | None | Pass |
| 1440 | None | None | Pass |
| 1920 | None | None | Pass |

Additional main-page checks at 993, 1000, 1200, and 1201px also passed in both themes. Full-page screenshots were captured for the matrix; representative hero, Work, Contact, drawer, and 404 screenshots were visually reviewed. A 200% text-size check at 1280px showed no horizontal overflow. Physical iOS/Android devices, Safari, and Firefox: **NOT VERIFIED**.

## 8. Accessibility and functional results

- 67 automated behavioral assertions passed: skip link order/focus, theme persistence, blocked storage, drawer focus movement and wrapping, Escape, destination focus, scroll spy, resize reset, clipboard contents, required/email validation, mailto encoding, duplicate prevention, success/reset, HTTP/network failure, timeout/retained draft, reduced motion, print colors, local PDF link, metadata, and nested 404 behavior.
- Configured endpoint tests used intercepted requests; no external messages were sent. Timeout was shortened in the test copy of JS only; production remains 15 seconds.
- axe: zero violations at 390/1440px in both themes, zero in the open drawer, zero for feedback states in both themes, and zero across the 20 local 404 theme/width combinations. Automated contrast review leaves the two decorative separator dots incomplete; these are aria-hidden and carry no information. No WCAG conformance certification is claimed.
- No duplicate IDs, broken hash anchors, dangling aria-describedby references, undefined markup classes, failed image loads, external runtime asset requests, or main-page console/page errors detected.
- All resume links point to the genuine PDF; local and production PDF requests returned 200. PDF text extraction and one-page visual inspection passed. Browser print exported an eight-page readable website PDF; the print preview was visually reviewed.
- Actual screen-reader announcements, OS email-app launch, phone calls, and recipient mailbox delivery: **NOT VERIFIED**.

## 9. Lighthouse results

Lighthouse 13.5.0 on the local static preview, 4 October 2026. Mobile uses default simulated mobile throttling; desktop uses 1440×900, 40ms RTT, 10,240 Kbps throughput, and 1× CPU. Scores are laboratory measurements, not live-host or field guarantees.

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---|---|---|---|
| Mobile | 97 | 100 | 100 | 100 | 1.8s | 2.3s | 0ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.5s | 0.5s | 0ms | 0 |

Raw HTML/JSON reports: `tmp/qa/lighthouse-mobile.report.*` and `tmp/qa/lighthouse-desktop.report.*`. Other evidence: `layout-results.json`, `behavior-results.json`, `static-results.json`, and `external-links.json` in the same folder.

## 10. Link results

HTTP 200: confirmed portfolio URL, INCUBES website, college-web repository, Project-Nexus repository, GitHub profile, production portrait JPEG, and production resume PDF. All local anchors/assets/resume targets tested successfully. The old root canonical URL returned 404 and was corrected. LinkedIn returned 403: **NOT VERIFIED**, not classified as a confirmed broken link. No fabricated project URLs were added. QA/ML have no meaningless profile-root CTAs.

The live missing URL correctly returns HTTP 404 but displays the hosting default page; see remaining issue above.

## 11. Claims needing verification

Retained role names, dates, responsibilities, and educational dates are consistent with the supplied resume but **NOT VERIFIED independently**. The live INCUBES site and two repositories verify artifact existence; they do not prove project leadership, launch timeliness, production adoption, or individual ownership of every feature. No outcome metrics were retained. NEXUS runtime behavior was not audited, and live integrations are explicitly unverified. The removed marks, certificates, honors, language list, and duration claims should not be reinstated without evidence.

## 12. Final recommendation

**NEEDS FIXES** for production sign-off: deploy the reviewed files with correct custom 404 routing, confirm the resume/experience details, and manually confirm LinkedIn/contact details. The local frontend is ready for that review and deployment. An empty form endpoint is not a blocker because the email fallback is explicit and functional.

Recruiter review: identity, role areas, resume, and contact are immediate; INCUBES has inspectable public work; NEXUS is distinguishable from delivered work. The weakest evidence remains QA and ML, where real work samples would improve hiring confidence more than any additional decoration.
