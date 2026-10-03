/**
 * KSHITIJ RAJ — PORTFOLIO SCRIPT
 * Lightweight, accessible vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initClipboardCopy();
  initContactForm();
  initPrintTriggers();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark Obsidian / Warm Light Bone)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn || !themeIcon) return;

  const savedTheme = localStorage.getItem('kr_site_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kr_site_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'ri-sun-line';
      toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeIcon.className = 'ri-moon-line';
      toggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileIcon = document.getElementById('mobile-icon');
  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
    if (mobileIcon) {
      mobileIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking mobile links
  const links = drawer.querySelectorAll('.mobile-nav-link, .print-trigger');
  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   3. SCROLL SPY (Highlight active nav link)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. CLIPBOARD COPY WITH TOAST NOTIFICATION
   ========================================================================== */
function initClipboardCopy() {
  const copyBtns = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toast-notice');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy') || 'kshitij.raj.96@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`);
        }).catch(() => {
          showToast(`Email: ${text}`);
        });
      } else {
        showToast(`Email: ${text}`);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   5. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !alertBox || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#user-name').value.trim();
    const email = form.querySelector('#user-email').value.trim();
    const message = form.querySelector('#user-message').value.trim();

    if (!name || !email || !message) {
      showAlert('Please fill in all fields before sending.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Simulate reliable dispatch
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showAlert('Thank you! Your message has been sent. I will get back to you shortly.', 'success');

      setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.className = 'form-alert';
      }, 7000);
    }, 600);
  });

  function showAlert(text, type) {
    alertBox.textContent = text;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = 'block';
  }
}

/* ==========================================================================
   6. PRINT / PDF TRIGGERS
   ========================================================================== */
function initPrintTriggers() {
  const triggers = document.querySelectorAll('.print-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}
