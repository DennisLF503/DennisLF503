//credeciales válidas para ingreso*/
const usuarioCorrecto ="Justin";
const claveCorrecta = "12345";

//Selección del formulario
const formLogin=document.querySelector('#formLogin');

//Selección de campos
const usuario=document.querySelector('#usuario');
const clave=document.querySelector('#clave');

//Selección de mensajes de error
const errorUsuario=document.querySelector('#errorUsuario');
const errorClave=document.querySelector('#errorClave');
const mensajeGeneral=document.querySelector('#mensajeGeneral');

//selección del checkbox para mostrar contraseña
const mostrarClave=document.querySelector('#mostrarClave');

//Selección de las secciones
const loginCard=document.querySelector('#logincard');
const panelBienvenida=document.querySelector('#panelBienvenida');

//Selección del espacio donde aparecerá el usuario
const nombreUsuario=document.querySelector("#nombreUsuario");

//selección del botón cerrar sesión
const btnCerrarSesion=document.querySelector('#btnCerrarSesion');

//Evento para mostrar u ocultar contraseña

mostrarClave.addEventListener("change", function(){
    if(mostrarClave.checked){
        clave.type="text";
    }else{
        clave.type="password";
    }
});

//Evento principal del formulario
formLogin.addEventListener("submit", function(evento){
    //Evita que la página se recargue
    evento.preventDefault();
    //Limpie errores anteriores
    limpiarMensajes();
    let valido= true;

    //validación del usuario vacío
    if (usuario.value.trim()===""){
        mostrarError(usuario, errorUsuario, "Debe ingresar el usuario.");
        valido = false;
        }else{
        marcarCorrecto(usuario);
        }
     //Validación de la contraseña vacía

     if (clave.value.trim()===""){
        mostrarError(clave, errorClave,"Debe ingresar la contraseña");
        valido=false;
     }else{
        marcarCorrecto(clave);
     }
     //Si algún campo está vacío, se detiene el proceso
     if (!valido){
        mensajeGeneral.textContent="Complete los campos requeridos";
        mensajeGeneral.style.color="red";
        return;
     }
     //Verificación de credenciales
     if(usuario.value === usuarioCorrecto && clave.value===claveCorrecta) {
        //Mostrar mensaje exitoso
        mensajeGeneral.textContent="Acceso correcto";
        mensajeGeneral.style.color="blue";

        //Mostrar el panel de bienvendida
        nombreUsuario.textContent=usuario.value;
        loginCard.classList.add("oculto");
        panelBienvenida.classList.remove("oculto");
     }else{
        mensajeGeneral.textContent="Usuario o contraseña incorrectos";
        mensajeGeneral.style.color="red";

        usuario.classList.add("incorrecto");
        clave.classList.add("incorrecto");
     }
     });

     //Evento para cerrar sesión
     btnCerrarSesion.addEventListener("click", function(){
        //limpia los campos
        usuario.value="";
        clave.value="";
        mostrarClave.checked=false;
        clave.type="password";

        //Ocultar el panel y muestra nuevamente el login
        panelBienvenida.classList.add("oculto");
        loginCard.classList.remove("oculto");

        limpiarMensajes();
     });

     //Función para mostrar mensajes
     function mostrarError(campo, espacioError, texto){
        espacioError.textContent=texto;
        campo.classList.add("Incorrecto");
        campo.classList.remove("Correcto");
     }
     //Función para marcar un campo correcto
     function marcarCorrecto(campo){
        campo.classList.add("correcto");
        campo.classList.remove("Incorrecto");
     }
     //Función para limpiar mensajes y estilos
     function limpiarMensajes(){
        errorUsuario.textContent="";
        errorClave.textContent="";
        mensajeGeneral.textContent="";

        usuario.classList.remove("correcto","incorrecto");
        clave.classList.remove("correcto", "incorrecto");
     }