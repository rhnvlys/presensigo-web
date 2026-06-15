# PRESENSIGO Premium Corporate Scroll Motion Design

## Objective

Revise the existing PRESENSIGO motion system from a playful CRAV-inspired
presentation into a restrained premium-corporate scroll narrative informed by
the supplied Tresmares and Private Equity recordings.

The FastAPI routes, Jinja data contracts, contact endpoints, package ordering,
and code-native product mockups remain unchanged.

## Reference Findings

The current recording already has the required brutalist identity and product
content, but its moving dots, blobs, waves, cursor, glow, and bounce timing make
the page feel more playful than corporate.

The reference recordings rely on:

- oversized typography with controlled clipping and movement;
- large white or cream fields with deliberate empty space;
- strong dark panels rather than neon backgrounds;
- one dominant red geometric plane per transition;
- pinned sequences and horizontal translation;
- restrained `power3.out`, `expo.out`, and linear scrub timing;
- clean scene changes instead of many independent decorative loops.

## Motion Architecture

GSAP and ScrollTrigger remain progressive enhancements. Final content is
readable before JavaScript runs. Every GSAP initializer checks availability,
uses `gsap.matchMedia()`, and creates desktop pinning only at 900px and above.

CSS keyframes remain limited to the QR scan, live indicator, small data pulse,
and hover micro-interactions.

`site.js` exposes these modules:

- `initPreloader()`
- `initGSAP()`
- `initHeroTimeline()`
- `initHeroScrollTransform()`
- `initSectionPanelTransitions()`
- `initProblemsReveal()`
- `initStickyBenefits()`
- `initPinnedWorkflow()`
- `initFeaturesReveal()`
- `initStickyPricing()`
- `initProductShowcase()`
- `initQRSimulation()`
- `initDashboardCounters()`
- `initReducedMotion()`

## Scene Design

### Loading

The loader uses a near-black field, large wordmark, thin progress line, compact
QR/GPS detail, four status messages, and a coral vertical wipe. It completes in
approximately 1.6 seconds, with a force-close fallback.

### Hero

The hero keeps the approved two-column product composition. One large coral
geometric mask opens the scene. Headline lines reveal through overflow masks,
followed by supporting copy, CTAs, dashboard, phone, and compact proof chips.

Desktop scroll moves the headline upward, slightly reduces the product scale,
and shifts the grid and coral shape at different rates. No elastic, back, or
bounce easing is used.

### Problems and Benefits

Problems use an editorial split heading and a restrained four-card grid. A
coral diagonal panel bridges the hero and problems.

The benefits scene is a clean near-black panel. The left introduction stays
sticky on desktop while benefit rows become active near the viewport center.
Active treatment is limited to border color, a small lift, and a subtle icon
pulse.

### Workflow

The workflow remains the main pinned horizontal story. Vertical scroll drives
the horizontal track, progress line, and active step. Mobile renders the same
content as a normal vertical stack with no pin.

### Features and Pricing

Features use consistent reveal timing and no ambient sweep.

Pricing retains the sticky left introduction and three implementation models.
Cards enter individually; the center card receives at most 1.03 scale.

### Product Showcase

Desktop gallery becomes a pinned horizontal product rail controlled by vertical
scroll. The active slide has full opacity and a slight scale increase, while
the caption and progress indicator update. Mobile uses contained scroll-snap.

### Final CTA

A large coral panel wipes into the final contact scene. The scene contains the
approved headline, short supporting copy, WhatsApp action, email action, and a
single restrained signal line.

## Simplification

The implementation removes or disables:

- custom cursor;
- wave dividers;
- large blurred glow layers;
- decorative particle loops;
- elastic and back easing;
- repeated scan sweeps outside the QR component;
- excessive floating shapes and badges.

## Accessibility and Failure Modes

Reduced motion immediately resolves the loader and renders final QR, dashboard,
counter, chart, reveal, and progress states. It creates no pin, scrub, parallax,
or looping float.

If GSAP or ScrollTrigger fails to load, native vertical layout and mobile
horizontal scroll remain usable. The loader force-closes and no undefined
global is referenced.

## Verification

Automated tests cover public routes, endpoints, GSAP script order, required
corporate scene hooks, modular initializer names, mobile/reduced-motion
contracts, and removal of playful hooks.

Browser QA covers loading, hero reveal, geometric transitions, dark benefits,
pinned workflow, sticky pricing, pinned gallery, QR/dashboard state, console
health, reduced motion, and overflow at 1440, 1024, 768, and 375 pixels.
