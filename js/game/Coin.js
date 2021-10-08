class Coin {
  constructor(x, y, color, radio, canvas, id, pj1) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = color;
    this.pj = pj1;
    this.free = true;
    this.id = id;
    this.image = new Image();
    this.boolean = false;
  }

  draw() {
    if (!this.free) return;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";

    this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    //=========================================================================================================//
    // Comentario Explicativo de la solucion: ("Eliminar con Merge")
    //---------------------------------------------------------------------------------------------------------//
    // cada vez que se realizaba un cambio se volvia a setear la ruta de la imagen
    // la solucion fue crear una variable aux para determinar si la image habia sido editada
    // si no se habia editado se esperaba que la imagen se carge "onload"
    // luego cada vez que se dibuje ya no era necesario editar ni esperar que se carge su imagen.
    //=========================================================================================================//
    if (this.boolean == false) {
      this.setImgValue(this.color, this.pj);
      this.image.onload = () => {
        this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        this.boolean = true; //cambio boolean porque ya no seria necesario cambiar la imagen de la ficha
      }
    } else {
      this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
    }
    //=========================================================================================================//

    this.ctx.fill();
    this.ctx.closePath();
  }

  getRadio() {
    return this.radio;
  }

  setImgValue(color, pj) {
    this.image.src = "./img/" + pj + "/" + color + ".png";
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
