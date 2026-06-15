# PRESENSIGO GSAP + ScrollTrigger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Units-inspired validation preloader and fault-tolerant GSAP
3.12.5/ScrollTrigger animation orchestration to the current PRESENSIGO
frontend without copying Units visual identity.

**Architecture:** Keep FastAPI/Jinja output and CSS final states usable without
JavaScript. Load GSAP before `site.js`, isolate GSAP setup behind capability and
motion checks, and use `gsap.matchMedia()` for desktop/mobile cleanup.

**Tech Stack:** FastAPI, Jinja2, local CSS, Vanilla JavaScript, GSAP 3.12.5,
ScrollTrigger 3.12.5, pytest, Playwright CLI.

---

### Task 1: Lock script and markup contracts

**Files:**
- Modify: `tests/test_app.py`
- Modify: `app/templates/base.html`
- Modify: `app/templates/home.html`

- [ ] Add failing tests for exact GSAP/ScrollTrigger CDN URLs, script order,
  preloader structure/status copy, required `.js-*` hooks, workflow progress
  bar, data stream, and absence of public `Close` text.
- [ ] Run focused tests and verify they fail for missing GSAP assets/hooks.
- [ ] Load both CDN scripts before `site.js`.
- [ ] Add semantic JS hooks without hiding final content.
- [ ] Add the fullscreen validation preloader with QR/GPS/data visuals,
  progress, percentage, status, and accessible loading semantics.
- [ ] Add workflow progress bar and decorative data-stream/blob layers.
- [ ] Re-run focused tests and confirm pass.

### Task 2: Fix hero geometry and CSS ownership

**Files:**
- Modify: `app/static/css/styles.css`

- [ ] Constrain desktop hero height and align copy/product visual in the first
  viewport.
- [ ] Keep dashboard/phone visible and prevent 375px headline clipping.
- [ ] Remove CSS intro animations from `.motion-ready` so GSAP owns the hero
  sequence.
- [ ] Add GSAP-ready active states for benefits, pricing, workflow progress,
  data streams, and product slides.
- [ ] Preserve CSS keyframes for QR, grid, sweep, pulse, live state, and hover.
- [ ] Add reduced-motion rules that force final static state.

### Task 3: Implement preloader and fault-tolerant GSAP orchestration

**Files:**
- Modify: `app/static/js/site.js`

- [ ] Implement `initPreloader()` with load event, four status steps,
  1.4-2.2 second duration, upward wipe, body `is-loaded`, and a three-second
  force-close timeout.
- [ ] Start the hero timeline only after the preloader completes.
- [ ] Split QR initialization into an immediately available controller with a
  `start()` method so GSAP can start the loop after phone entrance.
- [ ] Detect GSAP safely using `window.gsap` and `window.ScrollTrigger`.
- [ ] Register ScrollTrigger only after both globals exist.
- [ ] Build the 1.6-2.2 second hero timeline.
- [ ] Add Problems, Features, and CTA reveal timelines.
- [ ] Add benefit active-state triggers.
- [ ] Add desktop pinned workflow with scrub and progress bar.
- [ ] Add pricing center-card scale/highlight triggers.
- [ ] Add gallery active scale/caption integration.
- [ ] Add ambient parallax and refresh triggers after layout settles.
- [ ] Use `gsap.matchMedia()` to avoid pins/scrub for mobile and reduced motion.
- [ ] Provide a no-GSAP fallback that dismisses the preloader and leaves all
  content usable without console errors.

### Task 4: Update QR/dashboard state

**Files:**
- Modify: `app/templates/home.html`
- Modify: `app/static/css/styles.css`
- Modify: `app/static/js/site.js`

- [ ] Change QR state class hooks to `is-scanning`, `is-validating`, and
  `is-success` while retaining `data-state`.
- [ ] Display `Data masuk` on the dashboard row during success.
- [ ] Add phone success glow and visible dashboard update label.
- [ ] Use GSAP for one-time count-up/chart entrance when available.
- [ ] Keep Vanilla/CSS fallback and final reduced-motion state.

### Task 5: Update documentation

**Files:**
- Modify: `docs/website-structure.md`
- Modify: `docs/animation-plan.md`
- Modify: `docs/implementation-report.md`
- Modify: `docs/asset-analysis.md`

- [ ] Document CDN progressive enhancement and fallback.
- [ ] Document the Units-inspired loading rhythm and explicit non-copying rule.
- [ ] Document pinned workflow, scrub, parallax, and matchMedia behavior.
- [ ] Update asset analysis to note that GSAP animates code-native layers only.
- [ ] Replace the report with the required GSAP + ScrollTrigger structure.

### Task 6: Verify end to end

**Files:**
- Verify: `tests/test_app.py`
- Verify: `output/playwright/`

- [ ] Run full pytest and JavaScript syntax checks.
- [ ] Verify seven public routes and four health/contact endpoints.
- [ ] Verify CDN load and zero console errors.
- [ ] Verify loader status/progress, automatic completion, force-close safety,
  and reduced-motion fast completion.
- [ ] Verify 1440px hero product visual is inside first viewport.
- [ ] Verify problems reveal, sticky benefits, pinned workflow, progress bar,
  pricing highlights, gallery showcase, CTA, QR cycle, counter, and chart.
- [ ] Verify 1024/768/375 responsive behavior and body overflow.
- [ ] Emulate reduced motion and verify no pin/scrub, final QR/counters/chart,
  and all content visible.
- [ ] Capture and inspect final desktop, mobile, and reduced-motion screenshots.
