class Game {
  constructor() {
    this.winner = false;
    this.started = false;
    this.p1;
    this.p2;
    this.playerTurn;
    this.table = new Table();
  }

  /**
   *
   * @param { Player } p1 player 1
   * @param { Player } p2 player 2
   * @param { Number } size numero de fichas en linea necesarias para ganar
   */
  init(p1, p2, size) {
    this.started = true;
    this.p1 = p1;
    this.p2 = p2;
    this.playerTurn = p1;
    this.table.init(size);
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
