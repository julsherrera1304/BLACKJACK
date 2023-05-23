
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");


class carta {
	
	static x = 50;
	static y = 50;

	constructor(valor, palo) {
		this.img = new Image();
		this.valor = valor;
		this.palo = palo;
	}
}


var cartas = [];
var cartasJugador = [];
var cartasCrupier = [];
var indiceCarta = 0;
var palos = ["S", "H", "D", "C"];

for (i = 0; i < 4; i++) {
	for (j = 1; j <= 13; j++) {
		cartas.push(new carta(j, palos[i]));
	}
}


for (i = 0; i < 100; i++) {
	cartas.splice(Math.random() * 52, 0, cartas[0]);
	cartas.shift();
}

function dibujarCarta(CJ) {
	
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335);
		carta.x += 300;
	};
	
	CJ.img.src = "imagenes/cartas/" + CJ.valor.toString() + CJ.palo + ".svg";
}

function pedirCarta() {
	
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta]; 
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
	}
}

function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
	let pointsUser = 0;
	let pointsCrupier = 0;
	let info = document.getElementById("info");
	
	for (i in cartasJugador) {
		pointsUser += cartasJugador[i].valor;
	}
	
	while (pointsCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta]);
		pointsCrupier += cartas[indiceCarta].valor;
		indiceCarta++;
	}
	
	info.innerHTML = "Puntuación jugador: " + pointsUser + "<br>Puntuación crupier: " + pointsCrupier;

	carta.x = 50;
	carta.y = 400;
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i]);
	}
	
	if (pointsUser == 21) {
		info.innerHTML +="<br><b>Blackjack!!! Has ganado!</b>";
	} else if (pointsUser > 21) {
		info.innerHTML +="<br><b>Has perdido... Te has pasado de puntos</b>";
	} else if (pointsCrupier > 21) {
		info.innerHTML +="<br><b>Has ganado!!! El croupier se ha pasado de puntos</b>";
	} else if (pointsCrupier >= pointsUser) {
		info.innerHTML += "<br><b>Ha ganado el croupier...</b>";
	} else {
		info.innerHTML += "<br><b>Has ganado!!!</b>";
	}
}


function playagain() {
	location.reload(true);
}
