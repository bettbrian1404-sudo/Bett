// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu automatically if someone clicks a link inside it
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Smooth Scrolling for same-page anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Portfolio Filtering (portfolio.html only) =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update which button looks active
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const matches = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !matches);
    });
  });
});

// ===== Contact Form Validation (contact.html only) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let isValid = true;

    const fields = [
      { input: document.getElementById('name'), error: document.getElementById('nameError'), message: 'Please enter your name.' },
      { input: document.getElementById('email'), error: document.getElementById('emailError'), message: 'Please enter a valid email.' },
      { input: document.getElementById('message'), error: document.getElementById('messageError'), message: 'Please enter a message.' }
    ];

    fields.forEach(field => {
      const value = field.input.value.trim();
      const group = field.input.closest('.form-group');
      let fieldValid = value.length > 0;

      // Extra check for email format
      if (field.input.type === 'email' && value.length > 0) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldValid = emailPattern.test(value);
      }

      if (!fieldValid) {
        isValid = false;
        group.classList.add('invalid');
        field.error.textContent = field.message;
      } else {
        group.classList.remove('invalid');
        field.error.textContent = '';
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  });
}
