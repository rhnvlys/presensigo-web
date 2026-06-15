# PRESENSIGO Ambient Motion, Pricing, and Scroll Design

## Objective

Extend the approved Premium Brutalist website with a livelier but restrained
background, clearer implementation-based service packages, and two lightweight
horizontal browsing experiences. The implementation remains FastAPI, Jinja,
local CSS, Vanilla JavaScript, CSS keyframes, and IntersectionObserver.

## Selected Approach

Use CSS-first ambient motion and native overflow containers. Do not hijack page
scroll or translate large sections based on scroll position. Vertical page
scroll remains normal, while workflow and gallery use horizontal scroll-snap
inside bounded containers. Pricing uses a sticky desktop introduction and a
contained mobile carousel.

This approach is preferred because it:

- preserves keyboard and touch scrolling;
- avoids animation libraries and continuous JavaScript render loops;
- provides a clear fallback when JavaScript is unavailable;
- keeps mobile body width fixed;
- can be disabled completely by `prefers-reduced-motion`.

## Ambient Background System

Introduce reusable classes:

- `.animated-grid`: slow 24-second diagonal grid drift;
- `.section-ambient`: bounded pseudo-element canvas;
- `.scan-sweep`: low-opacity horizontal technology sweep;
- `.signal-field`: pointer-events-free particle layer;
- `.signal-dot`, `.bg-signal`, `.bg-pulse`, `.floating-shape`,
  `.data-particle`: limited GPS/live/data accents;
- `.ambient-glow`: slow radial blue/coral movement;
- `.signal-wave`: subtle CTA/footer wave.

Ambient layers are added only to hero, problems, workflow, pricing, features,
and final CTA. Text and interactive content stay above the decorative layers.

## Package Model

The packages describe three implementation modes:

1. Basic, `Sistem Siap Pakai`: attendance system without website development.
2. Standard, `Integrasi Website`: PRESENSIGO added to an existing website.
3. Premium, `Website + Sistem`: official website and attendance system built
   together.

Each package contains label, tagline, audience, description, features,
limitations where relevant, mode icon, and a package-specific WhatsApp message.
Standard remains the recommended option.

Home pricing uses:

- a three-option strategy strip;
- sticky introduction on desktop;
- vertically stacked cards in the right column;
- contained horizontal scroll-snap cards on mobile.

The `/layanan` page uses the same package data and positioning.

## Scroll Experience

### Workflow

Desktop and tablet use a horizontal scroll-snap track with five cards and a
progress indicator. IntersectionObserver marks the most visible card active
and updates the active progress label. Mobile switches to a vertical stack.

### Gallery

Home gallery becomes a horizontal product showcase with dashboard, QR phone,
GPS, report, and admin panel slides. It exposes previous/next controls and an
active caption/count. The container, not the body, owns horizontal overflow.

### Sticky Sections

The existing benefit introduction becomes explicitly sticky on desktop.
Pricing uses a sticky left introduction and scrollable card column. Both return
to normal document flow on tablet/mobile.

## Reveal Safety

Content is visible by default. JavaScript adds `.motion-ready` to the root only
after initialization. Only individual reveal items become initially hidden,
never large section containers. Observer configuration uses
`rootMargin: "120px 0px -5% 0px"` and permanently adds `.revealed`.

Reduced motion and missing IntersectionObserver reveal all content immediately.

## Reduced Motion

When reduced motion is requested:

- moving grid, particles, sweep, glow, pulse, floating, and stagger stop;
- QR simulation stays in a static success state;
- counters and chart render final state;
- workflow and gallery remain scrollable but do not smooth-scroll;
- all reveal items are visible.

## Verification

Automated tests verify package labels, descriptions, limits, feature ordering,
and exact package messages, plus required Home hooks for ambient motion,
workflow, gallery, and pricing.

Browser QA verifies all public routes and endpoints, 1440/1024/768/375 widths,
body overflow, horizontal containers, active workflow/gallery state, menu, FAQ,
QR/count/chart, reduced motion, and zero console errors.
