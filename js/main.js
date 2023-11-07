document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    //evita que el formulario se envíe y realice la acción predeterminada
    formPreferencias.addEventListener("submit", (e) => { 
      e.preventDefault();
  });
  //Iniciamos el juego
  const iniciarJuego = () => {
    //Aparace el juego
    juego.style.display = "block";

    //Ocultamos el formulario de preferencias
    preferencias.style.display = "none";

    //Llamo al canvas y le doy las medidas
    let canvas = document.querySelector("#myCanvas");
    canvas.width = 800;
    canvas.height = 600;

   //Creo un objeto de jugadores, solo dos que toman el valor de preferencia del form
    let jugadores = {
      g1: {
        name: document.getElementById('j1').value,
        color: "red",
      },
      g2: {
        name: document.getElementById('j2').value,
        color: "green",
      }      
    };
    //console.log(jugadores);
    
    //Creo una intancia del juego
    let game = new Game(jugadores, canvas);
  
    //Popup mensaje de ganador
    let winnerWindow = document.querySelector(".popupJuego");
    let btnClose = document.querySelector(".close");
    let text = document.querySelector(".textoGanador");
    let btnJugar = document.querySelector(".jugar");
    let btnReset = document.querySelector(".reset");
    
    //Funcion de ganador, aparace el popup
    function showWinner(winner) {
      let txt = `${winner.name}: Felicitaciones Ganaste!!!`;
      text.innerHTML = txt;
      winnerWindow.classList.add("active");
      containerJuegos
    }
    
    //Funcion que llama a resetear juego
    const reset = () => {
      winnerWindow.classList.remove("active");
      game.reset();
      canvas.addEventListener("mousedown", mDown);
    };
    
    //Boton cerrar popup
    btnClose.addEventListener("click", () =>
      winnerWindow.classList.remove("active")
    );
    btnJugar.addEventListener("click", () => reset());
    btnReset.addEventListener("click", () => reset());
    
    //Dibujo el juego
    game.draw();
  
    //La función mOut y mUp es para manejar eventos relacionados con la interacción del mouse en un lienzo
    function mOut() {
      game.returnChipToStart();
      game.chipDropped();
      canvas.removeEventListener("mousemove", mMove);
      canvas.removeEventListener("mouseout", mOut);
      canvas.removeEventListener("mouseup", mUp);
    }
  
    function mUp() {
      game.chipDropped();
      let winner = game.getWinner();
      if (winner) {
        canvas.removeEventListener("mousedown", mDown);
        game.gameComplete();
        console.log("pop-up de", winner, "ganador");
        showWinner(winner);
      }
      canvas.removeEventListener("mousemove", mMove);
      canvas.removeEventListener("mouseout", mOut);
      canvas.removeEventListener("mouseup", mUp);
    }
  
    const mMove = (e) => {
      game.moveChip(e.offsetX, e.offsetY);
      canvas.addEventListener("mouseout", mOut);
      canvas.addEventListener("mouseup", mUp);
    };
  
    const mDown = (e) => {
      if (game.chipHit(e.offsetX, e.offsetY)) {
        canvas.addEventListener("mousemove", mMove);
        canvas.addEventListener("mouseup", mUp);
      }
    };
  
    canvas.addEventListener("mousedown", mDown);
  
    };
    
    //Inicializo el juego
    const botonElegir = document.getElementById("iniciar");
    botonElegir.addEventListener("click", iniciarJuego);
  
    /*---------------------------------------------------------------------------*/
  });
  