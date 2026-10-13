// VORTRYA — interações compartilhadas de cinco páginas, sem seletores dos JS antigos.
(() => {
  'use strict';
  function init() {
    const root = document.querySelector('.systems-page');
    if (!root || root.dataset.spReady) return;
    root.dataset.spReady = 'true';
    const normalize = value => value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // GAMEPLAY / ECONOMIA — abas com teclado, links diretos e histórico.
    const tablist = root.querySelector('[data-sp-tabs]');
    if (tablist) {
      const tabs = [...tablist.querySelectorAll('[data-sp-tab]')];
      tablist.setAttribute('role', 'tablist');
      const select = (id, push = false) => {
        const chosen = tabs.find(tab => tab.dataset.spTab === id) || tabs[0];
        tabs.forEach(tab => {
          const active = tab === chosen;
          tab.setAttribute('role', 'tab');
          tab.setAttribute('aria-selected', String(active));
          tab.setAttribute('aria-controls', tab.dataset.spTab);
          tab.tabIndex = active ? 0 : -1;
          const panel = document.getElementById(tab.dataset.spTab);
          if (panel) { panel.hidden = !active; panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tab.id); }
        });
        if (push && location.hash !== '#' + chosen.dataset.spTab) history.pushState(null, '', '#' + chosen.dataset.spTab);
      };
      tabs.forEach(tab => tab.addEventListener('click', () => select(tab.dataset.spTab, true)));
      tablist.addEventListener('keydown', event => {
        const i = tabs.indexOf(event.target); if (i < 0) return;
        const next = {ArrowRight:(i+1)%tabs.length, ArrowLeft:(i+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1}[event.key];
        if (next === undefined) return;
        event.preventDefault(); select(tabs[next].dataset.spTab, true); tabs[next].focus();
      });
      const restore = () => select(location.hash.slice(1));
      window.addEventListener('hashchange', restore); window.addEventListener('popstate', restore); restore();
    }

    // CLASSES — filtro e pesquisa combinados, sem perder acentos na exibição.
    const search = root.querySelector('#sp-class-search');
    if (search) {
      let category = 'all';
      const cards = [...root.querySelectorAll('[data-sp-class]')];
      const buttons = [...root.querySelectorAll('[data-sp-class-filter]')];
      const apply = () => {
        const term = normalize(search.value.trim()); let visible = 0;
        cards.forEach(card => { const show = (category === 'all' || card.dataset.spClass === category) && normalize(card.textContent).includes(term); card.hidden = !show; if (show) visible++; });
        root.querySelector('#sp-class-empty').hidden = visible > 0;
        root.querySelector('#sp-class-status').textContent = `${visible} ${visible === 1 ? 'classe encontrada' : 'classes encontradas'}.`;
      };
      search.addEventListener('input', apply);
      buttons.forEach(button => button.addEventListener('click', () => {
        category = button.dataset.spClassFilter;
        buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button))); apply();
      })); apply();
    }

    // RAIDS — progresso de leitura, sem simular inventário ou progresso de jogo.
    const checks = [...root.querySelectorAll('[data-sp-ready]')];
    if (checks.length) {
      const apply = () => {
        const count = checks.filter(input => input.checked).length;
        root.querySelector('#sp-ready-bar').style.width = `${count / checks.length * 100}%`;
        root.querySelector('#sp-ready-status').textContent = `${count} de ${checks.length} pontos revisados.`;
      };
      checks.forEach(input => input.addEventListener('change', apply));
      root.querySelector('#sp-ready-reset').addEventListener('click', () => { checks.forEach(input => { input.checked = false; }); apply(); }); apply();
    }

    // ECONOMIA — descrições baseadas nos recursos citados no conteúdo.
    const resources = {
      moedas: 'Moedas são recursos conquistados durante missões, Bosses, Raids e eventos especiais.',
      fragmentos: 'Fragmentos Cristalizados fazem parte dos recursos conquistados durante missões, Bosses, Raids e eventos especiais.',
      outros: 'Outros recursos também são conquistados durante missões, Bosses, Raids e eventos especiais. Materiais raros podem ser transformados em armas e armaduras na forja.'
    };
    const resourceButtons = [...root.querySelectorAll('[data-sp-resource]')];
    resourceButtons.forEach(button => button.addEventListener('click', () => {
      resourceButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      root.querySelector('#sp-resource-detail p').textContent = resources[button.dataset.spResource];
    }));

    // RANKINGS — seleção sem inventar requisitos ou recompensas.
    const ranks = [...root.querySelectorAll('[data-sp-rank]')];
    ranks.forEach(button => button.addEventListener('click', () => {
      ranks.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      root.querySelector('#sp-rank-name').textContent = button.dataset.spRank;
      root.querySelector('#sp-rank-description').textContent = button.dataset.spRankDescription;
    }));

    // Corrige a busca nestas páginas usando o vortrya.js enviado, sem duplicar sua busca.
    const remapSearch = () => {
      const replacements = { 'historia.html':'index.html#historia', 'crafting.html':'itens.html#crafting', 'equipamentos.html':'itens.html#equipamentos' };
      document.querySelectorAll('#navSearchResults a[href]').forEach(link => {
        const file = new URL(link.getAttribute('href'), location.href).pathname.split('/').pop();
        if (replacements[file]) link.setAttribute('href', replacements[file]);
      });
    };
    document.getElementById('navSearch')?.addEventListener('input', remapSearch);
    remapSearch();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
