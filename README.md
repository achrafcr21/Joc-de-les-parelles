# Joc-de-les-parelles

Aquest és un projecte de joc de memòria fet amb HTML, CSS i JavaScript. L'objectiu del joc és trobar totes les parelles de cartes en el menor temps possible. A mesura que el jugador troba parelles, va guanyant punts, però si no encerta, es resten punts (amb un límit mínim de zero perquè no baixi a negatius).

Funcionalitats Principals
Pantalla Principal (index.html): Aquí és on el jugador pot introduir el seu nom, començar la partida i veure el puntatge actual. També es mostra informació del navegador i de la URL per practicar amb els objectes del navegador.

Pantalla de Joc (joc.html): La lògica del joc està en aquesta pantalla. Aquí apareixen les cartes que es poden girar per fer parelles, i també es mostra el nom del jugador i el puntatge. També hi ha un botó per veure les instruccions del joc en una finestra nova i un botó per reiniciar la partida.

Puntuació Més Alta: Es guarda automàticament la puntuació més alta del jugador utilitzant localStorage, així que fins i tot si tanquem el navegador, la puntuació més alta es manté.

Comunicació entre Pantalles: Utilitzem Broadcast Channel API per enviar el puntatge en temps real des de la pantalla de joc fins a la pantalla principal, així es pot veure el puntatge actual mentre es juga.

 ## Estructura del Projecte
HTML:

index.html: La pantalla inicial on el jugador entra el seu nom i comença la partida.
joc.html: La pantalla del joc on apareixen les cartes i on es juga la partida.
instruccions.html: Una pàgina simple amb les instruccions del joc.
CSS:

styles.css: Estils bàsics per donar format al joc, com el tauler de cartes i la distribució de la pantalla.
JavaScript:

joc.js: Gestiona la pantalla principal i la comunicació entre finestres, així com les cookies i el localStorage per al nom i la puntuació més alta.
joc_partida.js: Conté tota la lògica del joc, com girar les cartes, puntuar, barallar les cartes i verificar quan el joc ha acabat.
Com Funciona
Quan el jugador introdueix el seu nom i fa clic a "Començar partida", s'obre joc.html en una nova finestra o pestanya.
En joc.html, el jugador gira cartes per trobar les parelles. Cada encert suma 10 punts i cada error resta 3 punts (però sense baixar de zero).
Al completar totes les parelles, es mostra un missatge amb la puntuació final. Si aquesta puntuació supera la puntuació més alta guardada, aquesta s'actualitza.
La puntuació actual es reflecteix en temps real en la pantalla principal gràcies a la Broadcast Channel API.
Emmagatzematge de Dades
Cookies: Guardem el nom del jugador en una cookie per mostrar-lo en la pantalla principal.
localStorage: Guardem la puntuació més alta perquè es mantingui després de tancar el navegador.
sessionStorage: Utilitzat per indicar si hi ha una partida en curs i controlar l'estat de la partida en la sessió actual.
Instruccions Especials per Jugar
Introdueix el teu nom a index.html.
Fes clic a "Començar partida" per obrir el joc.
Gira les cartes i troba les parelles per guanyar punts.
Revisa les instruccions a joc.html si necessites ajuda.
