/* FUNCIONES */
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
    
    Swal.fire({
        title: '<span style="color:red">Eliminar<span>',
        html: `El grupo de actividades será <b>eliminado permanentemente</b>,<br> <ins>¿Confirma la operación?</ins>`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `grupos/delete/${btn.value}`,
                type: "GET",
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log(res)
                    
                    if(!res.status){
                        alertLodading("El grupo de actividades <b>No se puede eliminar</b> ya que <b>contiene actividades.</b>","warning")
                        return;
                    }
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
    })
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
                let ver_operaciones;
                let valor_disabled;
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

                    if(grupo.usuario_creador == session_id_usuario || session_es_administrador){
                        ver_operaciones = "visible";
                        valor_disabled = ""
                    }else{
                        ver_operaciones = "hidden";
                        valor_disabled = "disabled"
                    }

                    contenedor_grupos_creados.innerHTML += `
                    <div class="card" style="border-right: 4px solid #bcbcbc; border-bottom: 4px solid #bcbcbc;">
                        <div class="card-header" style="background-color: ${grupo.color_grupo}" id="card_header_grupo_${grupo.id_grupo}">
                            <div class="row">
                                <div class="input-group col-9">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn_control_colapsar_card elemento_titulo_grupo" data-card-widget="collapse" estatus_colapso="${grupo.estatus_colapso}" onclick="set_estatus_colpaso(${grupo.id_grupo},event)">
                                            <i class="fas fa-${icono_colapso}"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control elemento_titulo_grupo" placeholder="Nombre grupo" value="${grupo.nombre_grupo}" onblur="set_nombre_grupo(${grupo.id_grupo}, this.value)" ${valor_disabled}>
                                    <span class="align-self-center pl-1 pr-1" style="
                                        background-color: #ffffff00;
                                        border: none;
                                        color: white;
                                    "><small>Fecha inicio:</small></span>

                                    <span class="align-self-center pl-1 pr-1" style="
                                        background-color: #ffffff00;
                                        border: none;
                                        color: white;
                                    "><small id="fecha_inicio_grupo_${grupo.id_grupo}">${grupo.fecha_inicio}</small></span>

                                    <span class="align-self-center pl-3 pr-1" style="
                                        background-color: #ffffff00;
                                        border: none;
                                        color: white;
                                    "><small>Fecha fin:</small></span>

                                    <span class="align-self-center pl-1 pr-1" style="
                                        background-color: #ffffff00;
                                        border: none;
                                        color: white;
                                    "><small id="fecha_fin_grupo_${grupo.id_grupo}">${grupo.fecha_fin}</small></span>
                                </div>
            
                                <div class="col-3 d-flex justify-content-end">

                                    <div class="dropdown dropleft">
                                        <button class="btn elemento_titulo_grupo" type="button" data-toggle="dropdown" aria-expanded="false" style="visibility:${ver_operaciones}">
                                            <i class="fas fa-ellipsis-h fa-sm"></i>
                                        </button>
                                        <div class="dropdown-menu" style="min-width:16rem">
                                            <form class="pl-3 pr-3">
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
                            <table class="table table-bordered table-hover text-center tabla_actividades" id="tabla_grupo_${grupo.id_grupo}" style="border-left: 6px solid ${grupo.color_grupo}"">
                                <thead>
                                    <tr>
                                        <th>Actividad</th>
                                        <th style="width: 95px;">Personas</th>
                                        <th style="width: 130px;">Estado</th>
                                        <th style="width: 167px;">Fecha inicio</th>
                                        <th style="width: 167px;">Fecha fin</th>
                                        <th style="width: 200px;">Notas</th>
                                        <th style="width: 26px;"></th>
                                    </tr>
                                </thead>
                                <tbody id="cuerpo_tabla_actividades_${grupo.id_grupo}">
                                </tbody>
                            </table>
                        </div>
                    </div>`;
                
                    contenido_tabla_actividades(grupo.id_grupo).then( resultado =>  {
                        document.querySelector(`#cuerpo_tabla_actividades_${grupo.id_grupo}`).innerHTML = resultado;
                        // Se habilita el boton de agregar actividad solo si el usuario logeado creo el grupo o si es admin
                        document.querySelector(`#cuerpo_tabla_actividades_${grupo.id_grupo}`).lastElementChild.style.visibility = ver_operaciones

                    }).catch( error => {
                        console.log(error);
                    });
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
                console.log(res)
                
                let ver_operaciones;
                let valor_disabled;
                let valor_disabled_btn_estatus;
                let t_body = ``;
                if(res.length > 0){
                    res.forEach(actividad => {

                        // En primer instancia habilita solo lo que el usuario creo o si es admin
                        if(actividad.usuario_creador == session_id_usuario || session_es_administrador){
                            valor_disabled = ""
                            ver_operaciones = "visible";
                        }else{
                            valor_disabled = "disabled"
                            ver_operaciones = "hidden";
                        }

                        // Si es una actividad asignada al usuario logeado solo puede cambiar el esatus
                        if(actividad.usuario_asignado == session_id_usuario){
                            valor_disabled_btn_estatus = ""
                        }else{
                            valor_disabled_btn_estatus = "disabled"
                        }


                        t_body += `
                        <tr>
                            <td><input type="text" class="form-control" value="${actividad.nombre_actividad}" onblur="set_nombre_actividad(${actividad.id_actividad}, this.value)" ${valor_disabled}></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-block" type="button" data-toggle="dropdown" aria-expanded="false" onclick="cargar_usuarios_actividad(${actividad.id_actividad})" ${valor_disabled}>
                                        <i class="fas fa-users fa-lg"></i>
                                    </button>
                                    <div class="dropdown-menu p-0" style="min-width:18rem">
                                        <form class="px-3 py-2">
                                            <label for="s_usuarios_actividad" class="col-form-label-sm mb-0">Agregar usuario:</label>
                                            <div class="input-group input-group-sm">
                                                ${opciones_usuarios}
                                                <div class="input-group-append">
                                                    <button class="btn btn-success" type="button" onclick="agregar_usuario_actividad(${actividad.id_actividad}, event)">+</button>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="form-group" id="contenedor_usuarios_actividad_${actividad.id_actividad}"></div>
                                        </form>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="dropdown"
                                    style="height:38px; width:111px; background-color:${actividad.color_estatus}" aria-haspopup="true" aria-expanded="true"
                                    value="${actividad.id_actividad}" ${valor_disabled_btn_estatus}>
                                    ${actividad.nombre_estatus}
                                </button>
                                <div class="dropdown-menu dropdown-menu-right p-0">
                                    ${opciones_estatus_actividad}
                                </div>
                            </td>
                            <td><input type="date" value="${actividad.fecha_inicio}" class="form-control" onchange="set_fecha_inicio(${actividad.id_actividad}, this.value)" ${valor_disabled}></td>
                            <td><input type="date" value="${actividad.fecha_fin}" class="form-control" onchange="set_fecha_fin(${actividad.id_actividad}, this.value)" ${valor_disabled}></td>
                            <td><textarea name="" rows="1" class="form-control" onblur="set_notas_actividad(${actividad.id_actividad}, this.value)" ${valor_disabled}>${actividad.notas}</textarea></td>
                            <td><i class="fas fa-trash-alt text-danger" onclick="eliminar_actividad(${actividad.id_actividad}, event)" style="cursor: pointer;" ${ver_operaciones}></i></td>
                        </tr>
                        `;
                    });
                }

                t_body +=`
                <tr>
                    <td>
                        <button type="button" class="btn btn-block btn-light" onclick="crear_actividad(${id_grupo})">+ Agregar elemento</button>
                    </td>
                    <td colspan="6"></td>
                </tr>`;

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