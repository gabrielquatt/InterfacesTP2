class Figure {
  constructor(x, y, image, canvas, id) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.image = image;
    this.loaded = false;
    this.id = id;
  }

  draw() {
    this.loaded ? this.putImage() : (this.image.onload = () => this.putImage());
  }

  /**
   * dibuja la imagen de la ficha
   */
  putImage() {
    this.ctx.drawImage(
      this.image,
      this.x - this.size(),
      this.y - this.size(),
      this.size() * 2,
      this.size() * 2
    );
    this.loaded = true;
  }

  /**
   * edita la posicion de la figura
   * @param {*} x posicion en eje x 
   * @param {*} y posicion en eje y
   */
  setPosition(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }

  /**
   * @returns retorna el id de la figura 
   */
  getId() {
    return this.id;
  }
  
  find(x, y) {
    return (
      Math.pow(this.size(), 2) >
      Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
    );
  }
}
