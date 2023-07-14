// validar_grupo()

contenedor_grupos_creados.addEventListener('click', (event) => {console.log(event.target)});

// /* FUNCIONES */
function mostrar_sistema_actividades(id_tablero){
    limpiar_contenedor_paginas()
    document.querySelector("#btn_nuevo_grupo").value = id_tablero;
    cargar_grupos(id_tablero)
    document.querySelector("#vista_grupos").style.display = "";
}

function expandir_cards_actividades(){
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
                
                let icono_colapso = 'minus';
                let calse_colapso =  'collapsed-show';
                // creando el la lista de grupo existentes
                res.forEach(grupo => {
                    
                    if(grupo.estatus_colapso == 1){
                        icono_colapso = 'plus';
                        calse_colapso =  '';
                    }else{
                        icono_colapso = 'minus';
                        calse_colapso =  'collapsed-show';
                    }
                    contenedor_grupos_creados.innerHTML += `
                    <div class="card" style="border-right: 4px solid #bcbcbc; border-bottom: 4px solid #bcbcbc;">
                        <div class="card-header" style="background-color: ${grupo.color_grupo}">
                            <div class="row">
                                <div class="input-group col-6">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn text-white btn_control_colapsar_card" data-card-widget="collapse">
                                            <i class="fas fa-${icono_colapso}"></i>
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
            
                        <div class="card-body ${calse_colapso}" style="display: block; padding:4px;">
                            <div id="jsgrid_grupo_${grupo.id_grupo}" class="table-responsive"></div>
                            <table class="table table-bordered table-hover text-center tabla_actividades" id="" style="border-left: 6px solid ${grupo.color_grupo}"">
                                <thead>
                                    <tr>
                                        <th class="d-none">id_actividad</th>
                                        <th class="d-none">id_grupo</th>
                                        <th class="d-none">usuario_creador</th>
                                        <th class="d-none">privacidad</th>
                                        <th class="d-none">activo</th>
                                        <th>actividad</th>
                                        <th>Personas</th>
                                        <th>Estado</th>
                                        <th>Fecha incio</th>
                                        <th>Fecha fin</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="d-none">celda</td>
                                        <td class="d-none">celda</td>
                                        <td class="d-none">celda</td>
                                        <td class="d-none">celda</td>
                                        <td class="d-none">celda</td>
                                        <td><input type="text" name="" id="" class="form-control grupo_text"></td>
                                        <td>
                                            <div class="dropdown">
                                                <button class="btn btn-block" type="button" data-toggle="dropdown" aria-expanded="false">
                                                    <i class="fas fa-users fa-lg"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                <form class="px-4 py-3">
                                                  <div class="form-group">
                                                    <label for="exampleDropdownFormEmail1">Email address</label>
                                                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
                                                  </div>
                                                  <div class="form-group">
                                                    <label for="exampleDropdownFormPassword1">Password</label>
                                                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
                                                  </div>
                                                  <div class="form-group">
                                                    <div class="form-check">
                                                      <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                                      <label class="form-check-label" for="dropdownCheck">
                                                        Remember me
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <button type="submit" class="btn btn-primary">Sign in</button>
                                                </form>
                                                <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="#">New around here? Sign up</a>
                                                <a class="dropdown-item" href="#">Forgot password?</a>
                                              </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-outline-dark btn-block grupo_text" data-toggle="dropdown" style="height:38px"
                                                aria-haspopup="true" aria-expanded="true">

                                            </button>
                                            <div class="dropdown-menu dropdown-menu-right"
                                                style="position: absolute; transform: translate3d(-134px, 14px, 0px); top: 0px; left: 0px; will-change: transform;"
                                                x-placement="bottom-end">
                                                <button class="dropdown-item bg-warning" type="button">En
                                                    curso</button>
                                                <button class="dropdown-item bg-success"
                                                    type="button">Listo</button>
                                                <button class="dropdown-item bg-danger"
                                                    type="button">Detenido</button>
                                            </div>
                                        </td>
                                        <td><input type="date" name="" id="" class="form-control"></td>
                                        <td><input type="date" name="" id="" class="form-control"></td>
                                        <td><textarea name="" id="" rows="1" class="form-control"></textarea></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" name="" id="" class="form-control" placeholder="+ Agregar elemento"></td>
                                        <td colspan="5">
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

