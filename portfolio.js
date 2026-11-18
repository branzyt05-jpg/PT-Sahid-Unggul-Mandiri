/* ===== PT SUM | PORTFOLIO INTERACTIONS ===== */
(() => {
  const root = document.querySelector('.sum-portfolio');
  if (!root) return;

  const filters = [...root.querySelectorAll('.sum-filter')];
  const cards = [...root.querySelectorAll('.sum-project-card')];

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  const galleryMap = {
    'jmtc': ['project-01.webp','project-02.webp','project-03.webp','project-04.webp','project-05.webp','project-06.webp','project-07.webp','project-08.webp','project-09.webp','project-10.webp','project-11.webp'],
    'gedung-a': ['project-12.webp','project-13.webp','project-14.webp','project-15.webp','project-16.webp','project-17.webp'],
    'dakotamo': ['project-18.webp','project-19.webp','project-20.webp','project-21.webp','project-22.webp','project-23.webp','project-24.webp','project-25.webp','project-26.webp']
  };
  const captions = {
    'jmtc': 'Dokumentasi visual area JMTC',
    'gedung-a': 'Dokumentasi visual Gedung A Kantor',
    'dakotamo': 'Dokumentasi visual Kantor JMTM Area Dakotamo'
  };
  const box = document.getElementById('sumLightbox');
  if (!box) return;
  const image = box.querySelector('img');
  const caption = box.querySelector('figcaption');
  let activeGallery = [], index = 0, opener = null;

  function show() {
    image.src = 'portfolio-assets/' + activeGallery[index];
    caption.textContent = captions[Object.keys(galleryMap).find(key => galleryMap[key] === activeGallery)] || 'Dokumentasi proyek';
  }
  function open(button) {
    opener = button;
    activeGallery = galleryMap[button.dataset.gallery] || [button.dataset.image.split('/').pop()];
    index = Math.max(0, activeGallery.indexOf(button.dataset.image.split('/').pop()));
    show();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    box.querySelector('.sum-lightbox__close').focus();
  }
  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  root.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => open(button)));
  box.querySelector('.sum-lightbox__close').addEventListener('click', close);
  box.querySelector('.sum-lightbox__prev').addEventListener('click', () => { index = (index - 1 + activeGallery.length) % activeGallery.length; show(); });
  box.querySelector('.sum-lightbox__next').addEventListener('click', () => { index = (index + 1) % activeGallery.length; show(); });
  box.addEventListener('click', event => { if (event.target === box) close(); });
  document.addEventListener('keydown', event => {
    if (!box.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') { index = (index - 1 + activeGallery.length) % activeGallery.length; show(); }
    if (event.key === 'ArrowRight') { index = (index + 1) % activeGallery.length; show(); }
  });
})();
