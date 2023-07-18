// Variable que contiene las opciones para cambiar el estatus a una actividad
var opciones_estatus_actividad = '';
var opciones_usuarios = '';

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
    /* variables elementos proyectos */
    const btn_nuevo_proyecto = document.querySelector("#btn_nuevo_proyecto");
    const contenedor_lista_proyectos = document.querySelector("#contenedor_lista_proyectos");
    const btn_guardar_proyecto = document.querySelector("#btn_guardar_proyecto");
    /* variables elementos Grupos */
    const btn_nuevo_grupo = document.querySelector("#btn_nuevo_grupo");
    const contenedor_grupos_creados = document.querySelector("#contenedor_grupos_creados");
    /* varaibles elementos catalogos */
    const btn_catalogo_usuarios = document.querySelector('#btn_catalogo_usuarios');
    const btn_catalogo_tipos_usuario = document.querySelector('#btn_catalogo_tipos_usuario');

    /* LLAMADO A FUNCIONES */
    // cargar_select_espacios_trabajo()
    menu_estatus_actividad()
    select_usuarios()
    cargar_lista_proyectos()
    cargar_event_listeners_principal()
});

/* FUNCIONES */
function cargar_event_listeners_principal(){
    btn_catalogo_usuarios.addEventListener('click', mostrar_catalogo_usuarios);
    btn_catalogo_tipos_usuario.addEventListener('click', mostrar_catalogo_tipos_usuario);
    // espacios de trabajo
    // btn_agregar_espacio_trabajo.addEventListener('click', crear_espacio_trabajo)
    // btn_guardar_espacio_trabajo.addEventListener('click', guardar_datos_espacio_trabajo)
    // btn_editar_espacio_trabajo.addEventListener('click', editar_espacio_trabajo)
    // btn_eliminar_espacio_trabajo.addEventListener('click', eliminar_espacio_trabajo)
    // select_espacios_trabajo.addEventListener('change',(event) => {
    //     limpiar_contenedor_paginas()
    //     cargar_lista_proyectos(event.target.value)
    // });
    // proyectos
    btn_nuevo_proyecto.addEventListener('click', crear_proyecto)
    btn_guardar_proyecto.addEventListener('click', guardar_datos_proyecto)
    contenedor_lista_proyectos.addEventListener('click',(event) => {opciones_proyecto(event)});
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

function mostrar_informacion_proyecto(id_proyecto, nombre_proyecto){
    limpiar_contenedor_paginas()
    document.querySelector("#titulo_nombre_proyecto").textContent = nombre_proyecto;
    document.querySelector("#btn_nuevo_grupo").value = id_proyecto;
    cargar_grupos(id_proyecto)
    document.querySelector("#vista_grupos").style.display = "";
}

function opciones_proyecto(event){
    // console.log(event.target)
    let btn_seleccionado = event.target;
    let btn_proyecto_lista = btn_seleccionado.parentElement.parentElement.previousElementSibling;

    if(btn_seleccionado.classList.contains('btn_renombrar_proyecto')){
        editar_proyecto(btn_proyecto_lista)
    }else if(btn_seleccionado.classList.contains('btn_eliminar_proyecto')){
        eliminar_proyecto(btn_proyecto_lista)
    }else if(btn_seleccionado.classList.contains('btn_proyecto_lista')){
        mostrar_informacion_proyecto(btn_seleccionado.value, btn_seleccionado.textContent)
    }
}

function limpiar_contenedor_paginas(){
    let elementos_contenedor_paginas = document.querySelectorAll(".vista_sistema");
    
    elementos_contenedor_paginas.forEach(element => {
        console.log(element)
       element.style.display = 'none';
    });

    console.log("limpiado ya")
}

function menu_estatus_actividad(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/estatus_actividad/show`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                res.forEach(estatus => {
                    opciones_estatus_actividad += `<button class="dropdown-item"
                        type="button"
                        style="background-color:${estatus.color}"
                        value="${estatus.id_estatus_actividad}"
                        onclick="set_estatus_actividad(this.value, '${estatus.color}', event)">
                            ${estatus.nombre_estatus}
                    </button>`;
                });
            },
            error: function (err) {
                reject()
            }
        });
    });
}

function select_usuarios(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/usuarios/show`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                opciones_usuarios = `<select class="custom-select" id="" aria-label="Example select with button addon">
                    <option value="">Seleccionar usuario</option>
                `;

                res.forEach(usuario => {
                    opciones_usuarios += `<option value="${usuario.id_usuario}">${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}</option>`;
                });

                opciones_usuarios += `</select>`;
            },
            error: function (err) {
                reject()
            }
        });
    });
}