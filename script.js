const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 24);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  if (open) {
    closeMenu();
  } else {
    nav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('menu-open');
    nav.querySelector('a').focus();
  }
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealTargets = document.querySelectorAll('.reveal, .technique-line');
if (reduceMotion) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px' },
  );
  revealTargets.forEach((target) => revealObserver.observe(target));
}

if (!reduceMotion) {
  const heroMark = document.querySelector('.hero-mark');
  const onScroll = () => {
    if (window.scrollY < window.innerHeight * 1.15) {
      heroMark.style.transform = `translate3d(0, ${window.scrollY * 0.06}px, 0)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
