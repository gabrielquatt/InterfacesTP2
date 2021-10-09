class Coin {
  constructor(x, y, image, radio, canvas, id) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.free = true;
    this.id = id;
    this.image = image;
    this.boolean = false; 
  }

  draw() {
    if (!this.free) return;
    if(this.boolean == false){
      this.image.onload = () => {
        this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        this.boolean = true; 
      }
    } else {
      this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
    }
  }

  getRadio() {
    return this.radio;
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
