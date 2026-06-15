# Struktur Website PRESENSIGO

## Arsitektur

- Backend: FastAPI
- Rendering: Jinja templates
- Styling: CSS lokal terstruktur dan build Tailwind lokal
- Interaksi: Vanilla JavaScript
- Motion: GSAP + ScrollTrigger untuk sequence/pin/scrub, CSS keyframes untuk
  loop ringan, dan IntersectionObserver sebagai fallback
- Penyimpanan: tidak ada database; permintaan konsultasi tidak disimpan

## Route Publik

| Route | Fungsi |
| --- | --- |
| `/` | Landing page utama 12 section |
| `/tentang` | Detail prinsip dan nilai produk |
| `/layanan` | Fitur dan paket Basic, Standard, Premium |
| `/galeri` | Mockup dashboard, GPS, QR, dan laporan |
| `/testimoni` | Format social proof dengan placeholder transparan |
| `/faq` | Enam pertanyaan komersial |
| `/kontak` | Form konsultasi, WhatsApp, dan email |

## Endpoint

| Method | Route | Fungsi |
| --- | --- | --- |
| GET | `/health` | Status utama layanan |
| GET | `/api/health` | Alias kompatibilitas |
| POST | `/contact` | Menerima JSON atau form-urlencoded |
| POST | `/api/contact` | Alias kompatibilitas |

Respons health:

```json
{"status":"ok","service":"presensigo-api"}
```

Field kontak:

- Wajib: `name`, `contact`, `message`
- Opsional: `organization`
- Semua input di-trim dan dibatasi panjangnya.
- Respons berhasil berisi status, pesan, dan URL WhatsApp yang sudah di-encode.

## Home: 12 Section

1. Navbar dengan route detail dan CTA.
2. Hero dengan headline, dashboard, QR scanner, chart, dan statistik.
3. Masalah yang diselesaikan PRESENSIGO.
4. Kenapa harus PRESENSIGO.
5. Cara kerja lima tahap.
6. Enam fitur utama.
7. Paket Basic, Standard, Premium.
8. Galeri/tampilan sistem.
9. Testimoni placeholder.
10. FAQ ringkas.
11. Kontak dan CTA akhir.
12. Footer dengan route, WhatsApp, dan email.

## Struktur File

- `app/main.py`: route HTML, endpoint, validasi, dan context global.
- `app/data.py`: konten terstruktur untuk masalah, manfaat, fitur, paket,
  galeri, testimoni, dan FAQ.
- `app/templates/base.html`: shell, navbar, footer, dan aset global.
- `app/templates/home.html`: landing page lengkap.
- `app/templates/*.html`: enam halaman detail.
- `app/static/css/styles.css`: design system dan responsive rules.
- `app/static/css/tailwind.css`: hasil build lokal Tailwind.
- `app/static/js/site.js`: menu, FAQ, contact form, reveal, counter, chart,
  dan QR simulation.
- `tests/test_app.py`: pengujian route, endpoint, konten, link, dan aset.

## Responsive dan Aksesibilitas

- Breakpoint utama diverifikasi pada 1440, 1024, 768, dan 375px.
- Hero mobile satu kolom: copy di atas, mockup di bawah.
- Workflow memakai pinned horizontal timeline dengan `scrub: 1` mulai 900px
  dan stack vertikal di mobile.
- Galeri memakai product showcase horizontal dengan tombol sebelumnya/berikutnya.
- Pricing memakai sticky intro di desktop dan scroll-snap terisolasi di mobile.
- Menu mobile memakai `aria-expanded` dan dapat ditutup dengan Escape.
- FAQ memakai button, `aria-controls`, dan `aria-expanded`.
- Focus state tersedia untuk elemen interaktif.
- `prefers-reduced-motion` menampilkan kondisi akhir tanpa sequence.
- Layout mencegah horizontal overflow.
- Preloader mempunyai timeout paksa maksimal tiga detik dan tidak dapat
  mengunci halaman apabila GSAP gagal dimuat.

## Hook Interaksi

- `[data-workflow-track]`, `[data-workflow-card]`, dan
  `[data-workflow-progress]`: progress timeline.
- `[data-gallery-track]`, `[data-gallery-card]`, `[data-gallery-prev]`, dan
  `[data-gallery-next]`: product showcase.
- `.pricing-stack`: kolom kartu desktop dan container scroll-snap mobile.
- `.animated-grid`, `.signal-field`, `.scan-sweep`, dan `.section-ambient`:
  background system kode-native.
- `.preloader*`: loading QR/GPS/data dan progress 0-100%.
- `.js-hero-*`, `.js-dashboard`, `.js-phone`, dan `.js-parallax-blob`: target
  timeline serta parallax GSAP.
- `[data-workflow-progress-bar]`: progress pinned horizontal workflow.

## Progressive Enhancement

- GSAP dan ScrollTrigger dimuat dari CDN sebelum `site.js`.
- `site.js` memeriksa `window.gsap` dan `window.ScrollTrigger`.
- Jika CDN gagal, preloader memakai progres Vanilla JS, reveal memakai
  IntersectionObserver, workflow/galeri memakai native scroll, dan seluruh
  konten tetap terlihat.
- Pada reduced motion, pin/scrub tidak dibuat, QR langsung sukses, counter
  langsung final, dan chart langsung selesai.
