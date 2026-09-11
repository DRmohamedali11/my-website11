```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuBtn = $("#menuBtn");
  const nav = $("#nav");

  if (menuBtn && nav) {

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {

      const opened = nav.classList.toggle("active");

      menuBtn.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );

      menuBtn.textContent = opened ? "✕" : "☰";

    });

    $$("a", nav).forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.textContent = "☰";

      });

    });

  }


  /* =========================================================
     HEADER
  ========================================================= */

  const header = $(".header");

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     HERO CINEMATIC INTRO
  ========================================================= */

  const hero = $(".hero");
  const heroContent = $(".hero-content");
  const heroVisual = $(".hero-visual");

  if (heroContent) {

    heroContent.classList.add("cinematic-hero");

    const eyebrow = $(".eyebrow", heroContent);
    const title = $("h1", heroContent);
    const roles = $(".roles", heroContent);
    const description = $(".hero-text", heroContent);
    const actions = $(".hero-actions", heroContent);
    const stats = $(".stats", heroContent);

    [
      eyebrow,
      title,
      roles,
      description,
      actions,
      stats
    ].forEach((element, index) => {

      if (!element) return;

      element.classList.add("hero-item");

      element.style.setProperty(
        "--hero-delay",
        `${0.25 + index * 0.16}s`
      );

    });

  }


  /* =========================================================
     HERO TITLE LETTER REVEAL
  ========================================================= */

  const heroTitle = $(".hero h1");

  if (heroTitle && !reduceMotion) {

    const originalHTML = heroTitle.innerHTML;

    /*
      نترك الـHTML الأصلي كما هو لأن كلمة "محمد"
      عربية، ونستخدم animation على الـtitle نفسه.
    */

    heroTitle.classList.add("title-reveal");

  }


  /* =========================================================
     ROLES — تظهر واحدة وراء الثانية
  ========================================================= */

  const roles = $(".roles");

  if (roles) {

    const roleSpans = $$(":scope > span", roles);

    roleSpans.forEach((role, index) => {

      role.classList.add("role-reveal");

      role.style.setProperty(
        "--role-delay",
        `${0.9 + index * 0.35}s`
      );

    });

  }


  /* =========================================================
     HERO VISUAL
  ========================================================= */

  if (heroVisual) {

    heroVisual.classList.add("cinematic-visual");

    const photo = $(".photo-card", heroVisual);
    const tags = $$(".floating-tag", heroVisual);
    const orbits = $$(".orbit", heroVisual);

    if (photo) {

      photo.style.setProperty(
        "--visual-delay",
        "0.65s"
      );

    }

    tags.forEach((tag, index) => {

      tag.classList.add("visual-tag-reveal");

      tag.style.setProperty(
        "--tag-delay",
        `${1.15 + index * 0.22}s`
      );

    });

    orbits.forEach((orbit, index) => {

      orbit.style.animationDelay =
        `${index * -.8}s`;

    });

  }


  /* =========================================================
     PARTICLES
  ========================================================= */

  const particlesContainer = $("#particles");

  function createParticles() {

    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";

    const amount =
      window.innerWidth <= 600 ? 22 :
      window.innerWidth <= 850 ? 32 :
      60;

    for (let i = 0; i < amount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      const size =
        Math.random() > .8 ? 3 : 2;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      particle.style.animationDuration =
        `${5 + Math.random() * 8}s`;

      particle.style.animationDelay =
        `${Math.random() * -10}s`;

      particlesContainer.appendChild(
        particle
      );

    }

  }

  createParticles();


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealTargets = $$(`
    .section-label,
    .section-title,
    .about-box,
    .field-card,
    .skill-box,
    .vision-card,
    .vision-bottom,
    .quote,
    .contact-card
  `);

  revealTargets.forEach(element => {

    element.classList.add("cinematic-reveal");

  });


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "cinematic-visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -70px 0px"
        }
      );


    revealTargets.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealTargets.forEach(element => {

      element.classList.add(
        "cinematic-visible"
      );

    });

  }


  /* =========================================================
     STAGGER CARDS
  ========================================================= */

  [
    ".field-card",
    ".vision-card",
    ".skill-box"
  ].forEach(selector => {

    $$(selector).forEach((card, index) => {

      card.style.setProperty(
        "--stagger-delay",
        `${index * 0.14}s`
      );

    });

  });


  /* =========================================================
     ABOUT CONTENT
  ========================================================= */

  const aboutBox = $(".about-box");

  if (aboutBox) {

    const number = $(".about-number", aboutBox);
    const content = $(".about-content", aboutBox);

    if (number) {
      number.classList.add("about-number-reveal");
    }

    if (content) {
      content.classList.add("about-content-reveal");
    }

  }


  /* =========================================================
     SKILL BARS
  ========================================================= */

  $$(".progress i").forEach(bar => {

    const width =
      bar.dataset.width || "0%";

    bar.style.setProperty(
      "--progress-width",
      width
    );

  });


  let skillsAnimated = false;

  const skillsSection =
    $(".skills");

  function animateSkills() {

    if (skillsAnimated) return;

    skillsAnimated = true;

    $$(".progress i").forEach(
      (bar, index) => {

        setTimeout(() => {

          bar.classList.add("loaded");

        }, 250 + index * 180);

      }
    );

    const chart = $(".chart");

    if (chart) {

      setTimeout(() => {

        chart.classList.add("loaded");

      }, 450);

    }

  }


  if (
    skillsSection &&
    "IntersectionObserver" in window
  ) {

    const skillObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              animateSkills();

              skillObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.2
        }
      );

    skillObserver.observe(
      skillsSection
    );

  }


  /* =========================================================
     ACTIVE NAV
  ========================================================= */

  const navLinks =
    $$(".nav a");

  const sections =
    $$("main section[id]");

  function updateActiveNav() {

    if (!sections.length) return;

    let current = "";

    const position =
      window.scrollY + 220;

    sections.forEach(section => {

      if (
        position >= section.offsetTop &&
        position <
          section.offsetTop +
          section.offsetHeight
      ) {

        current =
          section.id;

      }

    });

    navLinks.forEach(link => {

      link.classList.remove(
        "active-link"
      );

      if (
        link.getAttribute("href") ===
        `#${current}`
      ) {

        link.classList.add(
          "active-link"
        );

      }

    });

  }

  updateActiveNav();

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const id =
        link.getAttribute("href");

      if (!id || id === "#") return;

      const target =
        document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header?.offsetHeight || 0;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: position,
        behavior: reduceMotion
          ? "auto"
          : "smooth"
      });

    });

  });


  /* =========================================================
     MOUSE PARALLAX
  ========================================================= */

  if (
    hero &&
    heroVisual &&
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    const photo =
      $(".photo-card", heroVisual);

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateY =
          (x - centerX) / 45;

        const rotateX =
          (centerY - y) / 45;

        if (photo) {

          photo.style.transform =
            `translateY(-5px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        if (photo) {

          photo.style.transform = "";

        }

      }
    );

  }


  /* =========================================================
     CARD TILT
  ========================================================= */

  if (
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    $$(".field-card, .vision-card").forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            (x - rect.width / 2) / 30;

          const rotateX =
            (rect.height / 2 - y) / 30;

          card.style.transform =
            `translateY(-10px)
             perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.015)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =========================================================
     BUTTON RIPPLE
  ========================================================= */

  $$(".btn, .contact-btn").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const rect =
          button.getBoundingClientRect();

        const ripple =
          document.createElement("span");

        ripple.className =
          "button-ripple";

        ripple.style.left =
          `${event.clientX - rect.left}px`;

        ripple.style.top =
          `${event.clientY - rect.top}px`;

        button.appendChild(
          ripple
        );

        setTimeout(() => {

          ripple.remove();

        }, 700);

      }
    );

  });


  /* =========================================================
     QUOTE REVEAL
  ========================================================= */

  const quote =
    $(".quote");

  if (quote) {

    const quoteTitle =
      $("h2", quote);

    const quoteText =
      $("p", quote);

    if (quoteTitle) {
      quoteTitle.classList.add(
        "quote-text-reveal"
      );
    }

    if (quoteText) {
      quoteText.classList.add(
        "quote-sub-reveal"
      );
    }

  }


  /* =========================================================
     WHATSAPP FLOAT
  ========================================================= */

  if (
    !$(".whatsapp-float")
  ) {

    const whatsapp =
      document.createElement("a");

    whatsapp.className =
      "whatsapp-float";

    whatsapp.href =
      "https://wa.me/201281689551";

    whatsapp.target =
      "_blank";

    whatsapp.rel =
      "noopener noreferrer";

    whatsapp.setAttribute(
      "aria-label",
      "تواصل معي عبر واتساب"
    );

    whatsapp.innerHTML =
      `<span>☏</span>`;

    document.body.appendChild(
      whatsapp
    );

  }


  /* =========================================================
     RESIZE
  ========================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          createParticles();

        }, 300);

    }
  );


  /* =========================================================
     CONSOLE
  ========================================================= */

  console.log(
    "%c DR. MOHAMED ALI ",
    "background:#00d4aa;color:#04110e;font-size:16px;font-weight:800;padding:8px 14px;border-radius:6px;"
  );

});
```
