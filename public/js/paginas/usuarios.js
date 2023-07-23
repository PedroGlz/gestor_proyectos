var tabla_usuarios = "";
var validar_campos_usuario = true;
var proceso_validacion_usuario;


/* VARIABLES DOM CATALOGO USUARIOS */
const btn_nuevo_usuario = document.querySelector('#btn_nuevo_usuario');
const btn_guardar_usuario = document.querySelector('#btn_guardar_usuario');

/* LLAMADO A FUNCIONES */
validar_form_usuarios();
cargar_event_listeners_usuarios()

/* Creando el cuerpo de la tabla con dataTable y ajax */
tabla_usuarios = $("#tabla_usuarios").DataTable({
    // Petición para llenar la tabla
    "ajax": {
        url: '/usuarios/show',
        dataSrc: ''
    },
    "columns": [
        {data: 'id_usuario', visible:false},
        {data: 'nombre', render: function(data, type, row) {
                return `${data} ${row.apellido_paterno} ${row.apellido_materno}`;
            }, visible: true
        },
        {data: 'apellido_paterno', visible:false},
        {data: 'apellido_materno', visible:false},
        {data: 'usuario', visible:true},
        {data: 'password', visible:false},
        {data: 'correo', visible:true},
        {data: 'telefono', visible:true},
        {data: 'tipo_usuario', visible:true},
        {data: 'activo', visible:false},
        {data: 'fecha_creacion', visible:false},
        {data: 'fecha_modificacion', visible:false},
        // Botones para editar y eliminar
        { data: null, render: function ( data, type, row ) {
                return `<button class="btn btn-info btn-xs editar_usuario" value="${row.id_usuario}"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btn btn-danger btn-xs" value="${row.id_usuario}" onclick="eliminar_usuario(this.value,'${row.nombre} ${row.apellido_paterno} ${row.apellido_materno}')"><i class="fas fa-trash-alt"></i></button>`;
            },
            visible: session_es_administrador
        },
    ],
    // Indicamos el indice de la columna a ordenar y tipo de ordenamiento
    order: [[0, 'desc']],
    // Habilitar o deshabilitar el ordenable en las columnas
    'columnDefs': [ {
        'targets': [12], /* table column index */
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
    // Botones para exportar información
    // dom: '<"row"<"col"B><"col"f>>rt<"row"<"col"l><"col"p>>',
    dom: '<"row"<"col"f>>rt<"row"<"col"l><"col"p>>',
        buttons: [
            {
                extend: 'copy',
                text: 'Copiar',
                exportOptions: {
                    columns: [1,2,3,6,8]
                },
                styles: {
                    tableHeader: {
                        alignment: 'center'
                    },
                }
            },
            {
                extend: 'excel',
                text: 'Excel',
                exportOptions: {
                    columns: [1,2,3,6,8]
                },
                styles: {
                    tableHeader: {
                        alignment: 'center'
                    },
                }
            },
            {
                extend: 'pdf',
                text: 'PDF',
                exportOptions: {
                    columns: [1,2,3,6,8]
                },
                styles: {
                    tableHeader: {
                        alignment: 'center'
                    },
                },
                customize: function(doc) {
                    /** this line changes the alignment of 'messageBottom' and 'messageTop' **/
                    doc.styles.message.alignment = "right"
                }
            },
            {
                extend: 'print',
                text: 'Imprimir',
                exportOptions: {
                    columns: [1,2,3,6,8]
                },
                styles: {
                    tableHeader: {
                        alignment: 'center'
                    },
                }
            }
        ],
    // Hacer el datatable responsive
    rowReorder: {
        selector: 'td:nth-child(2)'
    },
    responsive: true,
    /* Para habilitar el scroll's, quitar las lineas de responsive */
    // scrollY: 200, //Scroll vertial
    // scrollX: true, //Scroll horizonta
})

/* Obtiene todos los datos del registro en el datatable al dar clic en editar */
$('#tabla_usuarios tbody').on('click', '.editar_usuario', function () {
    var dataRow = tabla_usuarios.row($(this).parents('tr')).data();
    console.log(dataRow)
    cambiar_action_usuarios('update');
    editar_usuario(dataRow);
});

/* FUNCIONES */

function cargar_event_listeners_usuarios(){
    btn_nuevo_usuario.addEventListener('click', function () {
        cambiar_action_usuarios('create');
    });
    btn_guardar_usuario.addEventListener('click', guardar_datos_usuario);
    $('#modal_usuarios').on('hide.bs.modal', limpiar_form_usuarios);
}

// Función que agrega un cliente nuevo a la BD o edita un cliente
function guardar_datos_usuario(){
    if($("#form_usuarios").valid()){
        // Obtenemos la operacion a realizar create ó update
        var form_action = $("#form_usuarios").attr("action");
        // Guardamos el form con los input file para subir archivos
        var formData = new FormData(document.getElementById("form_usuarios"));
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
                $('#tabla_usuarios').DataTable().ajax.reload();
                // Se crea el nuevo select actualizado
                select_usuarios()
                // Se cierra el modal
                $('#modal_usuarios').modal('hide');
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

function eliminar_usuario(id,nombre){
    Swal.fire({
        title: '<span style="color:red">Eliminar<span>',
        html: `El usuario <b>${nombre}</b> será <b>eliminado</b> <b>permanentemente</b>,<br> <ins>¿Confirma la operación?</ins>`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'usuarios/delete/'+id,
                type: "GET",
                dataType: 'json',
                success: function (res) {
                    // Despues de eliminar el registro en BD se actualiza la tabla
                    $('#tabla_usuarios').DataTable().ajax.reload();
                    // Se crea el nuevo select actualizado
                    select_usuarios()
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
function editar_usuario(dataRow){
    console.log(dataRow);
    document.querySelector('#id_usuario').value = dataRow.id_usuario;
    document.querySelector('#nombre').value = dataRow.nombre;
    document.querySelector('#apellido_paterno').value = dataRow.apellido_paterno;
    document.querySelector('#apellido_materno').value = dataRow.apellido_materno;
    document.querySelector('#usuario').value = dataRow.usuario;
    document.querySelector('#correo').value = dataRow.correo;
    document.querySelector('#telefono').value = dataRow.telefono;
    document.querySelector('#tipo_usuario_select').value = dataRow.id_tipo_usuario;
    
    // Se crea el nuevo select actualizado
    select_usuarios()
    
    $('#modal_usuarios').modal('show');
}

// Función que limpia el formulario y cambia el action
// cuando se va a agregar o editar un registro
function cambiar_action_usuarios(operacion){
    // Op ternario para indicar que campos validar en crear o editar
    operacion.indexOf('update') >= 0 ? validar_campos_usuario = false : validar_campos_usuario = true;
        
    document.querySelector("#form_usuarios").removeAttribute("action");
    document.querySelector("#form_usuarios").setAttribute("action",`/usuarios/${operacion}`);    
}

// Función que restablece todo el form
function limpiar_form_usuarios(){
    // Limpia los valores del form
    $('#form_usuarios')[0].reset();
    // Quita los mensajes de error y limpia los valodes del form
    proceso_validacion_usuario.resetForm();
    // Quita los estilos de error de los inputs
    $('#form_usuarios').find(".is-invalid").removeClass("is-invalid");
}

function validar_form_usuarios(){
    proceso_validacion_usuario = $('#form_usuarios').validate({
        rules: {
          nombre: {
            required: true
          },
          apellido_paterno: {
            required: true
          },
          apellido_materno: {
            required: true
          },
          correo: {
            required: true,
            email: true,
          },
          telefono: {
            required: true
          },
          usuario: {
            required: true
          },
          tipo_usuario_select: {
            required: true
          },
          password: {
            required: function () {
                return validar_campos_usuario
            },
          },
          rPassword: {
            required: function () {
                return validar_campos_usuario
            },
            equalTo: "#password"
          },
        },
        messages: {
          nombre: {
            required: "Ingresar nombre"
          },
          apellido_paterno: {
            required: "Ingresar apellido"
          },
          apellido_materno: {
            required: "Ingresar apellido"
          },
          correo: {
            required: "Ingresar correo electrónico",
            email: "Ingresar dirección de correo valida"
          },
          telefono: {
            required: "Ingresar teléfono"
          },
          usuario: {
            required: "Ingresar usuario"
          },
          tipo_usuario_select: {
            required: "Seleccionar opción"
          },
          password: {
            required: "Ingresar contraseña"
          },
          rPassword: {
            required: "Ingresar contraseña",
            equalTo : "Las contraseñas no coinciden"
          },
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