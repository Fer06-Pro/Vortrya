document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.wiki-menu-toggle');
  const menu = document.querySelector('#navMenu');
  menuToggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-drop-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const li = button.closest('.dropdown');
      const open = li.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
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
