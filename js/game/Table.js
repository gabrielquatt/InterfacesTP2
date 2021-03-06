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

  /**
   * 
   * @param {*} tam tamaño del tablero
   * @param {*} canvas elemento byId canvas
   * @param {*} ctx contexto "2d"
   * @param {*} path1 path de imagen jugador 1
   * @param {*} path2 path de imagen jugador 1
   * @param {*} imgBox path de imagen de "caja/casilla vacia" del tablero
   * @param {*} imgDrop path de imagen donde soltar la ficha (parte superior del tablero)
   * @param {*} p1 jugador 1
   * @param {*} p2 jugador 2
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

  /**
   * Funcion para inicializar las monedas
   * @param {*} n tamaño del modo de juego (4,5,6,7) en linea
   * @param {*} path1 path de imagen jugador 1
   * @param {*} path2 path de imagen jugador 2
   * @param {*} radio radio que ocuparan las fichas y demas elementos en el canvas
   */
  startCoins(n, path1, path2, radio) {
    let posX = 220;
    let dispersionX = 140;
    let dispersionY = this.canvas.height - (radio * 2);

    if (n == 4) {
      n = 7 * 6;
    }
    if (n == 5) {
      n = 9 * 8;
    }
    if (n == 6) {
      n = 9 * 12;
      posX = 180;
    }
    if (n == 7) {
      n = 10 * 14;
      posX = 180;
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

  /**
   * Funcion encargada de dibujar cada ficha dentro del canvas
   * @param {*} x posicion en el eje x
   * @param {*} y posicion en el eje x
   * @param {*} path paht de la imagen de la ficha 
   * @param {*} radio radio 
   * @param {*} id identificador unico de cada ficha
   * @param {*} id_player id de Jugador
   * @returns retorna la moneda una vez creada para ser guardada en el arreglo de monedas
   */
  createCoin(x, y, path, radio, id, id_player) {
    let image = new Image();
    image.src = path;
    let coin = new Coin(x, y, image, radio, this.canvas, id, id_player);
    return coin;
  }

  /**
   * Funcion encargada de crear el DropArea donde se podran soltar las fichas
   * @param {*} x posicion en el eje x
   * @param {*} y posicion en el eje x
   * @param {*} path path de la imagen de drop area
   * @param {*} radio radio que ocupara
   * @param {*} id id del area
   * @returns retorna el DropArea una vez creado
   */
  createDropArea(x, y, path, radio, id) {
    let image = new Image();
    image.src = path;
    let dropArea = new DropArea(x, y, image, radio, this.canvas, id);
    return dropArea;
  }

  /**
   * Funcion encargada de Dibujar la Tabla en el canvas
   */
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

  /**
   * Funcion encargada de dibujar el fondo del tablero
   * @param {*} p proporcion de la tabla
   * @param {*} x tamaño en eje x de la tabla
   * @param {*} w widht total de la tabla
   */
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
   * Funcion para cargar la tabla y crear las ficha vacias en el tablero
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

  /**
   * 
   * @param {*} e 
   * @returns 
   */
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

  /**
   * 
   * @param {*} e 
   * @returns 
   */
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

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  move(e) {
    if (this.winner) return;
    if (this.muoseDown && this.lastCoin) {
      if (this.lastCoin.getIdPlayer() == this.playerTurn.getId()) {
        this.lastCoin.setPosition(e.layerX, e.layerY);
        this.drawTable();
      }
    }
  }

  /**
   * 
   * @param {*} x 
   * @param {*} y 
   * @returns 
   */
  findCoin(x, y) {
    for (let i = 0; i < this.coins.length; i++) {
      let elem = this.coins[i];
      if (elem.find(x, y)) return this.coins.splice(i, 1)[0];
    }
  }

  /**
   * 
   * @param {*} x 
   * @param {*} y 
   * @returns 
   */
  findColumn(x, y) {
    for (let i = 0; i < this.COLS; i++) {
      let elem = this.tab[0][i];
      if (elem.find(x, y)) return elem;
    }
  }

  /**
   * Funcion para dar comienzo al Juego
   */
  play(col) {
    let ok = this.insertCoin(col);

    if (!ok) return;

    this.drawTable();

    if (this.isWinner()) {
      this.winner = true;
      stop();
      this.alertWinner(this.playerTurn.getName(), true);
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

  /**
   * Funcion para insertar una ficha en una columna 
   * @param {*} col columna seleccionada
   * @returns retorna true si inserto la ficha
   */
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

  /**
   * @returns retorna si se formo una fila valida para ganar
   */
  isWinner() {
    return this.horizontal() || this.vertical() || this.diagonales();
  }

  /**
   * @returns retorna si en encontro un resultado valido en horizontal
   */
  horizontal() {
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

  /**
   * @returns si encontro un resultado valido de fichas verticalmente 
   */
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

  /**
   * verifica si hay algun resultado valido en las diagonales a partir de la ultima ficha seleccionada
   */
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

  /**
   * Cambiar turno del Jugador
   */
  changePlayerTurn() {
    this.playerTurn = this.playerTurn.equals(this.p1) ? this.p2 : this.p1;
    document.getElementById("turn_player").innerHTML =
      this.playerTurn.getName();
  }


  //==================================== ALERT ======================================//
  // Se utilizo la libreria sweetalert2 https://sweetalert2.github.io/#examples para
  // la creaccion de alertas, ya que nos facilitaban su creaccion y no interferia en
  // la logica del Juego pedido en el enunciado del TPE-2

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
}
