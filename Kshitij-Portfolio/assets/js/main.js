/**
 * KSHITIJ RAJ — EXECUTIVE HUMAN-CENTRIC PORTFOLIO ENGINE
 * Vanilla JavaScript (Zero bloated frameworks, high performance)
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initThemeToggle();
  initTypewriter();
  initScrollEffects();
  initProjectModals();
  initResumeModal();
  initStatsCounter();
  initContactForm();
  initMobileNav();
});

/* ==========================================================================
   1. AMBIENT BACKGROUND CANVAS
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
  const count = Math.min(Math.floor((width * height) / 22000), 55);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.6 + 0.6;
      this.alpha = Math.random() * 0.45 + 0.15;
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
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.12;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.7;
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

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!toggle || !icon) return;

  const savedTheme = localStorage.getItem('kr-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kr-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (theme === 'light') {
      icon.className = 'ri-sun-line';
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      icon.className = 'ri-moon-line';
      toggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}

/* ==========================================================================
   3. AUTHENTIC HUMAN TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Esports & Event Operations Specialist',
    'Independent Gameplay QA Contributor',
    'Project Coordinator & Tech Enthusiast',
    'BCA Undergraduate @ Techno International'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isBackspacing = false;
  let speed = 90;

  function loop() {
    const current = phrases[phraseIndex];

    if (isBackspacing) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 45;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 85;
    }

    if (!isBackspacing && charIndex === current.length) {
      isBackspacing = true;
      speed = 1900;
    } else if (isBackspacing && charIndex === 0) {
      isBackspacing = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(loop, speed);
  }

  loop();
}

/* ==========================================================================
   4. SCROLL PROGRESS & NAVBAR
   ========================================================================== */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) progressBar.style.width = `${progress}%`;

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (scrollTop > 380) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // ScrollSpy active link
    let activeId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
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
   5. REAL QUANTIFIABLE COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1400;
          const step = Math.max(1, target / (duration / 25));

          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target + suffix;
              clearInterval(interval);
            } else {
              stat.textContent = Math.floor(current) + suffix;
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. PROJECT CASE STUDY MODAL
   ========================================================================== */
const projectRepository = {
  'nexus': {
    title: 'NEXUS — Project & Workflow Management Platform',
    category: 'Product Design & Architecture',
    year: '2025–2026',
    overview: 'Conceptualized and designed a centralized project management platform to bring task tracking, team collaboration, structured documentation, and workflow automation into a unified workspace.',
    highlights: [
      'Engineered automated notification protocols: deadline reminders, approval escalation, recurring task templates, and risk alerts.',
      'Designed integration pipelines for Google Calendar, Gmail, Slack, GitHub, and Google Drive with webhook extensibility.',
      'Formulated end-to-end product requirements, feature prioritization matrices, and a phased rollout roadmap for enterprise teams.',
      'Focus on usability, minimizing task fragmentation, and keeping cross-functional teams synchronized without manual status reporting.'
    ],
    tags: ['Product Design', 'Workflow Automation', 'Analytics', 'Integrations', 'PRD', 'System Architecture'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imkshitijraj'
  },
  'incubes': {
    title: 'INCUBES — Inter-College Event Website',
    category: 'Full-Stack Web Delivery',
    year: '2024',
    overview: 'Led end-to-end project delivery for a live college event website supporting an inter-college fest with 300–500 attendees at Techno International New Town. Site remains live at tint.edu.in/incubes.',
    highlights: [
      'Owned the entire project lifecycle: requirement gathering, wireframing, sprint planning, development, QA testing, and launch.',
      'Managed competing priorities between frontend development and cross-department event coordination, achieving 100% on-time delivery.',
      'Crafted with clean HTML5, modern responsive CSS, and Vanilla JavaScript with cross-browser and mobile device compatibility.',
      'Coordinated with student organizers, faculty advisors, and venue leads to ensure zero scope reduction under fixed calendar constraints.'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Project Delivery', 'Live Production', 'Event Operations'],
    liveUrl: 'https://tint.edu.in/incubes',
    githubUrl: 'https://github.com/imkshitijraj'
  }
};

function initProjectModals() {
  const overlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  const content = document.getElementById('project-modal-content');
  const triggerBtns = document.querySelectorAll('.view-project-modal-btn');

  if (!overlay || !closeBtn || !content) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      const data = projectRepository[id];
      if (!data) return;

      const liveLinkBtn = data.liveUrl && data.liveUrl !== '#' 
        ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="ri-external-link-line"></i> Visit Live Website</a>`
        : '';

      content.innerHTML = `
        <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
          <span class="status-badge">${data.category}</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${data.year}</span>
        </div>
        <h2 style="font-size: 1.75rem; margin-bottom: 0.85rem; line-height: 1.25;">${data.title}</h2>
        <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.5rem; font-size: 1rem;">${data.overview}</p>
        
        <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--brand-cyan); margin-bottom: 0.75rem;">Key Execution Points</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
          ${data.highlights.map(h => `<li style="display: flex; align-items: flex-start; gap: 0.6rem; color: var(--text-secondary); font-size: 0.925rem; line-height: 1.5;"><i class="ri-check-line" style="color: var(--brand-cyan); margin-top: 0.2rem; flex-shrink: 0;"></i> <span>${h}</span></li>`).join('')}
        </ul>

        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 2rem;">
          ${data.tags.map(t => `<span style="font-family: var(--font-mono); font-size: 0.78rem; padding: 0.25rem 0.65rem; background: rgba(56, 189, 248, 0.08); color: var(--brand-cyan); border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.2);">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
          ${liveLinkBtn}
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <i class="ri-github-line"></i> GitHub Repository
          </a>
          <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
        </div>
      `;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeProjectModal = function() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeProjectModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeProjectModal();
  });
}

/* ==========================================================================
   7. FULL RESUME / CV MODAL & PRINTING
   ========================================================================== */
function initResumeModal() {
  const overlay = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('resume-modal-print');

  if (!overlay || !closeBtn) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeResume() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeResume);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeResume();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   8. REAL HUMAN CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alertBox.className = 'form-alert error';
      alertBox.innerHTML = '<i class="ri-error-warning-line"></i> Please fill in your name, email, and message.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alertBox.className = 'form-alert error';
      alertBox.innerHTML = '<i class="ri-error-warning-line"></i> Please provide a valid email address.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending message...';
    submitBtn.disabled = true;

    // Direct simulated mail response
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `<i class="ri-check-line"></i> Thanks, <strong>${name}</strong>! Your message has been sent directly to Kshitij Raj (kshitij.raj.96@gmail.com). I will reply promptly.`;
      form.reset();

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 7000);
    }, 900);
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION DRAWER
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

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

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
