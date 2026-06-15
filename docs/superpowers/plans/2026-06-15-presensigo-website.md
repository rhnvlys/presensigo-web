# PRESENSIGO Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive multi-page PRESENSIGO website and FastAPI backend from the analyzed Drive references.

**Architecture:** FastAPI serves Jinja templates and static assets. Shared content lives in a typed data module, while frontend behavior is limited to navigation, accordion state, and contact submission.

**Tech Stack:** Python 3.12, FastAPI, Jinja2, Pydantic, pytest, HTML5, Tailwind CSS, vanilla JavaScript.

---

### Task 1: Backend contract

**Files:**
- Create: `tests/test_app.py`
- Create: `app/main.py`
- Create: `app/data.py`

- [ ] Write tests for page routes, package hierarchy, API output, contact validation, and WhatsApp URL generation.
- [ ] Run `pytest -q` and confirm failure because `app.main` does not exist.
- [ ] Implement the minimal FastAPI routes and data to pass.
- [ ] Run `pytest -q` and confirm all tests pass.

### Task 2: Shared design system

**Files:**
- Create: `app/templates/base.html`
- Create: `app/static/css/styles.css`
- Create: `app/static/js/site.js`

- [ ] Define visual tokens, shared header/footer, buttons, typography, layout, and accessible focus states.
- [ ] Add responsive menu, accordion, reveal, and contact-form behavior.

### Task 3: Website pages

**Files:**
- Create: `app/templates/home.html`
- Create: `app/templates/about.html`
- Create: `app/templates/services.html`
- Create: `app/templates/gallery.html`
- Create: `app/templates/testimonials.html`
- Create: `app/templates/faq.html`
- Create: `app/templates/contact.html`

- [ ] Implement each page from the approved civic tech-brutalist design.
- [ ] Ensure every order/consultation CTA is an `<a>` using the shared WhatsApp URL.
- [ ] Verify semantic headings, alt text, keyboard states, and responsive layout.

### Task 4: Project setup and verification

**Files:**
- Create: `requirements.txt`
- Create: `README.md`
- Create: `.gitignore`

- [ ] Install dependencies and run the full test suite.
- [ ] Start Uvicorn and verify API health.
- [ ] Verify desktop and mobile rendering in Browser.
- [ ] Compare screenshots with the three concept images and fix material drift.

