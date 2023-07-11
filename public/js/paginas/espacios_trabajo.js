var proceso_validacion_espacio_trabajo;

validar_espacio_trabajo()

$('#modal_espacios_trabajo').on('hide.bs.modal', limpiar_form_espacios_trabajo);

/* FUNCIONES */
function crear_espacio_trabajo() {
    cambiar_action_form_espacios_trabajo('create');
    $('#modal_espacios_trabajo').modal('show');
}

function guardar_datos_espacio_trabajo(){
    if($("#form_espacios_trabajo").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_espacios_trabajo").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_espacios_trabajo"));
        
        $.ajax({
            data: formData,
            url: form_action,
            type: "POST",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                
                // Si fue un create se crea de nuevo el select con los datos nuevos
                if(form_action == "/espacios_trabajo/create"){
                    // Despues de crearse el registro en BD se el select
                    cargar_select_espacios_trabajo().then(() => {
                        select_espacios_trabajo.value = res.id_creado
                    });
                // Si no, solo se le cambia el nombre al option
                }else{
                    select_espacios_trabajo.options[select_espacios_trabajo.selectedIndex].text = document.querySelector("#nombre_espacio").value;
                }

                // Cerramos elmodal
                $('#modal_espacios_trabajo').modal('hide');
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

function editar_espacio_trabajo(){

    if(select_espacios_trabajo.value == 0){
        // Mostramos mensaje error
        Toast.fire({
            icon: 'warning',
            title: 'Seleccionar espacio de trabajo'
        })
        return;
    }
    
    cambiar_action_form_espacios_trabajo('update');
    document.querySelector("#id_espacio_trabajo").value = select_espacios_trabajo.value;
    document.querySelector("#nombre_espacio").value = select_espacios_trabajo.options[select_espacios_trabajo.selectedIndex].text;
    
    $('#modal_espacios_trabajo').modal('show')
}

function eliminar_espacio_trabajo(){
    if(select_espacios_trabajo.value == 0){
        // Mostramos mensaje error
        Toast.fire({
            icon: 'warning',
            title: 'Seleccionar espacio de trabajo'
        })
        return;
    }

    $.ajax({
        url: `espacios_trabajo/delete/${select_espacios_trabajo.value}`,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)
            $(`#select_espacios_trabajo option[value='${select_espacios_trabajo.value}']`).remove();

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

function cargar_select_espacios_trabajo(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/espacios_trabajo/show",
            type: "GET",
            dataType: 'json',
            success: function (res) {
                console.log(res)
                
                // Limpiando el select
                select_espacios_trabajo.innerHTML = "";

                // creando el select espacios de trabajo existentes
                select_espacios_trabajo.innerHTML += '<option value="0" selected>Selecionar opción</option>';
                res.forEach(espacio_trabajo => {
                    select_espacios_trabajo.innerHTML += `<option value="${espacio_trabajo.id_espacio_trabajo}" privacidad="${espacio_trabajo.privacidad}">${espacio_trabajo.nombre_espacio}</option>`;
                });

                resolve(res);
            },
            error: function (err) {
                reject(err.statusText)
            }
        });
    });
}

function validar_espacio_trabajo(){
    proceso_validacion_espacio_trabajo = $('#form_espacios_trabajo').validate({
        rules: {
          nombre_espacio: {
            required: true
          }
        },
        messages: {
          nombre_espacio: {
            required: "Ingresar nombre del espacio de trabajo"
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
function cambiar_action_form_espacios_trabajo(operacion){
    document.querySelector("#form_espacios_trabajo").removeAttribute("action");
    document.querySelector("#form_espacios_trabajo").setAttribute("action",`/espacios_trabajo/${operacion}`);    
}

// Función que restablece todo el form
function limpiar_form_espacios_trabajo(){
    // Limpia los valores del form
    $('#form_espacios_trabajo')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_espacio_trabajo.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_espacios_trabajo').find(".is-invalid").removeClass("is-invalid");
}