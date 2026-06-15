# Rencana Animasi PRESENSIGO

## Arah Motion

- Referensi utama: video Tresmares Capital dan Private Equity yang diberikan.
- Karakter: premium corporate, minimal, typographic, tegas, dan clean.
- Elemen utama: big typography, coral geometric mask, dark panel, whitespace,
  pinned scroll, dan horizontal movement.
- Tidak digunakan: custom cursor, wave playful, particle loop, glow besar,
  elastic easing, back easing, dan bounce dekoratif.

## Pembagian Tanggung Jawab

GSAP dan ScrollTrigger menangani:

- loading intro;
- hero cinematic reveal;
- hero scroll transform;
- geometric panel transition;
- sticky benefit activation;
- pinned horizontal workflow;
- sticky pricing activation;
- pinned horizontal product showcase;
- reveal dan scrub berbasis scroll.

CSS keyframes hanya menangani:

- QR scan line;
- live indicator pulse;
- small GPS/data pulse;
- hover micro-interaction.

## Loading

1. Overlay near-black tampil fullscreen.
2. Wordmark PRESENSIGO masuk dari bawah.
3. QR/GPS mini menjadi detail sekunder.
4. Thin progress line bergerak dengan status:
   `Menyiapkan sistem`, `Memuat dashboard`, `Validasi QR + GPS`, dan
   `Siap digunakan`.
5. Coral panel menutup scene, lalu overlay bergerak ke atas.
6. Hero timeline dimulai setelah loader tersembunyi.

GSAP dan ScrollTrigger disajikan dari `app/static/vendor/`, sehingga loader
tidak menunggu CDN. Durasi browser terukur sekitar 1,7 detik. Safety timeout
2,2 detik tetap mencegah overlay mengunci halaman.

## Hero

- Satu coral geometric mask menjadi scene opener.
- Headline tiga baris reveal dengan `power3.out`.
- Subheadline, CTA, dan chips masuk tanpa bounce.
- Dashboard masuk dari kanan dengan scale kecil.
- Phone QR masuk setelah dashboard.
- QR simulation, counter, dan chart dimulai setelah product visual terlihat.
- Saat scroll desktop, headline bergerak naik, dashboard scale turun sedikit,
  phone bergerak naik, mask bergeser, dan grid bergerak lebih lambat.

## Section Transition

- Hero ke Problems: coral diagonal geometric wipe.
- Problems ke Why: near-black curtain naik dari bawah.
- Why ke Workflow: coral/blue data line menarik secara horizontal.
- FAQ ke Final CTA: coral geometric wipe.

Semua transition memakai scrub linear dan tidak memakai wave SVG.

## Problems

- Heading dan copy memakai reveal editorial.
- Empat cards masuk dengan stagger 0,09 detik.
- Card hanya fade/slide; tidak memakai rotasi atau bounce.
- Hover lift dibatasi sekitar lima pixel.

## Why PRESENSIGO

- Background near-black tanpa neon.
- Intro kiri sticky mulai 900px.
- Benefit rows aktif berdasarkan posisi viewport.
- Active row memakai border coral, background sedikit lebih terang, lift kecil,
  dan icon pulse halus.

## Cara Kerja

- Desktop 900px ke atas memakai `pin: true` dan `scrub: 1`.
- Track bergerak horizontal berdasarkan overflow aktual.
- Active step dan progress line mengikuti ScrollTrigger progress.
- Tombol step memindahkan scroll ke scene yang sesuai.
- Mobile memakai vertical stack tanpa pin.

## Features

- Enam card reveal dengan timing konsisten.
- Tidak ada scan sweep atau data stream dekoratif.
- Icon dan hover tetap ringan.

## Pricing

- Intro kiri sticky pada desktop.
- Basic, Standard, dan Premium reveal satu per satu.
- Card dekat viewport center mendapat active state.
- Scale maksimum 1,03 dan Standard tetap paling direkomendasikan.
- Mobile memakai contained horizontal scroll-snap.

## Product Showcase

- Desktop memakai pinned horizontal ScrollTrigger.
- Vertical scroll menggerakkan track galeri.
- Active item mengubah opacity, scale, caption, counter, dan progress line.
- Tombol previous/next tetap berfungsi.
- Mobile memakai contained horizontal scroll-snap tanpa pin.

## QR dan Dashboard

- QR cycle: scanning 1,4 detik, validating 1 detik, success 1,4 detik.
- Success mengubah row dashboard menjadi `Baru`, `GPS valid`, dan
  menampilkan badge `Data masuk`.
- Counter bergerak ke 86, 9, dan 5.
- Chart SVG menggambar satu kali.
- Tidak ada floating dashboard loop.

## Fallback

Jika GSAP atau ScrollTrigger tidak tersedia:

- loader memakai `requestAnimationFrame`;
- reveal memakai IntersectionObserver;
- workflow dan galeri memakai native scroll;
- QR, counter, dan chart tetap berfungsi;
- seluruh konten tetap terlihat;
- tidak ada undefined global.

## Reduced Motion

- Loader selesai cepat.
- Tidak dibuat pin, scrub, parallax, atau stagger.
- Workflow dan galeri kembali ke native layout.
- QR langsung success.
- Counter dan chart langsung final.
- Progress bar langsung penuh.
- Semua `[data-reveal]` terlihat.
