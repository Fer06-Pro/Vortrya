// ===============================
// ANIMAÇÃO DOS CARDS AO APARECER
// ===============================

const elementos = document.querySelectorAll(
    ".card, .Crystallis, .Umbravore, .Voltarex, .TitanusPrime"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
        }

    });

}, {

    threshold: 0.15

});

elementos.forEach(el => observer.observe(el));


// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================

const voltar = document.getElementById("voltar");

if (voltar) {

    voltar.onclick = () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    };

}


// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

    navMenu.querySelectorAll(".dropdown-menu a, .nav-menu > li > a:not(.dropdown > a)").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


// ===============================
// SCROLL SUAVE PARA ÂNCORAS
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

});

document.querySelectorAll(".dropdown > a").forEach(item => {

    item.addEventListener("click", function (e) {

        if (window.innerWidth <= 768) {

            e.preventDefault();

            this.parentElement.classList.toggle("active");

        }

    });

});