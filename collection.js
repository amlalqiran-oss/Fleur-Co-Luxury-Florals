   /* ── Cursor ── */
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px';
        ring.style.left   = e.clientX+'px'; ring.style.top   = e.clientY+'px';
    });
    document.querySelectorAll('a,button,.card,.filter-tab').forEach(el => {
        el.addEventListener('mouseenter', () => {
        cursor.style.width='20px'; cursor.style.height='20px';
        ring.style.width='56px'; ring.style.height='56px';
        });
        el.addEventListener('mouseleave', () => {
        cursor.style.width='12px'; cursor.style.height='12px';
        ring.style.width='36px'; ring.style.height='36px';
        });
    });

    /* ── Nav ── */
    window.addEventListener('scroll', () =>
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40)
    );

    /* ── Mobile Menu ── */
    document.getElementById('hamburger').onclick = () =>
        document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('closeMenu').onclick = closeMobile;
    function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

    /* ── Scroll Reveal ── */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ── Filter ── */
    const allCards = Array.from(document.querySelectorAll('#productsGrid .card'));

    document.getElementById('filterTabs').addEventListener('click', e => {
        const btn = e.target.closest('.filter-tab');
        if (!btn) return;
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let count = 0;
        allCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) count++;
        });
        document.getElementById('resultCount').textContent = `Showing ${count} item${count!==1?'s':''}`;
    });

    /* ── Sort ── */
    document.getElementById('sortSelect').addEventListener('change', function() {
        const grid = document.getElementById('productsGrid');
        const cards = Array.from(grid.querySelectorAll('.card'));
        const val = this.value;
        cards.sort((a, b) => {
        const pa = parseFloat(a.dataset.price);
        const pb = parseFloat(b.dataset.price);
        const ra = parseFloat(a.dataset.rating);
        const rb = parseFloat(b.dataset.rating);
        if (val === 'Price: Low to High') return pa - pb;
        if (val === 'Price: High to Low') return pb - pa;
        if (val === 'Best Rated')         return rb - ra;
        return 0;
        });
        cards.forEach(c => grid.appendChild(c));
    });

    /* ── View Toggle ── */
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const grid = document.getElementById('productsGrid');
        const n = this.dataset.view;
        grid.classList.remove('grid-1','grid-2','grid-3');
        grid.classList.add(`grid-${n}`);
        // reset featured span in list view
        document.querySelectorAll('.card-featured').forEach(c => {
            c.style.gridColumn = n === '3' ? 'span 2' : 'span 1';
        });
        });
    });

    /* ── Wishlist toggle ── */
    function toggleWish(btn) {
        btn.classList.toggle('liked');
        btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
    }

    /* ── Add to Cart ── */
    function addToCart(btn) {
        btn.textContent = '✓';
        btn.style.background = 'var(--deep-rose)';
        setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 1200);
    }

    /* ── Quick View (click card body) ── */
    const products = [
        { name:'Eternal Rose Bouquet', cat:'Bouquets', emoji:'🌺', price:'$89', bg:'linear-gradient(145deg,#f9e4e4,#fdf0f0)', desc:'Velvet-soft roses in blush and cream, nestled with baby\'s breath, eucalyptus, and delicate foliage.', stems:'18–22 stems', life:'7–10 days', size:'Medium / Large', delivery:'Same-day' },
        { name:'Spring Symphony',      cat:'Bouquets', emoji:'💐', price:'$112', bg:'linear-gradient(145deg,#f3e8f5,#fdf4fe)', desc:'Peonies, tulips, and sweet freesia in a vibrant spring medley of colour and fragrance.', stems:'20–26 stems', life:'5–8 days', size:'Medium', delivery:'Same-day' },
        { name:'Garden Reverie',       cat:'Seasonal', emoji:'🌷', price:'$135', bg:'linear-gradient(145deg,#e8f0e4,#f5faf2)', desc:'Wild-garden style with ranunculus, garden roses, and trailing greenery.', stems:'24–30 stems', life:'6–9 days', size:'Large', delivery:'Next-day' },
        { name:'Ivory Dream',          cat:'Wedding',  emoji:'🌼', price:'$160', bg:'linear-gradient(145deg,#fde8d0,#fef5ec)', desc:'All-white calla lilies and hydrangea for the most elegant occasions. Custom sizing available.', stems:'Custom', life:'5–7 days', size:'Custom', delivery:'By arrangement' },
        { name:'Misty Lavender',       cat:'Bouquets', emoji:'🪷', price:'$98',  bg:'linear-gradient(145deg,#e8eaf5,#f0f2fd)', desc:'Lavender sprigs, dusty miller, and soft lilac roses in a rustic, romantic wrap.', stems:'16–20 stems', life:'7–10 days', size:'Medium', delivery:'Same-day' },
        { name:'Velvet Luxe Box',      cat:'Gift Sets',emoji:'🌹', price:'$195', bg:'linear-gradient(145deg,#f5e4e4,#fef0e8)', desc:'12 premium roses, artisan truffles, and a handwritten card in our signature gift box.', stems:'12 stems', life:'7–10 days', size:'Box', delivery:'Same-day' },
        { name:'Golden Hour',          cat:'Seasonal', emoji:'🌻', price:'$78',  bg:'linear-gradient(145deg,#fff5e0,#fffbf0)', desc:'Sunflowers and golden chrysanthemums — warm as late afternoon light.', stems:'14–18 stems', life:'8–12 days', size:'Medium', delivery:'Same-day' },
        { name:'Weekly Bloom Box',     cat:'Subscriptions',emoji:'🌸', price:'$65/wk', bg:'linear-gradient(145deg,#e4f0f5,#f0f8fd)', desc:'Fresh handpicked blooms every week — curated by season, always a surprise.', stems:'12–16 stems', life:'Fresh weekly', size:'Medium', delivery:'Weekly' },
        { name:'Bridal Arch Florals',  cat:'Wedding',  emoji:'💮', price:'from $240', bg:'linear-gradient(145deg,#f0e8f4,#fdf4fe)', desc:'A full floral arch using garden roses, peonies, and lush greenery. Custom to your venue.', stems:'Custom', life:'Event day', size:'Custom', delivery:'By arrangement' },
        { name:'Blush & Bloom Gift',   cat:'Gift Sets',emoji:'🎀', price:'$145', bg:'linear-gradient(145deg,#fde8e8,#fff2f2)', desc:'A blush rose bouquet with a scented candle and personalised ribbon — the perfect gesture.', stems:'14 stems', life:'7–10 days', size:'Medium + gift', delivery:'Same-day' },
        { name:'Wild Green Meadow',    cat:'Bouquets', emoji:'🌿', price:'$88',  bg:'linear-gradient(145deg,#e8f4e4,#f4faf2)', desc:'Lush ferns, eucalyptus, and white anemones in a natural wild meadow style.', stems:'20–28 stems', life:'8–12 days', size:'Large', delivery:'Same-day' },
        { name:'Luxury Monthly Edit',  cat:'Subscriptions',emoji:'🌺', price:'$110/mo', bg:'linear-gradient(145deg,#f8e8f4,#fef2fc)', desc:'One extraordinary large arrangement each month, chosen by our head florist.', stems:'25–35 stems', life:'Fresh monthly', size:'Large', delivery:'Monthly' },
    ];

    allCards.forEach((card, i) => {
        card.querySelector('.card-body').addEventListener('click', function(e) {
        if (e.target.classList.contains('add-btn')) return;
        openModal(i);
        });
        card.querySelector('.card-img').addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn')) return;
        openModal(i);
        });
    });

    function openModal(i) {
        const p = products[i];
        document.getElementById('modalInner').innerHTML = `
        <div class="modal-img" style="background:${p.bg}">${p.emoji}</div>
        <div class="modal-content" style="flex:1">
            <div class="modal-cat">${p.cat}</div>
            <h2>${p.name}</h2>
            <p>${p.desc}</p>
            <div class="modal-details">
            <div class="modal-detail"><strong>Stems</strong><span>${p.stems}</span></div>
            <div class="modal-detail"><strong>Vase Life</strong><span>${p.life}</span></div>
            <div class="modal-detail"><strong>Size</strong><span>${p.size}</span></div>
            <div class="modal-detail"><strong>Delivery</strong><span>${p.delivery}</span></div>
            </div>
            <div class="modal-price">${p.price}</div>
            <button class="modal-btn" onclick="this.textContent='✓ Added!';this.style.background='var(--deep-rose)';setTimeout(()=>{this.textContent='Add to Basket';this.style.background=''},1500)">Add to Basket</button>
        </div>`;
        document.getElementById('modalOverlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(e) {
        if (e.target === document.getElementById('modalOverlay')) closeModalBtn();
    }
    function closeModalBtn() {
        document.getElementById('modalOverlay').classList.remove('open');
        document.body.style.overflow = '';
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

    /* ── Pagination ── */
    document.querySelectorAll('.page-btn:not(.arrow)').forEach(btn => {
        btn.addEventListener('click', function() {
        document.querySelectorAll('.page-btn:not(.arrow)').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });