# Rencana Animasi PRESENSIGO

## Prinsip

- Units.gr menjadi referensi tempo loading, pinned storytelling, horizontal
  movement, parallax, dan transisi scene saja.
- Identitas visual tetap Premium Brutalist PRESENSIGO.
- GSAP/ScrollTrigger menangani motion yang membutuhkan timeline dan presisi.
- CSS keyframes menangani loop ringan: QR scan, moving grid, signal pulse,
  scan sweep, data stream, live indicator, dan hover.
- Konten visible secara default; fallback tetap usable tanpa CDN.

## Loading

1. Overlay near-black tampil fullscreen.
2. Wordmark PRESENSIGO masuk.
3. QR scan, GPS pulse, dan data dots aktif.
4. Progress bergerak 0-100% dengan status:
   `Menyiapkan Sistem...`, `Memuat Dashboard...`,
   `Mengaktifkan QR + GPS...`, dan `Siap Digunakan`.
5. Overlay wipe ke atas dan hero timeline dimulai.

Durasi normal sekitar 2 detik. Timeout paksa tiga detik memastikan overlay
tidak mengunci halaman. Reduced motion selesai sekitar 300ms.

## Hero Timeline

- Navbar fade-down.
- Grid fade-in.
- Tiga baris headline reveal dari bawah.
- Supporting copy dan CTA masuk.
- Chips muncul stagger.
- Dashboard masuk dari kanan dengan rotasi kecil.
- Phone masuk dari kanan bawah.
- Counter dan chart mulai.
- QR simulation serta signal dots aktif.

Hero desktop 1440px dijaga setinggi first viewport. Headline memakai tiga baris
tanpa wrap; dashboard dan phone selesai sebelum batas 1000px viewport.

## QR dan Dashboard

- QR cycle: scanning 1.45s, validating 1.05s, success 1.35s.
- Phone memakai glow mustard saat validasi dan glow success saat berhasil.
- Success check muncul, baris dashboard mendapat highlight, dan label
  `Data masuk` ditampilkan.
- Counter bergerak ke 86, 9, dan 5.
- Chart SVG menggambar satu kali.
- Dashboard floating perlahan setelah entrance.

## ScrollTrigger

### Smooth Reveal

- Heading dan content block bergerak dari `y: 58` ke posisi final.
- Opacity awal 0.35 agar full-page capture tidak menghasilkan section kosong.
- Problem cards memiliki stagger dan rotasi kecil dari -2 derajat.

### Sticky Benefit

- Intro kiri memakai CSS sticky.
- ScrollTrigger mengaktifkan benefit berdasarkan posisi viewport.
- Active benefit mendapat indicator biru, background terang, dan icon pulse.

### Pinned Workflow

- Aktif pada `min-width: 900px`.
- Section `#cara-kerja` dipin.
- Track bergerak horizontal berdasarkan overflow aktual.
- `scrub: 1` menghubungkan translate dengan scroll.
- Progress bar dan step aktif mengikuti progress.
- Di bawah 900px, cards kembali menjadi stack/native flow.

### Sticky Pricing

- Intro kiri sticky pada desktop.
- Basic, Standard, dan Premium reveal satu per satu.
- Standard mendapat active highlight dan scale maksimum 1.03.
- Mobile memakai contained scroll-snap pada pricing stack.

### Product Showcase

- Galeri tetap contained horizontal scroll-snap agar ringan.
- Caption dan slide aktif mengikuti card terdekat dari pusat.
- GSAP memberi entrance stagger; tombol prev/next tetap native.

### Parallax dan Ambient

- Blob mustard/coral serta glow bergerak dengan scrub ringan.
- Grid, data stream, GPS dots, dan scan sweep tetap CSS-only.
- Atmosfer section berganti cream, night, paper, dan coral/mustard.

## Fallback

Jika GSAP/ScrollTrigger tidak tersedia:

- preloader berjalan dengan `requestAnimationFrame`;
- hero memakai CSS intro;
- reveal memakai IntersectionObserver;
- workflow dan galeri memakai native scroll;
- QR, counter, dan chart tetap berjalan;
- tidak ada exception JavaScript.

## Reduced Motion

- Preloader dipercepat.
- GSAP tidak diinisialisasi dan jumlah ScrollTrigger adalah nol.
- Pin, scrub, parallax, stagger, floating, moving grid, data stream, dan scan
  loop dimatikan.
- QR langsung `Absensi Berhasil`.
- Counter langsung `86`, `9`, `5`.
- Chart langsung memiliki `stroke-dashoffset: 0`.
- Semua `[data-reveal]` terlihat.

## Lokasi Implementasi

- Template/hook: `app/templates/base.html`, `app/templates/home.html`
- CSS/keyframes/responsive: `app/static/css/styles.css`
- Timeline/fallback/state: `app/static/js/site.js`
- Contract tests: `tests/test_app.py`
