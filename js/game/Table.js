class Table {
  constructor() {
    this.COLS = 7;
    this.ROWS = 6;
    this.tab;
    this.numToWin = 4;
    this.lastRow = 0;
    this.lastCol = 0;
    this.canvas = null;
    this.ctx = null;
    this.coin = null;
  }

  /**
   *
   * @param {*} tam tamaño del tablero
   */
  init(tam, canvas, ctx) {
    this.ROWS = parseInt(tam);

    if (tam == 7) this.COLS = 9;

    if (tam == 8) this.COLS = 11;

    this.lastRow = null;
    this.lastCol = null;
    this.canvas = canvas;
    this.ctx = ctx;
    this.loadTable();
  }

  drawTable() {
    let prop = this.tab[0][0].getRadio()+1;

    let y = this.canvas.height * 0.1;
    
    let width = prop * this.COLS;
    let x = this.canvas.width / 2 - width;
    

    y = y + prop;
    this.tab.forEach((row) => {
    
      x = this.canvas.width / 2 - width;
      row.forEach((coin) => {
        coin.setPosition(x, y);
        coin.draw();
        x = x + prop * 2;
      });
      y = y + prop * 2;
    });
  }

  /**
   * inicializar matriz de tamaño rows * cols con valores en null.
   */
  loadTable() {
    let radio = 20;
    this.tab = Array.from(Array(this.ROWS), () =>
      Array.from(
        Array(this.COLS),
        () => new Coin(0, 0, "white", radio, this.canvas, 0)
      )
    );
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
