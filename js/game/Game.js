class Game {
  constructor() {
    this.winner = false;
    this.started = false;
    this.p1;
    this.p2;
    this.pj1;
    this.pj2;
    this.canvas = null;
    this.ctx = null;
    this.table = new Table();
  }

  isStarted() {
    return this.started;
  }

  /**
   *
   * @param { Player } p1 player 1
   * @param { Player } p2 player 2
   * @param { String } c1 color de ficha
   * @param { String } c2 color de ficha
   * @param { String } pj1 personaje 1
   * @param { String } pj2 personaje 2
   * @param { Number } size numero de fichas en linea necesarias para ganar
   */
  init(p1, p2, size, c1, c2, pj1, pj2) {
    this.started = true;
    let path1 = "./img/" + pj1 + "/" + c1 + ".png";
    let path2 = "./img/" + pj2 + "/" + c2 + ".png";
    let pathBox= "./img/table/white.png";
    let pathDrop = "./img/flecha.png";
    this.p1 = p1;
    this.p2 = p2;
    this.pj1 = pj1;
    this.pj2 = pj2;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    this.table.init(
      size,
      canvas,
      this.ctx,
      path1,
      path2,
      pathBox,
      pathDrop,p1,p2
    );
  }
}


