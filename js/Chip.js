class Chip {

    //Construyo las fichas
    constructor(x,y,radius,color,img,ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.size = this.radius * 2;
        this.color = color;
        this.img = img;
        this.ctx = ctx;
        this.draggable = true;
        this.startX = x;
        this.startY = y;
    }
    
    //Dibujo las fichas
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'var(--negro)';
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.drawImage(this.img, this.x-this.radius, this.y-this.radius, this.size, this.size);
        this.ctx.closePath();
    }

    //Metodos getters para coordenadas x e y
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    // Me estan clickeando?
    isHit(x, y) {
        return Math.sqrt((x - this.x)**2 + (y - this.y)**2 ) < this.radius;
    }

    //Función para cambiar la posicion
    updateXY(x,y) {
        this.x = x;
        this.y = y;
    }

    //Habilitar o deshabilitar el arrastrar
    setDraggable(isDraggable) {
        this.draggable = isDraggable;
    }

    //Es arrastrable?
    isDraggable() {
        return this.draggable;
    }

    //Reestablecer posicion
    returnToStart() {
        this.x = this.startX;
        this.y = this.startY;
    }

    //Getter para el radio
    getRadius() {
        return this.radius;
    }

    //Setter para el radio
    setRadius(r) {
        this.radius = r;
        this.size = this.radius * 2;
    }
}
