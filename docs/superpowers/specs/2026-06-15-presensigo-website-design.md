# PRESENSIGO Website Design

## Tujuan

Membangun website resmi PRESENSIGO yang menjelaskan produk absensi QR dan GPS,
menampilkan paket layanan, dan mengarahkan calon klien ke WhatsApp.

## Arah Visual

Desain civic tech-brutalist yang menggabungkan palet krem/koral dari Crav,
grid teknis Enerblock, whitespace editorial Tresmares, dan product framing
Mira/ApeChain. Semua elemen UI utama tetap berupa HTML, CSS, dan SVG.

## Arsitektur

FastAPI melayani tujuh route HTML berbasis Jinja dan endpoint JSON untuk paket,
galeri, testimoni, FAQ, serta pengiriman formulir. Konten bersama disimpan di
`app/data.py`. Frontend memakai Tailwind Play CDN ditambah CSS token lokal.

## Halaman

- Home: hero, fitur inti, client fit, CTA.
- Tentang: masalah, solusi, proses, dan prinsip produk.
- Layanan: tiga fitur dan paket Basic, Standard, Premium.
- Galeri: empat mockup workflow produk.
- Testimoni: kutipan institusional.
- FAQ: accordion aksesibel.
- Kontak: detail kontak dan form yang menghasilkan tautan WhatsApp.

## Kontak

- WhatsApp: `6285959763633`.
- Email: `bebas619akun@gmail.com`.
- Semua CTA pemesanan menggunakan elemen `<a>` dan mengarah ke WhatsApp.

## Verifikasi

- Pytest untuk route, API, validasi kontak, dan tautan WhatsApp.
- Browser desktop dan mobile untuk overflow, navigasi, accordion, dan form.

