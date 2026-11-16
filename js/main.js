/* IntelliApps · ERP COMERCIAL — interacciones de la landing */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Nav ---------- */
  const nav = $('#nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', scrollY > 20);

  /* ---------- Pilares de negocio ---------- */
  const pillarsEl = $('#pillars');
  if (pillarsEl) {
    pillarsEl.innerHTML = PILARES.map(
      (p, i) => `
      <article class="pillar" data-reveal style="--d:${(i * 0.06).toFixed(2)}s">
        <div>
          <span class="pillar-num">${p.n}</span>
          <h3>${p.titulo}</h3>
          <p>${p.desc}</p>
        </div>
        <a href="#videos" class="pillar-link" data-goto-filter="${p.filterCat || p.cat}">
          ${p.cta} <svg><use href="#i-arrow"/></svg>
        </a>
      </article>`,
    ).join('');
  }

  /* ---------- Revelado al hacer scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
  );
  $$('[data-reveal]').forEach((el) => revealObserver.observe(el));

  /* ---------- Catalogo de videos ---------- */
  const rail = $('#rail');
  const filters = $('#filters');

  rail.innerHTML = VIDEOS.map(
    (p, i) => `
    <button class="pcard ${p.cat === 'general' ? 'pcard-hero' : ''}" type="button" data-i="${i}" data-cat="${p.cat}" aria-label="Ver video: ${p.titulo}">
      <img src="thumbnails/${p.file}.jpg" alt="" loading="lazy">
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
        `<button class="filter" type="button" data-filter="${k}" aria-pressed="${k === 'all'}">${label}<small>${n}</small></button>`,
    )
    .join('');

  const prev = $('#rail-prev');
  const next = $('#rail-next');
  const updateArrows = () => {
    if (!prev || !next) return;
    prev.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
  };
  const applyFilter = (cat) => {
    $$('.filter', filters).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
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

  $$('[data-goto-filter]').forEach((a) => {
    a.addEventListener('click', () => applyFilter(a.dataset.gotoFilter));
  });

  const step = () => {
    const card = $('.pcard:not([hidden])', rail);
    return card ? card.offsetWidth * 2 + 28 : 380;
  };
  prev?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
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

  const resetVideo = () => {
    vm.video.pause();
    vm.video.removeAttribute('src');
    vm.video.load();
  };

  const closeVideo = () => modal.close();
  modal.addEventListener('close', resetVideo);

  // Fallback de light-dismiss para navegadores sin soporte de <dialog closedby="any">
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      modal.close();
    });
  }

  rail.addEventListener('click', (e) => {
    const card = e.target.closest('.pcard');
    if (!card) return;
    const p = VIDEOS[+card.dataset.i];
    if (!p) return;
    openVideo({
      src: `videos/${p.cat === 'general' ? '' : 'procesos/'}${p.file}.mp4`,
      titulo: `${p.n} · ${p.titulo}`,
      desc: p.desc,
      tag: ETAPAS[p.cat],
    });
  });

  $$('[data-open-hero]').forEach((el) => {
    el.addEventListener('click', () => openVideo({ ...VIDEO_PRINCIPAL, tag: 'Recorrido completo' }));
  });

  $('#vm-close').addEventListener('click', closeVideo);
  $('#vm-cta').addEventListener('click', closeVideo);

  /* ---------- Formulario -> WhatsApp ---------- */
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => $(id)?.value.trim() || '';
    const msg = `Hola IntelliApps, mi nombre es ${val('#f-name')} de la empresa ${val('#f-empresa')} (Tel: ${val('#f-phone')}). Quisiera ver una demostración de: ${val('#f-interes')}.`;
    window.open(`https://wa.me/51912800115?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  /* ---------- Scroll ---------- */
  addEventListener('scroll', onScrollNav, { passive: true });
  addEventListener('resize', onScrollNav);
  onScrollNav();
})();
