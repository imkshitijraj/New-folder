/**
 * KSHITIJ RAJ — PORTFOLIO SCRIPT
 * Lightweight, accessible, production-ready vanilla JavaScript
 */

// Production contact form endpoint (Formspree, Web3Forms, Netlify Forms, etc.)
// Leave empty ("") to provide an honest direct mailto fallback without fake success states.
const FORM_ENDPOINT = "";

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
      toggleBtn.setAttribute('title', 'Switch to dark theme');
    } else {
      themeIcon.className = 'ri-moon-line';
      toggleBtn.setAttribute('aria-label', 'Switch to light theme');
      toggleBtn.setAttribute('title', 'Switch to light theme');
    }
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER & ACCESSIBLE DIALOG
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileIcon = document.getElementById('mobile-icon');
  if (!toggleBtn || !drawer) return;

  function setMenuState(open) {
    drawer.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));

    if (open) {
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      if (mobileIcon) mobileIcon.className = 'ri-close-line';
      document.body.style.overflow = 'hidden';

      // Move focus into first focusable item in drawer
      const firstFocusable = drawer.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    } else {
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      if (mobileIcon) mobileIcon.className = 'ri-menu-line';
      document.body.style.overflow = '';
      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    setMenuState(!isOpen);
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      setMenuState(false);
    }
  });

  // Close when clicking mobile links
  const links = drawer.querySelectorAll('.mobile-nav-link, .print-trigger');
  links.forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Reset drawer state on window resize past tablet breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && drawer.classList.contains('open')) {
      setMenuState(false);
    }
  }, { passive: true });
}

/* ==========================================================================
   3. SCROLL SPY (Synchronizes active nav links on desktop & mobile)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (!sections.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLinks();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function updateActiveLinks() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 140;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        mobileLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }
}

/* ==========================================================================
   4. CLIPBOARD COPY WITH TOAST NOTIFICATION (Timer Protected)
   ========================================================================== */
function initClipboardCopy() {
  const copyBtns = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toast-notice');
  let toastTimer = null;

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
    if (toastTimer) clearTimeout(toastTimer);

    toast.textContent = message;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   5. CONTACT FORM (Honest Real Endpoint & Clear Mailto Fallback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !alertBox || !submitBtn) return;

  const nameInput = form.querySelector('#user-name');
  const emailInput = form.querySelector('#user-email');
  const messageInput = form.querySelector('#user-message');
  const nameError = document.getElementById('user-name-error');
  const emailError = document.getElementById('user-email-error');
  const messageError = document.getElementById('user-message-error');

  // Clear validation flags and field errors on input
  [
    { input: nameInput, err: nameError },
    { input: emailInput, err: emailError },
    { input: messageInput, err: messageError }
  ].forEach(({ input, err }) => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      if (err) err.classList.remove('active');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error messages
    if (nameError) nameError.classList.remove('active');
    if (emailError) emailError.classList.remove('active');
    if (messageError) messageError.classList.remove('active');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Field-level validation
    if (!name) {
      if (nameInput) {
        nameInput.setAttribute('aria-invalid', 'true');
        nameInput.focus();
      }
      if (nameError) nameError.classList.add('active');
      showAlert('Please enter your name.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (emailInput) {
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
      }
      if (emailError) emailError.classList.add('active');
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    if (!message) {
      if (messageInput) {
        messageInput.setAttribute('aria-invalid', 'true');
        messageInput.focus();
      }
      if (messageError) messageError.classList.add('active');
      showAlert('Please write a message before sending.', 'error');
      return;
    }

    // Honest handling: If no backend service is configured, do NOT fake a submission.
    if (!FORM_ENDPOINT || FORM_ENDPOINT.trim() === '') {
      showAlert(
        'No automated form endpoint is configured yet. Please email me directly at kshitij.raj.96@gmail.com or click below to compose.',
        'info'
      );
      // Pre-fill mailto draft
      const mailtoUrl = `mailto:kshitij.raj.96@gmail.com?subject=${encodeURIComponent('Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;
      window.location.href = mailtoUrl;
      return;
    }

    // Real POST request to configured endpoint
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        form.reset();
        showAlert('Thank you! Your message was delivered successfully. I will get back to you shortly.', 'success');
      } else {
        showAlert('Form service returned an error. Please email me directly at kshitij.raj.96@gmail.com.', 'error');
      }
    } catch (err) {
      showAlert('Network error while dispatching form. Please email me directly at kshitij.raj.96@gmail.com.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  function showAlert(text, type) {
    alertBox.textContent = text;
    alertBox.className = `form-feedback-alert ${type}`;
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
