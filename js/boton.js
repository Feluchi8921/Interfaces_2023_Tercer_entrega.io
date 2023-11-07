//Obtengo todos los elementos con la clase "miBoton"
var botones = document.querySelectorAll(".miBoton");

//Registro un controlador de eventos para cada botón
botones.forEach(function(boton) {
  boton.addEventListener("click", function() {
    //Obtengo la imagen dentro del botón actual
    var imagen = this.querySelector("img");

    //Obtengo la ruta actual de la imagen
    var imagenActual = imagen.src;

    //Obtiene la ruta de la otra imagen
    var imagenAlternativa = (imagenActual.includes("img/carritoMas.svg")) ? "img/carritocomprado.svg" : "img/carritoMas.svg";

    // Cambio la imagen modificando el atributo src
    imagen.src = imagenAlternativa;
  });
});

//Obtengo todos los elementos con la clase "miBoton"
var botones = document.querySelectorAll(".miBotonCard");

//Registro un controlador de eventos para cada botón
botones.forEach(function(boton) {
  boton.addEventListener("click", function() {
    //Obtengo la imagen dentro del botón actual
    var imagen = this.querySelector("img");

    //Obtengo la ruta actual de la imagen
    var imagenActual = imagen.src;

    //Obtengo la ruta de la otra imagen
    var imagenAlternativa = (imagenActual.includes("img/carritoMas.svg")) ? "img/carritocomprado.svg" : "img/carritoMas.svg";

    //Cambio la imagen modificando el atributo src
    imagen.src = imagenAlternativa;
  });
});