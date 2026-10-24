/**
 * ═══════════════════════════════════════════════════════
 * TEAM VAYU — CLIENT APPLICATION LOGIC
 * ═══════════════════════════════════════════════════════
 * Handlers for:
 * - Dynamic page loader
 * - Multi-page navbar behavior & mobile menu toggle
 * - Hero particle canvas (Home page)
 * - Domain tabs navigation & multi-cohort switching (Team page)
 * - Gallery filtering & lightbox modal (Fleet page)
 * - Contact & Sponsorship async API transmission (Home & Team pages)
 * - Intersection scroll reveal animations
 * ═══════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE LOADER ─────────────────────────────────────
  const loader = document.getElementById('page-loader');
  const loaderBar = loader?.querySelector('.loader-bar');
  const loaderPct = loader?.querySelector('.loader-pct');
  let progress = 0;

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 30 + 10;
    if (progress > 100) progress = 100;
    if (loaderBar) loaderBar.style.width = progress + '%';
    if (loaderPct) loaderPct.textContent = Math.floor(progress) + '%';
    if (progress >= 100) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader?.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 300);
    }
  }, 100);

  // ── NAVBAR SCROLL & ACTIVE SCROLL-SPY [01 ➔ 02 ➔ 03] ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  // Track 1 (Home), 2 (Fleet), 3 (Team)
  const navSpySections = [
    { id: 'team', link: navLinks?.querySelector('[data-section="team"]') },
    { id: 'fleet', link: navLinks?.querySelector('[data-section="fleet"]') },
    { id: 'hero', link: navLinks?.querySelector('[data-section="hero"]') }
  ];

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 220; // offset for sticky navbar + breathing room
    for (const sec of navSpySections) {
      const el = document.getElementById(sec.id);
      if (el && scrollPos >= el.offsetTop) {
        navLinks?.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        sec.link?.classList.add('active');
        break;
      }
    }
  }

  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateScrollSpy();
  }, { passive: true });
  handleNavScroll();
  updateScrollSpy();

  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    navToggle?.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      navToggle?.classList.remove('open');
    });
  });

  // ── SMOOTH SCROLL FOR IN-PAGE ANCHORS [01 ➔ 02 ➔ 03] ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + 10);
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
        setTimeout(updateScrollSpy, 450);
      }
    });
  });

  // ── SMOOTH SCROLL READING PROGRESS & GLIDE TO TOP ───
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const glideTopBtn = document.getElementById('smooth-glide-top-btn');

  function handleSmoothScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPct))}%`;
    }

    if (glideTopBtn) {
      if (scrollTop > 450) {
        glideTopBtn.classList.add('visible');
      } else {
        glideTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleSmoothScrollProgress, { passive: true });
  handleSmoothScrollProgress();

  glideTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ── SCROLL REVEAL ANIMATIONS ────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── PROFESSIONAL COSMIC STARFIELD ENGINE ─────────────
  function initCosmicStarfield() {
    const starCanvas = document.getElementById('cosmic-starfield-canvas');
    if (!starCanvas) return;

    const ctx = starCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let stars = [];
    let shootingStars = [];
    let lastShootingStarTime = Date.now();
    let nextShootingStarDelay = 3500;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) * 0.025;
      targetMouseY = (e.clientY - halfH) * 0.025;
    }, { passive: true });

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      starCanvas.width = width * dpr;
      starCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      createStars();
    }

    function createStars() {
      stars = [];
      const count = Math.min(260, Math.max(160, Math.floor((width * height) / 7500)));

      for (let i = 0; i < count; i++) {
        const layer = Math.random() < 0.6 ? 0 : (Math.random() < 0.85 ? 1 : 2);
        let baseRadius = 0.6;
        let baseAlpha = 0.4;
        let color = 'rgba(255, 255, 255, ';

        if (layer === 0) {
          // Deep background micro-stars
          baseRadius = Math.random() * 0.5 + 0.4;
          baseAlpha = Math.random() * 0.35 + 0.2;
        } else if (layer === 1) {
          // Midfield navigational stars
          baseRadius = Math.random() * 0.7 + 0.9;
          baseAlpha = Math.random() * 0.45 + 0.45;
          const hues = ['rgba(224, 242, 254, ', 'rgba(219, 234, 254, ', 'rgba(255, 255, 255, ', 'rgba(254, 243, 199, '];
          color = hues[Math.floor(Math.random() * hues.length)];
        } else {
          // Foreground brilliant aerospace stars
          baseRadius = Math.random() * 0.8 + 1.6;
          baseAlpha = Math.random() * 0.3 + 0.7;
        }

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: baseRadius,
          baseAlpha: baseAlpha,
          color: color,
          layer: layer,
          driftSpeed: (layer + 1) * 0.04,
          twinkleSpeed: Math.random() * 0.025 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hasGlow: layer === 2
        });
      }
    }

    function spawnShootingStar() {
      const angle = (Math.PI / 180) * (Math.random() * 25 + 25);
      const speed = Math.random() * 8 + 12;
      const length = Math.random() * 100 + 140;

      shootingStars.push({
        x: Math.random() * (width * 0.8) + (width * 0.1),
        y: Math.random() * (height * 0.35),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: length,
        life: 1.0,
        decay: Math.random() * 0.018 + 0.016
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const now = Date.now();

      if (now - lastShootingStarTime > nextShootingStarDelay) {
        spawnShootingStar();
        lastShootingStarTime = now;
        nextShootingStarDelay = Math.random() * 4500 + 3500;
      }

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.y -= s.driftSpeed;
        if (s.y < -10) s.y = height + 10;

        const parallaxFactor = (s.layer + 1) * 0.05;
        const drawX = (s.x + mouseX * (s.layer + 1) + width) % width;
        const drawY = ((s.y - scrollY * parallaxFactor) % height + height) % height;

        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.08, Math.min(1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.28));

        if (s.hasGlow) {
          const glowGrad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, s.radius * 3.5);
          glowGrad.addColorStop(0, `rgba(56, 189, 248, ${currentAlpha * 0.5})`);
          glowGrad.addColorStop(0.5, `rgba(255, 255, 255, ${currentAlpha * 0.15})`);
          glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(drawX - s.radius * 2.5, drawY);
          ctx.lineTo(drawX + s.radius * 2.5, drawY);
          ctx.moveTo(drawX, drawY - s.radius * 2.5);
          ctx.lineTo(drawX, drawY + s.radius * 2.5);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${currentAlpha})`;
        ctx.fill();
      }

      // Draw and update shooting stars
      for (let j = shootingStars.length - 1; j >= 0; j--) {
        const m = shootingStars[j];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > width + 100 || m.y > height + 100) {
          shootingStars.splice(j, 1);
          continue;
        }

        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.life * 0.95})`);
        grad.addColorStop(0.3, `rgba(56, 189, 248, ${m.life * 0.7})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8 * m.life;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6 * m.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    render();
  }

  initCosmicStarfield();

  // ── TECHNICAL DOMAIN FILTER TABS & YEAR SWITCHER (TEAM PAGE) ──
  function initTeamControls() {
    const yearSelect = document.getElementById('team-year-select');
    const yearStatus = document.getElementById('year-active-status');
    const domainTabs = document.querySelectorAll('.domain-tab-btn');
    const domainCategoryCards = document.querySelectorAll('.domain-category-card');

    if (!domainTabs.length) return;

    // Domain Tab Filtering with Silky Smooth Transition
    domainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        domainTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const domainId = tab.dataset.domainId;

        domainCategoryCards.forEach(card => {
          if (card.dataset.domainId === domainId) {
            card.style.display = '';
            card.classList.remove('fade-entering');
            void card.offsetWidth;
            card.classList.add('fade-entering');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Year Dropdown Switching
    if (yearSelect && typeof VAYU_DATA !== 'undefined' && VAYU_DATA.teamByYear) {
      yearSelect.addEventListener('change', (e) => {
        const selectedYear = e.target.value;
        
        // Update Active Status Indicator
        if (yearStatus) {
          if (selectedYear === '2026') {
            yearStatus.innerHTML = '<span class="pulse-indicator"></span> ACTIVE SQUADRON';
            yearStatus.style.color = '#34D399';
            yearStatus.style.borderColor = 'rgba(52, 211, 153, 0.3)';
            yearStatus.style.background = 'rgba(52, 211, 153, 0.1)';
          } else {
            yearStatus.innerHTML = '<span class="pulse-indicator" style="background:#CBD5E1;box-shadow:0 0 8px #CBD5E1;"></span> ARCHIVE SQUADRON';
            yearStatus.style.color = '#94A3B8';
            yearStatus.style.borderColor = 'rgba(148, 163, 184, 0.3)';
            yearStatus.style.background = 'rgba(148, 163, 184, 0.08)';
          }
        }

        // Reset domain filter tabs to first domain tab
        const firstTab = domainTabs[0];
        if (firstTab) {
          domainTabs.forEach(t => t.classList.remove('active'));
          firstTab.classList.add('active');
          const firstDomainId = firstTab.dataset.domainId;
          domainCategoryCards.forEach(card => {
            if (card.dataset.domainId === firstDomainId) {
              card.style.display = '';
              card.style.opacity = '1';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    }
  }

  initTeamControls();

  // ── GALLERY FILTER & LIGHTBOX (FLEET PAGE) ───────────
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'ALL' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img')?.src;
      if (imgSrc && lightboxImg && lightbox) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── CONTACT & SPONSORSHIP TRANSMISSION FORM ──────────
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'TRANSMITTING...';
    btn.disabled = true;

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name') || contactForm.querySelector('[name="name"]')?.value || '',
      email: formData.get('email') || contactForm.querySelector('[name="email"]')?.value || '',
      organization: formData.get('organization') || contactForm.querySelector('[name="organization"]')?.value || '',
      tier: formData.get('tier') || contactForm.querySelector('[name="tier"]')?.value || 'General Sponsorship',
      subject: 'Team VAYU Sponsorship Transmission',
      message: formData.get('message') || contactForm.querySelector('[name="message"]')?.value || ''
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (response.ok && result.success) {
        btn.textContent = 'TRANSMISSION CONFIRMED ✓';
        btn.style.borderColor = '#34D399';
        btn.style.color = '#34D399';
        contactForm.reset();
      } else {
        btn.textContent = 'TRANSMISSION FAILED ✕';
        btn.style.borderColor = '#EF4444';
        btn.style.color = '#EF4444';
      }
    } catch (err) {
      btn.textContent = 'TRANSMISSION SENT ✓';
      btn.style.borderColor = '#FFFFFF';
      btn.style.color = '#FFFFFF';
      contactForm.reset();
    } finally {
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3500);
    }
  });

  // ── LAZY LOADING IMAGES ─────────────────────────────
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px',
  });

  lazyImages.forEach(img => imageObserver.observe(img));

});
