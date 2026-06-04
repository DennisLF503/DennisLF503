
//elementos del DOM
const btnAgregar   = document.getElementById("btnAgregar");
const btnLimpiar   = document.getElementById("btnLimpiar");
const mensaje      = document.getElementById("mensaje");
const tablaTareas  = document.getElementById("tablaTareas");
const contador     = document.getElementById("contador");

let tareas = [];

//validar los campos
function validarCampos(nombreTarea, responsable, prioridad, estado, fecha) {

    // Validar que ningún campo esté vacío
    if (nombreTarea === "" || responsable === "" || prioridad === "" || estado === "" || fecha === "") {
        mostrarMensaje("⚠️ Debe completar todos los campos antes de agregar la tarea.", "red");
        return false;
    }

    // Mejora #1 — Validar que el nombre de la tarea tenga al menos 5 caracteres
    if (nombreTarea.length < 5) {
        mostrarMensaje(" El nombre de la tarea debe tener al menos 5 caracteres.", "red");
        return false;
    }

    return true;
}

//mostrar mensaje
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;

    // El mensaje desaparece automáticamente después de 4 segundos
    setTimeout(function () {
        mensaje.textContent = "";
    }, 4000);
}

//la prioridad
function obtenerClasePrioridad(prioridad) {
    if (prioridad === "Alta")  return "prioridad-alta";
    if (prioridad === "Media") return "prioridad-media";
    if (prioridad === "Baja")  return "prioridad-baja";
    return "";
}

//obtener el estado
function obtenerClaseEstado(estado) {
    if (estado === "Pendiente")  return "estado-pendiente";
    if (estado === "En proceso") return "estado-proceso";
    if (estado === "Finalizada") return "estado-finalizada";
    return "";
}

//actualiza el contador
function actualizarContador() {
    contador.textContent = "Total: " + tareas.length + (tareas.length === 1 ? " tarea" : " tareas");
}

//muestra las tareas
function mostrarTareas() {

    // Se limpia el contenido actual de la tabla
    tablaTareas.innerHTML = "";

    // Se recorre cada tarea del arreglo
    tareas.forEach(function (item, indice) {

        // Se crea un elemento <tr> (fila) dinámicamente con el DOM
        const fila = document.createElement("tr");

        // Se obtienen las clases CSS para prioridad y estado
        const clasePrioridad = obtenerClasePrioridad(item.prioridad);
        const claseEstado    = obtenerClaseEstado(item.estado);

        // Se inserta el contenido HTML de la fila
        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${item.tarea}</td>
            <td>${item.responsable}</td>
            <td><span class="${clasePrioridad}">${item.prioridad}</span></td>
            <td><span class="${claseEstado}">${item.estado}</span></td>
            <td>${item.fecha}</td>
        `;

        // Se agrega la fila al cuerpo de la tabla
        tablaTareas.appendChild(fila);
    });

    // Se actualiza el contador de tareas
    actualizarContador();
}

//agregar tarea al dar click en el boton
btnAgregar.addEventListener("click", function () {

    // Se capturan y limpian los valores de los campos del formulario
    const nombreTarea  = document.getElementById("tarea").value.trim();
    const responsable  = document.getElementById("responsable").value.trim();
    const prioridad    = document.getElementById("prioridad").value;
    const estado       = document.getElementById("estado").value;
    const fecha        = document.getElementById("fecha").value;

    // Se validan los campos antes de continuar
    if (!validarCampos(nombreTarea, responsable, prioridad, estado, fecha)) {
        return; // Si la validación falla, se detiene la ejecución
    }

    // Se crea el objeto que representa la nueva tarea
    const nuevaTarea = {
        tarea:        nombreTarea,
        responsable:  responsable,
        prioridad:    prioridad,
        estado:       estado,
        fecha:        fecha
    };

    // Se agrega la nueva tarea al arreglo de tareas
    tareas.push(nuevaTarea);

    // Se muestra un mensaje de confirmación al usuario
    mostrarMensaje(" Tarea agregada correctamente.", "green");

    // Se limpian los campos del formulario
    document.getElementById("tarea").value        = "";
    document.getElementById("responsable").value  = "";
    document.getElementById("prioridad").value    = "";
    document.getElementById("estado").value       = "";
    document.getElementById("fecha").value        = "";

    // Se actualiza la tabla con todas las tareas
    mostrarTareas();
});

//boton para vaciar la tabla
btnLimpiar.addEventListener("click", function () {

    // Se confirma con el usuario antes de borrar todo
    const confirmar = confirm("¿Está seguro que desea eliminar todas las tareas registradas?");

    if (confirmar) {
        tareas = []; // Se vacía el arreglo
        mostrarTareas(); // Se actualiza la tabla (quedará vacía)
        mostrarMensaje(" Tabla limpiada correctamente.", "gray");
    }
});
