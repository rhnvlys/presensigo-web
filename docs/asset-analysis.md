# Analisis Aset Referensi PRESENSIGO

## Sumber dan Metode

- Folder Google Drive: `17IjlSSlzfVCt3uFaIaYGFMUp6kZ_8VcZ`
- Format referensi utama pada setiap kelompok: `01_struktur_layout.html`,
  `02_gaya_visual.json`, `03_aset_vektor.html`, serta folder aset gambar.
- Aset diperiksa sebagai bahan arah visual, bukan sebagai identitas merek atau
  konten produk PRESENSIGO.
- Beberapa file berekstensi `.png` dilaporkan Drive sebagai JPEG. Aset seperti
  ini tidak dipindahkan ke website agar tidak membawa masalah format dan konteks.

## Inventaris Kelompok Aset

| Kelompok | Aset yang ditemukan | Nilai untuk PRESENSIGO | Keputusan |
| --- | --- | --- | --- |
| Mira / Webflow | Ratusan PNG, WebP, AVIF, SVG, cuplikan UI, media proof, pricing, dan foto editorial | Struktur landing page SaaS, product storytelling, pricing, dan framing dashboard | Referensi visual |
| Crav Burgers | Sekitar 30 gambar, struktur HTML, token gaya, dan vektor | Krem-koral, headline besar, outline hitam, kartu ekspresif, dan ritme brutalist | Referensi utama; gambar makanan ditolak |
| Enerblock | Sekitar 15 foto teknis, struktur HTML, token gaya, dan vektor | Grid B2B, label teknis, komposisi proyek, dan framing dokumentasi | Referensi visual; foto konstruksi ditolak |
| Units | Foto interior/komunitas, ikon fasilitas SVG, galeri, struktur, dan token gaya | Referensi awal untuk loading dan horizontal storytelling | Referensi sekunder; motion playful tidak diteruskan |
| Tresmares Capital | Struktur HTML, token gaya, gambar, vektor, dan video scroll terbaru | Tipografi editorial premium, whitespace, section pacing, dan komposisi korporat | Referensi motion dan visual utama |
| Tresmares Private Equity | Video scroll terbaru | Red geometric planes, white/dark contrast, large typography, dan controlled scene transition | Referensi motion dan visual utama |
| ApeChain | Struktur HTML dan token gaya teknologi | Dashboard gelap, outline, aksen biru elektrik, dan kesan real-time | Referensi utama |
| Outfit / hellohello.is | 32 aset gambar, struktur HTML, token gaya, dan vektor | Latar `rgb(237,228,221)`, aksen merah, dan editorial type treatment | Referensi warna dan tipografi |
| Neue Montreal | 17 aset WebP, struktur HTML, token gaya, dan vektor | Bidang gelap, tipografi grotesk, selection coral `#FF4000` | Referensi tipografi dan kontras |
| Loft Thirty One | 13 aset PNG/JPEG/WebP/SVG, struktur HTML, dan token gaya | Serif display, mono labels, dan komposisi editorial gelap | Referensi label dan ritme editorial |
| Sowieso / Wero | 84 aset logo pembayaran, bank, video poster, struktur, dan token gaya | Referensi status, badge, dan komposisi layanan digital | Referensi terbatas; logo pihak ketiga ditolak |
| Example.com | Dua set HTML/JSON sederhana dan satu folder kosong | Kontrol pembanding tanpa nilai visual berarti | Tidak digunakan |
| Konsep lokal | `assets/concepts/01-hero-about.png`, `02-services-gallery.png`, `03-pricing-contact.png` | Sintesis visual Drive untuk hero, layanan, galeri, pricing, dan kontak | Acuan implementasi langsung |

## Klasifikasi Penggunaan

### Digunakan Langsung

- `app/static/favicon.svg` sebagai ikon kode-native PRESENSIGO.
- SVG inline yang dibuat khusus untuk QR, GPS, laporan, dashboard, dan status.
- Mockup dashboard, QR scanner, peta, tabel laporan, dan chart yang dibangun
  dengan HTML, CSS, dan SVG lokal.
- Coral geometric mask, dashboard, QR scanner, progress line, dan panel
  transition yang dibuat sepenuhnya dengan HTML/CSS/SVG lokal.
- Tidak ada foto atau logo pihak ketiga dari Drive yang ditampilkan di website.

### Digunakan sebagai Referensi

- Palet krem-koral dan border tegas dari Crav dan Outfit.
- Dashboard gelap dan aksen data biru dari ApeChain dan Mira.
- Grid teknis dari Enerblock.
- Tipografi editorial dan whitespace dari Tresmares, Neue Montreal, dan Loft
  Thirty One.
- Ritme pinned scroll dan horizontal storytelling dari video Tresmares.
- Red geometric block, dark/white contrast, whitespace, dan big typography dari
  video Private Equity.
- Status, badge, dan framing produk digital dari Wero.

### Ditolak sebagai Konten Live

- Foto makanan, bahan makanan, dan restoran.
- Foto properti, interior, konstruksi, energi, dan proyek industri.
- Logo bank, sistem pembayaran, media, atau merek referensi.
- Ilustrasi generik yang tidak menjelaskan absensi digital.
- Foto stok yang dapat membuat klaim klien atau implementasi palsu.

## Fungsi Aset pada Website

| Area | Penerapan |
| --- | --- |
| Hero | Headline editorial besar, komposisi dua kolom, dashboard gelap, dan phone scanner |
| Masalah | Kartu tegas dengan nomor, icon container konsisten, dan copy berbasis dampak bisnis |
| Manfaat | Grid enam alasan bisnis dengan aksen koral, biru, dan mustard |
| Cara kerja | Alur lima tahap dengan visual status kecil yang menjelaskan proses |
| Fitur | Ikon SVG satu bahasa visual dan deskripsi ringkas |
| Paket | Tiga kartu dengan anatomi seragam dan Standard sebagai rekomendasi |
| Galeri | Product mockup kode-native tanpa screenshot produk palsu |
| Testimoni | Format kutipan institusional yang jelas ditandai sebagai placeholder |
| Kontak | Form ringkas, CTA WhatsApp, dan email langsung |

Section paket menerjemahkan pola editorial dan product framing dari aset
referensi menjadi tiga mode implementasi yang relevan: sistem siap pakai,
integrasi website, dan website plus sistem. Tidak ada aset mentah tambahan yang
diperlukan untuk revisi animasi.

## Tema Visual yang Diterapkan

- Cream background: `#F5E3CD`
- Paper surface: `#FFF8EF`
- Ink: `#0C0B11`
- Coral: `#FF5949`
- Signal blue: `#2563EB`
- Mustard: `#F6C945`
- Dashboard night: `#11131A`
- Success: `#35D69C`
- Display: condensed system stack berbasis Impact/Arial Black
- Body/UI: Segoe UI/Arial
- Border: tegas dengan offset shadow terkontrol
- Motion: GSAP/ScrollTrigger untuk sequence dan storytelling; CSS keyframes
  hanya untuk QR scan, live pulse, small data pulse, dan micro-interaction

Video Tresmares dan Private Equity hanya digunakan untuk mempelajari tempo,
whitespace, geometric transition, typographic scale, dan pinned storytelling.
Tidak ada logo, copy, foto, atau identitas referensi yang disalin. Seluruh
visual live tetap code-native dan memakai palet Premium Brutalist PRESENSIGO.

## Kekurangan Aset

- Belum ada logo resmi PRESENSIGO dalam SVG/PNG.
- Belum ada screenshot produk resmi atau rekaman alur penggunaan.
- Belum ada foto tim, kantor, dokumentasi implementasi, dan data klien berizin.
- Belum ada testimoni nyata yang disetujui untuk publikasi.
- Belum ada harga nominal, SLA, alamat resmi, domain, atau akun media sosial.

Kekurangan tersebut ditangani dengan wordmark dan product mockup kode-native.
Saat aset resmi tersedia, mockup dapat diganti tanpa mengubah struktur halaman.
