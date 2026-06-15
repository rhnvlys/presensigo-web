# PRESENSIGO Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a premium-brutalist, conversion-focused PRESENSIGO website with a 12-section Home page, preserved detail routes, lightweight product animations, compatible FastAPI contact endpoints, and complete project documentation.

**Architecture:** Keep the current single FastAPI/Jinja project. Shared sales content lives in `app/data.py`, routes and input contracts live in `app/main.py`, templates remain semantic and multi-page, and one local CSS/JavaScript design system drives layout, interaction, and reduced-motion behavior.

**Tech Stack:** FastAPI, Pydantic, Jinja2, local Tailwind build, structured CSS, Vanilla JavaScript, CSS keyframes, IntersectionObserver, Pytest, Playwright CLI.

---

## File Structure

- `app/main.py`: contact schemas, health/contact endpoint compatibility, shared URLs, and template context.
- `app/data.py`: approved features, problems, business benefits, workflow, packages, gallery, testimonials, and FAQ content.
- `app/templates/base.html`: global navigation, global CTAs, metadata, footer, and page shell.
- `app/templates/home.html`: complete 12-section sales landing page.
- `app/templates/about.html`: expanded business-oriented detail content.
- `app/templates/services.html`: detailed capabilities and package comparison.
- `app/templates/gallery.html`: detailed product-system views.
- `app/templates/testimonials.html`: placeholder-labelled commercial testimonials.
- `app/templates/faq.html`: six approved commercial questions.
- `app/templates/contact.html`: compatible contact form and direct contact actions.
- `app/static/css/styles.css`: premium-brutalist tokens, components, responsive layout, and motion.
- `app/static/js/site.js`: navigation, reveal, counters, QR scan state machine, FAQ, and form submission.
- `tests/test_app.py`: route, API, copy, CTA, package, and asset regression tests.
- `docs/*.md`: asset, BMC, structure, animation, and implementation records.

### Task 1: Lock the Public Contracts with Failing Tests

**Files:**
- Modify: `tests/test_app.py`

- [ ] **Step 1: Add tests for health aliases and required Home content**

Add tests asserting:

```python
def test_health_aliases_share_public_contract():
    for path in ("/health", "/api/health"):
        response = client.get(path)
        assert response.status_code == 200
        assert response.json() == {
            "status": "ok",
            "service": "presensigo-api",
        }


def test_home_contains_complete_sales_sections():
    response = client.get("/")
    assert response.status_code == 200
    for section_id in (
        "masalah",
        "kenapa-presensigo",
        "cara-kerja",
        "fitur",
        "paket",
        "galeri",
        "testimoni",
        "faq-ringkas",
        "konsultasi",
    ):
        assert f'id="{section_id}"' in response.text
    assert "Masalah Absensi Manual Masih Menghambat Operasional?" in response.text
    assert "Kenapa Harus Presensigo?" in response.text
    assert "Cara Kerja Presensigo" in response.text
```

- [ ] **Step 2: Add JSON and form contact contract tests**

Add:

```python
def test_contact_accepts_json_and_returns_whatsapp_url():
    response = client.post(
        "/contact",
        json={
            "name": "Ayu",
            "organization": "Universitas Nusantara",
            "contact": "ayu@example.com",
            "message": "Membutuhkan absensi untuk 2.000 mahasiswa.",
        },
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["message"] == "Permintaan konsultasi berhasil diterima."
    assert payload["whatsapp_url"].startswith(WHATSAPP_BASE_URL)


def test_contact_accepts_form_encoded_payload():
    response = client.post(
        "/api/contact",
        data={
            "name": "Budi",
            "organization": "",
            "contact": "085959763633",
            "message": "Ingin konsultasi Paket Standard.",
        },
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_contact_rejects_empty_required_fields():
    response = client.post(
        "/contact",
        json={"name": " ", "organization": "", "contact": "", "message": ""},
    )
    assert response.status_code == 422
```

- [ ] **Step 3: Add package CTA and contact URL tests**

Add:

```python
def test_package_links_use_distinct_whatsapp_messages():
    response = client.get("/layanan")
    for package_name in ("Basic", "Standard", "Premium"):
        assert f"saya%20tertarik%20dengan%20Paket%20{package_name}" in response.text


def test_every_public_page_exposes_whatsapp_and_email():
    for path in ("/", "/tentang", "/layanan", "/galeri", "/testimoni", "/faq", "/kontak"):
        html = client.get(path).text
        assert "https://wa.me/6285959763633" in html
        assert "mailto:bebas619akun@gmail.com" in html
```

- [ ] **Step 4: Run tests and verify RED**

Run:

```powershell
.\.venv\Scripts\python.exe -m pytest tests/test_app.py -q
```

Expected: failures for missing `/health`, the old service name, missing Home section IDs, incompatible contact schema/form input, and missing package-specific messages.

### Task 2: Implement Backend Compatibility and Shared URLs

**Files:**
- Modify: `app/main.py`
- Test: `tests/test_app.py`

- [ ] **Step 1: Replace the old contact schema with the approved contract**

Implement a `ContactRequest` with:

```python
class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    organization: str = Field(default="", max_length=150)
    contact: str = Field(min_length=3, max_length=150)
    message: str = Field(min_length=3, max_length=1200)

    @field_validator("name", "organization", "contact", "message", mode="before")
    @classmethod
    def trim_text(cls, value: object) -> str:
        return str(value or "").strip()
```

- [ ] **Step 2: Add one request parser for JSON and form data**

Implement an async helper:

```python
async def parse_contact_request(request: Request) -> ContactRequest:
    content_type = request.headers.get("content-type", "")
    if "application/json" in content_type:
        payload = await request.json()
    else:
        form = await request.form()
        payload = dict(form)
    return ContactRequest.model_validate(payload)
```

Catch Pydantic validation errors and return FastAPI's standard 422 response
without exposing a stack trace.

- [ ] **Step 3: Add `/health`, retain `/api/health`, and support both contact paths**

Both health routes return:

```python
{"status": "ok", "service": "presensigo-api"}
```

Both contact routes call the same handler and return:

```python
{
    "success": True,
    "message": "Permintaan konsultasi berhasil diterima.",
    "whatsapp_url": build_contact_whatsapp_url(payload),
}
```

- [ ] **Step 4: Add canonical WhatsApp, email, and package URLs to template context**

Use:

```python
DEFAULT_WHATSAPP_MESSAGE = (
    "Halo Presensigo, saya ingin konsultasi tentang sistem absensi digital."
)
EMAIL_URL = (
    "mailto:bebas619akun@gmail.com"
    "?subject=Konsultasi%20Presensigo"
    "&body=Halo%20Presensigo,%20saya%20ingin%20konsultasi%20tentang"
    "%20sistem%20absensi%20digital."
)
```

Build `package_whatsapp_urls` for Basic, Standard, and Premium with their
approved package-specific messages.

- [ ] **Step 5: Run backend tests and verify GREEN for endpoint tests**

Run:

```powershell
.\.venv\Scripts\python.exe -m pytest tests/test_app.py -q
```

Expected: endpoint and contact contract tests pass; Home/content tests may still fail.

### Task 3: Update Shared Sales Content

**Files:**
- Modify: `app/data.py`
- Test: `tests/test_app.py`

- [ ] **Step 1: Add approved problem, benefit, and workflow collections**

Create `PROBLEMS`, `BENEFITS`, and `WORKFLOW` with the exact approved titles and
concise descriptions from the specification.

- [ ] **Step 2: Expand FEATURES to six commercial capabilities**

Use:

```python
[
    "QR Code Attendance",
    "GPS Location Validation",
    "Real-Time Dashboard",
    "Auto Attendance Report",
    "Late & Permission Tracking",
    "Multi-Use Implementation",
]
```

Each item includes an icon key and a concise outcome-oriented description.

- [ ] **Step 3: Expand packages with audience, tagline, and progressive features**

Basic, Standard, and Premium contain the approved increasingly complete feature
sets. Include `recommended=True` only for Standard.

- [ ] **Step 4: Replace FAQ and testimonial content**

Use all six approved commercial FAQs. Add the three placeholder testimonials
and retain a source comment:

```python
# TODO: Replace placeholder testimonials with approved client testimonials.
```

- [ ] **Step 5: Pass all collections through `template_context`**

Expose `problems`, `benefits`, and `workflow` in addition to existing content.

### Task 4: Upgrade the Global Shell

**Files:**
- Modify: `app/templates/base.html`
- Modify: `app/static/css/styles.css`
- Modify: `app/static/js/site.js`

- [ ] **Step 1: Update metadata and contact actions**

Use the new `whatsapp_url` and `email_url` in header, footer, and floating CTA.
Keep all detail-route navigation.

- [ ] **Step 2: Refine navbar and global button anatomy**

Add stable arrow wrappers, focus-visible styles, animated underlines, and a
responsive menu that preserves `aria-expanded`.

- [ ] **Step 3: Refine global footer copy and links**

Use the approved footer description and include Home, all detail pages,
WhatsApp, and email.

- [ ] **Step 4: Add intro and reveal state hooks**

Set a short `js` class on `document.documentElement` and use data attributes:

```html
data-intro
data-reveal
data-reveal-group
```

The CSS baseline keeps content visible; JavaScript only enables hidden initial
states after it initializes.

### Task 5: Build the Complete Home Page

**Files:**
- Replace: `app/templates/home.html`
- Test: `tests/test_app.py`

- [ ] **Step 1: Implement the refined hero**

Use three headline lines, approved copy, two CTAs, four micro-benefits, dashboard,
phone, live badge, and QR + GPS label. Add data hooks for counters, chart, QR
status, success state, and dashboard row update.

- [ ] **Step 2: Implement the problems and benefits sections**

Render the four problems and six benefits from shared data. Each component has
a consistent icon wrapper and reveal delay index.

- [ ] **Step 3: Implement five-step How It Works**

Add `id="cara-kerja"` and five steps with code-native micro-visuals for scan,
GPS, data insertion, monitoring, and reports.

- [ ] **Step 4: Implement six features and three package cards**

Render all approved features and packages. Package CTAs use distinct
`package_whatsapp_urls`.

- [ ] **Step 5: Implement gallery, testimonials, FAQ summary, and final CTA**

Use code-native system mockups, three clearly labelled placeholder testimonials,
six FAQ items, WhatsApp/email actions, and the contact form.

- [ ] **Step 6: Run Home tests and verify GREEN**

Run:

```powershell
.\.venv\Scripts\python.exe -m pytest tests/test_app.py -q
```

Expected: all Home section and CTA tests pass.

### Task 6: Implement Premium-Brutalist Styling

**Files:**
- Modify: `app/static/css/styles.css`
- Modify: `app/static/css/tailwind-input.css`
- Rebuild: `app/static/css/tailwind.css`

- [ ] **Step 1: Normalize tokens and typography**

Define spacing, type, radius, line, shadow, and motion tokens in `:root`.
Separate display, heading, body, caption, and UI chrome styles.

- [ ] **Step 2: Style hero and product mockup**

Preserve cream/coral/black identity while improving spacing, readable mockup
labels, consistent status cards, and proportional dashboard/phone composition.

- [ ] **Step 3: Style all Home section families**

Create consistent problem, benefit, workflow, feature, package, gallery,
testimonial, FAQ, and contact components with varied section rhythm rather than
one repeated card grid.

- [ ] **Step 4: Add responsive layouts**

Verify explicit breakpoints around 1200, 1024, 768, and 480px. At 375px, the
hero is one column, buttons remain tappable, dashboard and phone fit without
overflow, and pricing is one column.

- [ ] **Step 5: Rebuild local Tailwind**

Run:

```powershell
npx --yes tailwindcss@3.4.17 -i .\app\static\css\tailwind-input.css -o .\app\static\css\tailwind.css --minify --content '.\app\templates\**\*.html'
```

Expected: exit code 0.

### Task 7: Implement Lightweight Motion and Product Simulation

**Files:**
- Modify: `app/static/js/site.js`
- Modify: `app/static/css/styles.css`

- [ ] **Step 1: Add progressive-enhancement motion initialization**

Only add `.motion-ready` when motion is allowed. Content remains visible if
JavaScript fails.

- [ ] **Step 2: Add IntersectionObserver reveal and stagger**

Reveal each section once. Apply short per-item delays capped below 400ms.

- [ ] **Step 3: Add counter and chart activation**

Use `requestAnimationFrame` to count to 86, 9, and 5 after hero entry. Add a
class that triggers SVG stroke-dashoffset chart drawing.

- [ ] **Step 4: Add the QR state machine**

Cycle every 2.2 seconds:

```javascript
const scanStates = [
  { label: "Memindai QR...", state: "scanning" },
  { label: "Memvalidasi GPS...", state: "validating" },
  { label: "Absensi Berhasil", state: "success" }
];
```

On success, show the checkmark and add `.is-updated` to the newest dashboard row.
Loop after a short success hold.

- [ ] **Step 5: Implement reduced-motion final state**

When reduced motion is active, counters show final values, the chart is fully
drawn, the QR status shows `Absensi Berhasil`, and no timers/observers for motion
are started.

### Task 8: Refine All Detail Pages

**Files:**
- Modify: `app/templates/about.html`
- Modify: `app/templates/services.html`
- Modify: `app/templates/gallery.html`
- Modify: `app/templates/testimonials.html`
- Modify: `app/templates/faq.html`
- Modify: `app/templates/contact.html`

- [ ] **Step 1: Align copy and section headings**

Use business-oriented headings, concise body copy, shared heading anatomy, and
Home-to-detail continuity.

- [ ] **Step 2: Use package-specific CTAs in Services**

Each package button uses the corresponding URL in `package_whatsapp_urls`.

- [ ] **Step 3: Use six FAQ items and placeholder testimonial disclosure**

Keep FAQ buttons accessible. Add the placeholder source comment without showing
an alarming public warning.

- [ ] **Step 4: Update contact form fields**

Use `name`, `organization`, `contact`, and `message`; submit to `/contact`.
Provide direct WhatsApp and email actions.

- [ ] **Step 5: Apply reveal hooks only**

Detail pages use scroll reveal and micro-interactions, not the full hero sequence.

### Task 9: Complete Required Documentation

**Files:**
- Modify: `docs/asset-analysis.md`
- Create: `docs/bmc-web-mapping.md`
- Create: `docs/website-structure.md`
- Create: `docs/animation-plan.md`
- Create: `docs/implementation-report.md`

- [ ] **Step 1: Expand the asset inventory**

Separate direct-use assets, reference-only assets, and rejected irrelevant
assets. Record source groups, file types, dominant colors, usage, and gaps.

- [ ] **Step 2: Document BMC-to-website mapping**

Map customer segments, value propositions, channels, customer relationships,
and revenue offer structure to public sections. Explicitly mark internal-only
elements such as costs, key resources, key partners, and detailed revenue logic.

- [ ] **Step 3: Document website structure and animation plan**

For every Home section, record its business purpose and linked detail route.
For every animation, record technique, timing, purpose, and reduced-motion state.

- [ ] **Step 4: Write implementation report**

Use the required 12-part report structure and list exact changed/created files,
commands, completed work, warnings, asset gaps, and ChatGPT review summary.

### Task 10: Automated and Browser Verification

**Files:**
- Modify as required by findings: templates, CSS, JavaScript, tests, docs
- QA artifacts: `output/playwright/` (ignored)

- [ ] **Step 1: Run full automated tests**

Run:

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

Expected: all tests pass with no application failure.

- [ ] **Step 2: Verify server endpoints**

Check:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/health
Invoke-RestMethod http://127.0.0.1:8000/api/health
```

Expected service: `presensigo-api`.

- [ ] **Step 3: Use Browser/IAB or Playwright fallback**

Check Home at 1440x1000, 1024x768, 768x1024, and 375x812. Verify:

- no horizontal overflow;
- full Home section order;
- readable hero and product mockup;
- working mobile navigation;
- QR status progression;
- counter completion;
- dashboard update;
- FAQ open/close;
- contact form validation;
- zero console errors.

- [ ] **Step 4: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` and confirm static final states with no
scan loop, floating, stagger, or intro delay.

- [ ] **Step 5: Compare accepted concept and latest screenshots**

Use `view_image` on:

- `assets/concepts/01-hero-about.png`;
- the Premium Brutalist companion reference;
- latest desktop Home screenshot;
- latest mobile Home screenshot.

Record at least five fidelity checks: palette, typography, hero composition,
mockup treatment, section spacing, responsive behavior, and motion state.

- [ ] **Step 6: Run final tests after visual fixes**

Run:

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

Expected: all tests pass.
