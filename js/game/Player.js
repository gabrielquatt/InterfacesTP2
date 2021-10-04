class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
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
