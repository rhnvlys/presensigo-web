PROBLEMS = [
    {
        "number": "01",
        "slug": "fraud",
        "title": "Titip Absen Sulit Dicegah",
        "description": (
            "Absensi konvensional mudah dimanipulasi karena tidak selalu "
            "memverifikasi siapa yang hadir dan dari lokasi mana."
        ),
    },
    {
        "number": "02",
        "slug": "manual",
        "title": "Rekap Kehadiran Terlalu Manual",
        "description": (
            "Admin atau HR harus mengumpulkan, mengecek, dan menyusun laporan "
            "berulang kali sehingga proses menjadi lambat."
        ),
    },
    {
        "number": "03",
        "slug": "monitor",
        "title": "Monitoring Tidak Real-Time",
        "description": (
            "Manajemen sulit mengetahui kondisi kehadiran secara cepat karena "
            "data belum langsung tersaji dalam dashboard."
        ),
    },
    {
        "number": "04",
        "slug": "data",
        "title": "Data Kurang Transparan",
        "description": (
            "Tanpa validasi digital, data kehadiran lebih sulit "
            "dipertanggungjawabkan dan rawan perbedaan catatan."
        ),
    },
]

BENEFITS = [
    {
        "slug": "shield",
        "title": "Anti Titip Absen",
        "description": (
            "Kombinasi QR Code dan validasi lokasi membantu meminimalkan "
            "kecurangan pada proses absensi."
        ),
    },
    {
        "slug": "gps",
        "title": "Validasi GPS Real-Time",
        "description": (
            "Setiap kehadiran dapat diperiksa berdasarkan lokasi sehingga data "
            "lebih akurat dan dapat dipertanggungjawabkan."
        ),
    },
    {
        "slug": "dashboard",
        "title": "Dashboard Monitoring",
        "description": (
            "Admin dan manajemen melihat ringkasan kehadiran melalui dashboard "
            "yang ringkas dan mudah dibaca."
        ),
    },
    {
        "slug": "report",
        "title": "Laporan Otomatis",
        "description": (
            "Kurangi rekap manual dengan laporan absensi yang tersusun otomatis "
            "dan siap digunakan."
        ),
    },
    {
        "slug": "efficiency",
        "title": "Lebih Efisien untuk Admin",
        "description": (
            "Tim operasional tidak perlu menghabiskan banyak waktu untuk "
            "mencocokkan data kehadiran secara manual."
        ),
    },
    {
        "slug": "multi",
        "title": "Cocok untuk Banyak Kebutuhan",
        "description": (
            "Fleksibel untuk perusahaan, sekolah, kampus, instansi, komunitas, "
            "hingga event."
        ),
    },
]

WORKFLOW = [
    {
        "number": "01",
        "slug": "scan",
        "title": "Scan QR Code",
        "description": (
            "Pengguna memindai QR melalui perangkat yang tersedia untuk "
            "memulai proses absensi."
        ),
    },
    {
        "number": "02",
        "slug": "location",
        "title": "Validasi Lokasi",
        "description": (
            "Sistem memeriksa lokasi pengguna untuk memastikan absensi "
            "dilakukan dari area yang sesuai."
        ),
    },
    {
        "number": "03",
        "slug": "sync",
        "title": "Data Masuk Otomatis",
        "description": (
            "Data kehadiran langsung tersimpan ke sistem tanpa perlu rekap "
            "manual."
        ),
    },
    {
        "number": "04",
        "slug": "monitor",
        "title": "Pantau di Dashboard",
        "description": (
            "Admin melihat ringkasan hadir, terlambat, izin, dan status lain "
            "secara lebih cepat."
        ),
    },
    {
        "number": "05",
        "slug": "report",
        "title": "Laporan Siap Digunakan",
        "description": (
            "Laporan siap untuk evaluasi, administrasi, dan kebutuhan "
            "manajemen."
        ),
    },
]

FEATURES = [
    {
        "slug": "qr",
        "number": "01",
        "title": "QR Code Attendance",
        "description": "Proses absensi lebih cepat dengan sistem scan QR yang mudah digunakan.",
    },
    {
        "slug": "gps",
        "number": "02",
        "title": "GPS Location Validation",
        "description": (
            "Validasi lokasi membantu memastikan pengguna melakukan absensi "
            "dari area yang sesuai."
        ),
    },
    {
        "slug": "dashboard",
        "number": "03",
        "title": "Real-Time Dashboard",
        "description": (
            "Admin memantau data kehadiran secara langsung melalui dashboard "
            "yang ringkas."
        ),
    },
    {
        "slug": "report",
        "number": "04",
        "title": "Auto Attendance Report",
        "description": (
            "Laporan kehadiran tersusun otomatis untuk membantu proses "
            "administrasi."
        ),
    },
    {
        "slug": "tracking",
        "number": "05",
        "title": "Late & Permission Tracking",
        "description": (
            "Pantau status hadir, terlambat, izin, dan data kehadiran lain "
            "secara lebih mudah."
        ),
    },
    {
        "slug": "multi",
        "number": "06",
        "title": "Multi-Use Implementation",
        "description": (
            "Fleksibel untuk kantor, sekolah, kampus, instansi, komunitas, "
            "dan event."
        ),
    },
]

PACKAGES = [
    {
        "name": "Basic",
        "label": "Sistem Siap Pakai",
        "mode": "ready",
        "tagline": (
            "Untuk kebutuhan absensi digital sederhana tanpa pengembangan "
            "website khusus."
        ),
        "audience": (
            "Event kecil, komunitas, kelas, organisasi kecil, dan penggunaan "
            "internal sederhana."
        ),
        "description": (
            "Paket Basic cocok untuk pengguna yang membutuhkan sistem absensi "
            "digital praktis tanpa perlu membuat website baru atau integrasi "
            "kompleks."
        ),
        "features": [
            "Setup sistem absensi dasar",
            "QR Code Attendance",
            "Validasi kehadiran dasar",
            "Rekap data absensi",
            "Dashboard sederhana",
            "Bantuan konfigurasi awal",
            "Dokumentasi penggunaan singkat",
        ],
        "limitations": [
            "Belum termasuk integrasi ke website pembeli",
            "Belum termasuk pembuatan website resmi khusus",
        ],
        "featured": False,
    },
    {
        "name": "Standard",
        "label": "Integrasi Website",
        "mode": "integration",
        "tagline": (
            "Untuk organisasi yang sudah memiliki website dan ingin "
            "menambahkan sistem Presensigo."
        ),
        "audience": (
            "Sekolah, kampus, kantor, UMKM, instansi, komunitas besar, event "
            "rutin, dan organisasi yang sudah punya website."
        ),
        "description": (
            "Paket Standard cocok untuk pengguna dengan website yang sudah ada "
            "dan ingin menambahkan sistem Presensigo sebagai fitur absensi "
            "digital."
        ),
        "features": [
            "Semua fitur Basic",
            "Integrasi tombol/menu Presensigo ke website pembeli",
            "Halaman absensi atau landing absensi khusus",
            "Validasi GPS real-time",
            "Dashboard monitoring lebih lengkap",
            "Status hadir, terlambat, dan izin",
            "Laporan otomatis",
            "Pengelolaan data peserta/karyawan",
            "Penyesuaian tampilan agar sesuai website pembeli",
            "Support implementasi awal",
        ],
        "limitations": [],
        "featured": True,
    },
    {
        "name": "Premium",
        "label": "Website + Sistem",
        "mode": "website",
        "tagline": (
            "Untuk organisasi yang ingin dibuatkan website resmi sekaligus "
            "sistem absensi Presensigo."
        ),
        "audience": (
            "Perusahaan, sekolah besar, kampus, instansi, organisasi "
            "profesional, event besar, dan operasional multi-divisi."
        ),
        "description": (
            "Paket Premium cocok untuk pengguna yang ingin solusi lengkap: "
            "website resmi, branding digital, halaman informasi, CTA "
            "konsultasi, dan sistem absensi Presensigo dalam satu paket "
            "implementasi."
        ),
        "features": [
            "Semua fitur Standard",
            "Pembuatan website resmi",
            "Desain landing page profesional",
            "Halaman profil instansi/organisasi",
            "Halaman layanan atau informasi kegiatan",
            "Sistem Presensigo terintegrasi",
            "Dashboard lebih advanced",
            "Rekap dan laporan lebih detail",
            "Penyesuaian branding",
            "Konsultasi alur sistem",
            "Dokumentasi penggunaan",
            "Prioritas support",
            "Potensi pengembangan lanjutan",
        ],
        "limitations": [],
        "featured": False,
    },
]

GALLERY = [
    {
        "title": "Dashboard Kehadiran",
        "description": "Monitoring kehadiran real-time dalam satu tampilan.",
        "kind": "dashboard",
    },
    {
        "title": "Scan QR Mobile",
        "description": "Proses absensi cepat dengan alur yang mudah dipahami.",
        "kind": "scanner",
    },
    {
        "title": "Validasi Lokasi",
        "description": "Pemeriksaan area absensi dengan radius yang terukur.",
        "kind": "map",
    },
    {
        "title": "Rekap Laporan",
        "description": "Data tersusun rapi untuk kebutuhan administrasi.",
        "kind": "report",
    },
]

# TODO: Replace placeholder testimonials with approved client testimonials.
TESTIMONIALS = [
    {
        "quote": (
            "Presensigo membantu proses pengecekan kehadiran menjadi lebih "
            "cepat. Data lebih mudah dipantau tanpa menunggu rekap manual."
        ),
        "name": "Admin Operasional",
        "role": "Perusahaan Jasa",
        "placeholder": True,
    },
    {
        "quote": (
            "Proses scan QR membuat absensi peserta lebih tertib. Tim kami "
            "lebih mudah melihat data kehadiran secara langsung."
        ),
        "name": "Koordinator Event",
        "role": "Event Organizer",
        "placeholder": True,
    },
    {
        "quote": (
            "Sistem absensi digital membantu mengurangi pencatatan manual dan "
            "membuat data kehadiran lebih rapi."
        ),
        "name": "Staf Akademik",
        "role": "Institusi Pendidikan",
        "placeholder": True,
    },
]

FAQS = [
    {
        "question": "Apakah Presensigo hanya untuk perusahaan?",
        "answer": (
            "Tidak. Presensigo dapat digunakan oleh perusahaan, sekolah, "
            "kampus, instansi, organisasi, komunitas, dan event."
        ),
    },
    {
        "question": "Apakah Presensigo mendukung validasi lokasi?",
        "answer": (
            "Ya. Presensigo dapat menggunakan validasi GPS untuk membantu "
            "memastikan absensi dilakukan dari lokasi yang sesuai."
        ),
    },
    {
        "question": "Apakah data absensi bisa direkap otomatis?",
        "answer": (
            "Ya. Data kehadiran dapat direkap dan dipantau melalui dashboard "
            "serta laporan otomatis."
        ),
    },
    {
        "question": "Apakah sistem dapat disesuaikan dengan kebutuhan organisasi?",
        "answer": (
            "Bisa. Penyesuaian dilakukan sesuai paket layanan dan kebutuhan "
            "operasional pengguna."
        ),
    },
    {
        "question": "Bagaimana cara mulai menggunakan Presensigo?",
        "answer": (
            "Hubungi kami melalui WhatsApp atau email untuk konsultasi, "
            "pemilihan paket, dan proses implementasi."
        ),
    },
    {
        "question": "Apakah tersedia paket untuk event atau penggunaan sementara?",
        "answer": (
            "Ya. Presensigo dapat disesuaikan untuk event, kegiatan organisasi, "
            "atau penggunaan dalam periode tertentu."
        ),
    },
]
