/* PRESENSIGO premium corporate motion system. */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;
root.classList.add("js");

function hasGSAP() {
  return Boolean(window.gsap && window.ScrollTrigger);
}

function getCenteredTrackBounds(viewport, cards) {
  const first = cards[0];
  const last = cards[cards.length - 1];
  if (!viewport || !first || !last) {
    return { start: 0, end: 0, distance: 0 };
  }

  const viewportCenter = viewport.clientWidth / 2;
  const start = viewportCenter - (first.offsetLeft + first.offsetWidth / 2);
  const end = viewportCenter - (last.offsetLeft + last.offsetWidth / 2);
  return { start, end, distance: Math.abs(end - start) };
}

function scrollPageTo(top) {
  if (window.presensigoLenis) {
    window.presensigoLenis.scrollTo(top, {
      duration: 0.9,
      easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
    });
    return;
  }

  window.scrollTo({
    top,
    behavior: reducedMotion.matches ? "auto" : "smooth",
  });
}

function setWorkflowActive(cards, controls, index) {
  const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
  cards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === safeIndex);
  });
  controls.forEach((control, controlIndex) => {
    const active = controlIndex === safeIndex;
    control.classList.toggle("is-active", active);
    control.setAttribute("aria-current", active ? "step" : "false");
  });
}

function initNavigation() {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!menuToggle || !menu) return;

  function closeMenu({ restoreFocus = false } = {}) {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    if (restoreFocus) menuToggle.focus();
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu({ restoreFocus: true });
    }
  });
}

function initFAQ() {
  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) {
        answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
      }
    });
  });
}

function initContactForm() {
  const contactForm = document.querySelector("[data-contact-form]");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = contactForm.querySelector("[data-form-status]");
    const submit = contactForm.querySelector("button[type='submit']");
    const data = Object.fromEntries(new FormData(contactForm));

    if (status) status.textContent = "Menyiapkan konsultasi...";
    if (submit) submit.disabled = true;

    try {
      const response = await fetch(contactForm.action || "/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error("Mohon lengkapi nama, kontak, dan kebutuhan Anda.");
      }
      if (status) status.textContent = payload.message;
      window.location.href = payload.whatsapp_url;
    } catch (error) {
      if (status) {
        status.textContent =
          error.message || "Terjadi kendala. Gunakan tombol WhatsApp.";
      }
      if (submit) submit.disabled = false;
    }
  });
}

function initReducedMotion() {
  if (!reducedMotion.matches) return false;

  root.classList.add("reduced-motion");
  document.querySelectorAll("[data-reveal]").forEach((item) => {
    item.classList.add("revealed");
  });
  document.querySelectorAll("[data-counter]").forEach((counter) => {
    counter.textContent = counter.dataset.counter;
  });
  document.querySelector("[data-chart-path]")?.classList.add("is-drawn");
  document.querySelectorAll(
    "[data-workflow-progress-bar], [data-gallery-progress-bar]",
  ).forEach((progress) => {
    progress.style.transform = "scaleX(1)";
  });
  return true;
}

function initSmoothScroll() {
  if (
    reducedMotion.matches ||
    window.innerWidth < 900 ||
    !window.Lenis ||
    !hasGSAP()
  ) {
    return null;
  }

  if (window.presensigoLenis) return window.presensigoLenis;

  const lenis = new window.Lenis({
    duration: 1.15,
    easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false,
    wheelMultiplier: 0.9,
    anchors: true,
  });

  lenis.on("scroll", window.ScrollTrigger.update);
  window.gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  window.gsap.ticker.lagSmoothing(0);
  window.presensigoLenis = lenis;
  root.classList.add("lenis-enabled");
  return lenis;
}

function initPreloader(onComplete) {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) {
    onComplete?.();
    return;
  }

  const inner = preloader.querySelector(".preloader__inner");
  const wipe = preloader.querySelector(".preloader__wipe");
  const status = preloader.querySelector("[data-preloader-status]");
  const percent = preloader.querySelector("[data-preloader-percent]");
  const progress = preloader.querySelector("[data-preloader-progress]");
  let finished = false;
  let started = false;
  let pageActivated = false;
  let forceClose = 0;

  function setProgress(value, label) {
    const safeValue = Math.max(0, Math.min(100, Math.round(value)));
    if (percent) percent.textContent = `${safeValue}%`;
    if (progress) progress.style.transform = `scaleX(${safeValue / 100})`;
    if (status && label) status.textContent = label;
  }

  function activatePage() {
    if (pageActivated) return;
    pageActivated = true;
    document.body.classList.remove("is-preloading");
    document.body.classList.add("is-loaded");
    document.body.classList.add("motion-ready");
    root.classList.add("motion-ready");
    onComplete?.();
  }

  function complete() {
    if (finished) return;
    finished = true;
    window.clearTimeout(forceClose);
    setProgress(100, "Siap digunakan");
    activatePage();
    preloader.classList.add("is-complete");
    window.setTimeout(() => {
      preloader.hidden = true;
    }, reducedMotion.matches ? 20 : 60);
  }

  function run() {
    if (started) return;
    started = true;

    if (reducedMotion.matches) {
      setProgress(100, "Siap digunakan");
      window.setTimeout(complete, 90);
      return;
    }

    if (window.gsap) {
      const meter = { value: 0 };
      const timeline = window.gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: complete,
      });

      if (wipe) window.gsap.set(wipe, { yPercent: 101 });
      timeline
        .from(".preloader__logo", {
          y: 28,
          opacity: 0,
          duration: 0.3,
        })
        .from(
          ".preloader__visual",
          { y: 14, opacity: 0, duration: 0.22 },
          0.12,
        )
        .to(
          meter,
          {
            value: 100,
            duration: 0.65,
            ease: "power2.inOut",
            onUpdate: () => setProgress(meter.value),
          },
          0.1,
        )
        .call(() => setProgress(24, "Memuat dashboard"), null, 0.2)
        .call(() => setProgress(62, "Validasi QR + GPS"), null, 0.4)
        .call(() => setProgress(100, "Siap digunakan"), null, 0.68)
        .to(wipe, { yPercent: 0, duration: 0.24, ease: "power3.inOut" }, 0.7)
        .call(activatePage, null, 0.94)
        .to(inner, { opacity: 0, duration: 0.06 }, 0.94)
        .to(
          preloader,
          { yPercent: -100, duration: 0.34, ease: "power3.inOut" },
          0.94,
        );
      return;
    }

    const startedAt = performance.now();
    const duration = 1250;
    function tick(now) {
      const value = Math.min(100, ((now - startedAt) / duration) * 100);
      const label =
        value < 28
          ? "Menyiapkan sistem"
          : value < 66
            ? "Memuat dashboard"
            : value < 94
              ? "Validasi QR + GPS"
              : "Siap digunakan";
      setProgress(value, label);
      if (value < 100) {
        window.requestAnimationFrame(tick);
      } else {
        complete();
      }
    }
    window.requestAnimationFrame(tick);
  }

  forceClose = window.setTimeout(complete, 2200);
  run();
}

function initDashboardCounters() {
  const counters = [...document.querySelectorAll("[data-counter]")];
  const chart = document.querySelector("[data-chart-path]");
  let started = false;

  function setFinal() {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.counter;
    });
    if (chart) {
      chart.style.strokeDashoffset = "0";
      chart.classList.add("is-drawn");
    }
  }

  function start() {
    if (started) return;
    started = true;
    if (reducedMotion.matches) {
      setFinal();
      return;
    }

    if (window.gsap) {
      counters.forEach((counter) => {
        const state = { value: 0 };
        counter.textContent = "0";
        window.gsap.to(state, {
          value: Number(counter.dataset.counter),
          duration: 0.9,
          ease: "power3.out",
          onUpdate: () => {
            counter.textContent = String(Math.round(state.value));
          },
        });
      });
      if (chart) {
        window.gsap.set(chart, { strokeDasharray: 1, strokeDashoffset: 1 });
        window.gsap.to(chart, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.out",
        });
      }
      return;
    }

    counters.forEach((counter) => {
      const target = Number(counter.dataset.counter);
      const startTime = performance.now();
      counter.textContent = "0";
      function tick(now) {
        const progressValue = Math.min((now - startTime) / 900, 1);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progressValue < 1) window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    });
    chart?.classList.add("is-drawn");
  }

  if (reducedMotion.matches) setFinal();
  return { start, setFinal };
}

function initQRSimulation() {
  const demo = document.querySelector("[data-qr-demo]");
  const status = demo?.querySelector("[data-qr-status]");
  const detail = demo?.querySelector("[data-qr-detail]");
  const dashboardRow = document.querySelector("[data-dashboard-update]");
  const updateTime = dashboardRow?.querySelector("[data-update-time]");
  const updateLabel = dashboardRow?.querySelector("[data-update-label]");
  const updateBadge = dashboardRow?.querySelector("[data-update-badge]");
  let timer = 0;
  let running = false;
  let index = 0;

  const states = [
    {
      name: "scanning",
      label: "Memindai QR...",
      detail: "Arahkan kamera ke kode QR",
      duration: 1400,
    },
    {
      name: "validating",
      label: "Memvalidasi GPS...",
      detail: "Mencocokkan radius lokasi",
      duration: 1000,
    },
    {
      name: "success",
      label: "Absensi Berhasil",
      detail: "Data masuk ke dashboard",
      duration: 1400,
    },
  ];

  function applyState(state) {
    if (!demo || !status || !detail) return;
    demo.dataset.state = state.name;
    demo.classList.remove("is-scanning", "is-validating", "is-success");
    demo.classList.add(`is-${state.name}`);
    status.textContent = state.label;
    detail.textContent = state.detail;

    const success = state.name === "success";
    dashboardRow?.classList.toggle("is-updated", success);
    if (updateBadge) updateBadge.hidden = !success;
    if (success) {
      if (updateTime) updateTime.textContent = "Baru";
      if (updateLabel) updateLabel.textContent = "GPS valid";
    } else {
      if (updateTime) updateTime.textContent = "07:39";
      if (updateLabel) updateLabel.textContent = "Dalam radius";
    }
  }

  function scheduleNext() {
    if (!running) return;
    timer = window.setTimeout(() => {
      index = (index + 1) % states.length;
      applyState(states[index]);
      scheduleNext();
    }, states[index].duration);
  }

  function start() {
    if (!demo || running) return;
    if (reducedMotion.matches) {
      applyState(states[2]);
      return;
    }
    running = true;
    index = 0;
    applyState(states[index]);
    scheduleNext();
  }

  function stop() {
    running = false;
    window.clearTimeout(timer);
  }

  function setFinal() {
    stop();
    applyState(states[2]);
  }

  if (reducedMotion.matches) setFinal();
  return { start, stop, setFinal };
}

function initHeroTimeline(qrController, dashboardController) {
  const hero = document.querySelector(".hero-premium");
  if (!hero || !window.gsap || reducedMotion.matches) {
    return null;
  }

  const gsap = window.gsap;
  const mask = hero.querySelector("[data-hero-mask]");
  const compactHero = window.innerWidth < 900;
  const laptopHero = window.innerWidth < 1181;
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.out" },
  });

  gsap.set(mask, {
    scaleX: 0,
    opacity: 1,
    transformOrigin: "right center",
  });
  gsap.set(".js-hero-line", { yPercent: 112, opacity: 0 });
  gsap.set(".js-hero-copy .hero-lead, .js-hero-copy .hero-support", {
    y: 28,
    opacity: 0,
  });
  gsap.set(".js-hero-cta", { y: 24, opacity: 0 });
  gsap.set(".js-hero-chip", { y: 12, opacity: 0 });
  gsap.set(".js-dashboard", { x: 96, scale: 0.98, opacity: 0 });
  gsap.set(".js-phone", { x: 42, y: 66, rotate: -4, opacity: 0 });
  gsap.set(".hero-grid-layer", { opacity: 0 });
  gsap.set("[data-intro='badge']", { y: 14, opacity: 0 });

  timeline
    .fromTo(
      ".js-nav",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.38, ease: "power3.out" },
    )
    .to(mask, { scaleX: 1, duration: 0.72, ease: "power3.inOut" }, 0.02)
    .to(".hero-grid-layer", { opacity: 0.48, duration: 0.48 }, 0.1)
    .to(
      ".js-hero-line",
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.64,
        stagger: 0.09,
        ease: "power3.out",
      },
      0.18,
    )
    .to(
      ".js-hero-copy .hero-lead",
      { y: 0, opacity: 1, duration: 0.5 },
      0.58,
    )
    .to(".js-hero-cta", { y: 0, opacity: 1, duration: 0.44 }, 0.7)
    .to(
      ".js-hero-chip",
      { y: 0, opacity: 1, duration: 0.34, stagger: 0.05 },
      0.78,
    )
    .to(
      ".js-dashboard",
      { x: 0, scale: 1, opacity: 1, duration: 0.78, ease: "power3.out" },
      0.38,
    )
    .to(
      ".js-phone",
      { x: 0, y: 0, rotate: -4, opacity: 1, duration: 0.66 },
      0.68,
    )
    .to(
      "[data-intro='badge']",
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
      0.84,
    )
    .to(
      ".js-hero-copy .hero-support",
      { y: 0, opacity: 1, duration: 0.38 },
      0.96,
    )
    .to(
      mask,
      {
        scaleX: compactHero ? 0.7 : laptopHero ? 0.76 : 0.82,
        xPercent: compactHero ? 18 : laptopHero ? 15 : 12,
        opacity: compactHero ? 0.36 : laptopHero ? 0.44 : 0.58,
        duration: 0.52,
        ease: "power3.out",
      },
      0.98,
    )
    .add(() => hero.classList.add("is-settled"), 1.2)
    .add(() => {
      dashboardController?.start();
      qrController?.start();
    }, 1.08);

  return timeline;
}

function initHeroScrollTransform() {
  if (!hasGSAP() || reducedMotion.matches) return;
  const hero = document.querySelector(".hero-premium");
  if (!hero) return;

  const gsap = window.gsap;
  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    gsap.to(".hero-title", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(".js-dashboard", {
      yPercent: 6,
      scale: 0.97,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(".js-phone", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to("[data-hero-mask]", {
      xPercent: 16,
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.to(".hero-grid-layer", {
      yPercent: 9,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}

function initSceneTransitions() {
  if (!hasGSAP() || reducedMotion.matches) return;
  const gsap = window.gsap;

  gsap.utils.toArray("[data-scene-transition]").forEach((panel) => {
    const shape = panel.querySelector("span");
    const nextScene = panel.nextElementSibling;
    const sceneHeading = nextScene?.querySelector(
      ".section-heading, .benefit-intro, .contact-cta-copy",
    );
    if (!shape) return;

    if (sceneHeading) {
      sceneHeading.dataset.sceneOwned = "true";
      gsap.fromTo(
        sceneHeading,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 72%",
            once: true,
          },
        },
      );
    }

    if (panel.classList.contains("dark-curtain")) {
      gsap.fromTo(
        shape,
        { yPercent: 102 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom 58%",
            scrub: 1,
          },
        },
      );
      return;
    }

    if (panel.classList.contains("data-line-wipe")) {
      gsap.fromTo(
        shape,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top 92%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );
      return;
    }

    const direction = panel.classList.contains("transition-packages-gallery")
      ? 105
      : -105;
    gsap.fromTo(
      shape,
      { xPercent: direction },
      {
        xPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "bottom 52%",
          scrub: 1,
        },
      },
    );
  });
}

function initFallbackReveals() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("revealed"));
    return;
  }

  root.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "100px 0px -5% 0px", threshold: 0.05 },
  );
  items.forEach((item) => observer.observe(item));
}

function initSupportingReveals() {
  if (!hasGSAP() || reducedMotion.matches) return;
  const selector = [
    "[data-reveal]:not([data-scene-owned]):not(.problem-card)",
    ":not(.feature-tile)",
    ":not(.benefit-row)",
    ":not(.price-card)",
    ":not(.workflow-card)",
    ":not(.gallery-slide)",
  ].join("");

  document.querySelectorAll(selector).forEach((item) => {
    window.gsap.fromTo(
      item,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.68,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          once: true,
        },
      },
    );
  });

  const ctaLine = document.querySelector(".cta-signal-line");
  if (ctaLine) {
    window.gsap.fromTo(
      ctaLine,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ctaLine.closest("section"),
          start: "top 75%",
          end: "top 42%",
          scrub: 1,
        },
      },
    );
  }
}

function initProblemsReveal() {
  if (!hasGSAP() || reducedMotion.matches) return;
  const section = document.querySelector("#masalah");
  const cards = [...(section?.querySelectorAll(".problem-card") || [])];
  if (!section || !cards.length) return;

  window.gsap.fromTo(
    cards,
    { y: 46, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 88%",
        once: true,
      },
    },
  );
}

function initFeaturesReveal() {
  if (!hasGSAP() || reducedMotion.matches) return;
  const section = document.querySelector("#fitur");
  const cards = [...(section?.querySelectorAll(".feature-tile") || [])];
  if (!section || !cards.length) return;

  window.gsap.fromTo(
    cards,
    { y: 42, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.66,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 88%",
        once: true,
      },
    },
  );
}

function initNativeWorkflow() {
  const track = document.querySelector("[data-workflow-track]");
  const cards = [...document.querySelectorAll("[data-workflow-card]")];
  const controls = [...document.querySelectorAll("[data-workflow-jump]")];
  const progress = document.querySelector("[data-workflow-progress-bar]");
  if (!track || !cards.length) return;

  function updateFromPosition() {
    const center = track.scrollLeft + track.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const bestCenter = cards[best].offsetLeft + cards[best].clientWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center)
        ? index
        : best;
    }, 0);
    setWorkflowActive(cards, controls, nearest);
    if (progress) {
      const range = Math.max(1, track.scrollWidth - track.clientWidth);
      progress.style.transform = `scaleX(${Math.min(1, track.scrollLeft / range)})`;
    }
  }

  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      const card = cards[index];
      card?.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center",
        inline: "center",
      });
      setWorkflowActive(cards, controls, index);
    });
  });

  let frame = 0;
  track.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateFromPosition);
    },
    { passive: true },
  );
  setWorkflowActive(cards, controls, 0);
}

function initPinnedWorkflow() {
  const section = document.querySelector("#cara-kerja");
  const viewport = section?.querySelector(".workflow-viewport");
  const track = section?.querySelector("[data-workflow-track]");
  const cards = [...(section?.querySelectorAll("[data-workflow-card]") || [])];
  const controls = [...(section?.querySelectorAll("[data-workflow-jump]") || [])];
  const progress = section?.querySelector("[data-workflow-progress-bar]");
  if (!section || !viewport || !track || !cards.length) return;

  if (!hasGSAP() || reducedMotion.matches) {
    initNativeWorkflow();
    return;
  }

  const gsap = window.gsap;
  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    section.classList.add("is-gsap-pinned");

    function getBounds() {
      return getCenteredTrackBounds(viewport, cards);
    }

    function updateActive(value) {
      const index = Math.round(value * (cards.length - 1));
      setWorkflowActive(cards, controls, index);
      if (progress) progress.style.transform = `scaleX(${value})`;
    }

    const tween = gsap.fromTo(
      track,
      { x: () => getBounds().start },
      {
        x: () => getBounds().end,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(getBounds().distance, window.innerHeight * 0.9)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => updateActive(self.progress),
        },
      },
    );
    updateActive(0);

    const clickHandlers = controls.map((control, index) => {
      const handler = () => {
        const trigger = tween.scrollTrigger;
        const destination =
          trigger.start +
          (trigger.end - trigger.start) *
            (index / Math.max(1, cards.length - 1));
        scrollPageTo(destination);
      };
      control.addEventListener("click", handler);
      return handler;
    });

    return () => {
      section.classList.remove("is-gsap-pinned");
      controls.forEach((control, index) => {
        control.removeEventListener("click", clickHandlers[index]);
      });
      gsap.set(track, { clearProps: "transform" });
    };
  });

  media.add("(max-width: 899px)", () => {
    initNativeWorkflow();
  });
}

function initStickyBenefits() {
  const cards = [...document.querySelectorAll(".benefit-row")];
  if (!cards.length) return;

  if (!hasGSAP() || reducedMotion.matches) {
    cards[0].classList.add("is-scroll-active");
    return;
  }

  const gsap = window.gsap;
  gsap.fromTo(
    cards,
    { x: 28, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.62,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 88%",
        once: true,
      },
    },
  );

  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    function activate(activeCard) {
      cards.forEach((card) => {
        card.classList.toggle("is-scroll-active", card === activeCard);
      });
    }

    cards.forEach((card) => {
      window.ScrollTrigger.create({
        trigger: card,
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => activate(card),
        onEnterBack: () => activate(card),
      });
    });
    activate(cards[0]);
  });
}

function initStickyPricing() {
  const cards = [...document.querySelectorAll(".price-card")];
  if (!cards.length || !hasGSAP() || reducedMotion.matches) return;

  const gsap = window.gsap;
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.66,
        delay: index * 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      },
    );
  });

  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    cards.forEach((card) => {
      window.ScrollTrigger.create({
        trigger: card,
        start: "top 58%",
        end: "bottom 42%",
        onToggle: (self) => {
          card.classList.toggle("is-scroll-active", self.isActive);
        },
      });
    });
  });
}

function initProductShowcase() {
  const section = document.querySelector("#galeri");
  const viewport = section?.querySelector(".gallery-showcase-viewport");
  const track = section?.querySelector("[data-gallery-track]");
  const cards = [...(section?.querySelectorAll("[data-gallery-card]") || [])];
  const previous = section?.querySelector("[data-gallery-prev]");
  const next = section?.querySelector("[data-gallery-next]");
  const count = section?.querySelector("[data-gallery-count]");
  const status = section?.querySelector("[data-gallery-status]");
  const description = section?.querySelector("[data-gallery-description]");
  const progress = section?.querySelector("[data-gallery-progress-bar]");
  if (!section || !viewport || !track || !cards.length) return;

  let activeIndex = -1;
  let desktopTween = null;

  function updateCaption(index) {
    if (count) {
      count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    }
    if (status) status.textContent = cards[index].dataset.title;
    if (description) {
      description.textContent = cards[index].dataset.description || "";
    }
  }

  function setActive(index, { animate = true } = {}) {
    const nextIndex = Math.max(0, Math.min(index, cards.length - 1));
    if (nextIndex === activeIndex) return;
    activeIndex = nextIndex;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });

    const captionItems = [count, status, description].filter(Boolean);
    if (
      animate &&
      captionItems.length &&
      hasGSAP() &&
      !reducedMotion.matches
    ) {
      window.gsap.killTweensOf(captionItems);
      window.gsap
        .timeline()
        .to(captionItems, {
          y: -7,
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
        })
        .add(() => updateCaption(activeIndex))
        .fromTo(
          captionItems,
          { y: 7, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.24, ease: "power3.out" },
        );
      return;
    }

    updateCaption(activeIndex);
  }

  function goToCard(index) {
    const targetIndex = (index + cards.length) % cards.length;
    if (desktopTween?.scrollTrigger) {
      const trigger = desktopTween.scrollTrigger;
      const destination =
        trigger.start +
        (trigger.end - trigger.start) *
          (targetIndex / Math.max(1, cards.length - 1));
      scrollPageTo(destination);
    } else {
      const card = cards[targetIndex];
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }
    setActive(targetIndex);
  }

  function updateFromPosition() {
    const center = track.scrollLeft + track.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const bestCenter = cards[best].offsetLeft + cards[best].clientWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center)
        ? index
        : best;
    }, 0);
    const range = Math.max(1, track.scrollWidth - track.clientWidth);
    if (progress) {
      progress.style.transform = `scaleX(${Math.min(1, track.scrollLeft / range)})`;
    }
    setActive(nearest);
  }

  previous?.addEventListener("click", () => goToCard(activeIndex - 1));
  next?.addEventListener("click", () => goToCard(activeIndex + 1));

  let frame = 0;
  track.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateFromPosition);
    },
    { passive: true },
  );
  setActive(0, { animate: false });

  if (!hasGSAP() || reducedMotion.matches) return;

  const gsap = window.gsap;
  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    section.classList.add("is-gsap-pinned");

    function getBounds() {
      return getCenteredTrackBounds(viewport, cards);
    }

    desktopTween = gsap.fromTo(
      track,
      { x: () => getBounds().start },
      {
        x: () => getBounds().end,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(getBounds().distance, window.innerHeight * 0.9)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (cards.length - 1));
            setActive(index);
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      },
    );

    return () => {
      section.classList.remove("is-gsap-pinned");
      desktopTween = null;
      gsap.set(track, { clearProps: "transform" });
    };
  });
}

function initGSAP(qrController, dashboardController) {
  if (!hasGSAP() || reducedMotion.matches) return false;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add("gsap-enabled");

  const heroTimeline = initHeroTimeline(qrController, dashboardController);
  initHeroScrollTransform();
  initSceneTransitions();
  initSupportingReveals();
  initProblemsReveal();
  initStickyBenefits();
  initPinnedWorkflow();
  initFeaturesReveal();
  initStickyPricing();
  initProductShowcase();

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  return {
    start() {
      if (heroTimeline) {
        heroTimeline.play(0);
      } else {
        dashboardController?.start();
        qrController?.start();
      }
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}

function initFallbackMotion(qrController, dashboardController) {
  root.classList.add("motion-ready");
  initFallbackReveals();
  initNativeWorkflow();
  initProductShowcase();
  window.setTimeout(
    () => {
      dashboardController?.start();
      qrController?.start();
    },
    reducedMotion.matches ? 0 : 700,
  );
}

initNavigation();
initFAQ();
initContactForm();
const isReduced = initReducedMotion();
const qrController = initQRSimulation();
const dashboardController = initDashboardCounters();
const gsapController = isReduced
  ? null
  : initGSAP(qrController, dashboardController);

initPreloader(() => {
  if (!gsapController) {
    initFallbackMotion(qrController, dashboardController);
    return;
  }

  initSmoothScroll();
  gsapController.start();
  window.requestAnimationFrame(() => {
    gsapController.refresh();
    window.setTimeout(() => gsapController.refresh(), 120);
  });
});
