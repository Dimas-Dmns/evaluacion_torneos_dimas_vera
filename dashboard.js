
let torneos = [];

function registrarTorneo() {
    // 1. Obtener los valores de los campos existentes
    let nombre = document.getElementById("txtNombre").value.trim();
    let categoria = document.getElementById("txtCategoria").value;
    let participantesTexto = document.getElementById("txtParticipantes").value;
    let participantes = Number(participantesTexto);
    let inscripcionTexto = document.getElementById("txtInscripcion").value;
    let inscripcion = Number(inscripcionTexto);
    let email = document.getElementById("txtEmail").value.trim();

    limpiarErrores();

    let valido = true;

    // 2. Validar el nombre
    if (nombre.length < 4) {
        document.getElementById("errorNombre").textContent =
            "El nombre debe tener al menos 4 caracteres.";
        valido = false;
    }

    // 3. Validar la categoría
    if (categoria === "") {
        document.getElementById("errorCategoria").textContent =
            "Seleccione una categoría.";
        valido = false;
    }

    // 4. Validar participantes: entero entre 1 y 100
    if (
        participantesTexto.trim() === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        document.getElementById("errorParticipantes").textContent =
            "Ingrese un número entero entre 1 y 100.";
        valido = false;
    }

    // 5. Validar inscripción mayor que cero
    if (
        inscripcionTexto.trim() === "" ||
        !Number.isFinite(inscripcion) ||
        inscripcion <= 0
    ) {
        document.getElementById("errorInscripcion").textContent =
            "La inscripción debe ser mayor que 0.";
        valido = false;
    }

    // 6. Validar correo no vacío y que contenga @
    if (email === "") {
        document.getElementById("errorEmail").textContent =
            "Ingrese el correo electrónico.";
        valido = false;
    } else if (!email.includes("@")) {
        document.getElementById("errorEmail").textContent =
            "El correo debe contener el símbolo @.";
        valido = false;
    }

    // Si existe algún error, no registrar el torneo
    if (!valido) {
        document.getElementById("mensaje").textContent =
            "Revise los campos señalados antes de continuar.";
        document.getElementById("mensaje").className = "mensaje-error";
        return;
    }

    // 7. Calcular la recaudación estimada
    let recaudacion = participantes * inscripcion;

    // 8. Crear el objeto del torneo
    let nuevoTorneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: inscripcion,
        email: email,
        recaudacion: recaudacion
    };

    // 9. Agregar al arreglo
    torneos.push(nuevoTorneo);

    // 10. Actualizar tabla y limpiar el formulario
    mostrarTorneos();
    limpiarFormulario();

    // 11. Mostrar confirmación
    document.getElementById("mensaje").textContent =
        "✓ Torneo registrado correctamente.";
    document.getElementById("mensaje").className = "mensaje-exito";
}

function mostrarTorneos() {
    let html = "";

    // Obligatoriamente se utiliza un ciclo for
    for (let i = 0; i < torneos.length; i++) {
        let torneo = torneos[i];

        html += "<tr>";
        html += "<td>" + torneo.nombre + "</td>";
        html += "<td>" + torneo.categoria + "</td>";
        html += "<td>" + torneo.participantes + "</td>";
        html += "<td>$" + torneo.valorInscripcion.toFixed(2) + "</td>";
        html += "<td>" + torneo.email + "</td>";
        html += "<td>$" + torneo.recaudacion.toFixed(2) + "</td>";
        html += "</tr>";
    }

    // Reemplazar el contenido, sin duplicar filas
    document.getElementById("tablaTorneos").innerHTML = html;
}

function limpiarFormulario() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("txtParticipantes").value = "";
    document.getElementById("txtInscripcion").value = "";
    document.getElementById("txtEmail").value = "";

    limpiarErrores();

    document.getElementById("mensaje").textContent = "";
    document.getElementById("mensaje").className = "";
}

function limpiarErrores() {
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCategoria").textContent = "";
    document.getElementById("errorParticipantes").textContent = "";
    document.getElementById("errorInscripcion").textContent = "";
    document.getElementById("errorEmail").textContent = "";
}
