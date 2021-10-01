"use strict";

document.addEventListener("DOMContentLoaded", iniciar);

const url_menu = 'pages/menu.html'
const url_game = 'pages/game.html'

function iniciar(){
    // nombres de players 
    let payer1;
    let payer2;

    // cargar pagina menu
    load_page(url_game);
    // load_page(url_menu);

    function load_page(page){
        let content = document.getElementById("content");

        fetch(page).then((r)=>{
            if(r.ok)
                return r.text();
            else    
                content.innerHTML = "<h1> Load Error</h1>" 
        }).then((r)=>{
            content.innerHTML="";
            content.innerHTML = r;

            if(page == url_menu){
                
                document.getElementById('btn_start').addEventListener('click', ()=>{
                    load_page(url_game);
                });

            }else{
                document.getElementById('btn_reset').addEventListener('click', ()=>{
                    load_page(url_menu);
                });
                // btn aux solo de prueba para alert de victoria
                document.getElementById('aux').addEventListener('click', ()=>{
                    alert2();// + nombre del ganador
                });
            }
        })
    }

    function alert2(){
        Swal.fire({
            title: 'EL Ganador Es: ',
            text: "¿desea jugar de nuevo?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Revancha!',
            cancelButtonText: 'No '
          }).then((result) => {
            if (result.isConfirmed) {
                load_page(url_game);
            }else{
                load_page(url_menu);
            }
          });
    }

}