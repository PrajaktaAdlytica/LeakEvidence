# LeakEvidence local concept website

A responsive, locally served marketing website and isolated synthetic product demo. This is a concept preview, not operating utility software. Prepared for GitHub and regular Hostinger PHP/HTML hosting. Intended domain: leakevidence.com; DNS and hosting connection are not configured here. See HOSTINGER.md.

## Open and run

Current preview: http://127.0.0.1:4173/

```sh
python3 src/build.py
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open that localhost URL; opening HTML directly as file:// will not resolve root-relative links or demo modules. Stop the server with Ctrl+C. Python 3 is the only build dependency. No npm install is needed. To run the five demo integrity tests, use `node --test src/demo.test.mjs`. Static markup checks: `python3 src/check_site.py`.

## Implemented

- Evidence Atlas homepage: original district cutaway, warm paper and copper, Instrument Serif headings, five separate proposed offers and a five-chapter horizontal evidence journey.
- Instrument Room inner pages: technical typography, original instrument artwork and module-specific operational artifacts.
- Watershed Observatory: 8-second silent intro above the hero, with play/pause, replay, skip and poster fallback. Reduced-motion mode does not autoplay.
- 45 content/demo routes, three redirect routes, branded 404. Full route inventory: docs/routes.json.
- Ten internally consistent synthetic cases, queue filtering, evidence sources, missing pressure sample, competing explanations, local reviewer decisions, reset and reversible JSON/CSV/HTML packet exports.
- Evaluation, contact and demo-request forms with validation, separate consents, editable local summaries and downloadable local request. Nothing is transmitted.
- Responsive navigation, visible keyboard focus, Escape support, reduced-motion preference and an in-site motion control.
- Local fonts, brand logo, favicon, draft privacy/terms, methodology, references, data dictionary and sample evidence packet.

## Important boundaries

All case records, people, organizations and assets are fictional. Completed review does not mean verified leakage. Two historical field-confirmed demo records are explicitly simulated. No real customer testimonials, live status, savings, accuracy or traction claims are made. Prices remain test hypotheses.

Authentication is a polished preview with no backend. Forms do not email anyone. Analytics is a bounded, in-memory QA log with no collector. No production records, external integrations, dispatch, valve commands, payments or automatic field decisions exist. The legal pages are concept drafts, not completed legal review.

## Files

- src/build.py: page generator and original SVG artifact renderers.
- src/content.py: copy, five offers, ten cases and evidence manifest.
- src/site.css, src/atlas-v2.css, src/app.js: responsive styling, motion, navigation and local forms.
- src/charts.js: self-hosted Chart.js plots with explicit missingness; Chart.js license is in dist/assets/chart-LICENSE.md.
- design-qa.md: reference comparison and browser verification of the visual rebuild.
- src/demo-model.mjs: pure review/data/export logic; src/demo.js: workbench UI.
- dist/: generated site and self-hosted assets, including intro.mp4.
- docs/Design-and-Motion.md: section-level motion specification.
- docs/QA-and-Launch.md: checked behavior and remaining launch requirements.
- docs/screenshots/: actual browser captures at 1440 and 390 pixels wide.

The existing brand kit and architecture specifications are alongside this project in the parent outputs folder. The website resource downloads preserve the fuller product and validation specifications, including acquisition, ad tests and internal tracking scope.

## Hosting

Use the `hostinger` branch for Hostinger Custom PHP/HTML hosting; it contains ready-to-serve files at its root. The `main` branch retains editable source and generated assets. No Node.js runtime, PHP rewrite, database or server-side build is required. See HOSTINGER.md for setup and update instructions.

Vercel configuration is a legacy optional file and has not been applied. Hostinger and DNS are not connected by the GitHub push. Search indexing remains disabled for this concept preview.

Before activating lead capture: identify the legal controller, verified recipient inbox, retention/deletion process, consent handling, tested endpoint and spam protection. Replace local preview language only after successful real delivery tests.
