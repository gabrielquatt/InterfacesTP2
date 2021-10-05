class Coin {
  constructor(x, y, color, radio, canvas, id) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = color;
    this.free = true;
    this.id = id;
    this.image = new Image();
  }

  draw() {
    if (!this.free) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";

    this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    this.setImgValue(this.color);

    
    //=========================================================================================================//
    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
    }
    this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
    //=========================================================================================================//

    this.ctx.fill();
    this.ctx.closePath();
  }

  getRadio(){
    return this.radio;
  }
  
  setImgValue(color) {
    this.image.src = "./img/" + color + ".png";
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
