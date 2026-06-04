// Captura del formulario
const formTarea = document.getElementById("formTarea");

// Captura del espacio donde aparecerán los mensajes
const mensaje = document.getElementById("mensaje");

// Captura del cuerpo de la tabla
const tablaTareas = document.getElementById("tablaTareas");

// Arreglo donde se guardarán temporalmente las tareas
let tareas = [];

// Evento principal del formulario
formTarea.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nombreTarea = document.getElementById("tarea").value.trim();
    const responsable = document.getElementById("responsable").value.trim();
    const prioridad = document.getElementById("prioridad").value;

    // Validación de campos vacíos
    if (nombreTarea === "" || responsable === "" || prioridad === "") {
        mensaje.textContent = "Debe completar todos los campos antes de agregar la tarea.";
        mensaje.style.color = "red";
        return;
    }

    // Crear objeto tarea
    const nuevaTarea = {
        tarea: nombreTarea,
        responsable: responsable,
        prioridad: prioridad
    };

    // Agregar tarea al arreglo
    tareas.push(nuevaTarea);

    // Mostrar mensaje de confirmación
    mensaje.textContent = "Tarea agregada correctamente.";
    mensaje.style.color = "green";

    // Limpiar formulario
    formTarea.reset();

    // Actualizar tabla
    mostrarTareas();
});

// Función para mostrar tareas en la tabla
function mostrarTareas() {

    tablaTareas.innerHTML = "";

    tareas.forEach(function(item) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${item.tarea}</td>
            <td>${item.responsable}</td>
            <td>${item.prioridad}</td>
        `;

        tablaTareas.appendChild(fila);
    });
}