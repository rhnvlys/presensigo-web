# PRESENSIGO Website

Website resmi PRESENSIGO dengan frontend responsif dan backend FastAPI.

Frontend memakai Jinja, CSS lokal, Vanilla JavaScript, GSAP, dan
ScrollTrigger. Jika CDN GSAP tidak tersedia, website otomatis memakai fallback
CSS/IntersectionObserver/native scroll.

## Menjalankan Project

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Buka `http://127.0.0.1:8000`.

## Build Tailwind

CSS Tailwind sudah dikompilasi lokal. Setelah mengubah class pada template:

```powershell
npx --yes tailwindcss@3.4.17 -i .\app\static\css\tailwind-input.css -o .\app\static\css\tailwind.css --minify --content '.\app\templates\**\*.html'
```

## Test

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

## Struktur

- `app/main.py`: route HTML dan endpoint API.
- `app/data.py`: paket, fitur, galeri, testimoni, dan FAQ.
- `app/templates/`: template Jinja untuk tujuh halaman.
- `app/static/`: CSS dan JavaScript.
- `docs/asset-analysis.md`: analisis aset Google Drive.
- `docs/bmc-web-mapping.md`: pemetaan model bisnis ke fungsi website.
- `docs/website-structure.md`: route, endpoint, dan struktur halaman.
- `docs/animation-plan.md`: timeline motion dan reduced-motion.
- `docs/implementation-report.md`: laporan implementasi lengkap.
- `assets/concepts/`: konsep visual hasil pengolahan referensi.

## Endpoint

- `GET /health` dan `GET /api/health`
- `POST /contact` dan `POST /api/contact`

Endpoint kontak menerima JSON atau form-urlencoded dengan field `name`,
`contact`, `message`, dan `organization` opsional.

## Kontak

- WhatsApp: `085959763633`
- Email: `bebas619akun@gmail.com`
