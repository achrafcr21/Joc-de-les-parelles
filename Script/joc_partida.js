// Comprovar si ja hi ha una partida en curs
if (sessionStorage.getItem("partidaEnCurs") === "true") {
    alert("Ja hi ha una partida començada.");
    window.close(); // Tanca la finestra del joc
} else {
    // Si no hi ha partida en curs, marquem que comença una partida
    sessionStorage.setItem("partidaEnCurs", "true");
}

const canal = new BroadcastChannel("canalPuntaje");
// Obtenir elements del DOM
const nomJugadorElement = document.getElementById("nomJugador");
const puntsElement = document.getElementById("punts");
const taulellElement = document.getElementById("taulell");

// Mostrar el nom del jugador des de localStorage
const nomJugador = localStorage.getItem("nom");
if (nomJugador) {
    nomJugadorElement.textContent = nomJugador;
}

// Inicialitzar el puntatge
let punts = 0;
puntsElement.textContent = punts;

//Per la part de la puntacuació més alta
let millorPuntuacio = localStorage.getItem("millorPuntuacio") || 0;
document.getElementById("millorPuntuacio").textContent = `Puntuació més alta: ${millorPuntuacio}`;

// Configurar color de fons segons el navegador
function establirColorFons() {
    const navegador = navigator.userAgent;
    if (navegador.includes("Firefox")) {
        document.body.style.backgroundColor = "orange"; // Color de fons per a Firefox
    } else if (navegador.includes("Chrome")) {
        document.body.style.backgroundColor = "green"; // Color de fons per a Chrome
    } else {
        document.body.style.backgroundColor = "lightblue"; // Color de fons per a altres navegadors
    }

    // Guardar el color en sessionStorage
    sessionStorage.setItem("colorFons", document.body.style.backgroundColor);
}

// Cridar la funció per establir el color de fons
establirColorFons();

// Crear l'array de cartes (10 parelles)
const lletres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let cartes = [...lletres, ...lletres];

// Funció per barrejar les cartes
function barallaArray(cartes) {
    for (let i = cartes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartes[i], cartes[j]] = [cartes[j], cartes[i]];
    }
}

// Barrejar les cartes abans de mostrar-les
barallaArray(cartes);

// Recórrer l'array de cartes i crear cada una
for (let i = 0; i < cartes.length; i++) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.setAttribute("data-letra", cartes[i]);
    carta.textContent = "?";
    carta.addEventListener("click", girarCarta); // Utilitzar addEventListener en lloc de onclick
    taulellElement.appendChild(carta);
}

let cartaGirada = null;
let bloquejat = false;

// Funció per girar una carta
function girarCarta(event) {
    if (bloquejat) return;

    const cartaActual = event.target;
    cartaActual.textContent = cartaActual.getAttribute("data-letra");
    cartaActual.classList.add("girada");

    if (!cartaGirada) {
        cartaGirada = cartaActual;
    } else {
        if (cartaActual.getAttribute("data-letra") === cartaGirada.getAttribute("data-letra")) {
            cartaActual.removeEventListener("click", girarCarta);
            cartaGirada.removeEventListener("click", girarCarta);
            cartaGirada = null;
            actualitzaPuntuacio(10);
            verificarFiDelJoc();
        } else {
            bloquejat = true;
            setTimeout(() => {
                cartaActual.textContent = "?";
                cartaActual.classList.remove("girada");
                cartaGirada.textContent = "?";
                cartaGirada.classList.remove("girada");
                cartaGirada = null;
                bloquejat = false;
                actualitzaPuntuacio(-3);
            }, 1000);
        }
    }
}

// Funció per actualitzar el puntatge
function actualitzaPuntuacio(puntsAfegits) {
    punts += puntsAfegits;
    if (punts < 0) {
        punts = 0; // Asegurar que el puntaje no sea negativo
    }
    puntsElement.textContent = punts;
    canal.postMessage({ puntajeActual: punts });
}

// Funció per verificar si el joc ha finalitzat
function verificarFiDelJoc() {
    const totesGirades = Array.from(document.querySelectorAll(".carta")).every(carta =>
        carta.classList.contains("girada")
    );

    if (totesGirades) {
        setTimeout(() => {
            alert(`Felicitats! Has completat el joc amb una puntuació de ${punts}.`);
            
            if (punts > millorPuntuacio) {
                millorPuntuacio = punts;
                localStorage.setItem("millorPuntuacio", millorPuntuacio);
                document.getElementById("millorPuntuacio").textContent = `Puntuació més alta: ${millorPuntuacio}`;
            }
            
            sessionStorage.removeItem("partidaEnCurs");
        }, 500);
    }
}

// Funció per reiniciar el joc
function reiniciarJoc() {
    location.reload();
}


function mostrarInstruccions() {
    window.open("instruccions.html", "Instruccions", "width=400,height=400");
}


window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("partidaEnCurs");
});