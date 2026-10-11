/* =========================================================
   DR. MOHAMED ALI — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
      menuBtn.setAttribute("aria-expanded", String(isOpen));

      menuBtn.innerHTML = isOpen ? "✕" : "☰";

    });


    // إغلاق القائمة عند الضغط على أي رابط
    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.innerHTML = "☰";

        menuBtn.setAttribute(
          "aria-label",
          "فتح القائمة"
        );
        menuBtn.setAttribute("aria-expanded", "false");

      });

    });

  }


  /* =========================================================
     HEADER SCROLL EFFECT
  ========================================================= */

  const header = document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =========================================================
     HERO TEXT SEQUENCE
     ظهور عناصر الـ Hero واحد وراء الثاني
  ========================================================= */

  const heroItems = [

    ".hero .eyebrow",
    ".hero h1",
    ".hero .roles",
    ".hero .hero-text",
    ".hero .hero-actions",
    ".hero .stats"

  ];

  heroItems.forEach((selector, index) => {

    const element = document.querySelector(selector);

    if (!element) return;

    element.classList.add("hero-sequence");

    element.style.animationDelay =
      `${0.15 + index * 0.18}s`;

  });


  /* =========================================================
     ROLE ANIMATION
     طبيب × مبرمج × متداول
  ========================================================= */

  const roles = [
    "طبيب",
    "مبرمج",
    "متداول"
  ];

  const rolesContainer = document.querySelector(".roles");

  if (rolesContainer) {

    const spans = rolesContainer.querySelectorAll("span");

    if (spans.length >= 3) {

      let roleIndex = 0;

      setInterval(() => {

        spans.forEach((span, index) => {

          span.classList.remove("animated-role");

          if (index === roleIndex) {
            span.classList.add("animated-role");

            requestAnimationFrame(() => {
              span.classList.add("show");
            });
          }

        });

        roleIndex++;

        if (roleIndex >= spans.length) {
          roleIndex = 0;
        }

      }, 2200);

    }

  }


  /* =========================================================
     PARTICLES
  ========================================================= */

  const particlesContainer =
    document.getElementById("particles");

  if (particlesContainer) {

    const particleCount =
      window.innerWidth <= 600 ? 25 : 55;

    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      const size =
        Math.random() * 2 + 1;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      particle.style.animationDuration =
        `${4 + Math.random() * 8}s`;

      particle.style.animationDelay =
        `${Math.random() * -8}s`;

      particlesContainer.appendChild(particle);

    }

  }


  /* =========================================================
     SCROLL REVEAL
     العناصر تظهر واحدة وراء الثانية
  ========================================================= */

  const revealSelectors = [

    ".section-label",
    ".section-title",
    ".about-box",
    ".field-card",
    ".skill-box",
    ".vision-card",
    ".vision-bottom",
    ".quote",
    ".contact-card"

  ];

  const revealElements = [];

  revealSelectors.forEach(selector => {

    document.querySelectorAll(selector).forEach(element => {

      element.classList.add("reveal");

      revealElements.push(element);

    });

  });


  /* =========================================================
     REVEAL OBSERVER
  ========================================================= */

  const revealObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const element = entry.target;

          element.classList.add("show");

          revealObserver.unobserve(element);

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =========================================================
     STAGGER ANIMATION
     الكروت تظهر بالتتابع
  ========================================================= */

  const staggerGroups = [

    ".field-grid .field-card",
    ".skills-grid .skill-box",
    ".vision-grid .vision-card"

  ];

  staggerGroups.forEach(selector => {

    const items =
      document.querySelectorAll(selector);

    items.forEach((item, index) => {

      item.style.transitionDelay =
        `${index * 0.15}s`;

    });

  });


  /* =========================================================
     SKILLS PROGRESS
  ========================================================= */

  const progressBars =
    document.querySelectorAll(".progress i");


  progressBars.forEach(bar => {

    const width =
      bar.getAttribute("data-width");

    if (width) {

      bar.style.setProperty(
        "--progress-width",
        width
      );

    }

  });


  const progressObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const bars =
            entry.target.querySelectorAll(".progress i");

          bars.forEach((bar, index) => {

            setTimeout(() => {

              bar.classList.add("loaded");

            }, index * 180);

          });

          progressObserver.unobserve(entry.target);

        });

      },

      {
        threshold: 0.3
      }

    );


  document.querySelectorAll(".skills-grid")
    .forEach(section => {

      progressObserver.observe(section);

    });


  /* =========================================================
     TRADING CHART ANIMATION
  ========================================================= */

  const charts =
    document.querySelectorAll(".chart");


  const chartObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("loaded");

          chartObserver.unobserve(entry.target);

        });

      },

      {
        threshold: 0.35
      }

    );


  charts.forEach(chart => {

    chartObserver.observe(chart);

  });


  /* =========================================================
     ACTIVE NAV LINK
  ========================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");


  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const id =
            entry.target.getAttribute("id");

          navLinks.forEach(link => {

            link.classList.remove("active-link");

            if (
              link.getAttribute("href") === `#${id}`
            ) {

              link.classList.add("active-link");

            }

          });

        });

      },

      {
        threshold: 0.35
      }

    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
          header ? header.offsetHeight : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          20;

        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      });

    });


  /* =========================================================
     CARD MOUSE EFFECT
     حركة بسيطة مع الماوس
  ========================================================= */

  const cards =
    document.querySelectorAll(
      ".field-card, .skill-box, .vision-card"
    );


  cards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth < 850) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -3;

      const rotateY =
        ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =========================================================
     PHOTO PARALLAX
  ========================================================= */

  const photo =
    document.querySelector(".photo-card");

  const heroVisual =
    document.querySelector(".hero-visual");


  if (photo && heroVisual) {

    heroVisual.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth < 850) return;

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateY =
          ((x - rect.width / 2) /
            (rect.width / 2)) * 5;

        const rotateX =
          ((y - rect.height / 2) /
            (rect.height / 2)) * -5;

        photo.style.transform =
          `translateY(-4px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        photo.style.transform = "";

      }
    );

  }


  /* =========================================================
     MOUSE GLOW
  ========================================================= */

  document.querySelectorAll(
    ".field-card, .skill-box, .vision-card, .about-box, .contact-card"
  ).forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      card.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${y}px`
      );

    });

  });


  /* =========================================================
     CONTACT BUTTON RIPPLE
  ========================================================= */

  document.querySelectorAll(
    ".btn, .contact-btn"
  ).forEach(button => {

    button.addEventListener("click", event => {

      const ripple =
        document.createElement("span");

      ripple.className = "click-ripple";

      const rect =
        button.getBoundingClientRect();

      ripple.style.left =
        `${event.clientX - rect.left}px`;

      ripple.style.top =
        `${event.clientY - rect.top}px`;

      button.appendChild(ripple);

      setTimeout(() => {

        ripple.remove();

      }, 700);

    });

  });


  /* =========================================================
     VISION CARDS
     إعادة تشغيل animation عند الظهور
  ========================================================= */

  const visionCards =
    document.querySelectorAll(".vision-card");


  const visionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const card =
            entry.target;

          card.classList.add("visible");

          visionObserver.unobserve(card);

        });

      },

      {
        threshold: 0.2
      }

    );


  visionCards.forEach(card => {

    visionObserver.observe(card);

  });


  /* =========================================================
     COUNTER ANIMATION
     أرقام الإحصائيات
  ========================================================= */

  const statNumbers =
    document.querySelectorAll(".stat strong");


  function animateNumber(element) {

    const finalValue =
      element.textContent.trim();

    if (
      finalValue === "∞" ||
      finalValue.includes("%")
    ) {

      return;

    }

    const number =
      parseInt(finalValue, 10);

    if (isNaN(number)) return;

    let current = 0;

    const duration = 900;

    const startTime =
      performance.now();


    function update(time) {

      const progress =
        Math.min(
          (time - startTime) / duration,
          1
        );

      current =
        Math.floor(
          progress * number
        );

      element.textContent =
        String(current).padStart(
          finalValue.length,
          "0"
        );

      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        element.textContent =
          finalValue;

      }

    }

    requestAnimationFrame(update);

  }


  const stats =
    document.querySelector(".stats");


  if (stats) {

    const statsObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            statNumbers.forEach(
              animateNumber
            );

            statsObserver.unobserve(
              entry.target
            );

          });

        },

        {
          threshold: 0.5
        }

      );


    statsObserver.observe(stats);

  }


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  const scrollProgress =
    document.createElement("div");

  scrollProgress.className =
    "scroll-progress";

  document.body.appendChild(
    scrollProgress
  );


  function updateScrollProgress() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width =
      `${percentage}%`;

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =========================================================
     CONSOLE
  ========================================================= */

  console.log(
    "%c DR. MOHAMED ALI ",
    "background:#00d4aa;color:#04110e;font-size:18px;font-weight:bold;padding:8px 15px;border-radius:5px;"
  );

  console.log(
    "%c طبيب × مبرمج × متداول ",
    "color:#00d4aa;font-size:14px;"
  );

});
