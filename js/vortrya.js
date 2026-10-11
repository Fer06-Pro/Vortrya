// VORTRYA v0.2 — comportamento compartilhado (sem duplicar eventos)
document.addEventListener("DOMContentLoaded", () => {
  const pages = [
    ["Início", "index.html", "Mapa principal"],
    ["Guia do Iniciante", "guia.html", "Primeiros passos"],
    ["Atributos", "atributos.html", "Superforça, dash, salto duplo"],
    ["Itens", "itens.html", "Armas e materiais"],
    ["Crafting", "crafting.html", "Receitas e forja"],
    ["Inimigos", "inimigos.html", "Criaturas e NPCs"],
    ["Regiões", "regioes.html", "Biomas e exploração"],
    ["Facções", "faccoes.html", "Grupos do mundo"],
    ["Missões", "missoes.html", "Missões diárias e únicas"],
    ["FAQ", "faq.html", "Perguntas frequentes"],
    ["Bosses", "bosses.html", "Chefes e combate"],
    ["História", "historia.html", "Lore"],
    ["Classes", "classes.html", "Progressão"],
    ["Equipamentos", "equipamentos.html", "Armaduras e armas"],
    ["Mapa", "mapa.html", "Mundo de Vortrya"],
    ["Raids", "raids.html", "Desafios em grupo"],
  ];
  // Barra de pesquisa. Em páginas antigas, injeta se houver navbar e não houver campo.
  const nav = document.querySelector(".nav-container");
  if (nav && !document.getElementById("navSearch")) {
    const wrap = document.createElement("div");
    wrap.className = "nav-search";
    wrap.setAttribute("role", "search");
    wrap.innerHTML =
      '<input id="navSearch" type="search" placeholder="Buscar na wiki..." aria-label="Buscar páginas do Vortrya" autocomplete="off"><div class="nav-search-results" id="navSearchResults" hidden></div>';
    nav.append(wrap);
  }
  const input = document.getElementById("navSearch"),
    results = document.getElementById("navSearchResults");
  const normalize = (value) =>
    value
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const renderSearch = () => {
    if (!input || !results) return;
    const term = normalize(input.value.trim());
    results.replaceChildren();
    if (!term) {
      results.hidden = true;
      return;
    }
    const matches = pages.filter(([name, , description]) =>
      normalize(name + " " + description).includes(term),
    );
    if (!matches.length) {
      const p = document.createElement("p");
      p.textContent = "Nenhuma página encontrada.";
      results.append(p);
    }
    matches.slice(0, 9).forEach(([name, url, description]) => {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = name;
      const small = document.createElement("small");
      small.textContent = description;
      a.append(small);
      results.append(a);
    });
    results.hidden = false;
  };
  input?.addEventListener("input", renderSearch);
  input?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      results.hidden = true;
      input.blur();
    }
    if (event.key === "Enter" && !results.hidden) {
      const first = results.querySelector("a");
      if (first) window.location.href = first.href;
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-search") && results) results.hidden = true;
  });
  // Realce do menu atual, apenas um mecanismo
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a[href]").forEach((a) => {
    if (a.getAttribute("href")?.split("/").pop() === current) {
      a.classList.add("active");
      a.closest("li")?.classList.add("active");
    }
  });
  // Âncoras: nunca executar querySelector('#')
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (event) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") {
        event.preventDefault();
        return;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }),
  );
  document
    .getElementById("voltar")
    ?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  // Bosses: um único listener por aba, com suporte a data-tab e aria-controls
  document.querySelectorAll(".boss-tabs button").forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.tab || button.getAttribute("aria-controls");
      const panel = id ? document.getElementById(id) : null;
      if (!panel) return;
      const group = button.closest(".boss-tabs");
      group?.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("active", b === button);
        b.setAttribute("aria-selected", String(b === button));
      });
      document.querySelectorAll(".tab-panel").forEach((p) => {
        p.classList.toggle("active", p === panel);
        p.hidden = p !== panel;
      });
    }),
  );
  // FAQ: categoria + texto aplicados em conjunto
  let faqCategory = "todos";
  const faqSearch = document.getElementById("faqSearch");
  const applyFAQ = () => {
    const q = normalize(faqSearch?.value.trim() || "");
    document.querySelectorAll(".faq-item").forEach((item) => {
      const category = item.dataset.category || "";
      const show =
        (faqCategory === "todos" || category === faqCategory) &&
        normalize(item.textContent).includes(q);
      item.hidden = !show;
      item.style.display = show ? "" : "none";
    });
  };
  document.querySelectorAll(".faq-category").forEach((button) =>
    button.addEventListener("click", () => {
      faqCategory = button.dataset.category || "todos";
      document
        .querySelectorAll(".faq-category")
        .forEach((b) => b.classList.toggle("active", b === button));
      applyFAQ();
    }),
  );
  faqSearch?.addEventListener("input", applyFAQ);
  document.querySelectorAll(".faq-question").forEach((button) =>
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const opening = !item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".faq-question")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      item.classList.toggle("active", opening);
      button.setAttribute("aria-expanded", String(opening));
    }),
  );
});
