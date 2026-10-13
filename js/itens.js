// VORTRYA — cadastro único + componentes de Itens / Equipamentos / Crafting.
// Nome e materiais de cada item alimentam o card e o simulador.
(() => {
  'use strict';

  const materials = {
    madeiraFlexivel: 'madeira flexível',
    fibrasResistentes: 'fibras resistentes',
    cordaSimples: 'corda simples',
    madeiraFina: 'madeira fina',
    pedraLascada: 'pedra lascada',
    madeiraRigida: 'madeira rígida',
    minerioBruto: 'minério bruto',
    tiraCouro: 'tira de couro',
    minerioFerro: 'minério de ferro',
    madeiraCabo: 'madeira para cabo',
    tirasCouro: 'tiras de couro',
    madeira: 'madeira',
    fibraReforcada: 'fibra reforçada',
  };

  const items = [
    // ===== CARD / RECEITA: ARCO DE FREIXO =====
    { id: 'arco', name: 'Arco de Freixo', section: 'itens',
      recipe: [['madeiraFlexivel', 3], ['fibrasResistentes', 2], ['cordaSimples', 1]],
      ammunition: { name: 'Flechas', recipe: [['madeiraFina', 1], ['pedraLascada', 1]] } },

    // ===== CARD / RECEITA: LANÇA DE VIGIA =====
    { id: 'lanca', name: 'Lança de Vigia', section: 'itens',
      recipe: [['madeiraRigida', 2], ['minerioBruto', 2], ['tiraCouro', 1]] },

    // ===== CARD / RECEITA: ESPADA DE FERRO CRU =====
    { id: 'espada', name: 'Espada de Ferro Cru', section: 'itens',
      recipe: [['minerioFerro', 4], ['madeiraCabo', 1], ['tirasCouro', 2]] },

    // ===== CARD / RECEITA: FOICE DA COLHEITA =====
    { id: 'foice', name: 'Foice da Colheita', section: 'itens',
      recipe: [['minerioFerro', 3], ['madeira', 2], ['fibraReforcada', 1]] },

    // ===== CARD: LÂMINA DO ÉTER =====
    { id: 'lamina-eter', name: 'Lâmina do Éter', section: 'equipamentos',
      description: 'Espada lendária construída a partir de Fragmentos Cristalizados, conhecida por sua elevada capacidade ofensiva e precisão.' },

    // ===== CARD: ARMADURA CRYSTALLIS =====
    { id: 'armadura-crystallis', name: 'Armadura Crystallis', section: 'equipamentos',
      description: 'Equipamento defensivo produzido utilizando cristais elementais, oferecendo grande resistência e adaptação contra diferentes tipos de dano.' },

    // ===== CARD: MANOPLA TITÂNICA =====
    { id: 'manopla-titanica', name: 'Manopla Titânica', section: 'equipamentos',
      description: 'Artefato de combate pesado desenvolvido para suportar confrontos prolongados contra criaturas colossais.' },
  ];

  function init() {
    const root = document.querySelector('.catalog-page');
    if (!root) return;
    const sections = ['itens', 'equipamentos', 'crafting'];
    const tabs = [...root.querySelectorAll('.catalog-tabs a')];
    const panels = sections.map(id => document.getElementById(id));
    const tablist = root.querySelector('.catalog-tabs');
    tablist.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', sections[index]);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
    });

    const materialName = id => materials[id] || id;
    const costs = recipe => recipe.map(([id, amount]) => `${amount}× ${materialName(id)}`).join(' · ');
    const recipes = items.filter(item => item.recipe?.length);
    const select = document.getElementById('catalog-recipe');
    const materialList = document.getElementById('catalog-materials');
    const result = document.getElementById('catalog-craft-result');
    // Separate checklists per recipe, retained while switching tabs/recipes.
    const checked = new Map();

    function checkMaterials() {
      const missing = [...materialList.querySelectorAll('input')]
        .filter(input => !input.checked)
        .map(input => input.parentElement.textContent.trim());
      result.textContent = missing.length
        ? `Materiais faltantes: ${missing.join(', ')}.`
        : 'Todos os materiais selecionados! Receita pronta para simulação (nenhum item foi criado).';
    }

    function updateCraft() {
      const item = recipes.find(item => item.id === select.value);
      materialList.replaceChildren();
      if (!item) { result.textContent = 'Nenhuma receita disponível.'; return; }
      if (!checked.has(item.id)) checked.set(item.id, new Set());
      const selection = checked.get(item.id);
      item.recipe.forEach(([id, quantity], index) => {
        const label = document.createElement('label');
        label.className = 'catalog-material';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selection.has(index);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) selection.add(index); else selection.delete(index);
          checkMaterials();
        });
        label.append(checkbox, document.createTextNode(`${quantity}× ${materialName(id)}`));
        materialList.append(label);
      });
      checkMaterials();
    }

    function activate(section, updateHash = false) {
      const selected = sections.includes(section) ? section : 'itens';
      tabs.forEach((tab, index) => {
        const active = sections[index] === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[index].hidden = !active;
      });
      if (updateHash && location.hash !== '#' + selected) {
        history.pushState(null, '', '#' + selected);
      }
      // Parent list items stay unmarked to avoid selecting all three links.
      document.querySelectorAll('.nav-menu a[href]').forEach(link => {
        const url = new URL(link.getAttribute('href'), location.href);
        if (url.pathname === location.pathname) {
          const current = (url.hash.slice(1) || 'itens') === selected;
          link.classList.toggle('active', current);
          link.closest('li')?.classList.toggle('active', current);
        }
      });
    }

    items.forEach(item => {
      const grid = document.getElementById(item.section === 'equipamentos' ? 'catalog-equipment' : 'catalog-items');
      const card = document.createElement('article');
      card.className = 'wiki-card';
      card.id = 'item-' + item.id;
      const h3 = document.createElement('h3');
      h3.className = 'catalog-card-title';
      h3.textContent = item.name;
      card.append(h3);
      if (item.description) {
        const p = document.createElement('p'); p.textContent = item.description; card.append(p);
      }
      if (item.recipe) {
        const p = document.createElement('p'); p.className = 'catalog-card-cost';
        p.textContent = costs(item.recipe) + '.';
        card.append(p);
        if (item.ammunition) {
          const ammo = document.createElement('p');
          ammo.textContent = `${item.ammunition.name}: ${costs(item.ammunition.recipe)}.`;
          card.append(ammo);
        }
        const link = document.createElement('a');
        link.href = '#crafting'; link.className = 'wiki-link catalog-card-action';
        link.textContent = 'Simular receita →';
        link.dataset.recipeId = item.id;
        card.append(link);
      }
      grid.append(card);
    });
    recipes.forEach(item => {
      const option = document.createElement('option'); option.value = item.id; option.textContent = item.name; select.append(option);
    });
    select.addEventListener('change', updateCraft);
    updateCraft();

    // Capture reveals hidden panels before shared smooth-scroll handlers run.
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.getAttribute('href'), location.href);
      const section = url.hash.slice(1);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !sections.includes(section)) return;
      if (link.dataset.recipeId) { select.value = link.dataset.recipeId; updateCraft(); }
      activate(section, true);
      event.preventDefault();
      if (tablist.contains(link)) link.focus();
      else panels[sections.indexOf(section)].scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    }, true);

    tablist.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); activate(sections[next], true); tabs[next].focus();
    });
    const restoreTab = () => activate(location.hash.slice(1));
    window.addEventListener('hashchange', restoreTab);
    window.addEventListener('popstate', restoreTab);
    restoreTab();

    // Existing shared search still lists the old pages; remap its results here.
    const remapSearch = () => {
      document.querySelectorAll('#navSearchResults a[href]').forEach(link => {
        const url = new URL(link.getAttribute('href'), location.href);
        const file = url.pathname.split('/').pop();
        if (file === 'equipamentos.html') link.setAttribute('href', 'itens.html#equipamentos');
        if (file === 'crafting.html') link.setAttribute('href', 'itens.html#crafting');
      });
    };
    document.getElementById('navSearch')?.addEventListener('input', remapSearch);
    remapSearch();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
