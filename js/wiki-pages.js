document.addEventListener('DOMContentLoaded', () => {
  // Navbar: clique, hover com atraso e teclado usam o mesmo estado.
  const nav = document.querySelector('.navbar');
  const menuToggle = nav?.querySelector('.wiki-menu-toggle');
  const menu = nav?.querySelector('#navMenu');
  const small = window.matchMedia('(max-width: 1320px)');
  if (menuToggle && menu) {
    const drops = [...menu.querySelectorAll('.dropdown')];
    const timers = new Map();
    const setDrop = (item, open) => {
      item.classList.toggle('is-open', open);
      item.querySelector('.nav-drop-toggle')?.setAttribute('aria-expanded', String(open));
    };
    const closeDrops = () => drops.forEach(item => { clearTimeout(timers.get(item)); setDrop(item, false); });
    const closeMenu = () => { menu.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded','false'); closeDrops(); };
    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      if (!open) closeDrops();
    });
    drops.forEach(item => {
      const button = item.querySelector('.nav-drop-toggle');
      button?.addEventListener('click', () => {
        clearTimeout(timers.get(item));
        const open = !item.classList.contains('is-open'); closeDrops(); setDrop(item, open);
      });
      item.addEventListener('pointerenter', event => {
        if (small.matches || event.pointerType === 'touch') return;
        clearTimeout(timers.get(item));
        timers.set(item, setTimeout(() => { closeDrops(); setDrop(item,true); },120));
      });
      item.addEventListener('pointerleave', () => {
        if (small.matches) return;
        clearTimeout(timers.get(item)); timers.set(item,setTimeout(() => setDrop(item,false),180));
      });
      item.addEventListener('focusout', event => { if (!item.contains(event.relatedTarget)) setDrop(item,false); });
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', event => { if (!nav.contains(event.target)) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const item = drops.find(item => item.classList.contains('is-open'));
      if (item) { setDrop(item,false); item.querySelector('button')?.focus(); }
      else if (menu.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); }
    });
    if (small.addEventListener) small.addEventListener('change',closeMenu);
  }

  document.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
      const selected = button.dataset.filter;
      let visible = 0;
      document.querySelectorAll('.filterable').forEach(card => {
        const show = ['Todos','Todas'].includes(selected) || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible++;
      });
      const empty = document.querySelector('#filter-empty');
      if (empty) empty.hidden = visible > 0;
    });
  });
  const skills = [
    ['Superforça','Potência temporária sob pressão; a ativação e os limites ainda serão balanceados.'],
    ['Salto Duplo','Mobilidade vertical com um segundo impulso no ar.'],
    ['Dash Aprimorado','Movimento veloz com maior precisão e possível custo de energia.'],
    ['Reflexos Aguçados','Melhora de resposta a ataques telegrafados.'],
    ['Resistência','Aprimora a capacidade de suportar longos confrontos.'],
    ['Controle de Fôlego','Ajuda a administrar a energia em sequências de ações.']
  ];
  document.querySelectorAll('.skill-node').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.skill-node').forEach(b => b.setAttribute('aria-pressed','false'));
      button.setAttribute('aria-pressed','true');
      const [name, desc] = skills[Number(button.dataset.skill)];
      document.querySelector('#skill-detail').textContent = `${name}: ${desc} (Conceito provisório.)`;
    });
  });
  const recipes = {
    arco: [['Madeira flexível',3],['Fibras resistentes',2],['Corda simples',1]],
    lanca: [['Madeira rígida',2],['Minério bruto',2],['Tira de couro',1]],
    espada: [['Minério de ferro',4],['Madeira para cabo',1],['Tiras de couro',2]],
    foice: [['Minério de ferro',3],['Madeira',2],['Fibra reforçada',1]]
  };
  const recipeSelect = document.querySelector('#recipe');
  const materials = document.querySelector('#materials');
  const result = document.querySelector('#craft-result');
  function updateCraft() {
    if (!recipeSelect || !materials || !result) return;
    materials.replaceChildren();
    recipes[recipeSelect.value].forEach(([name, quantity], i) => {
      const label = document.createElement('label');
      label.className = 'material';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.dataset.index = String(i);
      input.addEventListener('change', checkMaterials);
      label.append(input, document.createTextNode(`${quantity}× ${name}`));
      materials.append(label);
    });
    checkMaterials();
  }
  function checkMaterials() {
    const missing = [...materials.querySelectorAll('label')].filter(label => !label.querySelector('input').checked).map(label => label.textContent.trim());
    result.textContent = missing.length ? `Materiais faltantes: ${missing.join(', ')}.` : 'Todos os materiais selecionados! Receita pronta para simulação (nenhum item foi criado).';
  }
  recipeSelect?.addEventListener('change', updateCraft);
  if (recipeSelect) updateCraft();
});
