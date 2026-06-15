// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}