# LeakEvidence reference rebuild — visual QA

final result: passed

Scope: local visual correction, 25 October 2026. This is a reference-led implementation, not a pixel-identical reproduction or production-readiness certification.

## Comparison evidence

Source visual truth: `/Users/prajaktagaikwad/Downloads/ChatGPT Image 25 Oct 2026, 19_38_40.png` (1024 × 1536 pixels).
Implementation: `http://127.0.0.1:4173/`.

The source and both implementation captures were opened together in the same comparison tool input. Browser chrome was excluded. The intro was skipped to match the source's hero state. Source width and rendered CSS width were both 1024 pixels; screenshots were 1:1 with CSS pixels. The browser capped the requested 1536px height at 1170px, so the hero/offers and anomaly were compared as separate captures rather than claiming identical full-page geometry. No screenshot stretching or image overlays were used.

- `docs/screenshots/reference-rebuild-1024.png`: 1024 × 1170, hero and five offers.
- `docs/screenshots/anomaly-v2-desktop.png`: 1024 × 1170, anomaly and beginning of journey.
- `docs/screenshots/homepage-v2-desktop.png`: 1440 × 1000.
- `docs/screenshots/homepage-v2-mobile.png`: 390 × 844.
- `docs/screenshots/anomaly-v2-mobile.png`: 390 × 844, selected billing explanation.
- `docs/screenshots/leak-proof-v2-desktop.png`: 1440 × 1000.
- `docs/screenshots/leak-proof-v2-mobile.png`: 390 × 844.
- `docs/screenshots/demo-charts-v2.png`: 1440 × 1000.

The anomaly capture is also the focused region comparison: sensor illustration, labels, three chart controls and active state are readable at native size. Product and operational-chart captures check the functional surfaces absent from the source mockup.

## Comparison history and fixes

| Priority | Earlier finding | Fix | Post-fix evidence |
|---|---|---|---|
| P1 | Hero art and type drifted from the selected direction | New original district cutaway, Instrument Serif, copper italic phrase, transparent image edges | Reference rebuild and desktop hero captures |
| P1 | Anomaly lacked the reference's distinctive visual | Original engraved sensor main, evergreen texture, three plotted explanations | Anomaly desktop and mobile captures |
| P1 | Tilts reduced structure and chart readability | Upright evidence cards, fixed chart containers and Chart.js plots | Journey inspected at chapter 02; demo charts capture |
| P2 | Sensor art stretched vertically | Explicit aspect/crop and responsive image dimensions | Anomaly desktop capture |
| P2 | Footer heading styling caused horizontal overflow | Scoped heading styles and constrained grid tracks | Document width equals viewport at 390, 1024 and 1440 |
| P2 | Five offers became three columns at reference width | Explicit five-column grid above 900px | Reference rebuild capture |
| P2 | Oversized case label and harsh paper texture | Smaller label, softened texture blend, transparent art background | Reference rebuild and product page captures |
| P2 | Hidden line breaks joined mobile words | Real whitespace around desktop line breaks | Mobile hero capture |
| P2 | Missing pressure could look like accidental chart breakage | Retained null gap with shaded interval and “Missing 02:30” label | Demo charts, inspected on desktop and mobile |

No remaining actionable P0/P1/P2 finding in the inspected states.

## Required fidelity surfaces

- Typography: editorial serif and italic hierarchy matches the source's intent; technical pages use Manrope. Desktop headline wrapping and mobile paragraph whitespace verified. The chosen serif is a close stylistic interpretation, not an assertion of the source's exact font.
- Layout: illustration occupies the right side without a floating image-card frame; five aligned offer columns; upright chart panels; mobile stacks content. Actual links and slightly longer explanatory copy make the offer section taller than the mockup.
- Colors: warm ivory, copper and evergreen restored; inner surfaces use pale sage and technical green. Texture is visible without overwhelming body text.
- Images: original district, sensor, atlas and instrument assets replace placeholder-like visuals. Transparent hero edges avoid a rectangular color seam. No generated UI is used as a functioning product screenshot.
- Content: specified headline and five modules preserved; suspected versus confirmed, source timestamps, pricing hypotheses and concept status remain visible. Demonstration charts do not imply measured detection performance.

Intentional differences: Observatory intro remains above the hero as previously requested. Anomaly cards are interactive buttons with a review explanation. Product pricing is detailed on product/pricing pages. The district illustration is original, not the exact reference artwork. Inner pages retain the separately approved Instrument Room direction.

## Interaction and functional verification

- Meter and billing buttons update the visible review question and selected state.
- Mobile navigation opens; Escape closes it.
- Horizontal journey next control advances to 02 / 05; cards remain upright and plots readable.
- Reduced-motion control disables pinned storytelling and intro autoplay; restored system preference afterward.
- Flow and pressure plots render, missingness remains explicit, and eight source measurements can be expanded.
- No console warnings/errors in the inspected demo session.
- Static checks pass for all 50 generated HTML files (45 content/demo routes plus redirects and error routes).
- Five existing synthetic data/review/export integrity tests pass.

Residual test limits: inspected in the in-app Chromium browser, not a complete cross-browser/device audit. Hover styling is implemented; active/keyboard/mobile states were exercised, but pointer-hover animation was not independently captured. Forms remain local previews and were not externally submitted. No live integration or delivery test was performed.

## Implementation checklist

Completed: reference comparison, replacement artwork, upright cards, chart rendering, responsive fixes, inner-page visuals, motion checks, screenshot evidence, local build verification.

Git, Vercel, DNS and publication remain untouched. This report does not clear production launch.

## Footer / CTA follow-up — 25 October 2026

Research-led update, distinct from the reference-image fidelity check above. Research evidence and decisions: docs/Footer-and-CTA-Research.html. Before evidence: docs/screenshots/footer-before.png. After: cta-v3-desktop.png, footer-v3-desktop.png, cta-v3-mobile.png, footer-v3-mobile.png and footer-v3-inner.png in docs/screenshots/.

Reviewed 1440×1000, 390×844 and 320×800 layouts. Fixed mismatched footer column tops by overriding inherited nav alignment. Fixed Back to top by moving its anchor off the sticky header to the body; verified scrollY returns to 0. Verified the general evaluation CTA chooses undecided, the Leak Proof CTA chooses leak-proof, and the secondary CTA opens the synthetic workbench. No request was submitted. Footer links remain visible on mobile; no document overflow observed. Main text-color pair calculations passed 4.5:1. Browser console reported no errors/warnings. Rechecked all 50 HTML files with the static checker. The visual scope passes; cross-browser and production launch remain outside this local update.

## Materials follow-up — 25 October 2026

Added contextual sand, clay, celadon, ochre and lilac backgrounds, individual module colors, mineral plaster, existing paper grain, CSS linen and drafting grids. Browser-inspected homepage offers, workbench, CTA and Leak Proof hero at 1440px; homepage offers and product hero at 390px. No horizontal overflow observed. Reduced dark-surface texture intensity after the first render made evidence and CTA panels too light. Final imagery: docs/screenshots/materials-v4-desktop.png, materials-v4-mobile.png, materials-v4-product.png and materials-v4-cta.png. Static markup checks pass for all 50 HTML files. No console errors/warnings in the inspected session. No interaction logic, deployment settings or operational claims changed.


## Scroll choreography QA
- Browser: Lenis initialized, 56 animated heading words on homepage, no console warnings/errors observed.
- Desktop 1440px: reverse card translation/opacity confirmed by computed styles; chapter Next moved 02/05 to 03/05; Skip intro and Back to top reached their targets.
- Mobile 390px: inner product hero readable, zero document horizontal overflow.
- Accessibility control: reduced mode removed all motion word wrappers, progress rule and Lenis classes; restoring system mode reinstated enhancement.
- Static route validation: 50 HTML files passed. Five demo integrity tests passed.
- No Git, Vercel, DNS or external form changes.


## Browser annotations — 775px spacing repair
Evidence story stacks below 1050px; card edges and heading now share 34.875px gutters at 775px. Cards use top-aligned content with 28px padding and 28px internal gaps, no clipped adjacent slide. Desktop retains the pinned horizontal story. First-engagement section gets a named class/anchor, top-aligned content and explicit action grouping; below 1050px it becomes one column with 28px content gaps and 24/28px action gaps. Verified at 775×804, 390×844 and 1440×1000: zero document overflow; desktop motion-ready and flex rail intact.
