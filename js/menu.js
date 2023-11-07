"use strict";

//Me aseguro que cargó la página

window.addEventListener("DOMContentLoaded", () => {
  
  //------------Scroll hacia arriba----------------------------
  const scrollTopButton = document.querySelector(".scroll-top");
  scrollTopButton.classList.add("ocultar");

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
    scrollTopButton.classList.add("scrolling");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      //Aparece a los px
      scrollTopButton.classList.remove("ocultar");
    } else {
      scrollTopButton.classList.add("ocultar");
    }
  });

  //----------------Agrandar boton------------------------------

  const agrandar = document.querySelector(".agrandar");
  agrandar.addEventListener("click", () => {
    agrandar.style.transform = "scale(1.2)";

    setTimeout(() => {
      // Muestra el botón
      agrandar.style.opacity = 1;
      agrandar.style.transform = "scale(1)";
    }, 1000);
  });

  // ------------Desplazar botones horizontal--------------------

  const horizontal = document.querySelector(".horizontal");

  let x = 0;

  const traslHoriz = setInterval(() => {
    horizontal.style.transform = `translateX(${x}px)`;
    x = x === 0 ? 4 : 0;
  }, 600);

  const mostrar = document.querySelector(".btn-menu");

  //------------Menu responsive-----------------------------------

  mostrar.addEventListener("click", aparecer);
  function aparecer() {
    const desplegable = document.querySelector(".desplegable");
    desplegable.classList.add("mostrar");
  }


//------- Mostrar Popup-------------
// const boton = document.querySelector("#boton");

// function mostrarPopup() {
//   const popup = document.querySelector(".popup");
//   popup.classList.remove("ocultar");
//   popup.classList.add("visible");

//   const doc = document.querySelector(".doc");
//   doc.classList.add("visible");
//   doc.classList.add("ocultar");

//   //Porcentajes de carga
//   const porc1 = document.querySelector(".porc1");
//   const porc2 = document.querySelector(".porc2");
//   const porc3 = document.querySelector(".porc3");
//   const porc4 = document.querySelector(".porc4");
//   const porc5 = document.querySelector(".porc5");

//   function mostrarPorc1() {
//     porc1.style.display = "flex";
//   }

//   function ocultarPorc1() {
//     porc1.style.display = "none";
//   }

//   //Los porcentajes arrancan ocultos
//   setTimeout(ocultarPorc2, 0);
//   setTimeout(ocultarPorc3, 0);
//   setTimeout(ocultarPorc4, 0);
//   setTimeout(ocultarPorc5, 0);

//   //Temporizador para mostrar la imagen
//   setTimeout(mostrarPorc1, 1599);
//   //Temporizador para ocultar la imagen
//   setTimeout(ocultarPorc1, 1600);

//   function mostrarPorc2() {
//     porc2.style.display = "flex";
//   }
//   function ocultarPorc2() {
//     porc2.style.display = "none";
//   }

//   setTimeout(mostrarPorc2, 1600);
//   setTimeout(ocultarPorc2, 2500);

//   function mostrarPorc3() {
//     porc3.style.display = "flex";
//   }
//   function ocultarPorc3() {
//     porc3.style.display = "none";
//   }

//   setTimeout(mostrarPorc3, 2500);
//   setTimeout(ocultarPorc3, 3500);

//   function mostrarPorc4() {
//     porc4.style.display = "flex";
//   }
//   function ocultarPorc4() {
//     porc4.style.display = "none";
//   }

//   setTimeout(mostrarPorc4, 3500);
//   setTimeout(ocultarPorc4, 4500);

//   function mostrarPorc5() {
//     porc5.style.display = "flex";
//   }
//   function ocultarPorc5() {
//     porc5.style.display = "none";
//   }

//   setTimeout(mostrarPorc5, 4500);
//   setTimeout(ocultarPorc5, 5000);

//   setTimeout(() => {
//     window.location.href = "home.html";
//     clearInterval(giro);
//   }, 5000);
// }

boton.addEventListener("click", mostrarPopup);
});

// Selecciona todos los botones "desplegar"
const desplegarButtons = document.querySelectorAll(".desplegar");

// Agrega un evento de clic a cada botón "desplegar"
desplegarButtons.forEach((button) => {
  button.addEventListener("click", toggleMenu);
});

function toggleMenu(event) {
  // Encuentra el elemento hermano .footerDesplegable del botón clickeado
  const footerDesplegable = event.target.nextElementSibling;

  // Alterna la clase "show" en el elemento .footerDesplegable
  footerDesplegable.classList.toggle("show");
}
