// validar_grupo()

// /* FUNCIONES */
function mostrar_sistema_proyectos(id_tablero){
    limpiar_contenedor_paginas()
    document.querySelector("#btn_nuevo_grupo").value = id_tablero;
    cargar_grupos(id_tablero)
    document.querySelector("#vista_grupos").style.display = "";
}

function expandir_cards_proyectos(){
    let btn_expandir = document.querySelectorAll(".btn_control_colapsar_card");
    btn_expandir.forEach(element => {
        console.log(element)
       element.click()
    });
}

function crear_grupo(event){
    let btn = event.target;
    // Si se dio click en el icono rescatamos el boton
    if(btn.classList.contains('fas')){
        btn = btn.parentElement;
    }
    console.log(btn)
    let datos_alta = {
        id_tablero: btn.value
    }

    if(datos_alta.id_tablero == "undefined" || datos_alta.id_tablero == ''){
        // Mostramos mensaje error
        Toast.fire({
            icon: 'warning',
            title: 'Seleccionar tablero'
        })
        return;
    }
    
    guardar_datos_grupo('/grupos/create',datos_alta);
}

// function crear_grupo() {
//     if(select_espacios_trabajo.value == 0){
//         // Mostramos mensaje error
//         Toast.fire({
//             icon: 'warning',
//             title: 'Seleccionar espacio de trabajo'
//         })
//         return;
//     }

//     cambiar_action_form_grupo('create');
//     document.querySelector("#id_espacio_trabajo_grupo").value = select_espacios_trabajo.value;
//     $('#modal_grupo').modal('show');
// }

function guardar_datos_grupo(accion,formData){
    $.ajax({
        data: formData,
        url: accion,
        type: "POST",
        dataType: 'json',
        // processData: false,
        // contentType: false,
        success: function (res) {
            let datos = res.data;
            console.log(res)
            // Si fue un create se crea de nuevo el select con los datos nuevos
            if(accion == "/grupos/create"){
                // Despues de crearse el registro en BD se el select
                cargar_grupos(datos.id_tablero)
            }

            // // Mostramos mensaje de operacion exitosa
            Toast.fire({
                icon: 'success',
                title: 'Guardado'
            })
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function editar_grupo(event){
    let btn = event.target;
    // Si se dio click en el icono rescatamos el boton
    if(btn.classList.contains('btn_actualizar_nombre_grupo') && btn.classList.contains('fas')){
        btn = btn.parentElement;
    }
    let input_nombre_grupo = btn.previousElementSibling.value;
    let color_grupo_card = btn.parentElement.parentElement.parentElement.style.backgroundColor;

    if(btn.classList.contains('btn_actualizar_nombre_grupo')){
        let datos_edit = {
            id_grupo: btn.value,
            nombre_grupo: input_nombre_grupo,
            color_grupo: color_grupo_card,
        }
    
        if(datos_edit.id_grupo == "undefined" || datos_edit.id_grupo == '' ||
            datos_edit.nombre_grupo == "undefined" || datos_edit.nombre_grupo == ''){
            // Mostramos mensaje error
            Toast.fire({
                icon: 'warning',
                title: 'Datos incompletos'
            })
            return;
        }
        
        console.log(datos_edit);
        guardar_datos_grupo('/grupos/update',datos_edit);
    }

}

function eliminar_grupo(event){
    let btn = event.target;
    
    // Si se dio click en el icono rescatamos el boton
    if(btn.classList.contains('btn_eliminar_grupo') && btn.classList.contains('fas')){
        btn = btn.parentElement;
    }
    let card_completo = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
    
    $.ajax({
        url: `grupos/delete/${btn.value}`,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)
            // Eliminamos el card del DOM
            card_completo.remove();

            // Mostramos mensaje de operacion exitosa
            Toast.fire({
                icon: 'success',
                title: 'Eliminado'
            })
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });

}

function cargar_grupos(id_tablero_grupo){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/grupos/show/${id_tablero_grupo}`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                // Limpiando el contenedor de la lista de grupo
                contenedor_grupos_creados.innerHTML=""

                if(res.length == 0){
                    contenedor_grupos_creados.innerHTML = `
                    <div class="alert alert-danger text-center" role="alert" style="
                        color: black;
                        background-color: #fad3d6;
                        border-color: #ff0017;
                    "><h5>Este tablero está vacío</h5></div>`;
                }

                // creando el la lista de grupo existentes
                res.forEach(grupo => {
                    contenedor_grupos_creados.innerHTML += `
                    <div class="card collapsed-card" style="border-right: 4px solid #bcbcbc; border-bottom: 4px solid #bcbcbc;">
                        <div class="card-header" style="background-color: ${grupo.color_grupo}">
                            <div class="row">
                                <div class="input-group col-6">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn text-white btn_control_colapsar_card" data-card-widget="collapse">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control elemento_titulo_grupo text-white" placeholder="Nombre grupo" value="${grupo.nombre_grupo}">
                                    <button type="button" class="btn btn-light elemento_titulo_grupo btn_actualizar_nombre_grupo" onclick="editar_grupo(event)" value="${grupo.id_grupo}">
                                        <i class="fas fa-sync-alt btn_actualizar_nombre_grupo"></i>
                                    </button>
                                </div>
            
                                <div class="col-6 d-flex justify-content-end">
                                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-light elemento_titulo_grupo btn_eliminar_grupo" onclick="eliminar_grupo(event)" value="${grupo.id_grupo}">
                                            <i class="fas fa-trash btn_eliminar_grupo"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div class="card-body collapsed-show" style="display: block; padding:4px;">
                            <div id="jsgrid_grupo_${grupo.id_grupo}"></div>
                            <table class="table table-bordered table-hover" id="jsGrid">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr data-widget="expandable-table" aria-expanded="false">
                                        <td>982</td>
                                        <td>Rocky Doe</td>
                                        <td>11-7-2014</td>
                                        <td>Denied</td>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                    </tr>
                                    <tr class="expandable-body d-none">
                                        <td colspan="5">
                                            <table class="table table-bordered table-hover" style="display: none;">
                                                <tbody>
                                                    <tr>
                                                        <th>Company</th>
                                                        <th>Contact</th>
                                                        <th>Country</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Alfreds Futterkiste</td>
                                                        <td>Maria Anders</td>
                                                        <td>Germany</td>
                                                    </tr>
                                                    <tr class="expandable-body">
                                                        <td>Centro comercial Moctezuma</td>
                                                        <td>Francisco Chang</td>
                                                        <td>Mexico</td>
                                                    </tr>
                                                    <tr class="expandable-body">
                                                        <td colspan="3">
                                                            <p>
                                                                Lorem Ipsum is simply dummy text of the printing and
                                                                typesetting industry. Lorem Ipsum has been the
                                                                industry's standard dummy text ever since the 1500s,
                                                                when an unknown printer took a galley of type and
                                                                scrambled it to make a type specimen book. It has
                                                                survived not only five centuries, but also the leap into
                                                                electronic typesetting, remaining essentially unchanged.
                                                                It was popularised in the 1960s with the release of
                                                                Letraset sheets containing Lorem Ipsum passages, and
                                                                more recently with desktop publishing software like
                                                                Aldus PageMaker including versions of Lorem Ipsum.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`;
                });

                resolve(res);
            },
            error: function (err) {
                reject(err.statusText)
            }
        });
    });
}

// function validar_grupo(){
//     proceso_validacion_grupo = $('#form_grupo').validate({
//         rules: {
//           nombre_grupo: {
//             required: true
//           }
//         },
//         messages: {
//           nombre_grupo: {
//             required: "Ingresar nombre del grupo"
//           }
//         },
//         errorElement: 'span',
//         errorPlacement: function (error, element) {
//           error.addClass('invalid-feedback');
//           element.closest('.form-group').append(error);
//         },
//         highlight: function (element, errorClass, validClass) {
//           $(element).addClass('is-invalid');
//         },
//         unhighlight: function (element, errorClass, validClass) {
//           $(element).removeClass('is-invalid');
//         }
//     });
// }

// // Función que limpia el formulario y cambia el action
// // cuando se va a agregar o editar un registro
// function cambiar_action_form_grupo(operacion){
//     document.querySelector("#form_grupo").removeAttribute("action");
//     document.querySelector("#form_grupo").setAttribute("action",`/grupos/${operacion}`);    
// }

// // Función que restablece todo el form
// function limpiar_form_grupo(){
//     // Limpia los valores del form
//     $('#form_grupo')[0].reset();
//     // Quita los mensajes de error y limpia los valodes del form
//     proceso_validacion_grupo.resetForm();
//     // Quita los estilos de error de los inputs
//     $('#form_grupo').find(".is-invalid").removeClass("is-invalid");
// }

