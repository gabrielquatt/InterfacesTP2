class DropArea extends Figure {
  constructor(x, y, image, length, canvas, id) {
    super(x, y, image, canvas, id);
    this.length = length;
  }

  getColumn(){
    return super.getId();
  }

  size(){
    return this.length;
  }

}
