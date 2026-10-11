(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intro loader
  document.body.classList.add('loading');
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      $('#preloader')?.classList.add('done');
      document.body.classList.remove('loading');
    }, 500);
  });

  // Header, reading progress, and mobile navigation
  const header = $('.site-header');
  const progress = $('#scrollProgress');
  const menuToggle = $('#menuToggle');
  const navLinks = $('#navLinks');
  const navItems = $$('.nav-links a');

  const onScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('scrolled', window.scrollY > 24);
    if (progress) progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    let current = 'home';
    $$('main section[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('open', !isOpen);
  });
  navItems.forEach(link => link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menuToggle?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('open');
    }
  });

  // Reveal sections as they enter the viewport
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Sequential typing effect in the hero
  const typed = $('#typedText');
  const phrases = ['أبني المستقبل', 'أتعلم بلا حدود', 'أحوّل الأفكار لواقع', 'أستكشف عوالم جديدة'];
  if (typed && !reduceMotion) {
    let phraseIndex = 0, charIndex = phrases[0].length, deleting = true;
    const typeLoop = () => {
      const phrase = phrases[phraseIndex];
      if (deleting) {
        charIndex--;
        typed.textContent = phrase.slice(0, Math.max(0, charIndex));
      } else {
        charIndex++;
        typed.textContent = phrases[phraseIndex].slice(0, charIndex);
      }
      let delay = deleting ? 38 : 68;
      if (!deleting && charIndex >= phrases[phraseIndex].length) {
        deleting = true; delay = 1450;
      } else if (deleting && charIndex <= 0) {
        deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 300;
      }
      window.setTimeout(typeLoop, delay);
    };
    window.setTimeout(typeLoop, 1700);
  }

  // Lightweight animated starfield — no external library required
  const canvas = $('#starfield');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx && !reduceMotion) {
    let width = 0, height = 0, stars = [], raf = 0;
    const makeStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((width * height) / 11500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        radius: Math.random() * 1.1 + .2, alpha: Math.random() * .5 + .12,
        speed: Math.random() * .12 + .025, phase: Math.random() * Math.PI * 2
      }));
    };
    const draw = time => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        const pulse = .72 + Math.sin(time * .0007 + star.phase) * .28;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 255, 222, ${star.alpha * pulse})`;
        ctx.fill();
        star.y -= star.speed;
        if (star.y < -2) { star.y = height + 2; star.x = Math.random() * width; }
      });
      raf = requestAnimationFrame(draw);
    };
    makeStars();
    raf = requestAnimationFrame(draw);
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(makeStars, 150);
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
  }

  $('#year').textContent = new Date().getFullYear();
})();
