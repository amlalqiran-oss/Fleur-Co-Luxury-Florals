 // Cursor
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        ring.style.left   = e.clientX + 'px';
        ring.style.top    = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .card, .step').forEach(el => {
        el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        ring.style.width = '56px'; ring.style.height = '56px';
        });
        el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px'; cursor.style.height = '12px';
        ring.style.width = '36px'; ring.style.height = '36px';
        });
    });

    // Nav scroll
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // Mobile menu
    document.getElementById('hamburger').onclick = () =>
        document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('closeMenu').onclick  = closeMobile;
    function closeMobile() {
        document.getElementById('mobileMenu').classList.remove('open');
    }

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Add to cart micro-interaction
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
        this.textContent = '✓';
        this.style.background = '#b56b6b';
        setTimeout(() => { this.textContent = '+'; this.style.background = ''; }, 1200);
        });
    });

    // Newsletter button
    document.querySelector('.email-form button').addEventListener('click', function() {
        const input = document.querySelector('.email-form input');
        if (input.value) {
        this.textContent = '✓ Subscribed!';
        this.style.background = '#5a3636';
        input.value = '';
        setTimeout(() => { this.textContent = 'Subscribe'; this.style.background = ''; }, 2500);
        }
    });