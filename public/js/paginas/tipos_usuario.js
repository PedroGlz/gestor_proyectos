var tabla_tipos_usuario;
var proceso_validacion_tipos_usuario;

window.addEventListener('DOMContentLoaded', (event) => {
    /* Variables del DOM */
    const btn_nuevo_tipo_usuario = document.querySelector('#btn_nuevo_tipo_usuario');
    const btn_guardar_tipo_usuario = document.querySelector('#btn_guardar_tipo_usuario');

    // Creando el cuerpo de la tabla con dataTable y ajax
    tabla_tipos_usuario = $("#tabla_tipos_usuario").DataTable({
        // Petición para llenar la tabla
        "ajax": {
            url: '/tipos_usuario/show',
            dataSrc: ''
        },
        "columns": [
            {data: 'id_tipo_usuario', visible:false},
            {data: 'tipo_usuario'},
            {data: 'activo', visible:false},
            // Botones para editar y eliminar
            { data: null, render: function ( data, type, row ) {
                    return `<button class="btn btn-info btn-xs editar_tipos_usuario" value="${row.id_tipo_usuario}"><i class="fas fa-pencil-alt"></i></button>
                            <button class="btn btn-danger btn-xs " value="${row.id_tipo_usuario}" onclick="eliminar_tipos_usuario(this.value,'${row.tipo_usuario}')"><i class="fas fa-trash-alt"></i></button>`;
                },
                visible: session_es_administrador
            },
        ],
        // Indicamos el indice de la columna a ordenar y tipo de ordenamiento
        order: [[0, 'desc']],
        // Habilitar o deshabilitar el ordenable en las columnas
        'columnDefs': [ {
            'targets': [2], /* table column index */
            'orderable': false, /* true or false */
         }],
        // Cambiamos a espeañol el idioma de los mensajes
        language: {
            info:           "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty:      "Mostrando 0 a 0 de 0 registros",
            lengthMenu:     "Mostrar _MENU_ registros",
            search:         "Buscar:",
            loadingRecords: "Loading...",
            processing:     "Procesando...",
            zeroRecords:    "No hay registros aún",
            paginate: {
                // previous: "Anterior",
                // next: "Siguiente"
                next: '>',
                previous: '<',
                first:'Inicio',
                last:'Ultimo'
            },
        },
        // Mostrar los botones de paginación Inicio y Ultimo
        pagingType: 'full_numbers',
        dom: '<"row"<"col"f>>rt<"row"<"col"l><"col"p>>',
        // Hacer el datatable responsive
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true,
        /* Para habilitar el scroll's, quitar las lineas de responsive */
        // scrollY: 200, //Scroll vertial
        // scrollX: true, //Scroll horizonta
    })

    // Obtiene todos los datos del registro en el datatable al dar clic en editar
    $('#tabla_tipos_usuario tbody').on('click', '.editar_tipos_usuario', function () {
        var dataRow = tabla_tipos_usuario.row($(this).parents('tr')).data();
        cambiar_action_tipos_usuario('update');
        editar_tipos_usuario(dataRow);
    });

    validar_form_tipo_usuario()
    cargar_event_isteners_tipos_usuario();
});

/* Listeners */
function cargar_event_isteners_tipos_usuario() {
    // Se activa cuando se presiona "Nuevo"
    btn_nuevo_tipo_usuario.addEventListener('click', () =>{
        cambiar_action_tipos_usuario('create');
    });
    // Se activa cuando se hace clic en el boton guardar del modal
    btn_guardar_tipo_usuario.addEventListener('click', guardar_datos_tipos_usuario);
    $('#modal_tipos_usuario').on('hide.bs.modal', limpiar_form_tipos_usuario);
}

/* Funciones */

// Función que agrega un cliente nuevo a la BD o edita un cliente
function guardar_datos_tipos_usuario(){
    if($("#form_tipos_usuario").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_tipos_usuario").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_tipos_usuario"));
        $.ajax({
            data: formData,
            url: form_action,
            type: "POST",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                // Despues de crearse el registro en BD se actualiza la tabla
                $('#tabla_tipos_usuario').DataTable().ajax.reload();
                // Se ccrea el select actualizado
                select_tipos_usuario("tipo_usuario_select")
                // Se cierra el modal
                $('#modal_tipos_usuario').modal('hide');
                // Mostramos mensaje de operacion exitosa
                Toast.fire({
                    icon: 'success',
                    title: 'Agregado'
                })
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
};

function eliminar_tipos_usuario(id,tipo_usuario){
    Swal.fire({
        title: '<span style="color:red">Eliminar<span>',
        html: `El tipo <b>${tipo_usuario}</b> será <b>eliminado</b> <b>permanentemente</b>,<br> <ins>¿Confirma la operación?</ins>`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'tipos_usuario/delete/'+id,
                type: "GET",
                dataType: 'json',
                success: function (res) {
                    // Despues de eliminar el registro en BD se actualiza la tabla
                    $('#tabla_tipos_usuario').DataTable().ajax.reload();
                    // Se ccrea el select actualizado
                    select_tipos_usuario("tipo_usuario_select")
                    // Mensaje de operacion exitosa
                    Toast.fire({
                        icon: 'success',
                        title: 'Eliminado'
                    })
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    })
}

// Función que cargar los datos del row clickeado y los coloca en el form y abre el modal
function editar_tipos_usuario(dataRow){
    console.log(dataRow.id_tipo_usuario);
    console.log(document.querySelector('#id_tipo_usuario'))
    document.querySelector('#id_tipo_usuario').value = dataRow.id_tipo_usuario;
    document.querySelector('#tipo_usuario').value = dataRow.tipo_usuario;

    // Se ccrea el select actualizado
    select_tipos_usuario("tipo_usuario_select")

    $('#modal_tipos_usuario').modal('show');
}

// Función que limpia el formulario y cambia el action
// cuando se va a agregar o editar un registro
function cambiar_action_tipos_usuario(operacion){
    document.querySelector("#form_tipos_usuario").removeAttribute("action");
    document.querySelector("#form_tipos_usuario").setAttribute("action",`/tipos_usuario/${operacion}`);
}

// Función que restablece todo el form
function limpiar_form_tipos_usuario(){
    // Limpia los valores del form
    $('#form_tipos_usuario')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_tipos_usuario.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_tipos_usuario').find(".is-invalid").removeClass("is-invalid");
}

function validar_form_tipo_usuario(){
    proceso_validacion_tipos_usuario = $('#form_tipos_usuario').validate({
        rules: {
          tipo_usuario: {
            required: true,
          }
        },
        messages: {
          tipo_usuario: {
            required: "Ingresar tipo de usuario"
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