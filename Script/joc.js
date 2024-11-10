// Declarar objectes
const btnPartida = document.getElementById("comencarPartida");
const btnBorrar = document.getElementById("borrarPartida");
const nameInput = document.getElementById("nomJugador");
const infoNavegadorObj = document.getElementById("infoNavegador");
const infoURLObj = document.getElementById("infoURL");
let finestra; // Variable per a la finestra del joc
const canal = new BroadcastChannel("canalPuntaje");

// Funció per establir una cookie
function setCookie(nom, valor, dies) {
    const d = new Date();
    d.setTime(d.getTime() + (dies * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = nom + "=" + valor + ";" + expires + ";path=/";
}

// Funció per obtenir el valor d'una cookie
function getCookie(nom) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [nombre, valor] = cookie.split("=");
        if (nombre === nom) {
            return valor;
        }
    }
    return "";
}

// Funció per començar una partida
function començarPartida() {
    if (nameInput.value) {
        finestra = window.open("joc.html");
        localStorage.setItem("nom", nameInput.value);
        setCookie("nomJugador", nameInput.value, 7);
        sessionStorage.setItem("partidaEnCurs", "true"); // Indica que la partida està en curs
    } else {
        alert("Has d'introduir el nom de jugador");
    }
}

// Funció per esborrar la partida
function esborrarPartida() {
    localStorage.removeItem("nom");
    sessionStorage.clear(); // Esborra informació de la partida
    if (finestra) finestra.close();
    document.getElementById("puntuacioPartida").textContent = "No hi ha cap partida en joc";
}

// Funció per mostrar la informació del navegador
function infoNavegador() {
    infoNavegadorObj.textContent = navigator.userAgent;
}

// Funció per mostrar la informació de la URL actual
function infoURL() {
    infoURLObj.textContent = location.href;
}

// Executar funcions per mostrar la informació del navegador i URL
infoNavegador();
infoURL();

// Al carregar la pàgina, mostrar el nom del jugador si existeix a la cookie
window.onload = function() {
    const nomGuardat = getCookie("nomJugador");
    if (nomGuardat) {
        nameInput.value = nomGuardat;
    }
}

// Declarar esdeveniments
btnPartida.addEventListener("click", començarPartida);
btnBorrar.addEventListener("click", esborrarPartida);

canal.onmessage = function(event) {
    const { puntajeActual } = event.data;
    document.getElementById("puntuacioPartida").textContent = `Puntuació actual: ${puntajeActual}`;
};