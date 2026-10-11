(() => {
  "use strict";
  const bosses = window.VORTRYA_BOSSES || {};
  const escape = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  const content = document.getElementById("boss-content");
  if (content) {
    const id = new URLSearchParams(location.search).get("id") || "voltarex";
    const boss = Object.hasOwn(bosses, id) ? bosses[id] : null;
    const sidebar = document.querySelector(".boss-sidebar");
    if (sidebar) {
      const all = sidebar.querySelector(".boss-all");
      Object.entries(bosses).forEach(([key, item]) => {
        const a = document.createElement("a");
        a.className = "boss-nav-item" + (id === key ? " active" : "");
        a.href = "boss.html?id=" + encodeURIComponent(key);
        if (id === key) a.setAttribute("aria-current", "page");
        a.innerHTML = `<img src="${escape(item.image)}" alt=""><div><strong>${escape(item.name)}</strong><small>${escape(item.title)}</small></div>`;
        sidebar.insertBefore(a, all);
      });
    }
    if (!boss) {
      document.title = "Boss não encontrado | Vortrya";
      content.innerHTML =
        '<section class="boss-panel"><h1>Boss não encontrado</h1><p>Escolha um boss no menu lateral.</p><a class="boss-button" href="bosses.html">Ver todos os bosses</a></section>';
    } else {
      document.title = `${boss.name} | Vortrya`;
      const tags = boss.tags || [
        ...new Set([
          ...(boss.classification ? [boss.classification.toUpperCase()] : []),
          ...boss.categories.map(
            (category) =>
              ({ epico: "ÉPICO", raid: "RAID", endgame: "ENDGAME" })[
                category
              ] || category,
          ),
        ]),
      ];
      const stats = [
        ["TIPO", boss.type || boss.title],
        ["DIFICULDADE", boss.difficulty || "A definir"],
        ["FASES", boss.phases || "A definir"],
        ["ELEMENTO", boss.element],
      ];
      const pending =
        '<section class="boss-panel" id="lore" style="margin-top:14px"><span class="panel-label">INFORMAÇÕES DO BOSS</span><p>Os detalhes de mecânicas, ataques e fases ainda não foram adicionados.</p></section><section class="boss-panel" id="recompensas" style="margin-top:14px"><span class="panel-label">RECOMPENSAS</span><p>Recompensas ainda não cadastradas.</p></section>';
      const mechanics = boss.mechanic
        ? `<section class="boss-info-grid" id="lore"><div class="boss-panel"><span class="panel-label">MECÂNICA PRINCIPAL</span><p>${escape(boss.mechanic)}</p></div><div class="boss-panel"><span class="panel-label purple-text">VULNERABILIDADES</span><p>${escape(boss.vulnerability)}</p></div></section><section class="boss-phases"><div class="section-title">FASES DA BATALHA — ${escape(boss.phases)}</div><p class="boss-phase-summary">${escape(boss.phaseSummary)}</p>${boss.phaseDetails ? `<div class="phases-grid">${boss.phaseDetails.map((description, index) => `<div class="phase"><img src="${escape(boss.image)}" alt="${escape(boss.name)} — fase ${index + 1}"><div><span>FASE ${index + 1}</span><p>${escape(description)}</p></div></div>`).join("")}</div>` : ""}</section><section class="boss-bottom-grid" id="recompensas"><div class="boss-panel rewards"><div class="section-title">RECOMPENSAS PRINCIPAIS</div><p>Recompensas ainda não cadastradas.</p></div></section>`
        : pending;
      content.innerHTML = `<section class="boss-hero"><img class="boss-hero-image" src="${escape(boss.image)}" alt="${escape(boss.name)}"><div class="boss-hero-overlay"></div><div class="boss-hero-content"><span class="boss-breadcrumb">BOSSES › ${escape(boss.name)}</span><h1>${escape(boss.name.toUpperCase())}</h1><h2>${escape(boss.title.toUpperCase())}</h2><p>${escape(boss.description)}</p><div class="boss-tags">${tags.map((tag) => `<span class="tag gold">${escape(tag)}</span>`).join("")}</div><div class="boss-actions"><a class="boss-button primary" href="#lore">VER LORE</a><a class="boss-button" href="#recompensas">VER RECOMPENSAS</a></div></div></section><section class="boss-stats">${stats.map(([label, value]) => `<div class="boss-stat"><div><span>${label}</span><strong>${escape(value)}</strong></div></div>`).join("")}</section>${boss.details || mechanics}`;
      document
        .querySelectorAll('.nav-menu a[href="bosses.html"]')
        .forEach((a) => {
          a.classList.add("active");
          a.closest("li")?.classList.add("active");
        });
    }
  }
  const filters = document.querySelector(".bosses-filters");
  if (filters) {
    const cards = [...document.querySelectorAll(".bosses-grid .boss-card")];
    const apply = (button) => {
      const selected = button.dataset.filter || "all";
      filters.querySelectorAll(".filter-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      cards.forEach((card) => {
        card.hidden =
          selected !== "all" &&
          !(card.dataset.category || "").split(/\s+/).includes(selected);
      });
    };
    filters.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (button && filters.contains(button)) apply(button);
    });
    const initial =
      filters.querySelector(".filter-btn.active") ||
      filters.querySelector(".filter-btn");
    if (initial) apply(initial);
  }
})();
