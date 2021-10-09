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
    this.lastCoin;
    this.muoseDown = false;
  }

  /**
   *
   * @param {*} tam tamaño del tablero
   * @param {*} c1 color imagen ficha jugador 1
   * @param {*} c2 color imagen ficha jugador 2
   * @param {*} imgBox color imagen casillero
   * @param {*} imgDrop color imagen area de soltar ficha
   */
  init(tam, canvas, ctx, path1, path2, imgBox, imgDrop) {
    this.numToWin = parseInt(tam);
    let radio = 26;

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
      console.log(tam);
      this.COLS = 12;
      this.ROWS = 8;
    }
    
    this.numToWin = parseInt(tam);
    this.lastRow = null;
    this.lastCol = null;
    this.canvas = canvas;
    this.ctx = ctx;
    this.coins = [];


    this.loadTable(imgBox, imgDrop, radio);
    this.startCoins(tam, path1, path2, radio);

    this.canvas.addEventListener("mousedown", (e) => this.down(e));
    this.canvas.addEventListener("mouseup", () => this.up());
    this.canvas.addEventListener("mousemove", (e) => this.move(e));
    this.drawTable();
  }

  startCoins(n, path1, path2,radio) {
    let posX;
    let dispersionX;
 
    let dispersionY = radio * 2 * 10;

    if (n == 4) {
      n = 7 * 6;
      posX = 250;
      dispersionY = radio * 2 * 8;
      dispersionX = 150;
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

    let posY = 0;
    let pos_X = this.canvas.width - posX;

    for (let i = 0; i < n / 2; i++) {
      let d = Math.random() * dispersionX;
      d = Math.random() > 0.5 ? d : d * -1;
      posY = Math.random() * dispersionY + radio;
      this.coins.push(this.createCoin(posX + d, posY, path1, radio, 1));
      this.coins.push(this.createCoin(pos_X + d, posY, path2, radio, 2));
    }
  }

  createCoin(x, y, path, radio, id) {
    let image = new Image();
    image.src = path;
    let coin = new Coin(x, y, image, radio, this.canvas, id);
    return coin;
  }

  drawTable() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let prop = this.tab[0][0].getRadio() + 5;
    let y = prop;
    let width = prop * this.COLS;
    let x = this.canvas.width / 2 - width;

    this.tab.forEach((row) => {
      x = this.canvas.width / 2 - width;
      x += prop;
      row.forEach((coin) => {
        coin.setPosition(x, y);
        coin.draw();
        x = x + prop * 2;
      });
      y = y + prop * 2;
    });
    this.coins.forEach((c) => c.draw());
  }

  /**
   * inicializar matriz de tamaño rows * cols con valores en null.
   */
  loadTable(box, dropArea,radio) {
  
    this.tab = Array.from(Array(this.ROWS), () =>
      Array.from(
        Array(this.COLS),
        () => this.createCoin(0, 0, box, radio, this.canvas, 0) //new Coin(0, 0, box, radio, this.canvas, 0)
      )
    );

    this.tab.splice(
      0,
      0,
      Array.from(Array(this.COLS), () =>
        this.createCoin(0, 0, dropArea, radio, this.canvas, 0)
      )
    );
  }

  down(e) {
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

  up() {
    this.muoseDown = false;
    this.lastCoin = null;
  }

  move(e) {
    if (this.muoseDown === true && this.lastCoin) {
      this.lastCoin.setPosition(e.layerX, e.layerY);
      this.drawTable();
    }
  }

  findCoin(x, y) {
    for (let i = 0; i < this.coins.length; i++) {
      let elem = this.coins[i];
      if (elem.find(x, y)) return this.coins.splice(i, 1)[0];
    }
  }

  /**
   * @returns true si existe una casilla vacia
   */
  hasEmptyCell() {
    for (let i = 0; i < this.COLS; i++) {
      if (this.t[0][i] === null) return true;
    }
    return false;
  }

  /**
   * @param { Number } col es la columna donde se solto una ficha
   * @returns si la columna es valida para jugar la ficha
   */
  validColumn(col) {
    return col > -1 && col < this.COLS && this.t[0][col] === null;
  }

  insertCoin(coin, col) {
    if (!this.isValidColumn(col)) return;

    let r = this.ROWS - 1;
    while (this.table[r][col] != null) {
      r--;
    }
    this.table[r][col] = coin;
    this.lastRow = r;
    this.lastCol = col;

    return true;
  }

  isWinner() {
    return this.horizontal() || this.vertical() || this.diagonales();
  }

  horizontal() {
    let cont = 1;
    let c = this.lastCol;
    let x = this.t[this.lastRow][c];
    while (c > 0 && this.t[this.lastRow][c - 1] == x) {
      cont++;
      c--;
    }
    c = this.lastCol;
    while (c < this.COLS - 1 && this.t[this.lastRow][c + 1] == x) {
      cont++;
      c++;
    }
    return cont >= this.numToWin;
  }

  vertical() {
    let cont = 1;
    let r = this.lastRow;
    let x = this.t[r][this.lastCol];
    while (r > 0 && this.t[r - 1][this.lastCol] == x) {
      cont++;
      r--;
    }
    r = this.lastRow;
    while (r < this.ROWS - 1 && this.t[r + 1][this.lastCol] == x) {
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
    let x = this.t[r][c];
    while (c > 0 && r < this.ROWS - 1 && this.t[r + 1][c - 1] == x) {
      cont++;
      c--;
      r++;
    }
    c = this.lastCol;
    r = this.lastRow;
    while (c < this.COLS - 1 && r > 0 && this.t[r - 1][c + 1] == x) {
      cont++;
      c++;
      r--;
    }
    return cont >= this.numToWin;
  }

  diagonalDown() {
    let cont = 1;
    let c = this.lastCol;
    let r = this.lastRow;
    let x = this.t[r][c];
    while (c > 0 && r > 0 && this.t[r - 1][c - 1] == x) {
      cont++;
      c--;
      r--;
    }
    c = this.lastCol;
    r = this.lastRow;
    while (
      c < this.COLS - 1 &&
      r < this.ROWS - 1 &&
      this.t[r + 1][c + 1] == x
    ) {
      cont++;
      c++;
      r++;
    }
    return cont >= this.numToWin;
  }
}
