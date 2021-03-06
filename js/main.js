"use strict";

const url_menu = "pages/menu.html";
const url_game = "pages/game.html";

let player1; //Nombre Player 1
let player2; //Nombre Player 2
let coinP1; //Color Ficha P1
let coinP2; //Color Ficha P2
let pP1; //Persoaneje P1
let pP2; //Persoaneje P2
let numToWin;
let game = new Game();
let time_game;

// cargar pagina menu inicialmente
load_page(url_menu);

/**
 * Funcion encargada de tomar los valores del menu del Juego.
 */
function iniciarJuego() {
  let name_1 = document.getElementById("player1").value;
  let name_2 = document.getElementById("player2").value;
  numToWin = document.getElementById("type_Game").value;
  coinP1 = document.getElementById("colorP1").value;
  coinP2 = document.getElementById("colorP2").value;
  pP1 = document.getElementById("pJ1").value;
  pP2 = document.getElementById("pJ2").value;
  time_game = document.getElementById("time_game").value;
  player1 = new Player(1, name_1);
  player2 = new Player(2, name_2);

  load_page(url_game);
}

/*
------------------------------------------------------------------------
------------------------------------------------------------------------
------------------------------------------------------------------------
*/

/**
 * Funcion Partial Render para cargar dinamicamente los elementos y no recargar la pagina.
 * @param {*} page url de la pagina a cargar  
 */
function load_page(page) {
  let content = document.getElementById("content");
  fetch(page)
    .then((r) => r.text())
    .then((r) => {
      content.innerHTML = "";
      content.innerHTML = r;

      if (page == url_menu) {
        stop(); //PARO EL RELOJ PORQUE SINO BUSCA UN ELEMENTO EN HTML
        document.getElementById("btn_start").addEventListener("click", () => {
          if (verificarDatos()) {
            iniciarJuego();
          }
        });
      } else {
        game= new Game();
        stop(); //RESETEO EL RELOJ
        start(time_game); // COMIENZA EL CONTEO DE PARTIDA
        document.getElementById("info_p1").innerHTML = player1.getName();
        document.getElementById("info_p2").innerHTML = player2.getName();
        document.getElementById("mode_game").innerHTML= "Para Ganar Forme: "+ numToWin+ " En Linea."; 
        colorP1(coinP1);
        colorP2(coinP2);
        game.init(player1, player2, numToWin, coinP1, coinP2, pP1, pP2);

        document.getElementById("btn_reboot").addEventListener("click", () => {
          load_page(url_game);
        });
        document
          .getElementById("btn_finalize")
          .addEventListener("click", () => {
            load_page(url_menu);
          });
      }
    });
}

/**
 *  Funcion para verificar que los datos de los jugadores no se encuentren vacios
 * @returns true si todos los datos son validos
 */
function verificarDatos() {
  let p1 = document.getElementById("player1").value;
  let p2 = document.getElementById("player2").value;
  let coinP1 = document.getElementById("colorP1").value;
  let coinP2 = document.getElementById("colorP2").value;
  let typeGame = document.getElementById("type_Game").value;

  if (!p1 || !p2 || !typeGame) {
    alertError("Complete Todos Los Campos");
  } else if (coinP1 == coinP2) {
    alertError("??No Se Permite Jugar Con Las Mismas Fichas!");
  } else return true;
}

//====================================TIMER======================================//

let stopwatchInterval;
let runningTime = 0;

/**
 * Funcion para comenzar el cronometro de juego
 * @param {*} t tiempo de juego 
 */
function start(t) {
  document.getElementById("time_game").innerHTML =
    "Tiempo de Juego: ??? " + t + ":00";
  let startTime = Date.now() - runningTime;
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    let timer = calculateTime(runningTime);
    if (timer == t + ":00") {
      //si el tiempo se cumple se da la partida como empatada.
      pause();
      alertTie();
    }
    document.getElementById("timer").innerHTML = "<p>" + timer + "</p>";
  }, 1000);
}

/**
 * Funcion para Detener el reloj 
 */
function stop() {
  runningTime = 0;
  clearInterval(stopwatchInterval);
}

/**
 * Funcion encargada de ir calculando el los segundos y minutos transcurridos del Juego
 * @param {*} runningTime 
 * @returns retorna 
 */
const calculateTime = (runningTime) => {
  const total_seconds = Math.floor(runningTime / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
  const display_minutes = total_minutes.toString().padStart(2, "0");
  return `${display_minutes}:${display_seconds}`;
};

//========================MENU====================================//
/**
 * Funcion encargada de cambiar el color del circulo previo de color en el menu del juego 
 * para el jugador 1
 */
function colorChangeP1() {
  let selectBox = document.getElementById("colorP1");
  let selectedValue = selectBox.options[selectBox.selectedIndex].value;
  let circleP1 = document.getElementById("p1");
  circleP1.style.cssText = styleCircle(selectedValue);
}

/**
 * Funcion encargada de cambiar el color del circulo previo de color en el MENU del juego 
 * para el jugador 2
 */
function colorChangeP2() {
  let selectBox = document.getElementById("colorP2");
  let selectedValue = selectBox.options[selectBox.selectedIndex].value;
  let circleP2 = document.getElementById("p2");
  circleP2.style.cssText = styleCircle(selectedValue);
}

/**
 * Funcion encargada de pintar otro circulo en la pantalla del GAME para que cada jugador sepa cual es su color 
 * @param {*} color recibe como parametro el color seleccionado por el Jugador 1
 */
 function colorP1(color) {
  let circleP1 = document.getElementById("p1");
  circleP1.style.cssText = styleCircle(color);
}

/**
 * Funcion encargada de pintar otro circulo en la pantalla del GAME para que cada jugador sepa cual es su color 
 * @param {*} color recibe como parametro el color seleccionado por el Jugador 2
 */
function colorP2(color) {
  let circleP2 = document.getElementById("p2");
  circleP2.style.cssText = styleCircle(color);
}

/**
 * Funcion encargada de devolver la configuracion del estilo adecuada segun la seleccion del jugador
 * @param {*} value recibe como parametro un color 
 * @returns un texto valido para editar el CSS
 */
function styleCircle(value) {
  switch (value) {
    case "yellow":
      return "background-color: yellow; color: black;";
    case "blue":
      return "background: rgb(6, 89, 212); color: #ffffff;";
    case "red":
      return "background: red; color: #ffffff;";
    case "violet":
      return "background: rgb(171, 6, 212); color: #ffffff;";
    case "orange":
      return "background: orange; color: #ffffff;";
  }
}

//==================================== ALERTS ======================================//
// Se utilizo la libreria sweetalert2 https://sweetalert2.github.io/#examples para
// la creaccion de alertas, ya que nos facilitaban su creaccion y no interferia en
// la logica del Juego pedido en el enunciado del TPE-2

function alertError(msj) {
  Swal.fire({
    title: msj,
    text: "",
    icon: "error",
    showConfirmedButton: true,
    confirmButtonColor: "#3085d6",
  }).then(() => load_page(url_menu));
}

function alertTie() {
  Swal.fire({
    title: "Tiempo Finalizado",
    text: "??desean jugar de nuevo?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Reiniciar",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      load_page(url_game);
    } else {
      load_page(url_menu);
    }
  });
}

