# PRESENSIGO Website

Website resmi PRESENSIGO — Solusi Absensi Digital Modern.

Frontend memakai Jinja, CSS lokal, Vanilla JavaScript, GSAP, dan
ScrollTrigger. Jika CDN GSAP tidak tersedia, website otomatis memakai fallback
CSS/IntersectionObserver/native scroll.

## 🚀 Live Production

- **Vercel**: [https://presensigo-web.vercel.app](https://presensigo-web.vercel.app)
- **GitHub**: [https://github.com/rhnvlys/presensigo-web](https://github.com/rhnvlys/presensigo-web)

## Stack

- **Backend**: FastAPI (Python)
- **Templating**: Jinja2
- **Styling**: CSS lokal + Tailwind (compiled)
- **JavaScript**: Vanilla JS
- **Animation**: GSAP + ScrollTrigger (CDN, with CSS fallback)
- **Deployment**: Vercel Serverless Python

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
- `api/index.py`: entrypoint Vercel serverless.
- `vercel.json`: konfigurasi routing Vercel.
- `docs/`: dokumentasi teknis project.
- `assets/concepts/`: konsep visual hasil pengolahan referensi.

## Endpoint

- `GET /health` dan `GET /api/health`
- `POST /contact` dan `POST /api/contact`

Endpoint kontak menerima JSON atau form-urlencoded dengan field `name`,
`contact`, `message`, dan `organization` opsional.

## Halaman

| Route | Deskripsi |
|-------|-----------|
| `/` | Home — landing page lengkap |
| `/tentang` | Tentang Presensigo |
| `/layanan` | Paket layanan |
| `/galeri` | Galeri implementasi |
| `/testimoni` | Testimoni pengguna |
| `/faq` | FAQ |
| `/kontak` | Formulir kontak |

## Deployment

Project di-deploy otomatis ke Vercel Production via GitHub integration.
Setiap push ke branch `main` memicu deployment baru secara otomatis.

**Entrypoint**: `api/index.py` → mengimpor `app.main:app`
**Runtime**: `@vercel/python` (Python 3.12)

## Kontak

- WhatsApp: `085959763633`
- Email: `bebas619akun@gmail.com`
