class Figure {
  constructor(x, y, image, radio, canvas, id) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.radio = radio;
    this.id = id;
    this.image = image;
    this.loaded = false;
  }

  draw() {
    if (!this.loaded) {
      this.image.onload = () => {
        this.ctx.drawImage(
          this.image,
          this.x - this.radio,
          this.y - this.radio,
          this.radio * 2,
          this.radio * 2
        );
        this.loaded = true;
      };
    } else {
      this.ctx.drawImage(
        this.image,
        this.x - this.radio,
        this.y - this.radio,
        this.radio * 2,
        this.radio * 2
      );
    }
  }

  setPosition(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }

  getRadio() {
    return this.radio;
  }

  find(x, y) {
    return (
      Math.pow(this.radio, 2) >
      Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
    );
  }
}
