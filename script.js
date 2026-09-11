```javascript
/* =========================================================
   DR. MOHAMED ALI
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const header = document.querySelector(".header");
  const particlesContainer = document.getElementById("particles");


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuBtn.innerHTML = isOpen ? "✕" : "☰";

    });


    /* إغلاق القائمة عند الضغط على أي رابط */

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.innerHTML = "☰";

      });

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     HERO INTRO
  ======================================================= */

  const heroContent = document.querySelector(".hero-content");

  if (heroContent) {

    heroContent.classList.add("hero-sequence");

  }


  /* =======================================================
     ANIMATED ROLES
  ======================================================= */

  const rolesContainer = document.querySelector(".roles");

  if (rolesContainer) {

    const roleElements = Array.from(
      rolesContainer.querySelectorAll("span")
    );

    /*
      إذا كان الـHTML يحتوي على:
      طبيب × مبرمج × متداول

      سنجعل الكلمات تظهر بالتتابع.
    */

    roleElements.forEach((role, index) => {

      role.classList.add("animated-role");

      role.style.transitionDelay =
        `${index * 0.15}s`;

    });

    setTimeout(() => {

      roleElements.forEach(role => {

        role.classList.add("show");

      });

    }, 500);

  }


  /* =======================================================
     PARTICLES
  ======================================================= */

  function createParticles() {

    if (!particlesContainer) return;

    const isMobile = window.innerWidth <= 850;

    const particleCount = isMobile ? 25 : 55;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < particleCount; i++) {

      const particle = document.createElement("span");

      particle.className = "particle";

      const size =
        Math.random() > .8
          ? 3
          : 2;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      particle.style.animationDuration =
        `${4 + Math.random() * 7}s`;

      particle.style.animationDelay =
        `${Math.random() * -8}s`;

      particle.style.opacity =
        `${0.15 + Math.random() * 0.4}`;

      particlesContainer.appendChild(particle);

    }

  }

  createParticles();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".section-title, " +
    ".about-box, " +
    ".field-card, " +
    ".skill-box, " +
    ".vision-card, " +
    ".vision-bottom, " +
    ".quote, " +
    ".contact-card"
  );


  revealElements.forEach((element, index) => {

    element.classList.add("reveal");

    /*
      إضافة تأخير بسيط للكروت
    */

    if (
      element.classList.contains("field-card") ||
      element.classList.contains("skill-box") ||
      element.classList.contains("vision-card")
    ) {

      const delay =
        index % 3;

      if (delay === 1) {
        element.classList.add("reveal-delay-1");
      }

      if (delay === 2) {
        element.classList.add("reveal-delay-2");
      }

    }

  });


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =======================================================
     SKILL PROGRESS
  ======================================================= */

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


  const progressObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const bars =
          entry.target.querySelectorAll(".progress i");

        bars.forEach((bar, index) => {

          setTimeout(() => {

            bar.classList.add("loaded");

          }, index * 180);

        });

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.25
    }
  );


  document
    .querySelectorAll(".skills-grid")
    .forEach(element => {

      progressObserver.observe(element);

    });


  /* =======================================================
     MARKET CHART
  ======================================================= */

  const charts =
    document.querySelectorAll(".chart");


  const chartObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const chart =
          entry.target;

        chart.classList.add("loaded");

        const bars =
          chart.querySelectorAll("div");

        bars.forEach((bar, index) => {

          bar.style.transitionDelay =
            `${index * 100}ms`;

        });

        observer.unobserve(chart);

      });

    },
    {
      threshold: 0.25
    }
  );


  charts.forEach(chart => {

    chartObserver.observe(chart);

  });


  /* =======================================================
     ACTIVE NAV LINK
  ======================================================= */

  const navLinks =
    document.querySelectorAll(".nav a");

  const sections =
    document.querySelectorAll("main section[id]");


  function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + 180;

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active-link");

      const target =
        link.getAttribute("href");

      if (
        target === `#${currentSection}`
      ) {

        link.classList.add("active-link");

      }

    });

  }


  updateActiveNav();

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  /* =======================================================
     VISION CARDS STAGGER
  ======================================================= */

  const visionCards =
    document.querySelectorAll(".vision-card");


  visionCards.forEach((card, index) => {

    card.style.animationDelay =
      `${index * 0.25}s`;

  });


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

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


  /* =======================================================
     PHOTO PARALLAX
  ======================================================= */

  const photoCard =
    document.querySelector(".photo-card");


  if (
    photoCard &&
    window.matchMedia(
      "(min-width: 851px)"
    ).matches
  ) {

    const visual =
      document.querySelector(".hero-visual");


    if (visual) {

      visual.addEventListener(
        "mousemove",
        event => {

          const rect =
            visual.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateX =
            (y - centerY) / 35;

          const rotateY =
            (centerX - x) / 35;

          photoCard.style.transform =
            `translateY(-4px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );


      visual.addEventListener(
        "mouseleave",
        () => {

          photoCard.style.transform = "";

        }
      );

    }

  }


  /* =======================================================
     CONTACT BUTTON RIPPLE
  ======================================================= */

  const interactiveButtons =
    document.querySelectorAll(
      ".btn, .contact-btn"
    );


  interactiveButtons.forEach(button => {

    button.addEventListener(
      "click",
      function(event) {

        const rect =
          this.getBoundingClientRect();

        const ripple =
          document.createElement("span");

        ripple.style.position =
          "absolute";

        ripple.style.width =
          "10px";

        ripple.style.height =
          "10px";

        ripple.style.borderRadius =
          "50%";

        ripple.style.background =
          "rgba(255,255,255,.35)";

        ripple.style.pointerEvents =
          "none";

        ripple.style.left =
          `${event.clientX - rect.left}px`;

        ripple.style.top =
          `${event.clientY - rect.top}px`;

        ripple.style.transform =
          "translate(-50%,-50%) scale(1)";

        ripple.style.transition =
          "transform .6s ease, opacity .6s ease";

        this.appendChild(ripple);

        requestAnimationFrame(() => {

          ripple.style.transform =
            "translate(-50%,-50%) scale(25)";

          ripple.style.opacity =
            "0";

        });

        setTimeout(() => {

          ripple.remove();

        }, 650);

      }
    );

  });


  /* =======================================================
     MOUSE GLOW
  ======================================================= */

  const site =
    document.querySelector(".site");


  if (
    site &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document.addEventListener(
      "mousemove",
      event => {

        const x =
          (event.clientX / window.innerWidth) * 100;

        const y =
          (event.clientY / window.innerHeight) * 100;

        site.style.background = `
          radial-gradient(
            circle at ${x}% ${y}%,
            rgba(0,212,170,.035),
            transparent 25%
          ),
          radial-gradient(
            circle at 80% 20%,
            rgba(0,212,170,.08),
            transparent 30%
          ),
          radial-gradient(
            circle at 15% 70%,
            rgba(0,140,255,.06),
            transparent 30%
          ),
          #05070b
        `;

      }
    );

  }


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {

        createParticles();

      }, 250);

    }
  );


  /* =======================================================
     WHATSAPP FLOAT BUTTON
  ======================================================= */

  /*
    يتم إنشاء الزر تلقائيًا إذا لم يكن موجودًا
    في الـHTML.
  */

  if (
    !document.querySelector(".whatsapp-float")
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
      "noopener";

    whatsapp.setAttribute(
      "aria-label",
      "تواصل معي عبر واتساب"
    );

    whatsapp.innerHTML =
      "☏";

    document.body.appendChild(
      whatsapp
    );

  }


  /* =======================================================
     LAZY IMAGE EFFECT
  ======================================================= */

  const heroImage =
    document.querySelector(".photo-card img");


  if (heroImage) {

    heroImage.addEventListener(
      "load",
      () => {

        heroImage.classList.add(
          "image-loaded"
        );

      }
    );

  }


  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reducedMotion) {

    document
      .querySelectorAll(
        ".particle"
      )
      .forEach(particle => {

        particle.style.animation =
          "none";

      });

  }


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "%c DR. MOHAMED ALI ",
    "background:#00d4aa;color:#04110e;font-size:16px;font-weight:bold;padding:8px 15px;border-radius:5px;"
  );

  console.log(
    "%c Doctor × Programmer × Trader ",
    "color:#00d4aa;font-size:13px;"
  );

});
```

ثم أضف هذا السطر **قبل `</body>` مباشرة** في ملف HTML:

```html
<script src="script.js"></script>
```

### مهم جدًا

في الـHTML الذي أرسلته يوجد أيضًا قسم `footer` و`whatsapp-float` متوقعين من الـCSS، لكن الـJavaScript أعلاه ينشئ زر واتساب العائم تلقائيًا إذا لم يكن موجودًا.

كذلك عندك مشكلة بسيطة في كود الـHTML الأصلي: وضعت ```html داخل محتوى الملف أكثر من مرة. هذه العلامات **ليست جزءًا من HTML** ويجب حذفها. استخدم فقط:

```html
<section>
  ...
</section>
```

وليس:

````html
```html
<section>
  ...
</section>
````

```

**النتيجة:** بعد إضافة `script.js` سيعمل لديك الـmenu للموبايل، الـscroll reveal، الـactive navigation، نسب المهارات، الرسم البياني، الـparticles، حركة الـHero، تأثير الصورة، الـripple، والـWhatsApp العائم.

إذا أردت، أقدر أيضًا **أرتب لك الملفات الثلاثة `index.html + style.css + script.js` في نسخة نهائية نظيفة ومصححة بالكامل** بحيث تنسخها كما هي وتفتح الموقع مباشرة.
```
