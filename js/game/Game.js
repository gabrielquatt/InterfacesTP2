class Game {
  constructor() {
    this.winner = false;
    this.started = false;
    this.p1;
    this.p2;
    this.playerTurn = null;
    this.canvas = null;
    this.ctx = null;
    this.table = new Table();
    this.coins = [];
    this.muoseDown = false;
    this.lastCoin;
  }

  isStarted() {
    return this.started;
  }

  getPlayerTurn() {
    return this.playerTurn.getName();
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
      this.drawGame();
    }
  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].draw();
    }
    this.table.drawTable();
  }

  findCoin(x, y) {
    for (let i = 0; i < this.coins.length; i++) {
      let elem = this.coins[i];
      if (elem.find(x, y)) return this.coins.splice(i, 1)[0];
    }
  }

  /**
   *
   * @param { Player } p1 player 1
   * @param { Player } p2 player 2
   * @param { Number } size numero de fichas en linea necesarias para ganar
   */
  init(p1, p2, size,c1,c2) {
    this.started = true;
    this.p1 = p1;
    this.p2 = p2;
    this.playerTurn = p1;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.canvas.addEventListener("mousedown", (e) => this.down(e));
    this.canvas.addEventListener("mouseup", () => this.up());
    this.canvas.addEventListener("mousemove", (e) => this.move(e));
    this.table.init(size, canvas, this.ctx);
    this.showCoins(((size * size) / 2),c1,c2);
  }

  showCoins(n,cP1,cP2) {
    for (let i = 0; i < n; i++) {
      let posX = Math.random() * (this.canvas.width * 0.15) + 30;
      let posY = Math.random() * this.canvas.height * 0.6 + 25;
      posY = this.canvas.height - posY;

      let c1 = new Coin(posX, posY, cP1, 30, this.canvas, 1);
    
      posX = this.canvas.width - posX;
      let c2 = new Coin(posX, posY, cP2, 30, this.canvas, 2);

      
      c1.draw();
      c2.draw();

      this.coins.push(c1);
      this.coins.push(c2);
    }
  }

  play(player, col) {
    if (player === undefined || col === undefined) return;
    if (!player.equals(this.playerTurn)) return;
    let row = this.table.insertCoin(this.playerTurn.getCoin(), col);
    if (!row) return;
    // aca se debe mostrar tabla con la ficha colocada en [row][col]
    if (this.table.isWinner()) {
      this.winner = true;
      return this.final("gano: " + this.playerTurn);
    } else if (!this.table.hasEmptyCell()) {
      return this.final("empate");
    } else {
      this.changePlayerTurn(this.playerTurn);
    }
    return true;
  }

  changePlayerTurn(p) {
    this.playerTurn = p.equals(this.p1) ? this.p2 : this.p1;
  }

  final() {
    this.started = false;
    if (this.winner) {
      console.log("\n Gano " + this.playerTurn.name + " !!!! \n \n");
    } else {
      console.log("\n Empate !!!!");
    }
  }
}
