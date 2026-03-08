// ===== Navigation =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

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
