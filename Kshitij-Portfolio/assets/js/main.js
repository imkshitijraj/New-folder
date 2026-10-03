/**
 * KSHITIJ RAJ — ULTRA-MODERN PORTFOLIO ENGINE
 * Vanilla JavaScript (Interactive, High-Performance, Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initThemeToggle();
  initTypewriter();
  initScrollEffects();
  initProjectFilters();
  initProjectModal();
  initStatsCounter();
  initSkillBars();
  initContactForm();
  initMobileNav();
  init3DTilt();
});

/* ==========================================================================
   1. AMBIENT PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. THEME SWITCHER (Dark & Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!themeToggle || !themeIcon) return;

  const currentTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'ri-sun-line';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      themeIcon.className = 'ri-moon-line';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  const roles = [
    'Python Data Analyst',
    'Web & Frontend Developer',
    'Open-Source Enthusiast',
    'Data Visualization Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = roles[roleIdx];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typedEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. SCROLL EFFECTS: NAVBAR, PROGRESS BAR, BACK-TO-TOP & NAV SPY
   ========================================================================== */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;

    // Progress Bar
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Sticky Glass Navbar
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT MODAL DETAILS
   ========================================================================== */
const projectDetails = {
  'dataviz': {
    title: 'DataViz Analytics Platform',
    category: 'Data Analytics & Python',
    desc: 'An end-to-end data analytics dashboard capable of ingesting raw CSV/Excel datasets and rendering automated statistical insights, distributions, KPI cards, and interactive cross-filtered charts. Powered by Python, Flask, Pandas, and Chart.js.',
    features: [
      'Automated correlation matrix and outlier detection',
      'Exportable high-resolution reports in PDF and PNG',
      'Dynamic filtering by demographic and date ranges',
      'Fast client-side rendering with sub-second response times'
    ],
    tech: ['Python', 'Pandas', 'Flask', 'Chart.js', 'REST API'],
    demoUrl: 'https://github.com/imkshitijraj',
    githubUrl: 'https://github.com/imkshitijraj'
  },
  'algovault': {
    title: 'AlgoVault — Data Structures & Algorithms',
    category: 'Python & CS Education',
    desc: 'An open-source interactive repository and documentation suite visualizing core data structures and algorithmic complexity. Includes interactive step-by-step state visualization for trees, graphs, sorting, and dynamic programming.',
    features: [
      '50+ documented algorithms with Big-O time and space benchmarks',
      'Visual animation of pathfinding (Dijkstra, A*)',
      'Clean modular architecture with comprehensive test suites',
      'Over 100+ stars and community pull requests'
    ],
    tech: ['Python 3', 'Data Structures', 'Algorithms', 'Sphinx Docs'],
    demoUrl: 'https://github.com/imkshitijraj',
    githubUrl: 'https://github.com/imkshitijraj'
  },
  'sentimentx': {
    title: 'SentimentX — Realtime NLP Sentiment Engine',
    category: 'Data Analytics & ML',
    desc: 'A sentiment analysis tool that parses live social media feeds and customer reviews to classify polarity, emotion, and topical sentiment using NLP models. Provides sentiment trend analysis over custom temporal windows.',
    features: [
      'Live keyword streaming and sentiment categorization',
      'Interactive sentiment score breakdown with word-cloud generation',
      'Custom thresholds for urgent negative feedback alerts',
      'REST API endpoints for third-party integrations'
    ],
    tech: ['Python', 'NLTK', 'Scikit-Learn', 'FastAPI', 'JavaScript'],
    demoUrl: 'https://github.com/imkshitijraj',
    githubUrl: 'https://github.com/imkshitijraj'
  },
  'devpulse': {
    title: 'DevPulse Developer Hub',
    category: 'Full-Stack Web Development',
    desc: 'A lightning-fast tech curation and developer blogging platform engineered with modern semantic HTML5, Vanilla JavaScript, and responsive CSS grid architectures. Features offline caching and dark-mode by default.',
    features: [
      'Custom markdown parser with syntax highlighting',
      'Zero bloated dependencies with 100/100 Lighthouse performance',
      'Integrated search and categorized tagging system',
      'Progressive Web App (PWA) ready'
    ],
    tech: ['HTML5', 'Vanilla CSS', 'JavaScript', 'IndexedDB', 'PWA'],
    demoUrl: 'https://github.com/imkshitijraj',
    githubUrl: 'https://github.com/imkshitijraj'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-content');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay || !modalClose || !modalBody) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="badge" style="margin-bottom: 0.75rem;">${data.category}</span>
        <h2 style="font-size: 1.85rem; margin-bottom: 1rem;">${data.title}</h2>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${data.desc}</p>
        
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--accent-cyan);">Key Highlights & Features</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
          ${data.features.map(f => `<li style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); font-size: 0.95rem;"><i class="ri-checkbox-circle-fill" style="color: var(--accent-emerald);"></i> ${f}</li>`).join('')}
        </ul>

        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          ${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 0.8rem; padding: 0.3rem 0.7rem; background: rgba(99, 102, 241, 0.12); color: var(--accent-indigo); border-radius: 4px; border: 1px solid rgba(99, 102, 241, 0.2);">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="ri-github-fill"></i> View Codebase
          </a>
          <button class="btn btn-secondary" onclick="closeProjectModal()">Close Preview</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeProjectModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   7. ANIMATED NUMBERS COUNTER
   ========================================================================= */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1800;
          const stepTime = 30;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(current) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   8. SKILL BARS ON SCROLL
   ========================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const percent = bar.getAttribute('data-percent');
          bar.style.width = `${percent}%`;
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

/* ==========================================================================
   9. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      statusBox.className = 'form-status error';
      statusBox.innerHTML = '<i class="ri-error-warning-line"></i> Please complete all fields before sending.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusBox.className = 'form-status error';
      statusBox.innerHTML = '<i class="ri-error-warning-line"></i> Please enter a valid email address.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending message...';
    submitBtn.disabled = true;

    // Simulate polished API submission delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      statusBox.className = 'form-status success';
      statusBox.innerHTML = `<i class="ri-checkbox-circle-line"></i> Thank you, <strong>${name}</strong>! Your message has been received. I'll get back to you soon.`;
      form.reset();

      setTimeout(() => {
        statusBox.style.display = 'none';
      }, 7000);
    }, 1200);
  });
}

/* ==========================================================================
   10. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function openMenu() {
    toggle.classList.add('active');
    drawer.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    drawer.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   11. 3D CARD TILT INTERACTION
   ========================================================================== */
function init3DTilt() {
  const tiltCard = document.querySelector('.profile-card');
  if (!tiltCard) return;

  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}
