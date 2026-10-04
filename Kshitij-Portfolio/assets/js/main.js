/**
 * KSHITIJ RAJ — PORTFOLIO SCRIPT
 * Lightweight, accessible, production-ready vanilla JavaScript
 */

// HTTPS endpoint accepting JSON { name, email, message } with CORS for this site.
// A 2xx response must mean the provider accepted the submission. No secrets here.
// Leave empty ("") to provide an honest direct mailto fallback without fake success states.
const FORM_ENDPOINT = "";

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderLayout();
  initMobileMenu();
  initScrollSpy();
  initClipboardCopy();
  initContactForm();
});

// Text enlargement can make a desktop navigation row wider than its container.
function initHeaderLayout() {
  const header = document.querySelector('.site-header');
  const inner = header?.querySelector('.header-inner');
  const nav = header?.querySelector('.main-nav');
  if (!nav || !inner) return;
  let pending = false;
  function update() {
    pending = false;
    header.classList.remove('is-compact');
    if (getComputedStyle(nav).display !== 'none') {
      const children = [...inner.children];
      const availableRight = inner.getBoundingClientRect().right - parseFloat(getComputedStyle(inner).paddingRight);
      const lastRight = children[children.length - 1].getBoundingClientRect().right;
      const bounds = inner.getBoundingClientRect();
      const tooTall = children.some(child => {
        const box = child.getBoundingClientRect();
        return box.top < bounds.top - 1 || box.bottom > bounds.bottom + 1;
      });
      header.classList.toggle('is-compact', lastRight > availableRight + 1 || tooTall);
    }
    header.dispatchEvent(new Event('navigationlayoutchange'));
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  const observer = new ResizeObserver(schedule);
  observer.observe(inner);
  observer.observe(header.querySelector('.header-brand'));
  window.addEventListener('resize', schedule, { passive: true });
  document.fonts.ready.then(schedule);
  update();
}

/* ==========================================================================
   1. THEME SWITCHER (Dark Obsidian / Warm Light Bone)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn || !themeIcon) return;

  const savedTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('kr_site_theme', newTheme); } catch { /* Theme still works without storage. */ }
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
      toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      toggleBtn.setAttribute('title', 'Switch to dark theme');
    } else {
      themeIcon.innerHTML = '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>';
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
  const closeBtn = document.getElementById('drawer-close');
  if (!toggleBtn || !drawer || !closeBtn) return;
  const desktop = window.matchMedia('(min-width: 1201px)');
  const background = [...document.body.children].filter(el =>
    el !== drawer && !['SCRIPT', 'STYLE'].includes(el.tagName));
  const previousInert = new Map();
  let open = false;

  function setMenuState(next, returnFocus = true) {
    if (open === next) return;
    open = next;
    drawer.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    if (open) {
      background.forEach(el => { previousInert.set(el, el.inert); el.inert = true; });
      closeBtn.focus();
    } else {
      background.forEach(el => { el.inert = previousInert.get(el) || false; });
      previousInert.clear();
      if (returnFocus) toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', () => setMenuState(true));
  closeBtn.addEventListener('click', () => setMenuState(false));
  drawer.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setMenuState(false);
    } else if (e.key === 'Tab') {
      const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
  document.addEventListener('focusin', e => {
    if (open && !drawer.contains(e.target)) closeBtn.focus();
  });
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        setMenuState(false, false);
        const target = document.querySelector(href);
        if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
      } else setMenuState(false);
    });
  });
  function resetForDesktop() {
    if (getComputedStyle(toggleBtn).display === 'none' && open) {
      setMenuState(false, false);
      document.querySelector('.header-brand-link').focus();
    }
  }
  desktop.addEventListener('change', resetForDesktop);
  document.querySelector('.site-header').addEventListener('navigationlayoutchange', resetForDesktop);
}

/* ==========================================================================
   3. SCROLL SPY (Synchronizes active nav links on desktop & mobile)
   ========================================================================== */
function initScrollSpy() {
  const sections = [...document.querySelectorAll('section[id]')];
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const header = document.querySelector('.site-header');
  if (!sections.length) return;
  let ticking = false;
  let activationOffset = 0;
  function measureOffset() {
    // Match the anchor landing position defined by CSS, including text scaling.
    const styles = getComputedStyle(document.documentElement);
    const anchorOffset = parseFloat(styles.scrollPaddingTop) || 0;
    activationOffset = Math.max(header?.getBoundingClientRect().bottom || 0, anchorOffset);
    scheduleUpdate();
  }
  function updateActiveLinks() {
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationOffset + 1) active = section;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1];
    }
    links.forEach(link => {
      const current = link.getAttribute('href') === `#${active.id}`;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  function scheduleUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateActiveLinks); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', measureOffset, { passive: true });
  window.addEventListener('load', measureOffset, { once: true });
  if (header) new ResizeObserver(measureOffset).observe(header);
  measureOffset();
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
          showToast(`Could not copy. Select the email address to open your email app: ${text}`);
        });
      } else {
        showToast(`Copy is unavailable. Select the email address to open your email app: ${text}`);
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
  const fallback = document.getElementById('email-fallback');
  const fields = ['user-name', 'user-email', 'user-message'].map(id => ({
    input: document.getElementById(id), error: document.getElementById(`${id}-error`)
  }));
  const endpoint = FORM_ENDPOINT.trim();
  let submitting = false;
  submitBtn.disabled = false;
  submitBtn.textContent = endpoint ? 'Send Message' : 'Prepare Email';
  if (endpoint) document.getElementById('form-help').textContent =
    'Send a message through the form, or email me directly.';

  fields.forEach(({ input, error }) => input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    error.classList.remove('active');
    alertBox.className = 'form-feedback-alert';
    alertBox.textContent = '';
    fallback.href = 'mailto:kshitij.raj.96@gmail.com';
    fallback.textContent = 'Email me directly ↗';
  }));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (submitting) return;
    let firstInvalid = null;
    fields.forEach(({ input, error }) => {
      const invalid = !input.value.trim() || (input.type === 'email' && !input.validity.valid);
      input.setAttribute('aria-invalid', String(invalid));
      error.classList.toggle('active', invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      showAlert('Please check the highlighted fields.', 'error');
      firstInvalid.focus();
      return;
    }
    const [name, email, message] = fields.map(({ input }) => input.value.trim());
    fallback.href = `mailto:kshitij.raj.96@gmail.com?subject=${encodeURIComponent('Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;
    fallback.textContent = 'Open email draft ↗';
    if (!endpoint) {
      showAlert('Your draft is ready. Choose “Open email draft” below to continue in your email app. Nothing has been sent from this page.', 'info');
      return;
    }
    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    fields.forEach(({ input }) => { input.readOnly = true; });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const url = new URL(endpoint);
      if (url.protocol !== 'https:') throw new Error('An HTTPS form endpoint is required.');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Submission was not accepted.');
      form.reset();
      fields.forEach(({ input }) => input.removeAttribute('aria-invalid'));
      fallback.href = 'mailto:kshitij.raj.96@gmail.com';
      fallback.textContent = 'Email me directly ↗';
      showAlert('Your message was accepted by the form service. Thank you for getting in touch.', 'success');
    } catch (error) {
      showAlert(error.name === 'AbortError'
        ? 'The request timed out. Delivery could not be confirmed. Your message is still here; you can send it by email.'
        : 'Delivery could not be confirmed. Your message is still here; please use the email link below.', 'error');
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      form.removeAttribute('aria-busy');
      fields.forEach(({ input }) => { input.readOnly = false; });
    }
  });
  function showAlert(text, type) {
    alertBox.textContent = text;
    alertBox.className = `form-feedback-alert ${type}`;
  }
}
