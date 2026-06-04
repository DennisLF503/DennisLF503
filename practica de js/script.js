alert ("hola desde javaScript")
console.log("Mensaje en la consola de navegacion")

const btnMoodo = document.getElementById("btnMoodo");

function cambiarModo(){
    document.body.classList.toggle("Modo-oscuro");
}

btnMoodo.addEventListener("click", cambiarModo);