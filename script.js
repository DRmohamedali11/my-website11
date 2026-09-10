```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });

    });

  }


  /* =========================================
     HERO ROLES
  ========================================= */

  const roles = document.querySelector(".roles");

  if (roles) {

    const words = [
      "طبيب",
      "مبرمج",
      "متداول"
    ];

    roles.innerHTML = `
      <span class="animated-role"></span>
      <b>×</b>
      <span class="role-static">محمد</span>
    `;

    const roleElement =
      roles.querySelector(".animated-role");

    const staticElement =
      roles.querySelector(".role-static");

    staticElement.textContent = "";

    let current = 0;

    function changeRole() {

      roleElement.classList.remove("show");

      setTimeout(() => {

        roleElement.textContent =
          words[current];

        roleElement.classList.add("show");

        current++;

        if (current >= words.length) {
          current = 0;
        }

      }, 250);
    }

    changeRole();

    setInterval(changeRole, 2300);

  }


  /* =========================================
     HERO SEQUENCE
  ========================================= */

  const heroItems = [
    ".eyebrow",
    ".hero h1",
    ".roles",
    ".hero-text",
    ".hero-actions",
    ".stats"
  ];

  heroItems.forEach((selector, index) => {

    const element =
      document.querySelector(selector);

    if (!element) return;

    element.classList.add("hero-sequence");

    element.style.animationDelay =
      `${0.15 + index * 0.16}s`;

  });


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements = document.querySelectorAll(`
    .section-label,
    .section-title,
    .about-box,
    .field-card,
    .skill-box,
    .quote,
    .contact-card,
    footer
  `);

  revealElements.forEach(element => {
    element.classList.add("premium-reveal");
  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

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


  /* =========================================
     STAGGER FIELDS
  ========================================= */

  document.querySelectorAll(".field-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 0.15}s`;

    });


  /* =========================================
     STAGGER SKILLS
  ========================================= */

  document.querySelectorAll(".skill-box")
    .forEach((box, index) => {

      box.style.transitionDelay =
        `${index * 0.18}s`;

    });


  /* =========================================
     PROGRESS BARS
  ========================================= */

  const skillBoxes =
    document.querySelectorAll(".skill-box");

  const progressObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const bars =
            entry.target.querySelectorAll(
              ".progress i"
            );

          bars.forEach((bar, index) => {

            const width =
              bar.dataset.width || "0%";

            bar.style.setProperty(
              "--progress-width",
              width
            );

            setTimeout(() => {

              bar.classList.add("loaded");

            }, index * 250);

          });


          const chart =
            entry.target.querySelector(".chart");

          if (chart) {

            setTimeout(() => {
              chart.classList.add("loaded");
            }, 250);

          }

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.3
      }
    );


  skillBoxes.forEach(box => {
    progressObserver.observe(box);
  });


  /* =========================================
     PARTICLES
  ========================================= */

  const particles =
    document.getElementById("particles");

  if (particles) {

    const count =
      window.innerWidth <= 600 ? 25 : 45;

    for (let i = 0; i < count; i++) {

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
        `${4 + Math.random() * 7}s`;

      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particles.appendChild(particle);

    }

  }


  /* =========================================
     HEADER SCROLL
  ========================================= */

  const header =
    document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================
     ACTIVE NAV
  ========================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav a"
    );

  const navObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            link.classList.remove(
              "active-link"
            );
          });

          const active =
            document.querySelector(
              `.nav a[href="#${entry.target.id}"]`
            );

          if (active) {
            active.classList.add(
              "active-link"
            );
          }

        });

      },
      {
        threshold: 0.45
      }
    );


  sections.forEach(section => {
    navObserver.observe(section);
  });


  /* =========================================
     DESKTOP CARD TILT
  ========================================= */

  if (window.innerWidth > 850) {

    document.querySelectorAll(
      ".field-card, .skill-box"
    ).forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

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
             translateY(-5px)`;

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


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });

});
```
```javascript
```javascript
/* SCROLL ANIMATION */

document.addEventListener("DOMContentLoaded", function () {

  const elements = document.querySelectorAll(
    ".section, .field-card, .skill-box, .quote, .contact-card"
  );

  elements.forEach(function (element) {
    element.classList.add("reveal");
  });

  function revealOnScroll() {

    elements.forEach(function (element) {

      const position =
        element.getBoundingClientRect().top;

      const screenHeight =
        window.innerHeight;

      if (position < screenHeight - 100) {
        element.classList.add("show");
      }

    });

  }

  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  revealOnScroll();

});
```
