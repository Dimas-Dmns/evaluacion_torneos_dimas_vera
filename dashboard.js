
let torneos = [];

function registrarTorneo() {

    let nombre = document.getElementById("txtNombre").value.trim();
    let categoria = document.getElementById("txtCategoria").value;
    let participantes = Number(document.getElementById("txtParticipantes").value);
    let inscripcion = Number(document.getElementById("txtInscripcion").value);
    let email = document.getElementById("txtEmail").value.trim();

    limpiarErrores();

    let valido = true;

    if (nombre.length < 4) {
        document.getElementById("errorNombre").innerHTML =
            "El nombre debe tener al menos 4 caracteres";
        valido = false;
    }

    if (categoria === "") {
        document.getElementById("errorCategoria").innerHTML =
            "Seleccione una categoría";
        valido = false;
    }

    if (
        document.getElementById("txtParticipantes").value === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        document.getElementById("errorParticipantes").innerHTML =
            "Ingrese un entero entre 1 y 100";
        valido = false;
    }

    if (
        document.getElementById("txtInscripcion").value === "" ||
        !Number.isFinite(inscripcion) ||
        inscripcion <= 0
    ) {
        document.getElementById("errorInscripcion").innerHTML =
            "La inscripción debe ser mayor que 0";
        valido = false;
    }

    if (email === "") {
        document.getElementById("errorEmail").innerHTML =
            "Ingrese el correo electrónico";
        valido = false;
    }

    if (!valido) {
        return;
    }

    let recaudacion = participantes * inscripcion;

    let nuevoTorneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: inscripcion,
        email: email,
        recaudacion: recaudacion
    };

    torneos.push(nuevoTorneo);

    mostrarTorneos();
    limpiarFormulario();

    document.getElementById("mensaje").innerHTML =
        "Torneo registrado correctamente";
}

function mostrarTorneos() {

    let html = "";

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

    document.getElementById("tablaTorneos").innerHTML = html;
}

function limpiarFormulario() {

    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("txtParticipantes").value = "";
    document.getElementById("txtInscripcion").value = "";
    document.getElementById("txtEmail").value = "";

    limpiarErrores();

    document.getElementById("mensaje").innerHTML = "";
}

function limpiarErrores() {

    document.getElementById("errorNombre").innerHTML = "";
    document.getElementById("errorCategoria").innerHTML = "";
    document.getElementById("errorParticipantes").innerHTML = "";
    document.getElementById("errorInscripcion").innerHTML = "";
    document.getElementById("errorEmail").innerHTML = "";
}
