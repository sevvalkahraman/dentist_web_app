const appointmentForm = document.getElementById('appointment-form');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');
const langButtons = document.querySelectorAll('.lang-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navActions = document.querySelector('.nav-actions');

if (menuToggle && navActions) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navActions.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    navActions?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Menüyü aç');
  });
});

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    langButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

// Scroll spy: observe sections and toggle active class on nav links
const sections = document.querySelectorAll('main .content-panel, header');
const navMap = {};
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    navMap[href.replace('#', '')] = link;
  }
});

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -35% 0px',
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const link = navMap[id];
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach((s) => {
  if (s.id) sectionObserver.observe(s);
});

// Fade out the decorative tooth when hero is scrolled out of view
const heroEl = document.querySelector('.hero');
const tooth = document.querySelector('.hero-tooth');
if (heroEl && tooth) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        tooth.classList.remove('faded');
      } else {
        tooth.classList.add('faded');
      }
    });
  }, { root: null, threshold: 0.05 });
  heroObserver.observe(heroEl);
}

if (appointmentForm) {
  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData.entries());
    const subject = encodeURIComponent(`Randevu Talebi - ${data.service}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${data.name}\nTelefon: ${data.phone}\nHizmet: ${data.service}\nTarih: ${data.date}\nNot: ${data.note || '-'}`
    );

    window.location.href = `mailto:info@taskinozcan.com?subject=${subject}&body=${body}`;
    document.getElementById('appointment-status').textContent =
      'Randevu talebiniz e-posta istemcisine yönlendirildi.';
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Ad: ${data.name}\nE-posta: ${data.email}\nMesaj: ${data.message}`
    );

    window.location.href = `mailto:info@taskinozcan.com?subject=${subject}&body=${body}`;
    document.getElementById('contact-status').textContent =
      'Mesajınız e-posta istemcisine yönlendirildi.';
  });
}
