class Coin extends Figure {
  constructor(x, y, image, radio, canvas, id) {
    super(x, y, image, radio, canvas, id);

    // define si la ficha esta libre para ser jugada
    this.free = true;
  }

  draw() {
    super.draw();
  }

  getRadio() {
    return this.radio;
  }

  setPosition(x, y) {
    if (!this.free) return;
    super.setPosition(x, y);
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
    if (!this.free) return false;
    return super.find(x, y);
  }
}
