# PRESENSIGO Ambient Motion, Pricing, and Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add lightweight ambient motion, implementation-based service packages, and horizontal workflow/gallery experiences without changing the approved stack.

**Architecture:** Keep business copy in `app/data.py`, URL encoding in
`app/main.py`, semantic markup in Jinja templates, visual behavior in local
CSS, and state-only interactions in `site.js`. Native scroll-snap provides the
horizontal experiences; IntersectionObserver only updates active/reveal state.

**Tech Stack:** FastAPI, Jinja2, local CSS, Vanilla JavaScript, CSS keyframes,
IntersectionObserver, pytest, Playwright CLI.

---

### Task 1: Lock the new package contract

**Files:**
- Modify: `tests/test_app.py`
- Modify: `app/data.py`
- Modify: `app/main.py`

- [ ] Add failing tests for package labels, implementation descriptions,
  increasing feature counts, limitations, and the three exact WhatsApp
  messages.
- [ ] Run `.\.venv\Scripts\python.exe -m pytest tests/test_app.py -q` and
  confirm failures reference missing package fields/messages.
- [ ] Update package dictionaries with `label`, `description`, `limitations`,
  `mode`, and the approved feature lists.
- [ ] Replace package WhatsApp messages with the exact approved copy.
- [ ] Re-run the focused tests and confirm they pass.

### Task 2: Add semantic hooks for pricing, ambient layers, and horizontal UI

**Files:**
- Modify: `tests/test_app.py`
- Modify: `app/templates/home.html`
- Modify: `app/templates/services.html`
- Modify: `app/templates/base.html`

- [ ] Add failing Home markup tests for `.animated-grid`, `.signal-field`,
  `[data-workflow-track]`, `[data-workflow-progress]`,
  `[data-gallery-track]`, `[data-gallery-prev]`, `[data-gallery-next]`,
  and `.pricing-strategy-strip`.
- [ ] Run the focused Home test and verify RED.
- [ ] Add restrained decorative layers to the approved strategic sections.
- [ ] Rebuild workflow as a semantic horizontal track with five progress
  buttons/labels and mobile vertical fallback.
- [ ] Rebuild Home gallery as a five-slide product showcase with controls and
  active caption.
- [ ] Rebuild Home pricing as strategy strip, sticky intro, and package stack.
- [ ] Apply the same package anatomy to `/layanan`.
- [ ] Re-run the focused tests and confirm GREEN.

### Task 3: Implement CSS-first motion and responsive layout

**Files:**
- Modify: `app/static/css/styles.css`
- Modify: `app/static/css/tailwind.css`

- [ ] Add ambient classes and keyframes for grid drift, signal float, scan
  sweep, radial glow, pulse ring, and signal wave.
- [ ] Add z-index isolation so decorative layers never cover content.
- [ ] Add horizontal workflow and gallery scroll-snap tracks.
- [ ] Add sticky benefit/pricing layouts at desktop widths.
- [ ] Add contained pricing carousel behavior below 760px.
- [ ] Add strong package variants for Basic, Standard, and Premium.
- [ ] Add reduced-motion rules that stop all ambient and smooth motion.
- [ ] Build Tailwind locally with the documented command.

### Task 4: Implement interaction state and reveal fallback

**Files:**
- Modify: `app/static/js/site.js`

- [ ] Make content visible by default and add `.motion-ready` only after
  startup.
- [ ] Configure reveal observer with `rootMargin: "120px 0px -5% 0px"` and
  immediately reveal all items when reduced motion or observer support is
  unavailable.
- [ ] Observe workflow cards, set `.is-active`, and update progress state.
- [ ] Observe gallery slides, update active caption/count, and wire previous/
  next controls with native `scrollIntoView`.
- [ ] Ensure reduced motion skips QR loops and leaves final static state.
- [ ] Verify menu label, FAQ, contact form, QR, counter, and chart behavior.

### Task 5: Update documentation

**Files:**
- Modify: `docs/asset-analysis.md`
- Modify: `docs/bmc-web-mapping.md`
- Modify: `docs/website-structure.md`
- Modify: `docs/animation-plan.md`
- Modify: `docs/implementation-report.md`

- [ ] Document that ambient shapes and product UI remain code-native.
- [ ] Map the three implementation modes to revenue and customer segments.
- [ ] Document horizontal containers and sticky sections.
- [ ] Document ambient keyframes, active-state observers, and reveal fallback.
- [ ] Replace the report with the required
  `LAPORAN IMPLEMENTASI PRESENSIGO — REVISI ANIMASI & PAKET` structure.

### Task 6: Verify end to end

**Files:**
- Verify: `tests/test_app.py`
- Verify: `output/playwright/`

- [ ] Run the full pytest suite.
- [ ] Verify health and both contact endpoints.
- [ ] Verify all seven public routes at 1440, 1024, 768, and 375 pixels.
- [ ] Confirm body `scrollWidth === clientWidth` at every supported width.
- [ ] Verify menu, FAQ, QR states, counters, chart, workflow progress, gallery
  controls, pricing sticky/mobile scroll, and package CTA URLs.
- [ ] Emulate reduced motion and verify visible static content.
- [ ] Confirm browser console has zero errors.
- [ ] Capture and inspect final desktop, mobile, and reduced-motion screenshots.
