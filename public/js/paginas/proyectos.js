$('#modal_proyectos').on('hide.bs.modal', limpiar_form_proyectos);

validar_proyecto()

/* FUNCIONES */
function crear_proyecto() {
    cambiar_action_form_proyectos('create');
    $('#modal_proyectos').modal('show');
}

function guardar_datos_proyecto(){
    if($("#form_proyectos").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_proyectos").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_proyectos"));
        
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
                if(form_action == "/proyectos/create"){
                    // Despues de crearse el registro en BD se el select
                    cargar_lista_proyectos().then(() => {
                        // select_proyectos.value = res.id_creado
                    });
                // Si no, solo se le cambia el nombre al option
                }else{
                    let datos = res.data;
                    console.log(res)
                    console.log(datos)

                    document.querySelector(`#tab_list_${res.id_proyecto}`).setAttribute("privacidad", datos.privacidad);
                    document.querySelector(`#tab_list_${res.id_proyecto}`).innerHTML = `<i class="far fa-clipboard"></i>&nbsp;&nbsp;${datos.nombre_proyecto}`;
                }

                // Cerramos elmodal
                $('#modal_proyectos').modal('hide');
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

function editar_proyecto(btn){
    console.log(btn)

    cambiar_action_form_proyectos('update');
    
    // Validando si es privado para activar el checBox
    document.querySelector("#proyecto_privado").removeAttribute("checked")
    document.querySelector("#proyecto_publico").removeAttribute("checked")
    if(btn.getAttribute("privacidad") == 1){
        document.querySelector("#proyecto_privado").setAttribute("checked", "");
    }else{
        document.querySelector("#proyecto_publico").setAttribute("checked", "");
    }

    document.querySelector("#id_proyecto").value = btn.value;
    document.querySelector("#nombre_proyecto").value = btn.innerText.trim();
    
    $('#modal_proyectos').modal('show')
}

function eliminar_proyecto(btn){
    console.log(btn.value)
    $.ajax({
        url: `proyectos/delete/${btn.value}`,
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

function cargar_lista_proyectos(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/proyectos/show`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                
                // Limpiando el contenedor de la lista de proyectos
                contenedor_lista_proyectos.innerHTML=""

                if(res.length == 0){
                    contenedor_lista_proyectos.innerHTML = `<p class="text-center">Este espacio de trabajo está vacío</p>`;
                }

                // creando el la lista de proyectos existentes
                res.forEach(proyecto => {
                    contenedor_lista_proyectos.innerHTML += `
                    <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-dark btn-sm rounded-0 border-0 text-left btn_proyecto_lista" id="tab_list_${proyecto.id_proyecto}" value="${proyecto.id_proyecto}" privacidad="${proyecto.privacidad}">
                        <i class="far fa-clipboard"></i>
                        &nbsp;${proyecto.nombre_proyecto}
                    </button>
                    <div class="dropdown">
                      <button class="btn btn-dark btn-sm rounded-0 border-0 h-100" type="button" data-toggle="dropdown" aria-expanded="false">...</button>
                      <div class="dropdown-menu">
                        <button class="dropdown-item btn_renombrar_proyecto" type="button" style="font-size:14px" value="${proyecto.id_proyecto}" privacidad="${proyecto.privacidad}">
                            <i class="fas fa-pen fa-xs text-secondary"></i>
                            &nbsp;Renombrar
                        </button>

                        <button class="dropdown-item btn_eliminar_proyecto" type="button" style="font-size:14px" value="${proyecto.id_proyecto}" privacidad="${proyecto.privacidad}">
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

function validar_proyecto(){
    proceso_validacion_proyecto = $('#form_proyectos').validate({
        rules: {
          nombre_proyecto: {
            required: true
          }
        },
        messages: {
          nombre_proyecto: {
            required: "Ingresar nombre del proyecto"
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
function cambiar_action_form_proyectos(operacion){
    document.querySelector("#form_proyectos").removeAttribute("action");
    document.querySelector("#form_proyectos").setAttribute("action",`/proyectos/${operacion}`);    
}

// Función que restablece todo el form
function limpiar_form_proyectos(){
    // Limpia los valores del form
    $('#form_proyectos')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_proyecto.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_proyectos').find(".is-invalid").removeClass("is-invalid");
}