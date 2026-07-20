document.addEventListener('DOMContentLoaded', () => {
  // Prepara bloques de código para PrismJS
  document.querySelectorAll('pre.code-block').forEach(pre => {
    if (!pre.querySelector('code')) {
      const code = document.createElement('code');
      const lang = pre.getAttribute('data-lang') || 'python';
      code.className = `language-${lang}`;
      code.textContent = pre.textContent.trim();
      pre.textContent = '';
      pre.appendChild(code);
    }
  });

  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }

  const container = document.getElementById('topics-container');
  const searchInput = document.getElementById('search-input');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewCategoriesBtn = document.getElementById('view-categories-btn');

  let currentView = 'grid'; // 'grid' o 'categories'
  let currentFilteredData = [];

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function observeElements() {
    const elements = document.querySelectorAll('.reveal-element:not(.is-visible)');
    elements.forEach(el => observer.observe(el));
  }

  function renderGrid(temas) {
    if (!container) return;
    
    container.className = 'topics-grid';
    container.innerHTML = '';

    if (temas.length === 0) {
      container.innerHTML = `
        <div class="empty-state reveal-element">
          <p>No se encontraron entradas en el archivo.</p>
        </div>
      `;
      observeElements();
      return;
    }

    temas.forEach(tema => {
      const card = document.createElement('article');
      card.className = 'topic-card reveal-element';
      
      const slugPath = `temas/${tema.slug}/index.html`;

      card.innerHTML = `
        <div class="topic-card-meta">
          <span class="topic-badge">${tema.categoria}</span>
          <time datetime="${tema.fecha}">${formatDate(tema.fecha)}</time>
        </div>
        <h2 class="topic-card-title">
          <a href="${slugPath}">${tema.titulo}</a>
        </h2>
        <p class="topic-card-summary">${tema.resumen}</p>
      `;

      container.appendChild(card);
    });

    observeElements();
  }

  function renderCategories(temas) {
    if (!container) return;

    container.className = 'categories-list';
    container.innerHTML = '';

    if (temas.length === 0) {
      container.innerHTML = `
        <div class="empty-state reveal-element">
          <p>No se encontraron categorías o temas con ese filtro.</p>
        </div>
      `;
      observeElements();
      return;
    }

    // Agrupar temas por categoría
    const grouped = {};
    temas.forEach(tema => {
      if (!grouped[tema.categoria]) {
        grouped[tema.categoria] = [];
      }
      grouped[tema.categoria].push(tema);
    });

    // Generar acordeón por categoría
    Object.keys(grouped).sort().forEach(categoryName => {
      const categoryTemas = grouped[categoryName];
      const accordion = document.createElement('div');
      
      // Expandir automáticamente si hay un filtro de búsqueda activo
      const hasSearch = searchInput && searchInput.value.trim().length > 0;
      accordion.className = `category-accordion reveal-element ${hasSearch ? 'open' : ''}`;

      accordion.innerHTML = `
        <div class="category-header">
          <div class="category-title">
            <span>${categoryName}</span>
            <span class="category-header-count">${categoryTemas.length}</span>
          </div>
          <span class="category-toggle-icon">→</span>
        </div>
        <div class="category-content">
          <ul class="category-topic-list">
            ${categoryTemas.map(tema => `
              <li class="category-topic-item">
                <a href="temas/${tema.slug}/index.html" class="category-topic-link">
                  <div class="category-topic-link-header">
                    <span class="category-topic-title">${tema.titulo}</span>
                    <time class="category-topic-date" datetime="${tema.fecha}">${formatDate(tema.fecha)}</time>
                  </div>
                  <p class="category-topic-summary">${tema.resumen}</p>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;

      const header = accordion.querySelector('.category-header');
      header.addEventListener('click', () => {
        accordion.classList.toggle('open');
      });

      container.appendChild(accordion);
    });

    observeElements();
  }

  function renderCurrentView() {
    if (currentView === 'grid') {
      renderGrid(currentFilteredData);
    } else {
      renderCategories(currentFilteredData);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return dateString;
    }
  }

  function initSearch() {
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (!query) {
        currentFilteredData = [...window.temasData];
        renderCurrentView();
        return;
      }

      currentFilteredData = window.temasData.filter(tema => {
        return (tema.titulo && tema.titulo.toLowerCase().includes(query)) ||
               (tema.categoria && tema.categoria.toLowerCase().includes(query)) ||
               (tema.resumen && tema.resumen.toLowerCase().includes(query));
      });

      renderCurrentView();
    });
  }

  function initTabs() {
    if (!viewGridBtn || !viewCategoriesBtn) return;

    viewGridBtn.addEventListener('click', () => {
      if (currentView === 'grid') return;
      currentView = 'grid';
      viewGridBtn.classList.add('active');
      viewCategoriesBtn.classList.remove('active');
      renderCurrentView();
    });

    viewCategoriesBtn.addEventListener('click', () => {
      if (currentView === 'categories') return;
      currentView = 'categories';
      viewCategoriesBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      renderCurrentView();
    });
  }

  if (container) {
    if (typeof window.temasData !== 'undefined') {
      window.temasData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      currentFilteredData = [...window.temasData];
      renderCurrentView();
      initSearch();
      initTabs();
    } else {
      container.innerHTML = `
        <div class="empty-state reveal-element">
          <p>No se encontró la data de los temas.</p>
        </div>
      `;
      observeElements();
    }
  } else {
    observeElements();
  }
});
