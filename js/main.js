// ===== Schedule Tabs =====
const tabs = document.querySelectorAll('.schedule-tab');
const days = document.querySelectorAll('.schedule-day');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    days.forEach(d => {
      d.classList.toggle('active', d.id === 'day-' + day);
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

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
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
