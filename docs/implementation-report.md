# LAPORAN IMPLEMENTASI PRESENSIGO — FINAL PREMIUM MOTION POLISH

## 1. Ringkasan Pekerjaan

Final polish difokuskan pada kesinambungan motion, bukan penambahan dekorasi.
FastAPI, Jinja, route, endpoint, data paket, form kontak, QR simulation,
dashboard counter, serta CTA WhatsApp/email tetap dipertahankan.

Revisi utama:

- menghilangkan frame hitam/kosong saat loader keluar;
- menambahkan Lenis smooth scroll lokal yang tersinkron dengan ScrollTrigger;
- menurunkan dominasi red mask setelah hero intro;
- memperkuat scene transition antar-section;
- memusatkan active card pada workflow dan gallery;
- menghilangkan ruang kosong pada awal/akhir pinned scene;
- menambahkan caption gallery yang berubah halus;
- mempertahankan fallback mobile, reduced motion, dan no-GSAP.

## 2. Masalah Video Sebelumnya yang Diperbaiki

### Black/blank screen

Penyebabnya adalah isi loader memudar sebelum coral wipe menutup viewport.
Selain itu, CSS dan GSAP sama-sama memberi `translateY(101%)`, sehingga jarak
wipe terhitung dua kali.

Perbaikan:

- transform CSS dinonaktifkan ketika GSAP aktif;
- wordmark dan progress tetap terlihat sampai coral wipe hampir penuh;
- hero disiapkan dalam keadaan paused sebelum loader keluar;
- hero dimulai ketika coral wipe sudah menutup layar;
- body memakai state `is-preloading`, `is-loaded`, dan `motion-ready`;
- failsafe loader maksimal 2,2 detik.

### Red mask terlalu dominan

- Mask tetap menjadi scene opener, lalu turun ke opacity 0,58 pada desktop.
- Laptop 1024px memakai opacity 0,44 dan bidang yang lebih kecil.
- Mobile memakai opacity 0,36.
- Dashboard dan phone tetap berada di atas mask.

### Scroll, workflow, gallery, dan transition

- Lenis memberi wheel inertia yang lebih halus.
- Workflow dan gallery memakai perhitungan center-to-center.
- Active item berada di pusat viewport pada awal, tengah, dan akhir scene.
- Packages ke Gallery mendapat geometric dark reveal baru.
- Caption gallery berisi counter, title, dan deskripsi yang berubah tanpa
  flicker.

## 3. Smooth Scroll

Lenis 1.3.23 disimpan lokal di `app/static/vendor/lenis.min.js`.

Integrasi:

- `initSmoothScroll()` hanya berjalan pada width minimal 900px;
- Lenis memanggil `ScrollTrigger.update` pada event scroll;
- `lenis.raf()` dijalankan melalui `gsap.ticker`;
- `gsap.ticker.lagSmoothing(0)` menjaga sinkronisasi scrub;
- navigation ke posisi workflow/gallery memakai Lenis jika tersedia;
- `ScrollTrigger.refresh()` dijalankan setelah preloader selesai.

Konfigurasi utama:

- duration 1,15;
- smooth wheel aktif;
- touch smoothing nonaktif;
- wheel multiplier 0,9.

Fallback:

- jika Lenis gagal dimuat, native scroll tetap berjalan;
- width di bawah 900px tidak membuat instance Lenis;
- reduced motion selalu menonaktifkan Lenis.

Sampel inertia setelah wheel 900px:

- 20ms: 219px;
- 120ms: 517px;
- 300ms: 723px;
- 700ms: 804px.

## 4. Loading dan Hero

Preloader tetap near-black dengan:

- wordmark PRESENSIGO;
- QR/GPS mini;
- status text;
- percentage;
- thin coral progress line;
- coral full-panel exit.

Durasi terukur:

- 1440px: 1786ms;
- 1024px: 1513ms;
- 768px: 1520ms;
- 375px: 1498ms;
- reduced motion: 274ms.

Hero:

- timeline dibuat paused sebelum loader keluar;
- headline reveal tetap smooth tanpa bounce;
- dashboard dan phone masuk setelah typography;
- dashboard scroll scale berakhir pada 0,97;
- mask menjadi background plane setelah intro;
- dashboard opacity final 1 dan tidak tertutup mask;
- tidak ada body opacity 0 atau frame kosong.

## 5. Scene Transition

- Hero ke Problems: coral diagonal wipe dan heading reveal.
- Problems ke Why: dark curtain menuju near-black panel.
- Why ke Cara Kerja: coral/blue data line.
- Packages ke Gallery: geometric near-black panel reveal.
- FAQ ke CTA: coral geometric wipe dan CTA typography reveal.

Semua transition memakai satu shape besar dengan scrub linear. Wave, blob,
particle field, dan decorative sweep tidak dikembalikan.

## 6. Scroll Storytelling

### Pinned workflow

- Aktif mulai 900px.
- Card pertama, tengah, dan terakhir dipusatkan berdasarkan center geometry.
- Progress 50% mengaktifkan `Data Masuk Otomatis`.
- Selisih pusat pada progress 50%: 0,07px.
- Selisih pusat card pertama/terakhir: 0,07px.
- Nonaktif opacity 0,44 dan scale 0,955.
- Active card opacity 1, scale 1, dan border coral.
- End distance dihitung dari jarak pusat first-to-last, sehingga tidak ada
  blank tail.

### Sticky benefit

- Intro tetap sticky pada desktop.
- Watermark `PRESENSIGO` ditambahkan dengan opacity sangat rendah.
- Card aktif memakai border coral dan background dark yang bersih.
- Tidak ada neon glow besar.

### Sticky pricing

- Basic tetap paper.
- Standard tetap coral dan menjadi active card utama.
- Standard terukur memakai `scale: 1.025`.
- Premium tetap dark dengan geometri blue outline, bukan radial glow.
- Comparison strip tetap menampilkan tiga model implementasi.

### Product showcase

- Aktif mulai 900px.
- Progress 50% mengaktifkan `Validasi GPS`.
- Selisih pusat pada progress 50%: 0,53px.
- Selisih pusat awal: 0,09px; akhir: 0,16px.
- Counter, title, dan description berganti melalui short crossfade.
- Mobile tetap memakai contained horizontal scroll-snap.

## 7. Visual Simplification

Tetap dihapus atau dikurangi:

- custom cursor;
- hero particle field;
- ambient glow besar;
- wave divider;
- repeated scan sweep;
- floating dashboard loop;
- elastic, back, dan bounce easing;
- radial glow pada Premium pricing card.

Motion utama memakai `power3.out`, `expo.out`, atau `none` untuk scrub.

## 8. QR dan Dashboard Animation

QR loop tetap memiliki:

1. `Memindai QR...`
2. `Memvalidasi GPS...`
3. `Absensi Berhasil`

Success state tetap:

- mengaktifkan attendance row;
- mengubah waktu menjadi `Baru`;
- mengubah label menjadi `GPS valid`;
- menampilkan badge `Data masuk`.

Dashboard:

- counter selesai pada 86, 9, dan 5;
- chart selesai pada `stroke-dashoffset: 0`;
- reduced motion langsung menampilkan QR success dan data final.

## 9. Responsive dan Accessibility

- 1440px: Lenis, pinned workflow, sticky pricing, dan pinned gallery aktif.
- 1024px: Lenis dan pin tetap aktif; mask diperkecil dan opacity 0,44.
- 768px: Lenis dan pin nonaktif; layout native stack.
- 375px: Lenis dan pin nonaktif; mask opacity 0,36; body overflow 0px.
- Mobile menu mengubah `aria-expanded`, dapat ditutup dengan Escape.
- FAQ mengubah `aria-expanded` dan tetap keyboard accessible.
- Reduced motion: loader 274ms, nol ScrollTrigger, QR/counter/chart final.
- No-GSAP: hero dan dashboard terlihat, pin nonaktif, overflow 0px, tanpa
  console error.

## 10. File yang Diubah

- `app/templates/base.html` - Lenis local script dan body lifecycle class.
- `app/templates/home.html` - scene markers, Packages-to-Gallery transition,
  benefit watermark, dan gallery description data.
- `app/static/js/site.js` - preloader handoff, paused hero, Lenis integration,
  scene transition, centered workflow/gallery, caption crossfade, dan fallback.
- `app/static/css/styles.css` - loader anti-blank, Lenis styles, responsive mask,
  active states, pricing polish, watermark, dan mobile safeguards.
- `tests/test_app.py` - contract test untuk Lenis, lifecycle body, scene hooks,
  centered-track helper, caption, dan local vendor.
- `docs/implementation-report.md` - laporan final premium motion polish.

`app/main.py` dan `app/data.py` tidak diubah.

## 11. File yang Dibuat

- `app/static/vendor/lenis.min.js` - Lenis 1.3.23 dari paket npm resmi.

## 12. Testing

Commands:

```text
.\.venv\Scripts\python.exe -m pytest
node --check app/static/js/site.js
git diff --check
```

Hasil:

- Pytest: 16 passed.
- Warning: satu Starlette TestClient/httpx deprecation warning.
- JavaScript syntax: pass.
- Git whitespace check: pass; hanya warning LF ke CRLF.
- Route `/`, `/tentang`, `/layanan`, `/galeri`, `/testimoni`, `/faq`, dan
  `/kontak`: HTTP 200, nol console error.
- `/health` dan `/api/health`: `status=ok`.
- `/contact` dan `/api/contact`: success true dan WhatsApp URL valid.
- Browser engine: Microsoft Edge melalui Playwright fallback.
- Loading: selesai otomatis tanpa frame hitam kosong.
- Lenis: aktif pada 1440/1024; nonaktif pada 768/375.
- Workflow: centered start/mid/end dan progress linear.
- Sticky benefit: active state dan dark panel pass.
- Sticky pricing: Standard active dan scale 1,025.
- Gallery: centered start/mid/end, caption, counter, progress pass.
- QR loop, dashboard update, counter, dan chart: pass.
- 1440, 1024, 768, 375px: body overflow 0px.
- Reduced motion: 274ms, nol trigger, final data visible.
- No-GSAP fallback: visible, usable, nol console error.

## 13. Catatan/Kendala

- In-app Browser tidak tersedia pada sesi ini; QA memakai Playwright dengan
  Microsoft Edge.
- Frame video Tresmares dan Private Equity diekstrak melalui Edge dan
  dibandingkan dengan screenshot implementasi.
- Screenshot produk resmi, logo resmi, harga nominal, testimoni berizin, dan
  data klien belum tersedia.
- Product mockup tetap code-native dan testimoni tetap placeholder.
- Global Python shell tidak memiliki pytest; test dijalankan melalui project
  virtual environment.
- Warning pytest berasal dari deprecation Starlette TestClient/httpx dan tidak
  memengaruhi runtime.

## 14. Ringkasan untuk ChatGPT

PRESENSIGO sudah mendapat final premium motion polish: blank loader dihapus,
Lenis 1.3.23 lokal tersinkron dengan GSAP ScrollTrigger, red mask lebih ringan,
scene transition lebih jelas, workflow dan gallery terpusat tanpa blank tail,
caption gallery berubah smooth, dan Standard pricing tetap menjadi fokus.
Semua 7 route serta 4 endpoint lulus, pytest 16/16, console bersih, mobile
tanpa overflow, reduced motion aman, dan no-GSAP fallback tetap usable.
