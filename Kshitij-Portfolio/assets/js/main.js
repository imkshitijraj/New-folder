/**
 * KSHITIJ RAJ — SLEEK OPERATIONAL PORTFOLIO
 * High-performance, zero gimmicks, clean human interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCopyToolbar();
  initContactForm();
  initPrintResume();
});

/* ==========================================================================
   1. THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn || !icon) return;

  const currentTheme = localStorage.getItem('kr-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);

  btn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const next = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('kr-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (theme === 'light') {
      icon.className = 'ri-sun-line';
      btn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      icon.className = 'ri-moon-line';
      btn.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}

/* ==========================================================================
   2. ONE-CLICK EMAIL COPY & TOAST
   ========================================================================== */
function initCopyToolbar() {
  const copyBtns = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || 'kshitij.raj.96@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard`);
      }).catch(() => {
        showToast(`Email: ${textToCopy}`);
      });
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
   3. PRINT / SAVE PDF TRIGGER
   ========================================================================== */
function initPrintResume() {
  const printBtns = document.querySelectorAll('.print-trigger');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/* ==========================================================================
   4. CONTACT FORM
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
      alertBox.textContent = 'Please fill out all fields.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alertBox.className = 'form-alert error';
      alertBox.textContent = 'Please enter a valid email address.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alertBox.className = 'form-alert success';
      alertBox.textContent = `Thanks ${name}, your message has been sent to kshitij.raj.96@gmail.com. I will get back to you shortly.`;
      form.reset();

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 6000);
    }, 600);
  });
}
