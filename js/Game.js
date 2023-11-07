"use strict";
class Game {

    //Construyo el juego
    constructor(gamers, canvas) {
        this.gamers = gamers;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.radius = 30;
        this.quantityChips = 42;
        this.board;
        this.imgChip1;
        this.imgChip2;
        this.chips = [];
        this.loadChips();
        this.dragging;
        this.chipInMovement;
        this.turn = this.gamers['g1'];
        this.changedchipsG1 = false;
        this.changedchipsG2 = false;
        this.radiusChange = 4;
        this.radiusChanged = false;
        this.shiftTime = 30;
        this.timer = this.shiftTime;
        this.shiftControl = setInterval(() => {
                                if(this.timer < 0) {
                                    this.changeTurn();
                                    this.timer = this.shiftTime;
                                }
                                this.infoTimer("Tiempo restante: ", this.timer, this.turn);
                                this.draw();
                                this.timer--;
                            }, 1000);
    }
    
    //Funcion dibujar
    draw() {
        //borro canvas
        this.canvas.width = this.canvas.width;
        //dibujo el tablero
        this.drawBoard();
        this.drawChips();
        // debugger;
        this.drawTurn(this.turn); //turno
        this.infoTimer("Tiempo restante: ", this.timer, this.turn); //Temporizador
    }
    
    //Cargo el tablero con la imagen que le paso, no pudimos hacer imagenes para 5 en linea, ect, solo funciona 4 en linea
    loadBoard() {
        var img = new Image();
            img.src = './img/board2.png';
            img.onload = () => {
                //TOmamos el valor del formulario, anda solo para esta opcion, lo dejamos plateado para las otras opciones
                let opcion = document.getElementById('n_juego').value;
                if(opcion==4){
                    this.board = new Board(img, this.ctx, 7, 6);
                }
                else if(opcion==5){
                    this.board = new Board(img, this.ctx, 8, 7);
                }
                else if(opcion==6){
                    this.board = new Board(img, this.ctx, 9, 8);
                }
                else if(opcion==7){
                    this.board = new Board(img, this.ctx, 10, 9);
                }
                else{
                    this.board = new Board(img, this.ctx, 7, 6);
                }
                
                this.board.draw();
            }
    }

    //Dibujto el tablero
    drawBoard() {
        if(this.board) {
            this.board.draw();
        } else {
            this.loadBoard();
        }
    }

    //Cargo las fichas del juego
    loadChips() {
        if( !this.imgChip1 ) {
            //Creo una nueva imagen para agregarle la correspondiente a la seleccionada
            this.imgChip1 = new Image();
            //La imagen se compone el nombre del jugador 
            this.imgChip1.src = `./img/chips/${this.gamers.g1.name}.svg`;
            this.imgChip1.onload = () => {
                this.changedchipsG1 = true;
                this.loadChipsG1(this.imgChip1);
            }
        } else {
            this.changedchipsG1 = false;
            this.loadChipsG1(this.imgChip1);
        }

        if( !this.imgChip2 ) {
            this.imgChip2 = new Image();
            this.imgChip2.src = `./img/chips/${this.gamers.g2.name}.svg`;
            this.imgChip2.onload = () => {
                this.changedchipsG2 = true;
                this.loadChipsG2(this.imgChip2);
            }
        } else {
            this.changedchipsG2 = false;
            this.loadChipsG2(this.imgChip2);
        }
    }

    //Cargamos todas las fichas en una sola columna del lado que le corresponde al jugador
    loadChipsG1(img) {
        if(!this.changedchips) {
            this.y = 113;
            for(this.i = this.chips.length; this.i < this.quantityChips/2; this.i+=1) {
                //Dejamos una sola columna y para que se apilen le dejamos menos espacio entre fichas
                this.chips.push(new Chip(70, this.y, this.radius, this.gamers.g1.color, img, this.ctx));              
                this.y += 22;
            }
        }
        // fichas en mesa listas para jugar
        this.drawChips();
    }

    //Hacemos lo mismo para el otro jugador
    loadChipsG2(img) {
        if(!this.changedchips) {
            this.y = 113;
            for(this.i = this.chips.length; this.i < this.quantityChips; this.i+=1) {
                this.chips.push(new Chip(730, this.y, this.radius, this.gamers.g2.color, img, this.ctx));
                this.y += 22;
            }
        }
        this.drawChips();
    }
    

    //Dibujo las fichas
    drawChips() {
        if(this.board) {
            this.board.draw();
        } else {
            this.loadBoard();
        }
        this.chips.forEach(c => c.draw());
    }


    //Determino si se ha hecho clic en una ficha en una posición específica (x, y)
    // y si la ficha es del mismo color que el turno actual en un juego o aplicación.
    chipHit(x,y) {
        for(let i = 0; i < this.chips.length; i++) {
            if(this.chips[i].isHit(x,y) && this.chips[i].color == this.turn.color) { //si estoy clickeando alguna ficha y es del color del turno
                this.chipInMovement = this.chips[i];
                return true;
            }
        };
        return false;
    }
    
    //Esta función se utiliza para obtener la ficha que actualmente está en movimiento
    getChipInMovement() {
        return this.chipInMovement;
    }

    //Funcion para mover una ficha
    moveChip(x,y) {
        if(!this.chipInMovement) return;
        if(!this.radiusChanged){
            this.chipInMovement.setRadius(this.chipInMovement.getRadius() + this.radiusChange);
            this.radiusChanged = true;
        }
        this.chipInMovement.updateXY(x, y);
        this.draw();
    }

    //Funcion para decidir que pasa después  que suelto la ficha
    chipDropped() {
        if(this.radiusChanged) {
            this.chipInMovement.setRadius(this.chipInMovement.getRadius() - this.radiusChange);
            this.radiusChanged = false;
        }
        //chequeo si esta en una dropZone y si tiene lugar para posicionarse
        if(this.board.checkChip(this.chipInMovement)){
            //devuelve verdadero si encontro un lugar para la ficha
            //borrar ficha del conjunto en juego
            this.timer = this.shiftTime
            this.changeTurn();
            // console.log(this.turn);
            if(this.delete(this.chipInMovement)) {
                this.draw()
            }
        } else {
            this.chipInMovement.returnToStart();
            this.chipInMovement = null;
        }
        this.draw();
    }

    //Devuelve la ficha a la posicion original
    returnChipToStart() {
        if(this.chipInMovement){
            this.chipInMovement.returnToStart();
            this.draw();
        }
    }

    //Elimina la ficha
    delete(chip) {
        let i = this.chips.indexOf(chip);
        if(i !== -1) {
            this.chips.splice(i,1);
            return true;
        }
        return false;
    }

    //Cambia de turno de jugador
    changeTurn() {
        if(this.gamers['g1'] == this.turn)
            this.turn = this.gamers['g2']
        else
            this.turn = this.gamers['g1']
    }

    //Indica de que jugador es el turno
    drawTurn(gamer) {
        this.ctx.beginPath();
        this.ctx.fillStyle = gamer.color;
        this.ctx.font = "bold 18px Open Sans";
        this.ctx.textAlign='start';
        this.ctx.textBaseline = 'center';
        let text = `Juega ${gamer.name}`;
        if(gamer.color == this.gamers['g1'].color)
            this.ctx.fillText(text, 23, 40);
        else
            this.ctx.fillText(text, 680, 40);
        
        this.ctx.closePath();
    }

    //Muestra el tiempo en pantalla
    infoTimer(txt, timer, gamer) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "var(--negro)";
        this.ctx.font = "bold 28px Open Sans";
        this.ctx.textAlign='center';
        this.ctx.textBaseline = 'center';
        
        let text = `${txt} ${timer}`;
        this.ctx.fillText(text, 400, 580);
        
    }

    //Determino el ganador del juego
    getWinner() {
        let winnerColor = this.board.getWinner();
        if(winnerColor) {
            if(this.gamers['g1'].color == winnerColor)
                return this.gamers['g1'];
            else
                return this.gamers['g2'];
        }
        return null;
    }

    //Detengo el intervalo de tiempo
    gameComplete() {
       clearInterval(this.shiftControl);
    }

    //Reseteo el juego
    reset() {
        this.board = null;
        this.chips = [];
        this.loadChips();
        this.chipInMovement = null;
        this.turn = this.gamers['g1'];
        this.changedchipsG1 = false;
        this.changedchipsG2 = false;
        this.radiusChanged = false;
        this.timer = this.shiftTime;
        
        clearInterval(this.shiftControl);
        this.shiftControl = setInterval(() => {
                                if(this.timer < 0) {
                                    this.changeTurn();
                                    this.timer = this.shiftTime;
                                }
                                this.infoTimer("tiempo restante: ", this.timer, this.turn);
                                this.draw();
                                this.timer--;
                            }, 1000);

        this.draw();
    }

}
