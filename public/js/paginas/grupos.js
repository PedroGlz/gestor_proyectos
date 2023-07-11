function mostrar_sistema_proyectos(id_tablero){
    document.querySelector("#btn_nuevo_grupo").value = id_tablero;
    cargar_grupo(id_tablero)
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

    let datos_alta = {
        id_tablero: event.target.value
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

// validar_grupo()

// /* FUNCIONES */
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
            console.log(res)
            let datos = res.data;
            console.log(datos)
            // // Si fue un create se crea de nuevo el select con los datos nuevos
            // if(form_action == "/grupo/create"){
            //     // Despues de crearse el registro en BD se el select
                cargar_grupo(datos.id_tablero).then(() => {
            //         // select_grupo.value = res.id_creado
                });
            // // Si no, solo se le cambia el nombre al option
            // }else{
            //     let datos = res.data;
            //     console.log(res)
            //     console.log(datos)

            //     document.querySelector(`#tab_list_${res.id_grupo}`).setAttribute("privacidad", datos.privacidad);
            //     document.querySelector(`#tab_list_${res.id_grupo}`).innerHTML = `<i class="far fa-clipboard"></i>&nbsp;&nbsp;${datos.nombre_grupo}`;
            // }

            // // Cerramos elmodal
            // $('#modal_grupo').modal('hide');
            // // Mostramos mensaje de operacion exitosa
            // Toast.fire({
            //     icon: 'success',
            //     title: 'Agregado'
            // })
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function editar_grupo(btn){
    console.log(btn)

    cambiar_action_form_grupo('update');
    
    // Validando si es privado para activar el checBox
    document.querySelector("#grupo_privado").removeAttribute("checked")
    document.querySelector("#grupo_publico").removeAttribute("checked")
    if(btn.getAttribute("privacidad") == 1){
        document.querySelector("#grupo_privado").setAttribute("checked", "");
    }else{
        document.querySelector("#grupo_publico").setAttribute("checked", "");
    }

    document.querySelector("#id_grupo").value = btn.value;
    document.querySelector("#nombre_grupo").value = btn.innerText.trim();
    
    $('#modal_grupo').modal('show')
}

function eliminar_grupo(btn){
    console.log(btn.value)
    $.ajax({
        url: `grupo/delete/${btn.value}`,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)

            document.querySelector(`#tab_list_${btn.value}`).parentElement.remove();

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

function cargar_grupo(id_tablero_grupo){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/grupos/show/${id_tablero_grupo}`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                // document.querySelector("#id_espacio_trabajo_grupo").value = id_espacio_trabajo_grupo;
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
                    <div class="card collapsed-card">
                        <div class="card-header" style="background-color: ${grupo.color_grupo}">
                            <div class="row">
                            <div class="input-group col-6">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn text-white btn_control_colapsar_card" data-card-widget="collapse">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control elemento_titulo_grupo text-white" placeholder="Nombre grupo" value="${grupo.nombre_grupo}">
                                <button type="button" class="btn btn-light elemento_titulo_grupo btn_actualizar_nombre_grupo" onclick="myFunction(this.value)" value="${grupo.id_grupo}"><i class="fas fa-sync-alt"></i></button>
                            </div>
            
                            <div class="col-6 d-flex justify-content-end">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-light elemento_titulo_grupo btn_eliminar_grupo" onclick="myFunction(this.value)" value="${grupo.id_grupo}"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                            </div>
                        </div>
            
                        <div class="card-body" style="display: none;">
                            <div id="jsGrid1">aqui va la tabla</div>
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

function myFunction(valor){
    console.log("botoncito hcidos")
    console.log(valor)
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
//     document.querySelector("#form_grupo").setAttribute("action",`/grupo/${operacion}`);    
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