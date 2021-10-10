class Coin extends Figure {
  constructor(x, y, image, radio, canvas, id, id_player) {
    super(x, y, image, canvas, id);
    this.radio = radio;
    this.id_player = id_player;
    // define si la ficha esta libre para ser jugada
    this.free = true;
  }

  size() {
    return this.radio;
  }

  getIdPlayer(){
    return this.id_player;
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

  
}
