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

// ===== Speaker Slider =====
const speakerSlider = document.querySelector('.speaker-slider');
if (speakerSlider) {
  const track = speakerSlider.querySelector('.speaker-track');
  const slides = speakerSlider.querySelectorAll('.speaker-slide');
  const prevBtn = speakerSlider.querySelector('.speaker-prev');
  const nextBtn = speakerSlider.querySelector('.speaker-next');
  const dots = speakerSlider.querySelectorAll('.speaker-dot');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    prevBtn.classList.toggle('disabled', currentSlide === 0);
    nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Touch swipe (with scroll-snap conflict prevention)
  let touchStartX = 0;
  let touchStartY = 0;
  let swiping = false;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swiping = false;
  }, { passive: true });
  track.addEventListener('touchmove', (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (!swiping && dx > 10 && dx > dy) {
      swiping = true;
    }
    if (swiping) {
      e.preventDefault();
    }
  }, { passive: false });
  track.addEventListener('touchend', (e) => {
    if (!swiping) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goToSlide(currentSlide + (diff > 0 ? 1 : -1));
    }
  });

  // Init
  goToSlide(0);
}

// ===== Grape Emoji Particle Effect =====
document.addEventListener('click', (e) => {
  const count = Math.floor(Math.random() * 3) + 3; // 3~5 particles
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.textContent = '\uD83C\uDF47';
    const size = 16 + Math.random() * 8; // 16~24px
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40; // 40~80px
    const tx = Math.cos(angle) * distance;
    const ty = -Math.abs(Math.sin(angle) * distance); // always upward bias

    Object.assign(particle.style, {
      position: 'fixed',
      left: e.clientX + 'px',
      top: e.clientY + 'px',
      fontSize: size + 'px',
      pointerEvents: 'none',
      zIndex: '9999',
      opacity: '1',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
      willChange: 'transform, opacity',
    });

    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px))';
      particle.style.opacity = '0';
    });

    particle.addEventListener('transitionend', () => particle.remove(), { once: true });
  }
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
