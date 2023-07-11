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
    /* variables elementos Grupos */
    const btn_nuevo_grupo = document.querySelector("#btn_nuevo_grupo");
    const contenedor_grupos_creados = document.querySelector("#contenedor_grupos_creados");
    /* varaibles elementos catalogos */
    const btn_catalogo_usuarios = document.querySelector('#btn_catalogo_usuarios');
    const btn_catalogo_tipos_usuario = document.querySelector('#btn_catalogo_tipos_usuario');

    /* LLAMADO A FUNCIONES */
    expandir_cards_proyectos()
    cargar_select_espacios_trabajo()
    cargar_event_listeners_principal()
});

/* FUNCIONES */
function cargar_event_listeners_principal(){
    btn_catalogo_usuarios.addEventListener('click', mostrar_catalogo_usuarios);
    btn_catalogo_tipos_usuario.addEventListener('click', mostrar_catalogo_tipos_usuario);
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
    // Grupos
    btn_nuevo_grupo.addEventListener('click',(event) => {crear_grupo(event)});
}

function mostrar_catalogo_usuarios(){
    limpiar_contenedor_paginas()
    document.querySelector("#vista_catalogo_usuarios").style.display = "";
}

function mostrar_catalogo_tipos_usuario() {
    limpiar_contenedor_paginas()
}

function limpiar_contenedor_paginas(){
    let elementos_contenedor_paginas = document.querySelectorAll(".vista_sistema");
    
    elementos_contenedor_paginas.forEach(element => {
        console.log(element)
       element.style.display = 'none';
    });

    console.log("limpiado ya")
}

function opciones_tablero(event){
    console.log(event.target)
    let btn_seleccionado = event.target;
    let btn_tablero_lista = btn_seleccionado.parentElement.parentElement.previousElementSibling;

    if(btn_seleccionado.classList.contains('btn_renombrar_tablero')){
        editar_tablero(btn_tablero_lista)
    }else if(btn_seleccionado.classList.contains('btn_eliminar_tablero')){
        eliminar_tablero(btn_tablero_lista)
    }else if(btn_seleccionado.classList.contains('btn_tablero_lista')){
        mostrar_sistema_proyectos(btn_seleccionado.value)
    }
}
