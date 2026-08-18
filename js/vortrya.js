// ===============================
// ANIMAÇÃO DOS CARDS AO APARECER
// ===============================

// // ===============================
// // BOTÃO VOLTAR AO TOPO
// // ===============================

// const voltar = document.getElementById("voltar");

// if (voltar) {

//     voltar.onclick = () => {

//         window.scrollTo({

//             top: 0,
//             behavior: "smooth"

//         });

//     };

// }

// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navMenu
    .querySelectorAll(".dropdown-menu a, .nav-menu > li > a:not(.dropdown > a)")
    .forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
}

// ===============================
// SCROLL SUAVE PARA ÂNCORAS
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

document.querySelectorAll(".dropdown > a").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      this.parentElement.classList.toggle("active");
    }
  });
});

const tabs = document.querySelectorAll(".boss-tabs button");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // Remove a aba ativa
    tabs.forEach((item) => {
      item.classList.remove("active");
    });

    // Ativa a aba clicada
    tab.classList.add("active");

    // Esconde todos os conteúdos
    panels.forEach((panel) => {
      panel.classList.remove("active");
    });

    // Mostra o conteúdo correspondente
    document.getElementById(target).classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".boss-tabs button");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // Remove o active de todos os botões
      tabs.forEach((button) => {
        button.classList.remove("active");
      });

      // Remove o active de todos os conteúdos
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      // Ativa o botão clicado
      tab.classList.add("active");

      // Ativa o conteúdo correspondente
      const targetPanel = document.getElementById(target);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  const menuItems = document.querySelectorAll(".nav-menu > li");

  menuItems.forEach((item) => {
    const links = item.querySelectorAll("a");

    links.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const linkPage = href.split("/").pop().toLowerCase();

      if (linkPage === currentPage) {
        // Ativa o próprio link
        link.classList.add("active");

        // Se estiver dentro de dropdown,
        // ativa também o menu principal
        const dropdown = link.closest(".dropdown");

        if (dropdown) {
          const parentLink = dropdown.querySelector(":scope > a");

          if (parentLink) {
            parentLink.classList.add("active");
          }
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  const links = document.querySelectorAll(".nav-menu a");

  links.forEach((link) => {
    const href = link.getAttribute("href")?.split("/").pop().toLowerCase();

    if (!href || href === "#") return;

    if (href === currentPage) {
      const li = link.closest("li");

      if (li) {
        li.classList.add("active");

        const parentDropdown = li.closest(".dropdown");

        if (parentDropdown) {
          parentDropdown.classList.add("active");
        }
      }
    }
  });
});

// ===============================
// FAQ — VORTRYA
// ===============================

// ABRIR / FECHAR PERGUNTAS

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");

    const isOpen = item.classList.contains("active");

    // Fecha todas as outras perguntas

    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    // Abre a selecionada

    if (!isOpen) {
      item.classList.add("active");
    }
  });
});

// ===============================
// FILTRO POR CATEGORIA
// ===============================

const faqCategories = document.querySelectorAll(".faq-category");

const faqItems = document.querySelectorAll(".faq-item");

faqCategories.forEach((category) => {
  category.addEventListener("click", () => {
    const selectedCategory = category.dataset.category;

    // Atualiza botão ativo

    faqCategories.forEach((button) => {
      button.classList.remove("active");
    });

    category.classList.add("active");

    // Mostra / esconde perguntas

    faqItems.forEach((item) => {
      const itemCategory = item.dataset.category;

      if (selectedCategory === "todos" || itemCategory === selectedCategory) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ===============================
// BUSCA DO FAQ
// ===============================

const faqSearch = document.getElementById("faqSearch");

if (faqSearch) {
  faqSearch.addEventListener("input", () => {
    const search = faqSearch.value.toLowerCase().trim();

    faqItems.forEach((item) => {
      const text = item.textContent.toLowerCase();

      if (text.includes(search)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}
