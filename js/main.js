// ===== Schedule Tabs =====
const tabs = document.querySelectorAll('.schedule-tab');
const days = document.querySelectorAll('.schedule-day');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    days.forEach(d => {
      const isTarget = d.id === 'day-' + day;
      d.classList.toggle('active', isTarget);
      // Re-trigger fade animation
      if (isTarget) {
        d.style.animation = 'none';
        d.offsetHeight; // force reflow
        d.style.animation = '';
      }
    });
  });
});

// ===== Scroll Fade-in =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== FAQ Accordion (smooth) =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const summary = item.querySelector('summary');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (item.open) {
      // Closing: animate then remove open
      const content = item.querySelector('p');
      content.style.maxHeight = '0';
      content.style.opacity = '0';
      content.style.paddingBottom = '0';
      setTimeout(() => { item.open = false; }, 350);
    } else {
      // Close others first
      faqItems.forEach(other => {
        if (other !== item && other.open) {
          const otherContent = other.querySelector('p');
          otherContent.style.maxHeight = '0';
          otherContent.style.opacity = '0';
          otherContent.style.paddingBottom = '0';
          setTimeout(() => { other.open = false; }, 350);
        }
      });
      // Open this one
      item.open = true;
      const content = item.querySelector('p');
      requestAnimationFrame(() => {
        content.style.maxHeight = '200px';
        content.style.opacity = '1';
        content.style.paddingBottom = '16px';
      });
    }
  });
});

// ===== Hide fixed CTA at footer =====
const fixedCta = document.querySelector('.fixed-cta');
const hero = document.querySelector('.hero');
const footer = document.querySelector('.footer');

if (fixedCta) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        fixedCta.classList.toggle('hidden', entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );

  if (footer) ctaObserver.observe(footer);
}
