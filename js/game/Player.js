class Player {
  constructor(id, name, coin) {
    this.id = id;
    this.name = name;
    this.coin = coin;
  }

  getId(){
    return this.id;
  }

  /**
   * @returns Ficha del jugador (path a la imagen)
   */
  getCoin() {
    return this.coin;
  }

  /**
   * Funcion utilizada para verificar que los jugadores respeten su turno.
   * 
   * @param { Player } obj : instancia de jugador
   */
  equals(obj) {
    return obj.id === this.id && obj.name === this.name;
  }
}
