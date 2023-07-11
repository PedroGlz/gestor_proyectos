$('#modal_tableros').on('hide.bs.modal', limpiar_form_tableros);

validar_tablero()

/* FUNCIONES */
function crear_tableros() {
    if(select_espacios_trabajo.value == 0){
        // Mostramos mensaje error
        Toast.fire({
            icon: 'warning',
            title: 'Seleccionar espacio de trabajo'
        })
        return;
    }

    cambiar_action_form_tableros('create');
    document.querySelector("#id_espacio_trabajo_tablero").value = select_espacios_trabajo.value;
    $('#modal_tableros').modal('show');
}

function guardar_datos_tablero(){
    if($("#form_tableros").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_tableros").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_tableros"));
        
        $.ajax({
            data: formData,
            url: form_action,
            type: "POST",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                
                // Si fue un create se crea de nuevo el select con los datos nuevos
                if(form_action == "/tableros/create"){
                    // Despues de crearse el registro en BD se el select
                    cargar_lista_tableros(select_espacios_trabajo.value).then(() => {
                        // select_tableros.value = res.id_creado
                    });
                // Si no, solo se le cambia el nombre al option
                }else{
                    let datos = res.data;
                    console.log(res)
                    console.log(datos)

                    document.querySelector(`#tab_list_${res.id_tablero}`).setAttribute("privacidad", datos.privacidad);
                    document.querySelector(`#tab_list_${res.id_tablero}`).innerHTML = `<i class="far fa-clipboard"></i>&nbsp;&nbsp;${datos.nombre_tablero}`;
                }

                // Cerramos elmodal
                $('#modal_tableros').modal('hide');
                // Mostramos mensaje de operacion exitosa
                Toast.fire({
                    icon: 'success',
                    title: 'Agregado'
                })
            },
            error: function (err) {
                console.log(err.statusText);
            }
        });
    }
}

function opciones_tablero(event){
    let btn_seleccionado = event.target;
    let btn_tablero_lista = btn_seleccionado.parentElement.parentElement.previousElementSibling;

    if(btn_seleccionado.classList.contains('btn_renombrar_tablero')){
        editar_tablero(btn_tablero_lista)
    }else if(btn_seleccionado.classList.contains('btn_eliminar_tablero')){
        eliminar_tablero(btn_tablero_lista)
    }
}

function editar_tablero(btn){
    console.log(btn)

    cambiar_action_form_tableros('update');
    
    // Validando si es privado para activar el checBox
    document.querySelector("#tablero_privado").removeAttribute("checked")
    document.querySelector("#tablero_publico").removeAttribute("checked")
    if(btn.getAttribute("privacidad") == 1){
        document.querySelector("#tablero_privado").setAttribute("checked", "");
    }else{
        document.querySelector("#tablero_publico").setAttribute("checked", "");
    }

    document.querySelector("#id_tablero").value = btn.value;
    document.querySelector("#nombre_tablero").value = btn.innerText.trim();
    
    $('#modal_tableros').modal('show')
}

function eliminar_tablero(btn){
    console.log(btn.value)
    $.ajax({
        url: `tableros/delete/${btn.value}`,
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

function cargar_lista_tableros(id_espacio_trabajo_tablero){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/tableros/show/${id_espacio_trabajo_tablero}`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                document.querySelector("#id_espacio_trabajo_tablero").value = id_espacio_trabajo_tablero;
                // Limpiando el contenedor de la lista de tableros
                contenedor_lista_tableros.innerHTML=""

                if(res.length == 0){
                    contenedor_lista_tableros.innerHTML = `<p class="text-center">Este espacio de trabajo está vacío</p>`;
                }

                // creando el la lista de tableros existentes
                res.forEach(tablero => {
                    contenedor_lista_tableros.innerHTML += `
                    <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-dark btn-sm rounded-0 border-0 text-left btn_tablero_lista" id="tab_list_${tablero.id_tablero}" value="${tablero.id_tablero}" privacidad="${tablero.privacidad}">
                        <i class="far fa-clipboard"></i>
                        &nbsp;${tablero.nombre_tablero}
                    </button>
                    <div class="dropdown">
                      <button class="btn btn-dark btn-sm rounded-0 border-0 h-100" type="button" data-toggle="dropdown" aria-expanded="false">...</button>
                      <div class="dropdown-menu">
                        <button class="dropdown-item btn_renombrar_tablero" type="button" style="font-size:14px" value="${tablero.id_tablero}" privacidad="${tablero.privacidad}">
                            <i class="fas fa-pen fa-xs text-secondary"></i>
                            &nbsp;Renombrar
                        </button>

                        <button class="dropdown-item btn_eliminar_tablero" type="button" style="font-size:14px" value="${tablero.id_tablero}" privacidad="${tablero.privacidad}">
                            <i class="fas fa-trash fa-xs text-secondary"></i>
                            &nbsp;Eliminar
                        </button>
                      </div>
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

function validar_tablero(){
    proceso_validacion_tablero = $('#form_tableros').validate({
        rules: {
          nombre_tablero: {
            required: true
          }
        },
        messages: {
          nombre_tablero: {
            required: "Ingresar nombre del tablero"
          }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
    });
}

// Función que limpia el formulario y cambia el action
// cuando se va a agregar o editar un registro
function cambiar_action_form_tableros(operacion){
    document.querySelector("#form_tableros").removeAttribute("action");
    document.querySelector("#form_tableros").setAttribute("action",`/tableros/${operacion}`);    
}

// Función que restablece todo el form
function limpiar_form_tableros(){
    // Limpia los valores del form
    $('#form_tableros')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_tablero.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_tableros').find(".is-invalid").removeClass("is-invalid");
}