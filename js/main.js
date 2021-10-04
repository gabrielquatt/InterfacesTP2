"use strict";

const url_menu = "pages/menu.html";
const url_game = "pages/game.html";

let player1;
let player2;
let numToWin;
let game = new Game();
let canvas;

// cargar pagina menu
load_page(url_menu);

/**
 * TODO añadir opciones al manu del juego
 */
function iniciarJuego() {
  let name_1 = document.getElementById("player1").value;
  let name_2 = document.getElementById("player2").value;
  numToWin = document.getElementById("type_Game").value;

  // TODO seleccionar ficha como imagen
  player1 = new Player(1, name_1, "X");
  player2 = new Player(2, name_2, "O");

  load_page(url_game);
}

/*
------------------------------------------------------------------------
------------------------------------------------------------------------
------------------------------------------------------------------------
*/
function load_page(page) {
  let content = document.getElementById("content");
  fetch(page)
    .then((r) => r.text())
    .then((r) => {
      content.innerHTML = "";
      content.innerHTML = r;

      if (page == url_menu) {
        document.getElementById("btn_start").addEventListener("click", () => {
          if (verificarDatos()) {
            iniciarJuego();
          }
        });
      } else {
        canvas = document.getElementById("canvas");

        document.getElementById("info_p1").innerHTML = player1.getName();
        document.getElementById("info_p2").innerHTML = player2.getName();
        game.init(player1, player2, numToWin, canvas);

        document.getElementById("turn_player").innerHTML = game.getPlayerTurn();
        document.getElementById("btn_reset").addEventListener("click", () => {
          load_page(url_menu);
        });
        // btn aux solo de prueba para alert de victoria
        document.getElementById("aux").addEventListener("click", () => {
          alert2(); // + nombre del ganador
        });
      }
    });
}

function verificarDatos() {
  let p1 = document.getElementById("player1").value;
  let p2 = document.getElementById("player2").value;
  let typeGame = document.getElementById("type_Game").value;

  if (!p1 || !p2 || !typeGame) alert1();
  else return true;
}

function alert1() {
  Swal.fire({
    title: "complete todos los datos",
    text: "",
    icon: "error",
    showConfirmedButton: true,
    confirmButtonColor: "#3085d6",
  }).then(() => load_page(url_menu));
}

function alert2() {
  Swal.fire({
    title: "EL Ganador Es: ",
    text: "¿desea jugar de nuevo?",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Revancha!",
    cancelButtonText: "No ",
  }).then((result) => {
    if (result.isConfirmed) {
      load_page(url_game);
    } else {
      load_page(url_menu);
    }
  });
}
