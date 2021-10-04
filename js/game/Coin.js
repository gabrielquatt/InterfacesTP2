class Coin {
  constructor(x, y, color, radio, canvas, id) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = color;
    this.free = true;
  }

  draw() {
    if (!this.free) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param { x , y } : posicion final de la ficha
   * luego de colocarla en el tablero ya no se puede mover
   */
  play(x, y) {
    this.setPosition(x, y);
    this.draw();
    this.free = false;
  }

  find(x, y) {
    return (
      Math.pow(this.radio, 2) >
      Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
    );
  }
}
