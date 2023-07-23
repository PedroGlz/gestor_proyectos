var tabla_estatus_actividad;
var proceso_validacion_estatus_actividad;

window.addEventListener('DOMContentLoaded', (event) => {
    /* Variables del DOM */
    const btn_nuevo_estatus_actividad = document.querySelector('#btn_nuevo_estatus_actividad');
    const btn_guardar_estatus_actividad = document.querySelector('#btn_guardar_estatus_actividad');

    // Creando el cuerpo de la tabla con dataTable y ajax
    tabla_estatus_actividad = $("#tabla_estatus_actividad").DataTable({
        // Petición para llenar la tabla
        "ajax": {
            url: '/estatus_actividad/show',
            dataSrc: ''
        },
        "columns": [
            {data: 'id_estatus_actividad', visible:false},
            {data: 'nombre_estatus',},
            {data: 'color',},
            {data: 'activo', visible:false},
            // Botones para editar y eliminar
            { data: null, render: function ( data, type, row ) {
                    return `<button class="btn btn-info btn-xs editar_estatus_actividad" value="${row.id_estatus_actividad}"><i class="fas fa-pencil-alt"></i></button>
                            <button class="btn btn-danger btn-xs" value="${row.id_estatus_actividad}" onclick="eliminar_estatus_actividad(this.value,'${row.nombre_estatus}')"><i class="fas fa-trash-alt"></i></button>`;
                },
                visible: session_es_administrador
            },
        ],
        // Indicamos el indice de la columna a ordenar y tipo de ordenamiento
        order: [[0, 'desc']],
        // Habilitar o deshabilitar el ordenable en las columnas
        'columnDefs': [ {
            'targets': [4], /* table column index */
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
    $('#tabla_estatus_actividad tbody').on('click', '.editar_estatus_actividad', function () {
        var dataRow = tabla_estatus_actividad.row($(this).parents('tr')).data();
        cambiar_action_estatus_actividad('update');
        editar_estatus_actividad(dataRow);
    });

    validar_form_estatus_actividad()
    cargar_event_isteners_estatus_actividad();
});

/* Listeners */
function cargar_event_isteners_estatus_actividad() {
    // Se activa cuando se presiona "Nuevo"
    btn_nuevo_estatus_actividad.addEventListener('click', () =>{
        cambiar_action_estatus_actividad('create');
    });
    // Se activa cuando se hace clic en el boton guardar del modal
    btn_guardar_estatus_actividad.addEventListener('click', guardar_datos_estatus_actividad);
    $('#modal_estatus_actividad').on('hide.bs.modal', limpiar_form_estatus_actividad);
}

/* Funciones */

// Función que agrega un cliente nuevo a la BD o edita un cliente
function guardar_datos_estatus_actividad(){
    if($("#form_estatus_actividad").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_estatus_actividad").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_estatus_actividad"));
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
                $('#tabla_estatus_actividad').DataTable().ajax.reload();
                // Creamos el nuevo select
                menu_estatus_actividad()
                // Se cierra el modal
                $('#modal_estatus_actividad').modal('hide');
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

function eliminar_estatus_actividad(id,nombre_estatus){
    Swal.fire({
        title: '<span style="color:red">Eliminar<span>',
        html: `El estatus <b>${nombre_estatus}</b> será <b>eliminado</b> <b>permanentemente</b>,<br> <ins>¿Confirma la operación?</ins>`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'estatus_actividad/delete/'+id,
                type: "GET",
                dataType: 'json',
                success: function (res) {
                    // Despues de eliminar el registro en BD se actualiza la tabla
                    $('#tabla_estatus_actividad').DataTable().ajax.reload();
                    // Creamos el nuevo select
                    menu_estatus_actividad()
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
function editar_estatus_actividad(dataRow){
    console.log(dataRow.id_estatus_actividad);
    console.log(document.querySelector('#id_estatus_actividad'))
    document.querySelector('#id_estatus_actividad').value = dataRow.id_estatus_actividad;
    document.querySelector('#nombre_estatus').value = dataRow.nombre_estatus;
    document.querySelector('#color').value = dataRow.color;

    // Creamos el nuevo select
    menu_estatus_actividad()

    $('#modal_estatus_actividad').modal('show');
}

// Función que limpia el formulario y cambia el action
// cuando se va a agregar o editar un registro
function cambiar_action_estatus_actividad(operacion){
    document.querySelector("#form_estatus_actividad").removeAttribute("action");
    document.querySelector("#form_estatus_actividad").setAttribute("action",`/estatus_actividad/${operacion}`);
}

// Función que restablece todo el form
function limpiar_form_estatus_actividad(){
    // Limpia los valores del form
    $('#form_estatus_actividad')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_estatus_actividad.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_estatus_actividad').find(".is-invalid").removeClass("is-invalid");
}

function validar_form_estatus_actividad(){
    proceso_validacion_estatus_actividad = $('#form_estatus_actividad').validate({
        rules: {
            nombre_estatus: {
            required: true,
          }
        },
        messages: {
            nombre_estatus: {
            required: "Ingresar estatus"
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