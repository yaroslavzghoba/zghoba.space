document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.so-scroll-container');
  if (!container) return;
  const sections = [...document.querySelectorAll('.so-section')];
  const navLinks = [...document.querySelectorAll('.so-nav-link')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('so-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  }, { root: container, threshold: [0.35, 0.6, 0.9] });

  sections.forEach((section) => sectionObserver.observe(section));
  navLinks
    .filter((link) => link.getAttribute('href').startsWith('#'))
    .forEach((link) => link.addEventListener('click', () => setActiveSection(link.getAttribute('href').slice(1))));

  const mediaSection = document.querySelector('.so-projects-section');
  const video = mediaSection?.querySelector('video');
  if (!video || reduceMotion) return;

  const mediaObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }, { root: container, threshold: 0.35 });
  mediaObserver.observe(mediaSection);
});
