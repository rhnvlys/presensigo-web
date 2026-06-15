from pathlib import Path
from urllib.parse import parse_qs, quote

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field, ValidationError, field_validator

from .data import (
    BENEFITS,
    FAQS,
    FEATURES,
    GALLERY,
    PACKAGES,
    PROBLEMS,
    TESTIMONIALS,
    WORKFLOW,
)


BASE_DIR = Path(__file__).resolve().parent
WHATSAPP_NUMBER = "6285959763633"
WHATSAPP_BASE_URL = f"https://wa.me/{WHATSAPP_NUMBER}?text="
DEFAULT_WHATSAPP_MESSAGE = (
    "Halo Presensigo, saya ingin konsultasi tentang sistem absensi digital."
)
DEFAULT_WHATSAPP_URL = WHATSAPP_BASE_URL + quote(DEFAULT_WHATSAPP_MESSAGE)
CONTACT_EMAIL = "bebas619akun@gmail.com"
EMAIL_URL = (
    "mailto:bebas619akun@gmail.com"
    "?subject=Konsultasi%20Presensigo"
    "&body=Halo%20Presensigo,%20saya%20ingin%20konsultasi%20tentang"
    "%20sistem%20absensi%20digital."
)
PACKAGE_MESSAGES = {
    "Basic": (
        "Halo Presensigo, saya tertarik dengan Paket Basic untuk sistem "
        "absensi siap pakai. Bisa konsultasi lebih lanjut?"
    ),
    "Standard": (
        "Halo Presensigo, saya tertarik dengan Paket Standard untuk integrasi "
        "sistem Presensigo ke website yang sudah ada. Bisa konsultasi lebih "
        "lanjut?"
    ),
    "Premium": (
        "Halo Presensigo, saya tertarik dengan Paket Premium untuk pembuatan "
        "website resmi sekaligus sistem absensi Presensigo. Bisa konsultasi "
        "lebih lanjut?"
    ),
}
PACKAGE_WHATSAPP_URLS = {
    name: WHATSAPP_BASE_URL + quote(message)
    for name, message in PACKAGE_MESSAGES.items()
}

app = FastAPI(title="PRESENSIGO Website", version="2.0.0")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    organization: str = Field(default="", max_length=150)
    contact: str = Field(min_length=3, max_length=150)
    message: str = Field(min_length=3, max_length=1200)

    @field_validator("name", "organization", "contact", "message", mode="before")
    @classmethod
    def trim_text(cls, value: object) -> str:
        return str(value or "").strip()


async def parse_contact_request(request: Request) -> ContactRequest:
    content_type = request.headers.get("content-type", "")
    try:
        if "application/json" in content_type:
            payload = await request.json()
        else:
            body = (await request.body()).decode("utf-8")
            payload = {
                key: values[-1]
                for key, values in parse_qs(body, keep_blank_values=True).items()
            }
        return ContactRequest.model_validate(payload)
    except (ValidationError, ValueError) as error:
        detail = error.errors() if isinstance(error, ValidationError) else str(error)
        raise HTTPException(status_code=422, detail=detail) from None


def build_contact_whatsapp_url(payload: ContactRequest) -> str:
    organization = payload.organization or "Tidak dicantumkan"
    message = (
        "Halo Presensigo, saya ingin konsultasi tentang sistem absensi digital.\n\n"
        f"Nama: {payload.name}\n"
        f"Instansi/Organisasi: {organization}\n"
        f"Kontak: {payload.contact}\n"
        f"Kebutuhan: {payload.message}"
    )
    return WHATSAPP_BASE_URL + quote(message)


def template_context(request: Request, page: str) -> dict:
    return {
        "request": request,
        "page": page,
        "whatsapp_url": DEFAULT_WHATSAPP_URL,
        "whatsapp_base_url": WHATSAPP_BASE_URL,
        "package_whatsapp_urls": PACKAGE_WHATSAPP_URLS,
        "contact_email": CONTACT_EMAIL,
        "email_url": EMAIL_URL,
        "packages": PACKAGES,
        "features": FEATURES,
        "problems": PROBLEMS,
        "benefits": BENEFITS,
        "workflow": WORKFLOW,
        "gallery": GALLERY,
        "testimonials": TESTIMONIALS,
        "faqs": FAQS,
    }


def render_page(request: Request, template_name: str, page: str) -> HTMLResponse:
    return templates.TemplateResponse(
        request=request,
        name=template_name,
        context=template_context(request, page),
    )


@app.get("/", response_class=HTMLResponse)
def home(request: Request) -> HTMLResponse:
    return render_page(request, "home.html", "home")


@app.get("/tentang", response_class=HTMLResponse)
def about(request: Request) -> HTMLResponse:
    return render_page(request, "about.html", "about")


@app.get("/layanan", response_class=HTMLResponse)
def services(request: Request) -> HTMLResponse:
    return render_page(request, "services.html", "services")


@app.get("/galeri", response_class=HTMLResponse)
def gallery_page(request: Request) -> HTMLResponse:
    return render_page(request, "gallery.html", "gallery")


@app.get("/testimoni", response_class=HTMLResponse)
def testimonials_page(request: Request) -> HTMLResponse:
    return render_page(request, "testimonials.html", "testimonials")


@app.get("/faq", response_class=HTMLResponse)
def faq_page(request: Request) -> HTMLResponse:
    return render_page(request, "faq.html", "faq")


@app.get("/kontak", response_class=HTMLResponse)
def contact_page(request: Request) -> HTMLResponse:
    return render_page(request, "contact.html", "contact")


@app.get("/health")
@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "presensigo-api"}


@app.get("/api/packages")
def packages_api() -> list[dict]:
    return PACKAGES


@app.get("/api/gallery")
def gallery_api() -> list[dict]:
    return GALLERY


@app.get("/api/testimonials")
def testimonials_api() -> list[dict]:
    return TESTIMONIALS


@app.get("/api/faqs")
def faqs_api() -> list[dict]:
    return FAQS


@app.post("/contact")
@app.post("/api/contact")
async def contact_api(request: Request) -> dict:
    payload = await parse_contact_request(request)
    return {
        "success": True,
        "message": "Permintaan konsultasi berhasil diterima.",
        "whatsapp_url": build_contact_whatsapp_url(payload),
    }
