# PRESENSIGO GSAP + ScrollTrigger Design

## Objective

Upgrade the current Premium Brutalist frontend with GSAP 3.12.5 and
ScrollTrigger for precise hero sequencing, pinned horizontal storytelling,
scrubbed parallax, and active-state transitions. FastAPI, Jinja, local CSS, and
Vanilla JavaScript remain the application architecture.

## Progressive Enhancement

GSAP and ScrollTrigger load from jsDelivr before `site.js`. The HTML and CSS
render the final readable state by default. `site.js` checks both global objects
before registering the plugin or creating timelines. If either script fails:

- no GSAP-only class is added;
- content remains visible;
- CSS ambient motion and QR simulation continue;
- native scroll-snap workflow/gallery remain usable;
- no undefined global is referenced.

## Hero

Desktop remains a balanced two-column first viewport. Copy occupies the left
column and dashboard/phone occupy the right column. GSAP animates navbar,
background, headline lines, supporting copy, CTAs, chips, dashboard, phone, and
signal dots in a 1.6-2.2 second sequence.

The QR loop starts after the phone entrance through a callback. Reduced motion
renders the final dashboard, chart, counters, and success QR state directly.

## Background

CSS continues to own grid drift, scan sweep, live pulse, and micro-interaction.
GSAP owns scroll-linked parallax for mustard/coral/blue ambient blobs, data
stream layers, and signal dots. Ambient layers are decorative, clipped, and
pointer-events-free.

## ScrollTrigger Sections

### Problems

Heading and cards reveal with a short stagger and subtle rotation. The scan
sweep remains CSS-driven.

### Benefits

Desktop keeps the left introduction visually sticky. ScrollTrigger marks the
benefit nearest the center active, adding border, icon pulse, and brighter
surface. Mobile uses ordinary vertical reveals.

### Workflow

At widths of 1025px or more, `#cara-kerja` pins while its card track translates
horizontally with `scrub: 1`. Scroll distance derives from
`scrollWidth - clientWidth`. A progress bar and step state follow ScrollTrigger
progress. Mobile uses the existing vertical stack with no pin.

### Features

Cards reveal from below and ambient data streams use slower scrubbed parallax.

### Pricing

Desktop introduction remains sticky while cards enter individually. The card
nearest viewport center receives a maximum scale of 1.03; Standard remains the
recommended visual emphasis. Mobile retains contained horizontal scroll-snap.

### Gallery

Desktop keeps contained horizontal scrolling but ScrollTrigger animates slide
entrance and active scale. Controls/native scrolling remain available. Mobile
uses contained scroll-snap.

### Final CTA

Heading, contact actions, and form reveal while signal wave/dots build up.

## QR and Dashboard

CSS keyframes keep the scan line, corner glow, pulse, and success check. Vanilla
JavaScript cycles scanning, validating, and success states. GSAP performs the
hero counter and chart entrance once. Success updates the dashboard row to
`Data masuk`, adds a green highlight, and presents the final count values.

## Responsive and Reduced Motion

- 1440px: two-column hero and all product mockups visible in the first viewport.
- 1024px: hero remains balanced; workflow may pin only when the desktop query
  matches and sufficient track overflow exists.
- 768px and 375px: hero stacks, workflow is vertical, pricing/gallery use
  contained overflow, and body width remains fixed.
- Reduced motion creates no GSAP timeline, pin, scrub, parallax, or stagger.
  All content is visible and native interactions remain functional.

## Verification

Automated tests verify CDN order, GSAP hooks, package content/URLs, public routes,
and endpoint compatibility. Browser QA verifies script availability, zero
errors, hero geometry, pinned workflow, active benefits/pricing/gallery,
QR/dashboard states, reduced motion, and no body overflow.
