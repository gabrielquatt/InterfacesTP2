class Table {
  constructor() {
    this.COLS = 7;
    this.ROWS = 6;
    this.tab;
    this.numToWin = 0;
    this.lastRow = 0;
    this.lastCol = 0;
    this.canvas = null;
    this.ctx = null;
    this.coin = null;
    this.coins = [];
    this.countCoins = 0;
    this.lastCoin = null;
    this.muoseDown = false;
    this.playerTurn = null;
    this.p1;
    this.p2;
    this.winner = false;
    this.background = new Image();
    this.background.src = "./img/fondos/fondo2.png";
    this.background.onload = () => {
      this.backLoaded = true;
    };
    this.backLoaded = false;
  }

  /**
   *
   * @param {*} tam tamaño del tablero
   * @param {*} c1 color imagen ficha jugador 1
   * @param {*} c2 color imagen ficha jugador 2
   * @param {*} imgBox color imagen casillero
   * @param {*} imgDrop color imagen area de soltar ficha
   */
  init(tam, canvas, ctx, path1, path2, imgBox, imgDrop, p1, p2) {
    this.numToWin = parseInt(tam);
    let radio = 27.5;

    if (tam == 4) {
      this.COLS = 7;
      this.ROWS = 6;
    }
    if (tam == 5) {
      radio = 20.5;
      this.COLS = 10;
      this.ROWS = 8;
    }
    if (tam == 6) {
      radio = 20;
      this.COLS = 12;
      this.ROWS = 8;
    }
    if (tam == 7) {
      radio = 16;
      this.COLS = 14;
      this.ROWS = 10;
    }

    this.numToWin = parseInt(tam);
    this.lastRow = null;
    this.lastCol = null;
    this.canvas = canvas;
    this.ctx = ctx;
    this.coins = [];
    this.p1 = p1;
    this.p2 = p2;
    this.playerTurn = p2;
    this.loadTable(imgBox, imgDrop, radio);
    this.startCoins(tam, path1, path2, radio);
    this.canvas.addEventListener("mousedown", (e) => this.down(e));
    this.canvas.addEventListener("mouseup", (e) => this.up(e));
    this.canvas.addEventListener("mousemove", (e) => this.move(e));
    this.changePlayerTurn();
    this.drawTable();
  }

  startCoins(n, path1, path2, radio) {
    let posX;
    let dispersionX;

    let dispersionY = radio * 2 * 10;

    if (n == 4) {
      n = 7 * 6;
      posX = 240;
      dispersionY = radio * 2 * 6;
      dispersionX = 140;
    }
    if (n == 5) {
      n = 9 * 8;
      posX = 210;
      dispersionX = 130;
    }
    if (n == 6) {
      n = 9 * 12;
      posX = 200;
      dispersionX = 120;
    }
    if (n == 7) {
      n = 10 * 14;
      posX = 200;
      dispersionX = 80;
    }

    let posY = 0;
    let pos_X = this.canvas.width - posX;

    for (let i = 1; i <= n / 2; i++) {
      let d = Math.random() * dispersionX;
      d = Math.random() > 0.5 ? d : d * -1;
      posY = Math.random() * dispersionY + radio;
      let x = parseInt(posX + d);
      let _x = parseInt(pos_X + d);
      let y = parseInt(posY);
      this.coins.push(this.createCoin(x, y, path1, radio, i, 1));
      this.coins.push(this.createCoin(_x, y, path2, radio, -i, 2));
    }
  }

  createCoin(x, y, path, radio, id, id_player) {
    let image = new Image();
    image.src = path;
    let coin = new Coin(x, y, image, radio, this.canvas, id, id_player);
    return coin;
  }

  createDropArea(x, y, path, radio, id) {
    let image = new Image();
    image.src = path;
    let dropArea = new DropArea(x, y, image, radio, this.canvas, id);
    return dropArea;
  }

  drawTable() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let prop = this.tab[0][0].size() + 5;
    let y = prop;
    let width = prop * this.COLS;
    let x = this.canvas.width / 2 - width;
    this.drawBackground(prop, x, width * 2);
    this.tab.forEach((row) => {
      x = this.canvas.width / 2 - width;
      x += prop;
      row.forEach((figure) => {
        figure.setPosition(x, y);
        figure.draw();
        x = x + prop * 2;
      });
      y = y + prop * 2;
    });
    this.coins.forEach((c) => c.draw());
  }

  drawBackground(p, x, w) {
    console.log(p, x, w);
    if (this.backLoaded) {
      this.ctx.drawImage(this.background, x, 0, w, p * 2 * this.COLS);
    } else {
      this.background.onload = () => {
        this.ctx.drawImage(this.background, x, 0, w, p * 2 * this.COLS);
        this.backLoaded = true;
      };
    }
  }

  /**
   * inicializar matriz de tamaño rows * cols con valores en null.
   */
  loadTable(box, dropArea, radio) {
    this.tab = Array.from(Array(this.ROWS), () =>
      Array.from(Array(this.COLS), () =>
        this.createCoin(0, 0, box, radio, 0, null)
      )
    );
    let i = 0;
    this.tab.splice(
      0,
      0,
      Array.from(Array(this.COLS), () =>
        this.createDropArea(0, 0, dropArea, radio, i++)
      )
    );
  }

  down(e) {
    if (this.winner) return;
    this.muoseDown = true;
    if (!this.lastCoin) {
      let coin = this.findCoin(e.layerX, e.layerY);
      if (coin) {
        this.lastCoin = coin;
        this.coins.push(this.lastCoin);
      } else {
        this.lastCoin = null;
      }
    }
  }

  up(e) {
    if (this.winner) return;
    this.muoseDown = false;
    if (this.lastCoin) {
      if (this.lastCoin.getIdPlayer() == this.playerTurn.getId()) {
        let column = this.findColumn(e.layerX, e.layerY);
        if (column) {
          this.play(column.getColumn());
        }
      }
    }
    this.lastCoin = null;
  }

  move(e) {
    if (this.winner) return;
    if (this.muoseDown && this.lastCoin) {
      if (this.lastCoin.getIdPlayer() == this.playerTurn.getId()) {
        this.lastCoin.setPosition(e.layerX, e.layerY);
        this.drawTable();
      }
    }
  }

  findCoin(x, y) {
    for (let i = 0; i < this.coins.length; i++) {
      let elem = this.coins[i];
      if (elem.find(x, y)) return this.coins.splice(i, 1)[0];
    }
  }

  findColumn(x, y) {
    for (let i = 0; i < this.COLS; i++) {
      let elem = this.tab[0][i];
      if (elem.find(x, y)) return elem;
    }
  }

  play(col) {
    let ok = this.insertCoin(col);

    if (!ok) return;

    this.drawTable();

    if (this.isWinner()) {
      this.winner = true;
      stop();
      this.alertWinner(this.playerTurn.getName(), true);
      //TODO cambiar de color fichas ganadoras.
    } else if (!this.hasEmptyCell()) {
      stop();
      this.alertWinner("",false)
    } else {
      this.changePlayerTurn("",false);
    }
  }

  /**
   * @returns true si existe una casilla vacia
   */
  hasEmptyCell() {
    for (let i = 1; i < this.COLS; i++) {
      if (this.tab[1][i].getId() == 0){
        return true;
      }  
    }
    return false;
  }

  /**
   * @param { Number } col es la columna donde se solto una ficha
   * @returns si la columna es valida para jugar la ficha
   */
  validateColumn(col) {
    return col > -1 && col < this.COLS && this.tab[1][col].getId() == 0;
  }

  insertCoin(col) {
    if (!this.validateColumn(col)) return;
    let r = this.ROWS;
    while (this.tab[r][col].getId() != 0) {
      r--;
    }
    this.tab[r][col] = this.lastCoin;
    this.lastRow = r;
    this.lastCol = col;
    return true;
  }

  isWinner() {
    return this.horizontal() || this.vertical() || this.diagonales();
  }

  horizontal(ok) {
    let cont = 1;
    let c = this.lastCol;
    let x = this.playerTurn.getId();
    while (c > 0 && this.tab[this.lastRow][c - 1].getIdPlayer() == x) {
      cont++;
      c--;
    }
    c = this.lastCol;
    while (
      c < this.COLS - 1 &&
      this.tab[this.lastRow][c + 1].getIdPlayer() == x
    ) {
      cont++;
      c++;
    }
    return cont >= this.numToWin;
  }

  vertical() {
    let cont = 1;
    let r = this.lastRow;
    let x = this.playerTurn.getId();
    if (r > 1) {
      while (this.tab[r - 1][this.lastCol].getIdPlayer() == x && r > 1) {
        cont++;
        r--;
      }
    }
    r = this.lastRow;
    while (r < this.ROWS && this.tab[r + 1][this.lastCol].getIdPlayer() == x) {
      cont++;
      r++;
    }
    return cont >= this.numToWin;
  }

  diagonales() {
    return this.diagonalUp() || this.diagonalDown();
  }

  diagonalUp() {
    let cont = 1;
    let c = this.lastCol;
    let r = this.lastRow;
    let x = this.playerTurn.getId();
    while (
      c > 0 &&
      r < this.ROWS &&
      this.tab[r + 1][c - 1].getIdPlayer() == x
    ) {
      cont++;
      c--;
      r++;
    }
    c = this.lastCol;
    r = this.lastRow;
    if (r > 1) {
      while (
        c < this.COLS - 1 &&
        r > 1 &&
        this.tab[r - 1][c + 1].getIdPlayer() == x
      ) {
        cont++;
        c++;
        r--;
      }
    }
    return cont >= this.numToWin;
  }

  diagonalDown() {
    let cont = 1;
    let c = this.lastCol;
    let r = this.lastRow;
    let x = this.playerTurn.getId();
    if (r > 1) {
      while (c > 0 && r > 1 && this.tab[r - 1][c - 1].getIdPlayer() == x) {
        cont++;
        c--;
        r--;
      }
    }
    c = this.lastCol;
    r = this.lastRow;
    while (
      c < this.COLS - 1 &&
      r < this.ROWS &&
      this.tab[r + 1][c + 1].getIdPlayer() == x
    ) {
      cont++;
      c++;
      r++;
    }
    return cont >= this.numToWin;
  }

  //========================== Alerts y cambios de texto en pagina ==========================//

  alertWinner(name, boolean) {
    let icon;
    let msj;
    if (boolean) {
      icon = "success";
      msj = "¡EL Ganador Es: " + name + "!";
    } else {
      icon = "warning";
      msj = "¡No Hubo Ganadores!";
    }

    Swal.fire({
      title: msj,
      text: "¿desean jugar de nuevo?",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Revancha!",
      cancelButtonText: "No ",
    }).then((result) => {
      if (result.isConfirmed) {
        load_page(url_game);
      } else {
        load_page(url_menu);
      }
    });
  }

  changePlayerTurn() {
    this.playerTurn = this.playerTurn.equals(this.p1) ? this.p2 : this.p1;
    document.getElementById("turn_player").innerHTML =
      this.playerTurn.getName();
  }


}
