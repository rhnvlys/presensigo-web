# Struktur Website PRESENSIGO

## Arsitektur

- Backend: FastAPI
- Rendering: Jinja templates
- Styling: CSS lokal dan Tailwind build lokal
- Interaksi: Vanilla JavaScript
- Motion: GSAP 3.12.5 dan ScrollTrigger 3.12.5 dari static vendor lokal
- Fallback: IntersectionObserver dan native horizontal scroll
- Penyimpanan: tidak ada database; permintaan konsultasi tidak disimpan

## Route Publik

| Route | Fungsi |
| --- | --- |
| `/` | Sales landing page lengkap |
| `/tentang` | Prinsip dan nilai produk |
| `/layanan` | Fitur dan paket implementasi |
| `/galeri` | Mockup dashboard, GPS, QR, dan laporan |
| `/testimoni` | Social proof placeholder yang transparan |
| `/faq` | Pertanyaan komersial |
| `/kontak` | Form konsultasi, WhatsApp, dan email |

## Endpoint

| Method | Route | Fungsi |
| --- | --- | --- |
| GET | `/health` | Status layanan |
| GET | `/api/health` | Alias kompatibilitas |
| POST | `/contact` | Menerima JSON atau form-urlencoded |
| POST | `/api/contact` | Alias kompatibilitas |

Kontrak endpoint dan validasi backend tidak berubah pada revisi motion.

## Home

1. Navbar
2. Premium corporate hero
3. Coral geometric transition
4. Problems
5. Dark curtain
6. Why PRESENSIGO dark panel
7. Data line transition
8. Pinned horizontal workflow
9. Features
10. Sticky pricing
11. Pinned horizontal product showcase
12. Testimonials
13. FAQ
14. Coral final transition
15. Contact CTA
16. Footer

## Struktur File

- `app/main.py`: route HTML, endpoint, validasi, dan template context.
- `app/data.py`: konten terstruktur untuk seluruh section.
- `app/templates/base.html`: shell, loader, navbar, footer, dan script vendor.
- `app/templates/home.html`: scene dan hook landing page.
- `app/templates/*.html`: halaman detail.
- `app/static/css/styles.css`: design system, scene layout, dan responsive.
- `app/static/js/site.js`: interaction controller dan GSAP orchestration.
- `app/static/vendor/gsap.min.js`: GSAP 3.12.5 lokal.
- `app/static/vendor/ScrollTrigger.min.js`: ScrollTrigger 3.12.5 lokal.
- `tests/test_app.py`: route, endpoint, content, static asset, dan motion contract.

## Hook Motion

- `[data-preloader]`: loader controller.
- `[data-hero-mask]`: coral hero mask.
- `[data-panel-transition]`: geometric wipe dan dark curtain.
- `[data-workflow-track]`: pinned workflow track.
- `[data-workflow-progress-bar]`: workflow progress.
- `[data-gallery-track]`: pinned gallery track.
- `[data-gallery-progress-bar]`: gallery progress.
- `.pricing-sticky`: sticky pricing layout.
- `.dark-panel`: near-black technical scene.
- `.horizontal-track`: track yang dapat dipin atau memakai native scroll.

## Responsive

- 1440px: hero dua kolom, workflow dan gallery dipin.
- 1024px: pin tetap aktif karena viewport masih di atas 900px.
- 768px: layout stack, pin workflow/gallery dinonaktifkan.
- 375px: hero satu kolom, headline tidak clipping, dan body tidak overflow.
- Pricing mobile memakai contained scroll-snap.
- Gallery mobile memakai contained scroll-snap.

## Accessibility

- Menu mobile memperbarui `aria-expanded` dan dapat ditutup dengan Escape.
- FAQ memakai button, `aria-controls`, dan `aria-expanded`.
- Focus state tetap terlihat.
- Loader memakai live status dan screen-reader summary.
- Reduced motion tidak membuat ScrollTrigger pin/scrub.
- Tanpa GSAP, seluruh konten tetap visible dan usable.
