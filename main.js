/* ─────────────────────────────────────────
   main.js — Portfolio for Romeo Jethro T. Go
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Footer year ── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Mobile menu toggle ── */
  const toggleBtn = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id !== '#') {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Skill bar animation ── */
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(skillSection);
  }

  /* ── Portfolio Actions (Open in New Tab) ── */
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.src;
      if (src) {
        // All activities now open in a new tab
        window.open(src, '_blank');
      }
    });
  });

  /* ── Modal Controls (Retained for UI stability, though unused) ── */
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  const modalFrame = document.getElementById('modal-frame');

  function closeModal() {
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if(modalFrame) modalFrame.src = ''; }, 300);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
});