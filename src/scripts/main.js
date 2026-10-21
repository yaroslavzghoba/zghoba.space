document.addEventListener('DOMContentLoaded', () => {
  const sysNav = document.querySelector('.so-sys-nav');
  const container = document.querySelector('.so-scroll-container');
  if (!container) return;
  const sections = [...document.querySelectorAll('.so-section')];
  const navLinks = [...document.querySelectorAll('.so-nav-link')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Exclude the possiblility for a part of section to be overlapped by the navigation bar.
  if (sysNav) {
    sysNav.style.width = `100%`;
    const sysNavHeight = sysNav.offsetHeight;
    sections.forEach((section) => {
      section.style.minHeight = '100vh';
      section.style.paddingTop = `${sysNavHeight}px`;
    });
  }

  // Navigation link highlighting
  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('so-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  // Section visibility control
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

  // Media playback control
  const mediaSections = document.querySelectorAll('.so-projects-section');
  const videos = [...mediaSections].flatMap((section) => [...section.querySelectorAll('video')]);
  if (!videos.length || reduceMotion) return;

  // Start every background video regardless of whether its section is active.
  videos.forEach((video) => video.play().catch(() => {}));
});
