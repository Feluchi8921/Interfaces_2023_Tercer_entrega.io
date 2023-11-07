"use strict";

//------- Mostrar Popup-------------
const boton = document.querySelector("#boton");

function mostrarPopup() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("ocultar");
  popup.classList.add("visible");

  const doc = document.querySelector(".doc");
  doc.classList.add("visible");
  doc.classList.add("ocultar");

  //Porcentajes de carga
  const porc1 = document.querySelector(".porc1");
  const porc2 = document.querySelector(".porc2");
  const porc3 = document.querySelector(".porc3");
  const porc4 = document.querySelector(".porc4");
  const porc5 = document.querySelector(".porc5");

  function mostrarPorc1() {
    porc1.style.display = "flex";
  }

  function ocultarPorc1() {
    porc1.style.display = "none";
  }

  //Los porcentajes arrancan ocultos
  setTimeout(ocultarPorc2, 0);
  setTimeout(ocultarPorc3, 0);
  setTimeout(ocultarPorc4, 0);
  setTimeout(ocultarPorc5, 0);

  //Temporizador para mostrar la imagen
  setTimeout(mostrarPorc1, 1599);
  //Temporizador para ocultar la imagen
  setTimeout(ocultarPorc1, 1600);

  function mostrarPorc2() {
    porc2.style.display = "flex";
  }
  function ocultarPorc2() {
    porc2.style.display = "none";
  }

  setTimeout(mostrarPorc2, 1600);
  setTimeout(ocultarPorc2, 2500);

  function mostrarPorc3() {
    porc3.style.display = "flex";
  }
  function ocultarPorc3() {
    porc3.style.display = "none";
  }

  setTimeout(mostrarPorc3, 2500);
  setTimeout(ocultarPorc3, 3500);

  function mostrarPorc4() {
    porc4.style.display = "flex";
  }
  function ocultarPorc4() {
    porc4.style.display = "none";
  }

  setTimeout(mostrarPorc4, 3500);
  setTimeout(ocultarPorc4, 4500);

  function mostrarPorc5() {
    porc5.style.display = "flex";
  }
  function ocultarPorc5() {
    porc5.style.display = "none";
  }

  setTimeout(mostrarPorc5, 4500);
  setTimeout(ocultarPorc5, 5000);

  setTimeout(() => {
    window.location.href = "home.html";
    clearInterval(giro);
  }, 5000);


}

boton.addEventListener("click", mostrarPopup);