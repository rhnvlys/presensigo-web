# PRESENSIGO Premium Corporate Scroll Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the playful ambient motion with a premium-corporate GSAP
scroll narrative while preserving all FastAPI/Jinja routes and backend
contracts.

**Architecture:** Keep the current semantic page and data loops, introduce
explicit scene and geometric transition hooks, and split `site.js` motion by
section. Desktop uses ScrollTrigger pinning and horizontal translation; mobile
and reduced motion use final-state native layouts.

**Tech Stack:** FastAPI, Jinja2, local CSS, Vanilla JavaScript, GSAP 3.12.5,
ScrollTrigger 3.12.5, pytest, Edge/Playwright browser QA.

---

### Task 1: Lock the premium motion contract

**Files:**
- Modify: `tests/test_app.py`

- [ ] Add a failing test requiring `.red-mask`, `.geometric-wipe`,
  `.panel-transition`, `.dark-panel`, `.scroll-scene`, `.horizontal-track`,
  `.pricing-sticky`, and `.showcase-track`.
- [ ] Require the modular functions named in the approved request.
- [ ] Reject `initCustomCursor`, `elastic.out`, `back.out`, and old wave
  containers.
- [ ] Run `python -m pytest tests/test_app.py -q` and confirm the new assertions
  fail because the premium hooks are not implemented yet.

### Task 2: Restructure scenes without changing backend data

**Files:**
- Modify: `app/templates/base.html`
- Modify: `app/templates/home.html`

- [ ] Simplify the loader to a large wordmark, compact QR/GPS mark, status, and
  thin progress line with a coral wipe layer.
- [ ] Replace hero particles/blobs with one `.red-mask` and one restrained
  grid/data line.
- [ ] Replace SVG waves with `.panel-transition.geometric-wipe` elements.
- [ ] Add dark-panel, workflow, pricing, gallery, and CTA hooks while retaining
  existing Jinja loops, copy, IDs, links, and accessibility attributes.

### Task 3: Implement the corporate visual system

**Files:**
- Modify: `app/static/css/styles.css`

- [ ] Add premium scene primitives and larger whitespace/type rhythm.
- [ ] Style the red mask, diagonal wipes, dark curtain, thin progress lines,
  sticky columns, and horizontal rails.
- [ ] Remove cursor styles, wave styles, glow/blob styles, and decorative
  animation ownership.
- [ ] Keep QR scan, live pulse, small data pulse, and hover transitions.
- [ ] Add desktop, tablet, mobile, and reduced-motion final-state rules.

### Task 4: Refactor GSAP orchestration

**Files:**
- Modify: `app/static/js/site.js`

- [ ] Keep navigation, FAQ, contact, QR, and dashboard behavior unchanged.
- [ ] Rebuild the loader and hero with `power3.out` and `expo.out`.
- [ ] Implement hero scroll transform and panel transition modules.
- [ ] Split generic reveals into Problems and Features initializers.
- [ ] Retain sticky benefits, pinned workflow, and sticky pricing with
  restrained active states.
- [ ] Convert desktop product showcase into a pinned horizontal ScrollTrigger
  rail; retain mobile scroll-snap and controls.
- [ ] Remove custom cursor and all elastic/back easing.
- [ ] Refresh ScrollTrigger after load and keep no-GSAP fallback usable.

### Task 5: Update project documentation

**Files:**
- Modify: `docs/animation-plan.md`
- Modify: `docs/website-structure.md`
- Modify: `docs/asset-analysis.md`
- Modify: `docs/implementation-report.md`

- [ ] Document the reference-derived premium motion language and the rejected
  playful elements.
- [ ] Document desktop pinning, mobile fallbacks, reduced motion, and GSAP
  progressive enhancement.
- [ ] Write the complete implementation report requested by the user.

### Task 6: Verify end to end

**Files:**
- Verify: `tests/test_app.py`
- Verify: temporary screenshots outside the repository

- [ ] Run `python -m pytest`.
- [ ] Run `node --check app/static/js/site.js`.
- [ ] Verify all seven public routes and four compatibility endpoints.
- [ ] Run the FastAPI app and inspect 1440, 1024, 768, and 375 pixel layouts.
- [ ] Exercise loader, hero, FAQ, QR state, workflow pinning, pricing, gallery,
  reduced motion, console logs, and horizontal overflow.
- [ ] Fix every reproducible regression and rerun the complete verification.
