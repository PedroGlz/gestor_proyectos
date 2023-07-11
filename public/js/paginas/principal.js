document.addEventListener("DOMContentLoaded", function(event) {
    console.log("ya cargo")
    /* Banderillas para la carga de los js catalogos */
    var script_usuarios_cargado = false;
    var script_tipos_usuario_cargado = false;
    
    /* VARIABLES DOM PAGINA PRINCIPAL */
    /* variables elementos espacios de trabajo */
    const btn_agregar_espacio_trabajo = document.querySelector("#btn_agregar_espacio_trabajo");
    const btn_editar_espacio_trabajo = document.querySelector("#btn_editar_espacio_trabajo");
    const btn_eliminar_espacio_trabajo = document.querySelector("#btn_eliminar_espacio_trabajo");
    const btn_guardar_espacio_trabajo = document.querySelector("#btn_guardar_espacio_trabajo");
    const select_espacios_trabajo = document.querySelector("#select_espacios_trabajo");
    /* variables elementos tableros */
    const btn_nuevo_tablero = document.querySelector("#btn_nuevo_tablero");
    const contenedor_lista_tableros = document.querySelector("#contenedor_lista_tableros");
    const btn_guardar_tablero = document.querySelector("#btn_guardar_tablero");
    /* varaibles elementos catalogos */
    const btn_catalogo_usuarios = document.querySelector('#btn_catalogo_usuarios');
    const btn_catalogo_tipos_usuario = document.querySelector('#btn_catalogo_tipos_usuario');

    /* LLAMADO A FUNCIONES */
    cargar_select_espacios_trabajo()
    cargar_event_listeners_principal()
});

/* FUNCIONES */
function cargar_event_listeners_principal(){
    btn_catalogo_usuarios.addEventListener('click', cargar_catalogo_usuarios);
    btn_catalogo_tipos_usuario.addEventListener('click', cargar_catalogo_tipos_usuario);
    // espacios de trabajo
    btn_agregar_espacio_trabajo.addEventListener('click', crear_espacio_trabajo)
    btn_guardar_espacio_trabajo.addEventListener('click', guardar_datos_espacio_trabajo)
    btn_editar_espacio_trabajo.addEventListener('click', editar_espacio_trabajo)
    btn_eliminar_espacio_trabajo.addEventListener('click', eliminar_espacio_trabajo)
    select_espacios_trabajo.addEventListener('change',(event) => {cargar_lista_tableros(event.target.value)});
    // tableros
    btn_nuevo_tablero.addEventListener('click', crear_tableros)
    btn_guardar_tablero.addEventListener('click', guardar_datos_tablero)
    contenedor_lista_tableros.addEventListener('click',(event) => {opciones_tablero(event)});
    // $(".btn_renombrar_tablero").click((event) => {opciones_tablero(event)});
    // $(".btn_eliminar_tablero").click((event) => {opciones_tablero(event)});
}

function cargar_catalogo_usuarios(){
    limpiar_contenedor_paginas()
    $('#contenedor_paginas').load('usuarios', function( response, status, xhr ) {
        if ( status == "error" ) {
            var msg = "Sorry but there was an error: ";
            $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        }

        if (script_usuarios_cargado == false) {
            $.getScript({url: "js/paginas/usuarios.js",cache:true}, function() {
                script_usuarios_cargado = true;
            });
        }

    });    
}

function cargar_catalogo_tipos_usuario() {
    limpiar_contenedor_paginas()
    $('#contenedor_paginas').load('tipos_usuario', function( response, status, xhr ) {
        if ( status == "error" ) {
            var msg = "Sorry but there was an error: ";
            $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
        }

        if (script_tipos_usuario_cargado == false) {
            $.getScript({url: "js/paginas/tipos_usuario.js",cache:true}, function() {
                script_tipos_usuario_cargado = true;
            });
        }

    });   
}

function limpiar_contenedor_paginas(){
    document.querySelector("#contenedor_paginas").innerHTML = "";
}
