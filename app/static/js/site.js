const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;

function hasGSAP() {
  return Boolean(window.gsap && window.ScrollTrigger);
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
      if (answer) answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
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
        status.textContent = error.message || "Terjadi kendala. Gunakan tombol WhatsApp.";
      }
      if (submit) submit.disabled = false;
    }
  });
}

function initReducedMotion() {
  if (!reducedMotion.matches) return false;

  root.classList.add("reduced-motion");
  document.querySelectorAll(
    "[data-reveal]:not(.problem-card):not(.price-card):not(.workflow-card)",
  ).forEach((item) => {
    item.classList.add("revealed");
  });
  document.querySelectorAll("[data-counter]").forEach((counter) => {
    counter.textContent = counter.dataset.counter;
  });
  document.querySelector("[data-chart-path]")?.classList.add("is-drawn");
  return true;
}

function initPreloader(onComplete) {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) {
    onComplete?.();
    return;
  }

  const status = preloader.querySelector("[data-preloader-status]");
  const percent = preloader.querySelector("[data-preloader-percent]");
  const progress = preloader.querySelector("[data-preloader-progress]");
  let finished = false;
  let started = false;

  function setProgress(value, label) {
    const safeValue = Math.max(0, Math.min(100, Math.round(value)));
    if (percent) percent.textContent = `${safeValue}%`;
    if (progress) progress.style.transform = `scaleX(${safeValue / 100})`;
    if (status && label) status.textContent = label;
  }

  function complete() {
    if (finished) return;
    finished = true;
    window.clearTimeout(forceClose);
    setProgress(100, "Siap Digunakan");
    preloader.classList.add("is-complete");
    document.body.classList.add("is-loaded");
    window.setTimeout(() => {
      preloader.hidden = true;
      onComplete?.();
    }, reducedMotion.matches ? 80 : 480);
  }

  function run() {
    if (started) return;
    started = true;

    if (reducedMotion.matches) {
      setProgress(100, "Siap Digunakan");
      window.setTimeout(complete, 100);
      return;
    }

    if (window.gsap) {
      const meter = { value: 0 };
      const timeline = window.gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: complete,
      });
      timeline
        .from(".preloader__logo", { y: 24, opacity: 0, duration: 0.35 })
        .from(".preloader__visual", { scale: 0.88, opacity: 0, duration: 0.3 }, "-=0.18")
        .to(meter, {
          value: 100,
          duration: 1.35,
          ease: "power2.inOut",
          onUpdate: () => setProgress(meter.value),
        }, 0.18)
        .call(() => setProgress(24, "Memuat Dashboard..."), null, 0.45)
        .call(() => setProgress(58, "Mengaktifkan QR + GPS..."), null, 0.9)
        .call(() => setProgress(100, "Siap Digunakan"), null, 1.38)
        .to(".preloader__inner", { y: -18, opacity: 0, duration: 0.24 }, 1.55)
        .to(preloader, { yPercent: -100, duration: 0.5, ease: "power3.inOut" }, 1.58);
      return;
    }

    const startedAt = performance.now();
    const duration = 1450;
    function tick(now) {
      const elapsed = now - startedAt;
      const value = Math.min(100, (elapsed / duration) * 100);
      const label = value < 28
        ? "Menyiapkan Sistem..."
        : value < 62
          ? "Memuat Dashboard..."
          : value < 92
            ? "Mengaktifkan QR + GPS..."
            : "Siap Digunakan";
      setProgress(value, label);
      if (value < 100) {
        window.requestAnimationFrame(tick);
      } else {
        complete();
      }
    }
    window.requestAnimationFrame(tick);
  }

  const forceClose = window.setTimeout(complete, 3000);
  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run, { once: true });
  }
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
          duration: 1.15,
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
        const progress = Math.min((now - startTime) / 900, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(tick);
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
      duration: 1450,
    },
    {
      name: "validating",
      label: "Memvalidasi GPS...",
      detail: "Mencocokkan radius lokasi",
      duration: 1050,
    },
    {
      name: "success",
      label: "Absensi Berhasil",
      detail: "Data masuk ke dashboard",
      duration: 1350,
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
    dashboardController?.start();
    qrController?.start();
    return null;
  }

  const gsap = window.gsap;
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  gsap.set(".js-hero-line", { yPercent: 118, opacity: 0 });
  gsap.set(".js-hero-copy .hero-lead, .js-hero-copy .hero-support", { y: 28, opacity: 0 });
  gsap.set(".js-hero-cta", { y: 22, scale: 0.96, opacity: 0 });
  gsap.set(".js-hero-chip", { y: 14, opacity: 0 });
  gsap.set(".js-dashboard", { x: 90, rotate: 4, opacity: 0 });
  gsap.set(".js-phone", { x: 36, y: 85, rotate: -9, opacity: 0 });
  gsap.set(".hero-grid-layer", { opacity: 0 });
  gsap.set(".js-bg-dot", { opacity: 0, scale: 0.5 });

  timeline
    .fromTo(".js-nav", { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 })
    .to(".hero-grid-layer", { opacity: 1, duration: 0.45 }, 0.08)
    .to(".js-hero-line", {
      yPercent: 0,
      opacity: 1,
      duration: 0.58,
      stagger: 0.09,
    }, 0.16)
    .to(".js-hero-copy .hero-lead", { y: 0, opacity: 1, duration: 0.45 }, 0.52)
    .to(".js-hero-cta", { y: 0, scale: 1, opacity: 1, duration: 0.38 }, 0.66)
    .to(".js-hero-chip", { y: 0, opacity: 1, duration: 0.32, stagger: 0.06 }, 0.76)
    .to(".js-dashboard", { x: 0, rotate: 1, opacity: 1, duration: 0.75 }, 0.42)
    .to(".js-phone", { x: 0, y: 0, rotate: -5, opacity: 1, duration: 0.66 }, 0.72)
    .to(".js-hero-copy .hero-support", { y: 0, opacity: 1, duration: 0.38 }, 0.95)
    .to(".js-bg-dot", { opacity: 1, scale: 1, duration: 0.35, stagger: 0.035 }, 1.04)
    .add(() => {
      dashboardController?.start();
      qrController?.start();
    }, 1.14)
    .add(() => {
      gsap.to(".js-dashboard", {
        y: -8,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, 1.5);

  return timeline;
}

function initFallbackReveals() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("revealed"));
    return;
  }

  root.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "120px 0px -5% 0px", threshold: 0.04 });

  items.forEach((item) => observer.observe(item));
}

function initScrollReveals() {
  if (!hasGSAP() || reducedMotion.matches) {
    initFallbackReveals();
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  document.querySelectorAll("[data-reveal]").forEach((item) => {
    const delay = Number.parseInt(item.style.getPropertyValue("--delay"), 10) || 0;
    gsap.fromTo(item, {
      y: 58,
      opacity: 0.35,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.72,
      delay: Math.min(delay / 1000, 0.28),
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 94%",
        once: true,
      },
    });
  });

  const problemCards = gsap.utils.toArray(".problem-card");
  if (problemCards.length) {
    gsap.fromTo(problemCards, {
      y: 50,
      rotate: -2,
      opacity: 0.32,
    }, {
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.58,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".problem-grid",
        start: "top 86%",
        once: true,
      },
    });
  }

  gsap.utils.toArray(".js-parallax-blob").forEach((blob, index) => {
    gsap.to(blob, {
      yPercent: index % 2 === 0 ? 22 : -18,
      xPercent: index % 2 === 0 ? -8 : 10,
      ease: "none",
      scrollTrigger: {
        trigger: blob.closest("section") || blob,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  const finalCta = document.querySelector(".contact-cta");
  if (finalCta) {
    ScrollTrigger.create({
      trigger: finalCta,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.fromTo([".js-cta-copy", ".js-cta-form"], {
          y: 48,
          opacity: 0.35,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });
  }
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
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center) ? index : best;
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
  track.addEventListener("scroll", () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(updateFromPosition);
  }, { passive: true });
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
    let tween;

    function getDistance() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }

    function updateActive(value) {
      const index = Math.round(value * (cards.length - 1));
      setWorkflowActive(cards, controls, index);
      if (progress) progress.style.transform = `scaleX(${value})`;
    }

    tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(getDistance() * 1.18, window.innerHeight * 1.45)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => updateActive(self.progress),
      },
    });

    const clickHandlers = controls.map((control, index) => {
      const handler = () => {
        const trigger = tween.scrollTrigger;
        const destination = trigger.start
          + (trigger.end - trigger.start) * (index / Math.max(1, cards.length - 1));
        window.scrollTo({
          top: destination,
          behavior: reducedMotion.matches ? "auto" : "smooth",
        });
      };
      control.addEventListener("click", handler);
      return handler;
    });

    return () => {
      section.classList.remove("is-gsap-pinned");
      controls.forEach((control, index) => {
        control.removeEventListener("click", clickHandlers[index]);
      });
    };
  });

  media.add("(max-width: 899px)", () => {
    initNativeWorkflow();
  });
}

function initStickyBenefits() {
  const cards = [...document.querySelectorAll(".benefit-row")];
  if (!cards.length || !hasGSAP() || reducedMotion.matches) return;

  const ScrollTrigger = window.ScrollTrigger;
  function activate(activeCard) {
    cards.forEach((card) => card.classList.toggle("is-scroll-active", card === activeCard));
  }

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 58%",
      end: "bottom 42%",
      onEnter: () => activate(card),
      onEnterBack: () => activate(card),
    });
  });
  activate(cards[0]);
}

function initStickyPricing() {
  const cards = [...document.querySelectorAll(".price-card")];
  if (!cards.length || !hasGSAP() || reducedMotion.matches) return;

  const gsap = window.gsap;
  cards.forEach((card) => {
    gsap.fromTo(card, {
      y: 58,
      opacity: 0.45,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
    });

    window.ScrollTrigger.create({
      trigger: card,
      start: "top 58%",
      end: "bottom 42%",
      onToggle: (self) => {
        card.classList.toggle("is-scroll-active", self.isActive);
      },
    });
  });
}

function initProductShowcase() {
  const track = document.querySelector("[data-gallery-track]");
  const cards = [...document.querySelectorAll("[data-gallery-card]")];
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");
  const count = document.querySelector("[data-gallery-count]");
  const status = document.querySelector("[data-gallery-status]");
  if (!track || !cards.length) return;

  let activeIndex = 0;
  function setActive(index) {
    activeIndex = Math.max(0, Math.min(index, cards.length - 1));
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    if (count) {
      count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    }
    if (status) status.textContent = cards[activeIndex].dataset.title;
  }

  function scrollToCard(index) {
    const targetIndex = (index + cards.length) % cards.length;
    const card = cards[targetIndex];
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    setActive(targetIndex);
  }

  function updateFromPosition() {
    const center = track.scrollLeft + track.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const bestCenter = cards[best].offsetLeft + cards[best].clientWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center) ? index : best;
    }, 0);
    setActive(nearest);
  }

  previous?.addEventListener("click", () => scrollToCard(activeIndex - 1));
  next?.addEventListener("click", () => scrollToCard(activeIndex + 1));

  let frame = 0;
  track.addEventListener("scroll", () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(updateFromPosition);
  }, { passive: true });
  setActive(0);

  if (hasGSAP() && !reducedMotion.matches) {
    window.gsap.fromTo(cards, {
      x: 55,
      opacity: 0.45,
    }, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: track,
        start: "top 86%",
        once: true,
      },
    });
  }
}

function initGSAP(qrController, dashboardController) {
  if (!hasGSAP() || reducedMotion.matches) return false;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add("gsap-enabled");

  initHeroTimeline(qrController, dashboardController);
  initScrollReveals();
  initPinnedWorkflow();
  initStickyBenefits();
  initStickyPricing();
  initProductShowcase();

  window.setTimeout(() => ScrollTrigger.refresh(), 120);
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  return true;
}

function initFallbackMotion(qrController, dashboardController) {
  root.classList.add("motion-ready");
  initScrollReveals();
  initNativeWorkflow();
  initProductShowcase();
  window.setTimeout(() => {
    dashboardController?.start();
    qrController?.start();
  }, reducedMotion.matches ? 0 : 950);
}

initNavigation();
initFAQ();
initContactForm();
const isReduced = initReducedMotion();
const dashboardController = initDashboardCounters();
const qrController = initQRSimulation();

initPreloader(() => {
  if (isReduced) {
    initFallbackMotion(qrController, dashboardController);
    return;
  }
  if (!initGSAP(qrController, dashboardController)) {
    initFallbackMotion(qrController, dashboardController);
  }
});
