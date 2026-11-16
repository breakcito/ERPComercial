/* IntelliApps · ERP COMERCIAL — interacciones de la landing */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---------- Navegación ---------- */
  const nav = $('#nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', scrollY > 24);

  /* ---------- Revelado ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
  );
  $$('[data-reveal]').forEach((el) => revealObserver.observe(el));

  /* ---------- Manifiesto: palabras que se encienden con el scroll ---------- */
  const manifesto = $('#manifesto');
  const words = manifesto.textContent.trim().split(/\s+/);
  manifesto.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
  const wordEls = $$('.w', manifesto);
  const updateManifesto = () => {
    const r = manifesto.getBoundingClientRect();
    const progress = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3));
    const lit = Math.round(progress * wordEls.length);
    wordEls.forEach((el, i) => el.classList.toggle('on', i < lit));
  };

  /* ---------- Contadores ---------- */
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countObserver.unobserve(e.target);
        const end = +e.target.dataset.count;
        if (reduceMotion || end < 2) return;
        const t0 = performance.now();
        const tick = (t) => {
          const p = clamp((t - t0) / 1500);
          e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  $$('[data-count]').forEach((el) => countObserver.observe(el));

  /* ---------- Hero: parallax ---------- */
  const heroBg = $('[data-parallax]');
  const updateHeroParallax = () => {
    if (scrollY > innerHeight * 1.2) return;
    heroBg.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
  };

  /* ---------- El ciclo ---------- */
  const cicloGrid = $('#ciclo-grid');
  if (cicloGrid) {
    cicloGrid.innerHTML = CICLO.map(
      (c) => `
      <li>
        <span class="n">${c.n}</span>
        <span class="fase">${c.fase}</span>
        <b>${c.titulo}</b>
        <p>${c.desc}</p>
      </li>`,
    ).join('');
  }

  /* ---------- Catálogo de videos ---------- */
  const rail = $('#rail');
  const filters = $('#filters');
  const thumbSrc = (p) => `thumbnails/${p.file}.jpg`;

  rail.innerHTML = VIDEOS.map(
    (p, i) => `
    <button class="pcard ${p.cat === 'general' ? 'pcard-hero' : ''}" data-i="${i}" data-cat="${p.cat}" aria-label="Ver video: ${p.titulo}">
      <img src="${thumbSrc(p)}" alt="" loading="lazy">
      <span class="pcard-info">
        <span><small>${p.n} · ${ETAPAS[p.cat].toUpperCase()}</small><b>${p.titulo}</b></span>
        <span class="pcard-play"><svg><use href="#i-play"/></svg></span>
      </span>
    </button>`,
  ).join('');

  const counts = VIDEOS.reduce((acc, p) => ({ ...acc, [p.cat]: (acc[p.cat] || 0) + 1 }), {});
  const filterDefs = [
    ['all', 'Todos', VIDEOS.length],
    ...Object.entries(ETAPAS).map(([k, v]) => [k, v, counts[k] || 0]),
  ];
  filters.innerHTML = filterDefs
    .map(
      ([k, label, n]) =>
        `<button class="filter" data-filter="${k}" aria-pressed="${k === 'all'}">${label}<small>${n}</small></button>`,
    )
    .join('');

  const prev = $('#rail-prev');
  const next = $('#rail-next');
  const updateArrows = () => {
    prev.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
  };
  const applyFilter = (cat) => {
    $$('.filter', filters).forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === cat));
    $$('.pcard', rail).forEach((c) => {
      c.hidden = !(cat === 'all' || c.dataset.cat === cat);
    });
    rail.scrollTo({ left: 0 });
    updateArrows();
  };
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('.filter');
    if (b) applyFilter(b.dataset.filter);
  });
  const step = () => $('.pcard:not([hidden])', rail).offsetWidth * 2 + 40;
  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  rail.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  /* ---------- Modal de video ---------- */
  const modal = $('#vmodal');
  const vm = { video: $('#vm-video'), title: $('#vm-title'), desc: $('#vm-desc'), tag: $('#vm-tag') };
  const openVideo = ({ src, titulo, desc, tag }) => {
    vm.title.textContent = titulo;
    vm.desc.textContent = desc;
    vm.tag.textContent = tag;
    vm.video.src = src;
    modal.showModal();
    vm.video.play().catch(() => {});
  };
  const closeVideo = () => {
    vm.video.pause();
    vm.video.removeAttribute('src');
    vm.video.load();
    modal.close();
  };
  rail.addEventListener('click', (e) => {
    const card = e.target.closest('.pcard');
    if (!card) return;
    const p = VIDEOS[+card.dataset.i];
    openVideo({
      src: `videos/${p.cat === 'general' ? '' : 'procesos/'}${p.file}.mp4`,
      titulo: `${p.n} · ${p.titulo}`,
      desc: p.desc,
      tag: ETAPAS[p.cat],
    });
  });
  $$('[data-open-hero]').forEach((el) => {
    el.addEventListener('click', () => openVideo({ ...VIDEO_PRINCIPAL, tag: 'Video principal' }));
    if (el.getAttribute('role') === 'button') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    }
  });
  $('#vm-close').addEventListener('click', closeVideo);
  $('#vm-cta').addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeVideo();
  });

  /* ---------- Formulario → WhatsApp ---------- */
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => $(id).value.trim();
    const msg = `Hola IntelliApps, mi nombre es ${val('#f-name')} de la empresa ${val('#f-empresa')} (Tel: ${val('#f-phone')}). Quisiera coordinar una demostración sobre: ${val('#f-interes')}.`;
    window.open(`https://wa.me/51912800115?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  /* ---------- Bucle de scroll ---------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScrollNav();
      updateManifesto();
      if (!reduceMotion) updateHeroParallax();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
})();
