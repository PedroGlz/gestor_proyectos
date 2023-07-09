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
    /* varaibles elementos catalogos */
    const btn_catalogo_usuarios = document.querySelector('#btn_catalogo_usuarios');
    const btn_catalogo_tipos_usuario = document.querySelector('#btn_catalogo_tipos_usuario');

    /* LLAMADO A FUNCIONES */
    cargar_event_listeners_principal()
});

/* FUNCIONES */
function cargar_event_listeners_principal(){
    btn_catalogo_usuarios.addEventListener('click', cargar_catalogo_usuarios);
    btn_catalogo_tipos_usuario.addEventListener('click', cargar_catalogo_tipos_usuario);

    btn_agregar_espacio_trabajo.addEventListener('click', crear_espacio_trabajo)
    // btn_editar_espacio_trabajo.addEventListener('click',)
    // btn_eliminar_espacio_trabajo.addEventListener('click',)
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
