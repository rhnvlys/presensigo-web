from fastapi.testclient import TestClient

from app.main import PACKAGE_MESSAGES, WHATSAPP_BASE_URL, app


client = TestClient(app)


def test_health_endpoint():
    for path in ("/health", "/api/health"):
        response = client.get(path)
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "service": "presensigo-api"}


def test_all_public_pages_are_available():
    for path in (
        "/",
        "/tentang",
        "/layanan",
        "/galeri",
        "/testimoni",
        "/faq",
        "/kontak",
    ):
        response = client.get(path)
        assert response.status_code == 200
        assert "PRESENSIGO" in response.text


def test_packages_are_ordered_and_increasingly_complete():
    response = client.get("/api/packages")
    packages = response.json()

    assert [package["name"] for package in packages] == [
        "Basic",
        "Standard",
        "Premium",
    ]
    assert len(packages[0]["features"]) < len(packages[1]["features"])
    assert len(packages[1]["features"]) < len(packages[2]["features"])


def test_packages_describe_three_implementation_models():
    packages = client.get("/api/packages").json()

    assert [
        (package["name"], package["label"], package["mode"])
        for package in packages
    ] == [
        ("Basic", "Sistem Siap Pakai", "ready"),
        ("Standard", "Integrasi Website", "integration"),
        ("Premium", "Website + Sistem", "website"),
    ]
    assert "tanpa perlu membuat website baru" in packages[0]["description"]
    assert "website yang sudah ada" in packages[1]["description"]
    assert "website resmi" in packages[2]["description"]
    assert packages[0]["limitations"] == [
        "Belum termasuk integrasi ke website pembeli",
        "Belum termasuk pembuatan website resmi khusus",
    ]
    assert packages[1]["featured"] is True


def test_package_messages_match_approved_positioning():
    assert PACKAGE_MESSAGES == {
        "Basic": (
            "Halo Presensigo, saya tertarik dengan Paket Basic untuk sistem "
            "absensi siap pakai. Bisa konsultasi lebih lanjut?"
        ),
        "Standard": (
            "Halo Presensigo, saya tertarik dengan Paket Standard untuk "
            "integrasi sistem Presensigo ke website yang sudah ada. Bisa "
            "konsultasi lebih lanjut?"
        ),
        "Premium": (
            "Halo Presensigo, saya tertarik dengan Paket Premium untuk "
            "pembuatan website resmi sekaligus sistem absensi Presensigo. "
            "Bisa konsultasi lebih lanjut?"
        ),
    }


def test_contact_request_returns_whatsapp_url():
    response = client.post(
        "/contact",
        json={
            "name": "Ayu",
            "organization": "Universitas Nusantara",
            "contact": "ayu@example.com",
            "message": "Kami membutuhkan absensi untuk 2.000 mahasiswa.",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["message"] == "Permintaan konsultasi berhasil diterima."
    assert payload["whatsapp_url"].startswith(WHATSAPP_BASE_URL)
    assert "Universitas%20Nusantara" in payload["whatsapp_url"]


def test_contact_accepts_form_encoded_payload():
    response = client.post(
        "/api/contact",
        data={
            "name": "Budi",
            "organization": "",
            "contact": "085959763633",
            "message": "Ingin konsultasi Paket Standard.",
        },
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_contact_request_rejects_empty_required_fields():
    response = client.post(
        "/contact",
        json={"name": " ", "organization": "", "contact": "", "message": ""},
    )
    assert response.status_code == 422


def test_package_links_use_distinct_whatsapp_messages():
    response = client.get("/layanan")
    for package_name in ("Basic", "Standard", "Premium"):
        assert f"saya%20tertarik%20dengan%20Paket%20{package_name}" in response.text


def test_home_contains_complete_sales_sections():
    response = client.get("/")
    assert response.status_code == 200
    for section_id in (
        "masalah",
        "kenapa-presensigo",
        "cara-kerja",
        "fitur",
        "paket",
        "galeri",
        "testimoni",
        "faq-ringkas",
        "konsultasi",
    ):
        assert f'id="{section_id}"' in response.text
    assert "Masalah Absensi Manual Masih Menghambat Operasional?" in response.text
    assert "Kenapa Harus Presensigo?" in response.text
    assert "Cara Kerja Presensigo" in response.text


def test_home_contains_premium_corporate_scene_hooks():
    html = client.get("/").text

    for marker in (
        "panel-transition",
        "red-mask",
        "geometric-wipe",
        "dark-panel",
        "big-type",
        "scroll-scene",
        "horizontal-track",
        "pricing-strategy-strip",
        "pricing-sticky",
        "showcase-track",
        "data-workflow-track",
        "data-workflow-progress",
        "data-gallery-track",
        "data-gallery-prev",
        "data-gallery-next",
    ):
        assert marker in html
    assert "Pilih Cara Implementasi Presensigo" in html
    assert "Tiga Cara Implementasi" in html
    assert "section-wave-container" not in html
    assert "js-parallax-blob" not in html


def test_gsap_and_scrolltrigger_load_before_site_script():
    html = client.get("/").text
    gsap_url = "/static/vendor/gsap.min.js"
    scrolltrigger_url = "/static/vendor/ScrollTrigger.min.js"
    lenis_url = "/static/vendor/lenis.min.js"

    assert gsap_url in html
    assert scrolltrigger_url in html
    assert lenis_url in html
    assert html.index(gsap_url) < html.index(scrolltrigger_url)
    assert html.index(scrolltrigger_url) < html.index(lenis_url)
    assert html.index(lenis_url) < html.index("/static/js/site.js")
    assert "cdn.jsdelivr.net/npm/gsap" not in html
    assert "cdn.jsdelivr.net/npm/lenis" not in html
    assert client.get(gsap_url).status_code == 200
    assert client.get(scrolltrigger_url).status_code == 200
    assert client.get(lenis_url).status_code == 200


def test_home_contains_gsap_animation_hooks_and_no_close_artifact():
    html = client.get("/").text

    for marker in (
        "preloader",
        "preloader__logo",
        "preloader__scan",
        "preloader__progress",
        "preloader__progress-bar",
        "preloader__status",
        "preloader__percent",
        "js-nav",
        "js-hero-line",
        "js-hero-copy",
        "js-hero-cta",
        "js-hero-chip",
        "js-dashboard",
        "js-phone",
        "data-hero-mask",
        "data-panel-transition",
        "data-scene-transition",
        "transition-packages-gallery",
        "data-workflow-progress-bar",
        "data-gallery-progress-bar",
        "data-gallery-description",
    ):
        assert marker in html
    assert 'body class="antialiased is-preloading"' in html
    for status in (
        "Menyiapkan sistem",
        "Memuat dashboard",
        "Validasi QR + GPS",
        "Siap digunakan",
    ):
        assert status in html
    assert ">Close<" not in html


def test_site_script_exposes_progressive_gsap_motion_contract():
    script = client.get("/static/js/site.js").text

    for function_name in (
        "initPreloader",
        "initGSAP",
        "initSmoothScroll",
        "initHeroTimeline",
        "initHeroScrollTransform",
        "initSceneTransitions",
        "initProblemsReveal",
        "initPinnedWorkflow",
        "initStickyBenefits",
        "initFeaturesReveal",
        "initStickyPricing",
        "initProductShowcase",
        "initQRSimulation",
        "initDashboardCounters",
        "initReducedMotion",
    ):
        assert f"function {function_name}" in script

    assert "gsap.registerPlugin" in script
    assert "pin: true" in script
    assert "scrub: 1" in script
    assert "window.gsap" in script
    assert "window.ScrollTrigger" in script
    assert "window.Lenis" in script
    assert "window.presensigoLenis" in script
    assert "gsap.ticker.add" in script
    assert "gsap.matchMedia()" in script
    assert "getCenteredTrackBounds" in script
    assert 'document.body.classList.remove("is-preloading")' in script
    assert '"motion-ready"' in script
    assert "initCustomCursor" not in script
    assert "elastic.out" not in script
    assert "back.out" not in script
    assert 'window.addEventListener("load", run' not in script


def test_every_public_page_exposes_whatsapp_and_email():
    for path in (
        "/",
        "/tentang",
        "/layanan",
        "/galeri",
        "/testimoni",
        "/faq",
        "/kontak",
    ):
        html = client.get(path).text
        assert "https://wa.me/6285959763633" in html
        assert "mailto:bebas619akun@gmail.com" in html


def test_frontend_assets_are_local_and_available():
    response = client.get("/")
    assert "cdn.tailwindcss.com" not in response.text
    assert "/static/css/tailwind.css" in response.text
    assert client.get("/static/css/tailwind.css").status_code == 200
    assert client.get("/static/favicon.svg").status_code == 200
