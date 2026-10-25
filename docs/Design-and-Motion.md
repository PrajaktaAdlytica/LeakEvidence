# LeakEvidence design and motion handoff

## Three directions, one brand

Homepage uses Evidence Atlas: paper surfaces, mineral-green ink, copper highlights, Instrument Serif editorial display type and original district illustration. Inner pages use Instrument Room: porcelain, charcoal, Manrope, IBM Plex Mono source labels, field instruments and functional evidence artifacts. Watershed Observatory is reserved for the intro above the homepage hero. Logo, palette, buttons, navigation and footer remain shared.

## Homepage storyboard

| Scene | Visual | Motion and interaction | Narrow/reduced-motion behavior |
|---|---|---|---|
| Intro | Fictional reservoir at dawn | 12s silent video. 0–6s gentle approach; 6–9s copper observation trace; 9–12s paper transition. DOM text changes from district story to evidence. Pause/replay and skip remain available. | Static poster initially; explicit play. No mandatory viewing or scroll lock. |
| Hero | Original architectural cutaway, intact underground pipes, suspected-case slip | Editorial composition and restrained button hover. First operational CTA immediately follows intro. | Stacked text/art, both CTAs and concept label retained. |
| Problem | Engraved sensor main on textured evergreen, with three functional mini charts | Buttons compare leakage, meter error and mismatched accounting windows. Missing data remains a visible gap. | Same controls, wrapped layout; textual explanation always available. |
| Five offers | Distinct module symbols, names and scopes; hypothesis pricing remains on offer and pricing pages | Delicate hover treatment, direct product links. | Separate stacked offers; no merged scope. |
| Evidence journey | Pale olive paper; five upright original evidence scenes | Native vertical scroll traverses the horizontal rail on sufficiently large desktop screens. Previous/next controls. No wheel interception. | Ordinary vertical sequence on mobile and reduced-motion; full content retained. |
| Workbench | Original fictional district schematic with contrasting suspected/historical-confirmed shapes | Link into real implemented local demo; map is illustrative, not live telemetry. | Map scales, text and source limitations remain readable. |
| Buying group | Three editorial role columns | Subtle link hover, routes to role-specific content. | Stacked role descriptions. One utility buying group, not three separate demand counts. |
| Authority boundary | Read-only evidence and utility-controlled field decisions | Central human-review boundary diagram. | Vertical arrangement with the same boundary statement. |
| Evidence scorecard | Three unmeasured evaluation criteria | Each explicitly says Not yet evaluated. No invented metrics or testimonials. | Stacked scorecard. |
| Evaluation and FAQ | Paper, protocol and clear paid ask | Native expandable FAQ, clear CTA; local form preview. | All text and controls available with keyboard/touch. |

## Inner pages

Leak Desk uses a balance ledger. Leak Review uses paired flow/pressure trends. Leak Proof combines source rows and competing explanations. Leak Signal uses a fictional district and reviewer-owned next step. Leak Report uses an illustrative evidence packet. Each has separate scope, exclusions, hypothesis price and evaluation CTA. Supporting pages use the same technical visual grammar rather than repeating the homepage hero.

## Motion implementation

Native CSS and small JavaScript controllers; no third-party animation runtime. Pinned story is enabled at width >=1050 and height >=700 only when motion is allowed. Other desktop layouts retain ordinary horizontal overflow; mobile and reduced motion stack the scenes. Transition timings are generally 180ms. The user can reduce site motion on /accessibility/; the preference lasts for the tab. OS reduced-motion also applies. Offscreen/hidden intro video pauses.

## Asset provenance

Original district and instrument images were generated for this project; prompts are in asset-prompts.json. Reservoir poster comes from the approved brand kit and is an illustrative fictional landscape. Intro is a rendered camera/graphic animation of that poster, not real utility footage. Charts are functional Chart.js canvases; the operational district schematic is original SVG. No competitor artwork, screenshots, logos or real assets were reused. Product screenshots in screenshots/ are real browser captures of this implementation, not generated UI.

Instrument Serif, Manrope and IBM Plex Mono are served locally with accompanying font license files. The atlas emblem and favicon follow the supplied reference; module icons and shared tokens retain the original brand kit. New image prompts are stored in the v2-prompt.txt files in this folder.

## Footer and CTA revision

Research and rationale: Footer-and-CTA-Research.html. Closing CTA now provides a dominant paid-evaluation path and a separate direct synthetic case path, with immediate-destination disclosures. Module calls carry their module slug; generic requests default to undecided. Footer groups stay expanded on mobile. Homepage uses an editorial signature; technical pages use a smaller sans-serif signature. Legal links are separate and consistent. The Back to top anchor targets the document body, not the sticky header. Arrow, focus, active and hover states are refined without mandatory entrance animation.

## Color and materials expansion

materials-v4.css introduces warm sand, celadon, clay, ochre and muted lilac section backgrounds. Contextual data-material attributes select a surface by section purpose. Five offer cards and journey chapters have related individual colors. Drafting grids accompany source/data content; fine linen patterns accompany evaluation and FAQ sections; original limestone wash appears in mineral and clay sections. Hero retains warm editorial paper, while dark evidence/authority sections use a restrained mineral overlay. Charts and evidence cards retain light solid reading surfaces.

New asset: dist/assets/mineral-wash-v4.png, generated with built-in image_gen. Exact prompt: docs/mineral-wash-v4-prompt.txt. Existing paper texture is reused. Fine drafting and linen patterns are CSS backgrounds. No third-party artwork or tracking added.


## Lenis + GSAP scroll choreography (25 October 2026)

Supersedes the earlier one-time heading observer and native rail-transform driver. Self-hosted Lenis 1.3.27, GSAP 3.13.0 and ScrollTrigger share one GSAP ticker; native touch scrolling remains enabled. No runtime CDN dependency.

Headings reveal word by word with preserved emphasis and natural line wrapping. Cards enter from alternating directions without rotation; artwork uses lateral reveal masks; supporting text rises into view; footer columns and the wordmark reveal progressively. Scrub timelines reverse as the element moves back toward the viewport entry edge. Content stays visible after it has been read.

The desktop evidence chapter keeps its native CSS sticky geometry and is driven by a GSAP horizontal scrub timeline. Mobile uses stacked chapters. Buttons synchronize Lenis to the selected chapter. Anchor navigation and the footer back-to-top link work with Lenis.

System and in-site reduced motion destroy Lenis, revert GSAP styles, restore unsplit headings and remove the progress rule. Forms and interactive demo records are deliberately excluded from text splitting and decorative entrances. Keyboard focus completes the relevant reveal immediately.

Sources: https://github.com/darkroomengineering/lenis/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/ .


## Intro film v2 — 25 October 2026
Supersedes the 12-second 720p clip. The new intro is 8 seconds, 1920×1080, 30fps, H.264 CRF17, fast-start MP4 (about 2.7 MB). It uses the original 1672×941 reservoir artwork, gently resampled; this improves delivery quality rather than inventing native 4K detail. A restrained dolly-out and two independent translucent mist layers provide motion. No blur is applied to the landscape; no flat cream fade or synthetic telemetry line.

Layout fills the viewport below the 88px desktop / 76px mobile header. At 74% playback, the opening message fades to the brand. On completion, Lenis moves to the hero over 1.15s. Auto-advance is cancelled when the scene is offscreen, the tab is hidden, or reduced motion is active. Explicit Skip moves focus to the hero. Pause, Replay and poster fallback remain available. No scroll lock.

Reference: reviewed previously extracted frames in work/frames/contact-1-1.jpg, contact-2-1.jpg and contact-3-1.jpg. Original Desktop MOV paths were unavailable during this revision.

QA: desktop 1440×1000 shows 912px intro and 1920×1080 video; completed playback lands hero at y=88. Mobile 390×844 shows 768px intro, zero overflow, Skip lands hero at y=76. Reduced-motion setting leaves source unloaded and video paused. No browser errors observed.


## Layout and intro v3
Shared layout-v6.css adds a 1320px maximum container, 24–72px responsive gutters, 64–112px section padding, consistent card/form/footer gaps, and a 5/3/1-column module grid. Headings gain clearer word spacing. Product, evaluation-form and demo mobile layouts checked without document overflow; tablet portfolio uses three equal columns.

Homepage navigation is fixed and hidden/inert during the full 100svh opening, then enters as the hero reaches the header line. The video clock drives a continuous sinusoidal camera move from approximately 1.015× to 1.145× and back; pause freezes the camera. The video is no longer paused at 55% visibility, only when fully offscreen. Intro clipping no longer creates an internal scroll container, removing the observed 18px seam. The final playback-to-hero transition remains interruptible Lenis scrolling. Reduced motion disables camera movement and autoplay.

QA: intro 1000px at 1440×1000, header hidden, internal scrollTop 0, progress edge at 1000px. Playback remained active after partial scrolling; camera matrix advanced from 1.026 to 1.049. Completion restored navigation at the hero. Form, product and demo at 390px and portfolio at 1024px showed zero document overflow.
