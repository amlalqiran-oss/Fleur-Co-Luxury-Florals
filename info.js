/* ── Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px';
  ring.style.left   = e.clientX+'px'; ring.style.top   = e.clientY+'px';
});
document.querySelectorAll('a,button,input,textarea,select,.info-card,.blog-card,.care-card,.job-card,.press-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px';cursor.style.height='20px';ring.style.width='56px';ring.style.height='56px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px';cursor.style.height='12px';ring.style.width='36px';ring.style.height='36px'; });
});

/* ── Nav scroll ── */
window.addEventListener('scroll', () =>
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40)
);

/* ── Mobile menu ── */
document.getElementById('hamburger').onclick = () => document.getElementById('mobileMenu').classList.add('open');
document.getElementById('closeMenu').onclick  = closeMobile;
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

/* ── Scroll reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── Active side nav highlight ── */
const sections = document.querySelectorAll('.info-section');
const sideLinks = document.querySelectorAll('.side-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  sideLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#'+current) a.classList.add('active');
  });
});

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── Apply job ── */
function applyJob(btn, role) {
  const orig = btn.textContent;
  btn.textContent = '✓ Applied!';
  btn.style.background = 'var(--text)'; btn.style.color = 'var(--white)';
  btn.style.borderColor = 'var(--text)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background=''; btn.style.color=''; btn.style.borderColor='';
  }, 2000);
  document.querySelector('#contact input[type="text"]').scrollIntoView({behavior:'smooth',block:'center'});
}

/* ── Contact form ── */
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…'; btn.style.opacity='.7';
  setTimeout(() => {
    btn.textContent = '✓ Sent!'; btn.style.opacity='1'; btn.style.background='var(--deep-rose)';
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      btn.textContent='Send Message'; btn.style.background='';
    }, 4000);
  }, 1200);
}