$('#modal_proyectos').on('hide.bs.modal', limpiar_form_proyectos);

validar_proyecto()

/* FUNCIONES */
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
                    
                    if(proyecto.usuario_creador == session_id_usuario || session_es_administrador){
                        ver_operaciones = "";
                    }else{
                        ver_operaciones = "disabled";
                    }
                    
                    contenedor_lista_proyectos.innerHTML += `
                    <div class="btn-group btn-group-sm w-100" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-dark btn-sm rounded-0 border-0 text-left btn_proyecto_lista" 
                        id="tab_list_${proyecto.id_proyecto}"
                        value="${proyecto.id_proyecto}"
                        privacidad="${proyecto.privacidad}"
                        onclick="mostrar_informacion_proyecto(event)"
                        >
                            <i class="far fa-clipboard"></i>
                            &nbsp;${proyecto.nombre_proyecto}
                    </button>
                    <div class="dropdown">
                      <button class="btn btn-dark btn-sm rounded-0 border-0 h-100" type="button" data-toggle="dropdown" aria-expanded="false" ${ver_operaciones}>...</button>
                      <div class="dropdown-menu">
                        <button class="dropdown-item" type="button" style="font-size:14px" value="${proyecto.id_proyecto}" privacidad="${proyecto.privacidad}" onclick="editar_proyecto(event)">
                            <i class="fas fa-pen fa-xs text-secondary"></i>
                            &nbsp;Renombrar
                        </button>

                        <button class="dropdown-item" type="button" style="font-size:14px" value="${proyecto.id_proyecto}" privacidad="${proyecto.privacidad}" onclick="eliminar_proyecto(this.value,'${proyecto.nombre_proyecto}')">
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

function crear_proyecto() {
    cambiar_action_form_proyectos('create');
    $('#modal_proyectos').modal('show');
}

function mostrar_informacion_proyecto(event){
    let btn = event.target;
    // COlocando fechas proyecto
    $.ajax({
        url: `/proyectos/datos_proyecto`,
        data: {id_proyecto: btn.value},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            console.log(res)
            document.querySelector(`#proyecto_fecha_inicio`).textContent = res[0].fecha_inicio;
            document.querySelector(`#proyecto_fecha_fin`).textContent = res[0].fecha_fin;
        },
        error: function (err) {
        }
    });

    limpiar_contenedor_paginas()
    
    document.querySelector("#titulo_nombre_proyecto").textContent = btn.textContent;
    document.querySelector("#btn_nuevo_grupo").value = btn.value;
    // COlocando fechas proyecto
    cargar_grupos(btn.value)
    document.querySelector("#vista_grupos").style.display = "";
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

function editar_proyecto(event){
    let btn = event.target.parentElement.parentElement.previousElementSibling;

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

function eliminar_proyecto(id,nombre_proyecto){
    Swal.fire({
        title: '<span style="color:red">Eliminar<span>',
        html: `El proyecto <b>${nombre_proyecto}</b> será <b>eliminado</b> <b>permanentemente</b>,<br> <ins>¿Confirma la operación?</ins>`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `proyectos/delete/${id}`,
                type: "GET",
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log(res)

                    if(!res.status){
                        alertLodading("El proyecto <b>No se puede eliminar</b> ya que <b>contiene actividades.</b>","warning")
                        return;
                    }

                    document.querySelector(`#tab_list_${id}`).parentElement.remove();
                    limpiar_contenedor_paginas();
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
    })

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