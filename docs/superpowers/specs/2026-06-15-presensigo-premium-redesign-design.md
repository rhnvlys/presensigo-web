# PRESENSIGO Premium Redesign Specification

## 1. Objective

Redesign the existing PRESENSIGO website as a premium-brutalist sales website
for companies, schools, universities, government institutions, organizations,
communities, and event organizers.

The website must sell a practical business outcome: more accurate attendance,
less fraud, faster administration, real-time visibility, and decision-ready
reports. It must not read like an academic report and must not expose the
Business Model Canvas as public content.

## 2. Approved Stack

- FastAPI serves HTML pages and small JSON/form endpoints.
- Jinja templates provide the multi-page frontend.
- Structured local CSS provides the design system and responsive layout.
- Vanilla JavaScript provides interactive state and motion.
- CSS keyframes handle hero sequences, QR scanning, chart drawing, pulses, and
  micro-interactions.
- IntersectionObserver triggers section reveal, stagger, and count-up behavior.
- No React, Framer Motion, GSAP, or heavy animation dependency.

## 3. Visual Direction

The approved direction is **Premium Brutalist**.

The existing identity remains recognizable:

- warm cream/beige page background;
- near-black primary typography;
- coral/red primary accent;
- yellow accent for emphasis;
- electric blue for GPS, data, and dashboard states;
- large condensed editorial headlines;
- strong borders and offset shadows;
- dashboard and phone product mockups;
- technical grid details used with restraint.

The redesign raises the quality through:

- a disciplined type scale rather than uniformly heavy text;
- more whitespace and consistent vertical rhythm;
- one coherent icon system with matching stroke, size, and containers;
- fewer decorative elements and stronger business-oriented proof;
- cleaner buttons, badges, status indicators, and labels;
- improved hierarchy between headings, body copy, captions, and UI chrome.

## 4. Design System

### Color

- Cream background: `#F5E3CD`
- Paper surface: `#FFF8EF`
- Ink: `#0C0B11`
- Coral: `#FF5949`
- Signal blue: `#2563EB`
- Mustard: `#F6C945`
- Dashboard night: `#11131A`
- Success: `#35D69C`

### Typography

- Display headings use a condensed system stack led by Impact/Arial Black.
- Body and UI text use Segoe UI/Arial sans-serif.
- Display text is uppercase only where the approved visual direction requires
  emphasis.
- Body copy uses normal weight, wider line-height, and readable line lengths.
- Small labels use uppercase, controlled tracking, and consistent sizing.
- Responsive `clamp()` sizing prevents clipping at 375px.

### Components

- Primary CTA: coral background, black border, offset shadow, arrow movement.
- Secondary CTA: paper background, black border, controlled hover inversion.
- Feature/problem/benefit components share one icon geometry and spacing scale.
- Pricing cards share one anatomy; Standard is clearly recommended.
- FAQ uses accessible buttons, `aria-expanded`, animated height, and rotating
  plus/minus icon.
- Section headings share eyebrow, title, summary, and consistent spacing.

## 5. Information Architecture

### Home

Home is the complete sales landing page and contains:

1. Navbar
2. Hero
3. Problems PRESENSIGO solves
4. Why choose PRESENSIGO
5. How it works
6. Main features
7. Service packages
8. System gallery
9. Testimonials
10. FAQ
11. Final contact CTA
12. Footer

Content remains concise and persuasive. Each section has a specific conversion
role and links to the relevant detail route where useful.

### Detail Pages

The existing routes remain:

- `/tentang`
- `/layanan`
- `/galeri`
- `/testimoni`
- `/faq`
- `/kontak`

Navbar links point to these routes. The Home CTA "Lihat Cara Kerja" may use the
internal anchor `/#cara-kerja`. Detail pages keep the same branding and expose
WhatsApp and email contact actions.

## 6. Home Sections

### Hero

Headline:

> TRANSFORMASI  
> ABSENSI DIGITAL  
> ANTI-TITIP ABSEN

The supporting copy positions QR, GPS, monitoring, and automatic reports as one
practical system. The main CTA is "Konsultasi Sekarang"; the secondary CTA is
"Lihat Cara Kerja".

The hero visual contains:

- live attendance dashboard;
- animated attendance statistics;
- an animated line chart;
- phone QR scanner;
- QR + GPS badge;
- live monitoring label;
- a visual update when scan succeeds.

### Problems

Four concise problem statements cover attendance fraud, manual recaps, missing
real-time monitoring, and low data transparency. The section ends by connecting
these problems directly to PRESENSIGO's operational value.

### Why PRESENSIGO

Six benefits cover anti-fraud, GPS validation, dashboard monitoring, automatic
reports, administrative efficiency, and suitability for multiple organization
types. The section ends with a WhatsApp consultation CTA.

### How It Works

Five steps:

1. Scan QR Code
2. Validate location
3. Store data automatically
4. Monitor through the dashboard
5. Use the generated report

Each step has a small purposeful animation that demonstrates its state without
competing with the hero.

### Features

Six product capabilities:

- QR Code Attendance
- GPS Location Validation
- Real-Time Dashboard
- Auto Attendance Report
- Late & Permission Tracking
- Multi-Use Implementation

### Packages

Basic, Standard, and Premium have increasingly complete feature sets and a
clear intended audience. Standard has the label "Paling Direkomendasikan".
Each package CTA creates a package-specific WhatsApp message.

### Gallery, Testimonials, FAQ, Contact

- Gallery reuses the code-native product mockup language from the hero.
- Testimonials are explicitly marked in source as placeholders until approved
  client quotes exist.
- FAQ includes the six approved commercial questions.
- Final CTA offers WhatsApp, email, and the contact form.

## 7. Motion Specification

### Hero Intro Timeline

- `0.1s`: navbar fade-down
- `0.3s`: grid/background fade-in
- `0.5s`: headline line 1 reveal
- `0.7s`: headline line 2 reveal
- `0.9s`: headline line 3 reveal
- `1.1s`: supporting copy reveal
- `1.2s`: dashboard entrance
- `1.35s`: phone entrance
- `1.5s`: CTA and proof items

### Dashboard

- Statistics count from zero to 86%, 9%, and 5%.
- Chart stroke draws once on hero entry.
- Live indicator pulses subtly.
- Dashboard floats slowly after the entrance.
- A recent-attendance row highlights when the phone reaches success state.

### QR Simulation

The phone loops through:

1. `Memindai QR...`
2. `Memvalidasi GPS...`
3. `Absensi Berhasil`

The QR frame has a moving scan line and detection glow. The final state shows a
success check and sends a visual update to the dashboard. The full cycle must
remain understandable when JavaScript is delayed; the static first state is
valid content.

### Scroll and Hover

- Section heading and content blocks reveal on entry.
- Repeated items use a short stagger.
- Navbar underline slides in.
- CTAs lift and move their arrow.
- Cards lift by a few pixels without large scaling.
- Gallery media zooms within its frame.
- FAQ opens smoothly.

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- intro sequence is disabled;
- QR scan loop is disabled;
- floating and stagger animations are disabled;
- chart and counters render directly in the final state;
- content remains visible and fully usable.

## 8. Backend Contract

The backend remains one FastAPI project.

### `GET /health`

Returns:

```json
{
  "status": "ok",
  "service": "presensigo-api"
}
```

`/api/health` remains available as a compatibility alias with the same response.

### `POST /contact`

Accepts:

```json
{
  "name": "string",
  "organization": "string or empty",
  "contact": "string",
  "message": "string"
}
```

Rules:

- `name`, `contact`, and `message` are required and trimmed.
- `organization` is optional.
- inputs have conservative maximum lengths;
- no credentials or secrets are stored;
- successful response confirms receipt and includes the encoded WhatsApp
  consultation URL.

The existing `/api/contact` endpoint remains available as a compatibility alias
for the current frontend and tests.

## 9. Contact URLs

Main WhatsApp:

`https://wa.me/6285959763633?text=Halo%20Presensigo,%20saya%20ingin%20konsultasi%20tentang%20sistem%20absensi%20digital.`

Email:

`mailto:bebas619akun@gmail.com?subject=Konsultasi%20Presensigo&body=Halo%20Presensigo,%20saya%20ingin%20konsultasi%20tentang%20sistem%20absensi%20digital.`

These actions are available from Home and every detail page.

## 10. Responsive and Accessibility Requirements

- Verify desktop 1440px, laptop 1024px, tablet 768px, and mobile 375px.
- Mobile hero is one column: copy first, product visual second.
- Dashboard and phone retain readable proportions.
- Mobile navbar is keyboard-accessible and updates `aria-expanded`.
- No horizontal overflow at supported widths.
- Semantic landmarks and heading hierarchy remain valid.
- Interactive elements have visible focus states.
- Non-hero images use lazy loading and descriptive alt text.
- Color contrast remains readable.
- Browser console must have no errors.

## 11. Documentation Deliverables

Update or create:

- `docs/asset-analysis.md`
- `docs/bmc-web-mapping.md`
- `docs/website-structure.md`
- `docs/animation-plan.md`
- `docs/implementation-report.md`

The implementation report must include the complete requested reporting
structure, changed and created files, test commands, unresolved asset gaps, and
a concise summary suitable for review in ChatGPT.

## 12. Verification Strategy

Automated tests cover:

- all seven public routes;
- `/health` and compatibility health endpoint;
- contact validation and response;
- package ordering and package-specific WhatsApp links;
- required Home sections and key copy;
- local static assets.

Browser QA covers:

- hero intro and final visual state;
- QR scan state progression;
- count-up and dashboard update;
- chart draw;
- navigation and mobile menu;
- FAQ interaction;
- scroll reveals;
- reduced-motion static state;
- no horizontal overflow at 1440, 1024, 768, and 375px;
- zero console errors.

## 13. Intentional Constraints

- No public Business Model Canvas table.
- No database or complex backend workflow.
- No unapproved claims, client logos, or real testimonial attribution.
- Product screenshots remain code-native mockups until official screenshots are
  supplied.
- Drive assets inform layout, palette, type rhythm, and product framing; visually
  irrelevant food, property, and construction imagery is not embedded.
