# PRESENSIGO

Website promosi sistem absensi digital berbasis QR Code, validasi GPS,
dashboard monitoring, laporan otomatis, dan paket implementasi layanan.

## Live

- Vercel: https://presensigo-web.vercel.app
- GitHub: https://github.com/rhnvlys/presensigo-web

## Stack

- FastAPI
- Jinja
- CSS lokal
- Vanilla JavaScript
- GSAP
- ScrollTrigger
- Lenis
- Vercel Python Serverless

GSAP, ScrollTrigger, dan Lenis disajikan dari file vendor lokal. Website tetap
dapat digunakan dengan native scroll dan fallback CSS/JavaScript jika library
motion gagal dimuat.

## Fitur Utama

- Landing page premium corporate
- Preloader dengan anti-blank handoff
- Lenis smooth scroll
- Pinned horizontal workflow
- Sticky pricing
- Horizontal product showcase
- QR scan simulation
- Dashboard counter dan chart animation
- Contact endpoint untuk JSON dan form
- Responsive layout
- Reduced-motion mode
- No-GSAP fallback

## Menjalankan Lokal

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Buka `http://127.0.0.1:8000`.

## Testing

```powershell
python -m pytest
node --check app/static/js/site.js
```

Jika PowerShell belum mengaktifkan virtual environment:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

## Route dan Endpoint

Halaman publik:

- `/`
- `/tentang`
- `/layanan`
- `/galeri`
- `/testimoni`
- `/faq`
- `/kontak`

Endpoint:

- `GET /health`
- `GET /api/health`
- `POST /contact`
- `POST /api/contact`

Endpoint kontak menerima JSON atau form-urlencoded dengan field `name`,
`contact`, `message`, dan `organization` opsional.

## Deployment

Vercel menggunakan:

- `api/index.py` sebagai Python serverless entrypoint
- `vercel.json` untuk build dan routing
- `requirements.txt` untuk dependency Python

Production deployment dapat dijalankan dari root project:

```powershell
vercel deploy --prod
```

## Struktur Penting

- `app/main.py` - route HTML dan endpoint API
- `app/data.py` - data paket, fitur, galeri, testimoni, dan FAQ
- `app/templates/` - template Jinja
- `app/static/` - CSS, JavaScript, dan local vendor
- `api/index.py` - entrypoint Vercel Python Serverless
- `vercel.json` - konfigurasi deployment
- `docs/` - dokumentasi desain, motion, dan implementasi

## Kontak

- WhatsApp: 085959763633
- Email: bebas619akun@gmail.com
