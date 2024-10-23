let nombreJugador = "";
let historial = []; // Array para almacenar el historial de partidas

function empezarJuego() {
    // Obtener el nombre del jugador
    nombreJugador = document.getElementById("nombre").value;

    // Verificar si el nombre no está vacío
    if (nombreJugador.trim() !== "") {
        // Mostrar el saludo y el juego, ocultar la sección de nombre
        document.getElementById("saludo").textContent = `Hola, ${nombreJugador}, elige tu jugada:`;
        document.getElementById("name-section").style.display = "none";
        document.getElementById("game").style.display = "block";
    } else {
        alert("Por favor, ingresa tu nombre");
    }
}

function jugar(eleccionUsuario) {
    const opciones = ["Piedra", "Papel", "Tijera"];
    const eleccionComputadora = opciones[Math.floor(Math.random() * 3)];
    let resultado = "";

    if (eleccionUsuario === eleccionComputadora) {
        resultado = "Empate";
    } else if (
        (eleccionUsuario === "Piedra" && eleccionComputadora === "Tijera") ||
        (eleccionUsuario === "Papel" && eleccionComputadora === "Piedra") ||
        (eleccionUsuario === "Tijera" && eleccionComputadora === "Papel")
    ) {
        resultado = "¡Ganaste!";
    } else {
        resultado = "Perdiste";
    }

    // Mostrar el resultado con el nombre del jugador
    document.getElementById("resultado").innerHTML = `
        ${nombreJugador}, tú elegiste: ${eleccionUsuario} <br>
        Computadora eligió: ${eleccionComputadora} <br>
        ${resultado}
    `;

    // Guardar la partida en el historial, incluyendo el nombre del jugador
    guardarPartida(nombreJugador, eleccionUsuario, eleccionComputadora, resultado);
}

function guardarPartida(nombre, jugador, computadora, resultado) {
    // Agregar la nueva partida al historial, incluyendo el nombre del jugador
    historial.push({
        nombre: nombre,          // Nombre del jugador
        jugador: jugador,        // Elección del jugador
        computadora: computadora, // Elección de la computadora
        resultado: resultado      // Resultado del juego
    });

    // Actualizar el historial en la interfaz
    mostrarHistorial();
}

function mostrarHistorial() {
    const tbody = document.querySelector("#historial tbody");
    tbody.innerHTML = ""; // Limpiar contenido previo

    // Recorrer el historial y agregar filas a la tabla
    historial.forEach((partida, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${partida.nombre}</td> <!-- Nombre del jugador -->
            <td>${partida.jugador}</td>
            <td>${partida.computadora}</td>
            <td>${partida.resultado}</td>
            <td><button class="borrar" onclick="borrarPartida(${index})">Borrar</button></td>
        `;

        tbody.appendChild(fila);
    });
}

function borrarPartida(indice) {
    // Eliminar la partida del historial
    historial.splice(indice, 1);

    // Actualizar el historial en la interfaz
    mostrarHistorial();
}
