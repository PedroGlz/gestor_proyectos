// validar_grupo()

// contenedor_grupos_creados.addEventListener('click', (event) => {console.log(event.target)});

// /* FUNCIONES */
function crear_grupo(event){
    let btn = event.target;
    // Si se dio click en el icono rescatamos el boton
    if(btn.classList.contains('fas')){
        btn = btn.parentElement;
    }
    console.log(btn)
    let datos_alta = {
        id_proyecto: btn.value
    }

    if(datos_alta.id_proyecto == "undefined" || datos_alta.id_proyecto == ''){
        // Mostramos mensaje error
        Toast.fire({
            icon: 'warning',
            title: 'Seleccionar proyecto'
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
                cargar_grupos(datos.id_proyecto)
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
    let card_completo = btn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    
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

function cargar_grupos(id_proyecto){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/grupos/show/${id_proyecto}`,
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
                    "><h5>Este proyecto está vacío</h5></div>`;
                }
                
                let icono_colapso;
                let display_colapso;
                let checked_publico;
                let checked_privado;
                // creando el la lista de grupo existentes
                res.forEach(grupo => {
                    
                    if(grupo.estatus_colapso == 1){
                        icono_colapso = 'plus';
                        display_colapso =  'none';
                    }else{
                        icono_colapso = 'minus';
                        display_colapso =  'block';
                    }

                    if (grupo.privacidad == 0) {
                        checked_publico = 'checked';
                        checked_privado = '';
                    }else{
                        checked_publico = '';
                        checked_privado = 'checked';
                    }

                    contenedor_grupos_creados.innerHTML += `
                    <div class="card" style="border-right: 4px solid #bcbcbc; border-bottom: 4px solid #bcbcbc;">
                        <div class="card-header" style="background-color: ${grupo.color_grupo}" id="card_header_grupo_${grupo.id_grupo}">
                            <div class="row">
                                <div class="input-group col-6">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn_control_colapsar_card elemento_titulo_grupo" data-card-widget="collapse" estatus_colapso="${grupo.estatus_colapso}" onclick="set_estatus_colpaso(${grupo.id_grupo},event)">
                                            <i class="fas fa-${icono_colapso}"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control elemento_titulo_grupo" placeholder="Nombre grupo" value="${grupo.nombre_grupo}" onblur="set_nombre_grupo(${grupo.id_grupo}, this.value)">
                                </div>
            
                                <div class="col-6 d-flex justify-content-end">

                                    <div class="dropdown">
                                        <button class="btn elemento_titulo_grupo" type="button" data-toggle="dropdown" aria-expanded="false">
                                            <i class="fas fa-ellipsis-h fa-sm"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <form class="pl-3">
                                                <div class="mb-2">
                                                    <input type="color" class="form-control" value="${grupo.color_grupo}" title="Seleccionar color" onchange="set_color_grupo(${grupo.id_grupo},this.value)">
                                                </div>
                                                <div class="form-group">
                                                    <div class="">
                                                        <label class="col-form-label col-form-label-sm">Privacidad:</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="privacidad" id="grupo_publico_${grupo.id_grupo}" value="0" ${checked_publico} onclick="set_privacidad_grupo(${grupo.id_grupo}, this.value)">
                                                        <label class="form-check-label" for="grupo_publico_${grupo.id_grupo}">Publico</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="privacidad" id="grupo_privado_${grupo.id_grupo}" value="1" ${checked_privado} onclick="set_privacidad_grupo(${grupo.id_grupo}, this.value)">
                                                        <label class="form-check-label" for="grupo_privado_${grupo.id_grupo}">Privado</label>
                                                    </div>
                                                </div>
                                            </form>
                                            <button type="button" class="dropdown-item btn_eliminar_grupo" onclick="eliminar_grupo(event)" value="${grupo.id_grupo}">
                                                <i class="fas fa-trash fa-sm btn_eliminar_grupo"></i>&nbsp;Eliminar grupo
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div class="card-body collapse" style="display: ${display_colapso}; padding:4px;" id="card_body_grupo_${grupo.id_grupo}">
                            <div id="jsgrid_grupo_${grupo.id_grupo}" class="table-responsive"></div>
                            <table class="table table-bordered table-hover text-center tabla_actividades" id="tabla_grupo_${grupo.id_grupo}" style="border-left: 6px solid ${grupo.color_grupo}"">
                                <thead>
                                    <tr>
                                        <th class="d-none">id_actividad</th>
                                        <th class="d-none">id_grupo</th>
                                        <th class="d-none">usuario_creador</th>
                                        <th class="d-none">privacidad</th>
                                        <th class="d-none">activo</th>
                                        <th>Actividad</th>
                                        <th>Personas</th>
                                        <th>Estado</th>
                                        <th>Fecha incio</th>
                                        <th>Fecha fin</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody id="cuerpo_tabla_actividades_${grupo.id_grupo}">
                                    <tr>
                                        <td>
                                            <button type="button" class="btn btn-block btn-light" onclick="crear_actividad(${grupo.id_grupo})">+ Agregar elemento</button>
                                        </td>
                                        <td colspan="5"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`;
                
                    contenido_tabla_actividades(grupo.id_grupo).then( resultado =>  {
                        document.querySelector(`#cuerpo_tabla_actividades_${grupo.id_grupo}`).innerHTML = resultado;
                        // console.log(resultado);
                    }).catch( error => {
                        console.log(error);
                    });;
                });

                resolve(res);
            },
            error: function (err) {
                reject(err.statusText)
            }
        });
    });
}

function contenido_tabla_actividades(id_grupo){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/actividades/actividades_por_grupo/${id_grupo}`,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                let t_body = ``;
                if(res.length > 0){
                    res.forEach(actividad => {
                        t_body += `
                        <tr>
                            <td class="d-none">celda</td>
                            <td class="d-none">celda</td>
                            <td class="d-none">celda</td>
                            <td class="d-none">celda</td>
                            <td class="d-none">celda</td>
                            <td><input type="text" class="form-control" value="${actividad.nombre_actividad}"></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-block" type="button" data-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-users fa-lg"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <form class="px-4 py-3">
                                            <div class="form-group">
                                                <label for="exampleDropdownFormEmail1">Email address</label>
                                                <input type="email" class="form-control" id="exampleDropdownFormEmail1"
                                                    placeholder="email@example.com">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleDropdownFormPassword1">Password</label>
                                                <input type="password" class="form-control" id="exampleDropdownFormPassword1"
                                                    placeholder="Password">
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
                                <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="dropdown"
                                    style="height:38px; background-color:${actividad.color_estatus}" aria-haspopup="true" aria-expanded="true">
                                </button>
                                <div class="dropdown-menu dropdown-menu-right"
                                    style="position: absolute; transform: translate3d(-134px, 14px, 0px); top: 0px; left: 0px; will-change: transform;"
                                    x-placement="bottom-end">
                                    <button class="dropdown-item bg-warning" type="button">En
                                        curso</button>
                                    <button class="dropdown-item bg-success" type="button">Listo</button>
                                    <button class="dropdown-item bg-danger" type="button">Detenido</button>
                                </div>
                            </td>
                            <td><input type="date" value="${actividad.fecha_inicio}" class="form-control"></td>
                            <td><input type="date" value="${actividad.fecha_fin}" class="form-control"></td>
                            <td><textarea name="" rows="1" class="form-control"></textarea></td>
                        </tr>
                        `;
                    });
                }
                resolve(t_body);
            },
            error: function (err) {
                let t_body = `<tr><td colspan="6">Sin elementos</td></tr>`;
                reject(t_body)
            }
        });
    });
}

function set_estatus_colpaso(id_grupo, event){

    let btn = event.target;
    // Si se dio click en el icono rescatamos el boton
    if(btn.classList.contains('fas')){
        btn = btn.parentElement;
    }

    // Definiendo variables para modificar el estatus colapsado en el card
    let nuevo_estatus
    let display_card_body
    let icono
    if (btn.getAttribute("estatus_colapso") == 0) {
        nuevo_estatus = 1
        display_card_body = "none"
        icono = '<i class="fas fa-plus"></i>'
    }else{
        nuevo_estatus = 0
        display_card_body = "block"
        icono = '<i class="fas fa-minus"></i>'
    }

    $.ajax({
        url: 'grupos/set_estatus_colpaso',
        data: {id_grupo: id_grupo, estatus: nuevo_estatus},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            // aplicando nuevos valores de colapso en los elementos del card          
            btn.setAttribute("estatus_colapso",nuevo_estatus);
            btn.innerHTML = '';
            btn.innerHTML = icono;
            document.querySelector(`#card_body_grupo_${id_grupo}`).style.display = display_card_body;
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_color_grupo(id_grupo, nuevo_color){
    $.ajax({
        url: 'grupos/set_color_grupo',
        data: {id_grupo: id_grupo, color: nuevo_color},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            document.querySelector(`#card_header_grupo_${id_grupo}`).style.backgroundColor = nuevo_color;
            document.querySelector(`#tabla_grupo_${id_grupo}`).style.cssText = `border-left: 6px solid ${nuevo_color}`;
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_nombre_grupo(id_grupo, nuevo_nombre){
    $.ajax({
        url: 'grupos/set_nombre_grupo',
        data: {id_grupo: id_grupo, nombre: nuevo_nombre},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_privacidad_grupo(id_grupo, nueva_privacidad){
    $.ajax({
        url: 'grupos/set_privacidad_grupo',
        data: {id_grupo: id_grupo, privacidad: nueva_privacidad},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}