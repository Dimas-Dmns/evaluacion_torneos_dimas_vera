
/* ==========================================================================
   EVALUACIÓN JAVASCRIPT
   Dashboard de Torneos Gamer
   ========================================================================== */

// Arreglo global donde se almacenan los torneos registrados.
let torneos = [];

/**
 * ACTIVIDAD: Registrar y validar un torneo.
 */
function registrarTorneo() {
    // 1. Obtener los valores del formulario.
    const nombre = document.getElementById("txtNombre").value.trim();
    const categoria = document.getElementById("txtCategoria").value;
    const valorParticipantes = document.getElementById("txtParticipantes").value;
    const valorInscripcion = document.getElementById("txtInscripcion").value;
    const email = document.getElementById("txtEmail").value.trim();

    const participantes = Number(valorParticipantes);
    const inscripcion = Number(valorInscripcion);

    // 2. Limpiar los mensajes de errores anteriores.
    limpiarErrores();

    let valido = true;
    let primerCampoIncorrecto = null;

    // Función auxiliar para mostrar el error de cada campo.
    function mostrarError(idError, mensaje, idCampo) {
        document.getElementById(idError).textContent = mensaje;
        valido = false;

        if (primerCampoIncorrecto === null) {
            primerCampoIncorrecto = idCampo;
        }
    }

    // 3. Validar el nombre del torneo.
    if (nombre.length < 4) {
        mostrarError(
            "errorNombre",
            "El nombre debe tener al menos 4 caracteres.",
            "txtNombre"
        );
    }

    // 4. Validar la categoría.
    if (categoria === "") {
        mostrarError(
            "errorCategoria",
            "Selecciona una categoría para continuar.",
            "txtCategoria"
        );
    }

    // 5. Validar el número de participantes.
    if (
        valorParticipantes.trim() === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        mostrarError(
            "errorParticipantes",
            "Ingresa un número entero entre 1 y 100.",
            "txtParticipantes"
        );
    }

    // 6. Validar el valor de inscripción.
    if (
        valorInscripcion.trim() === "" ||
        !Number.isFinite(inscripcion) ||
        inscripcion <= 0
    ) {
        mostrarError(
            "errorInscripcion",
            "La inscripción debe ser un número mayor que 0.",
            "txtInscripcion"
        );
    }

    // 7. Validar el formato del correo electrónico.
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        mostrarError(
            "errorEmail",
            "Ingresa tu correo electrónico.",
            "txtEmail"
        );
    } else if (!formatoEmail.test(email)) {
        mostrarError(
            "errorEmail",
            "Correo inválido. Ejemplo: jugador@gmail.com",
            "txtEmail"
        );
    }

    // 8. Si existe algún error, detener el registro.
    if (!valido) {
        const mensaje = document.getElementById("mensaje");

        mensaje.textContent =
            "No se pudo registrar el torneo. Revisa los campos señalados.";

        mensaje.style.color = "#ff4d6d";

        // Llevar al usuario al primer campo incorrecto.
        document.getElementById(primerCampoIncorrecto).focus();

        return;
    }

    // 9. Calcular la recaudación total.
    const recaudacion = participantes * inscripcion;

    // 10. Crear el objeto con los datos del torneo.
    const nuevoTorneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: inscripcion,
        email: email,
        recaudacion: recaudacion
    };

    // 11. Guardar el torneo en el arreglo.
    torneos.push(nuevoTorneo);

    // 12. Actualizar la tabla de torneos.
    mostrarTorneos();

    // 13. Mostrar confirmación SIN limpiar el formulario.
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent =
        "¡Torneo registrado correctamente! La recaudación es $" +
        recaudacion.toFixed(2) +
        ". Puedes registrar otro torneo o pulsar Limpiar.";

    mensaje.style.color = "#39ff88";
}

/**
 * ACTIVIDAD: Mostrar los torneos registrados en la tabla.
 */
function mostrarTorneos() {
    const tabla = document.getElementById("tablaTorneos");

    // Vaciar únicamente las filas anteriores para reconstruir la tabla.
    tabla.replaceChildren();

    for (let i = 0; i < torneos.length; i++) {
        const torneo = torneos[i];
        const fila = document.createElement("tr");

        // Crear las celdas de manera segura.
        const datos = [
            torneo.nombre,
            torneo.categoria,
            torneo.participantes,
            "$" + torneo.valorInscripcion.toFixed(2),
            torneo.email,
            "$" + torneo.recaudacion.toFixed(2)
        ];

        for (let j = 0; j < datos.length; j++) {
            const celda = document.createElement("td");
            celda.textContent = datos[j];
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }
}

/**
 * ACTIVIDAD: Limpiar el formulario cuando el usuario lo solicite.
 * Esta función NO elimina los torneos ya registrados.
 */
function limpiarFormulario() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("txtParticipantes").value = "";
    document.getElementById("txtInscripcion").value = "";
    document.getElementById("txtEmail").value = "";

    limpiarErrores();

    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "Formulario limpio. Puedes registrar otro torneo.";
    mensaje.style.color = "#39ff88";

    document.getElementById("txtNombre").focus();
}

/**
 * ACTIVIDAD: Borrar los mensajes de error.
 */
function limpiarErrores() {
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCategoria").textContent = "";
    document.getElementById("errorParticipantes").textContent = "";
    document.getElementById("errorInscripcion").textContent = "";
    document.getElementById("errorEmail").textContent = "";
}
