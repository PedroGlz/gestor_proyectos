function crear_actividad(id_grupo){
    console.log(id_grupo)
    $.ajax({
        url: 'actividades/create',
        data: {id_grupo: id_grupo},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            let datos_actividad = res.data;
                        
            let tr_actividad = `<tr>
                <td><input type="text" class="form-control" value="" onblur="set_nombre_actividad(${res.id_creado}, this.value)"></td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-block" type="button" data-toggle="dropdown" aria-expanded="false" onclick="cargar_usuarios_actividad(${res.id_creado})">
                            <i class="fas fa-users fa-lg"></i>
                        </button>
                        <div class="dropdown-menu p-0" style="min-width:18rem">
                            <form class="px-3 py-2">
                                <label for="s_usuarios_actividad" class="col-form-label-sm mb-0">Agregar usuario:</label>
                                <div class="input-group input-group-sm">
                                    ${opciones_usuarios}
                                    <div class="input-group-append">
                                        <button class="btn btn-success" type="button" onclick="agregar_usuario_actividad(${res.id_creado}, event)">+</button>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group" id="contenedor_usuarios_actividad_${res.id_creado}"></div>
                            </form>
                        </div>
                    </div>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-secondary" data-toggle="dropdown"
                        style="height:38px; width:111px;" aria-haspopup="true" aria-expanded="true"
                        value="${res.id_creado}">
                            Sin iniciar
                    </button>
                    <div class="dropdown-menu dropdown-menu-right p-0">
                        ${opciones_estatus_actividad}
                    </div>
                </td>
                <td><input type="date" class="form-control" onchange="set_fecha_inicio(${res.id_creado}, this.value)"></td>
                <td><input type="date" class="form-control" onchange="set_fecha_fin(${res.id_creado}, this.value)"></td>
                <td><textarea name="" rows="1" class="form-control" onblur="set_notas_actividad(${res.id_creado}, this.value)"></textarea></td>
                <td><i class="fas fa-trash-alt text-danger" onclick="eliminar_actividad(${res.id_creado}, event)"></i></td>
            </tr>
            <tr>
                <td>
                    <button type="button" class="btn btn-block btn-light" onclick="crear_actividad(${id_grupo})">+ Agregar elemento</button>
                </td>
                <td colspan="6"></td>
            </tr>`;

            // Quitamos el tr con el botn de agregar ya que se va a agregar de nuevo despues de la nueva actividad
            document.querySelector(`#cuerpo_tabla_actividades_${id_grupo}`).lastElementChild.remove()
            // Agregamos nueva actividad
            // Se inserta html string dentrodel elemento despues de su ultimo hijo *innerHTML no funcionaba bien aquí
            document.querySelector(`#cuerpo_tabla_actividades_${id_grupo}`).insertAdjacentHTML('beforeend',tr_actividad);
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function eliminar_actividad(id_actividad, event){
    $.ajax({
        url: `actividades/delete/${id_actividad}`,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)
            // Eliminamos la fila del DOM
            event.target.parentElement.parentElement.remove()

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

function set_nombre_actividad(id_actividad, nuevo_nombre){
    $.ajax({
        url: 'actividades/set_nombre_actividad',
        data: {id_actividad: id_actividad, nombre: nuevo_nombre},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_fecha_inicio(id_actividad, nueva_fecha_inicio){
    $.ajax({
        url: 'actividades/set_fecha_inicio',
        data: {id_actividad: id_actividad, fecha_inicio: nueva_fecha_inicio},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_fecha_fin(id_actividad, nueva_fecha_fin){
    $.ajax({
        url: 'actividades/set_fecha_fin',
        data: {id_actividad: id_actividad, fecha_fin: nueva_fecha_fin},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_notas_actividad(id_actividad, nuevas_notas){
    $.ajax({
        url: 'actividades/set_notas_actividad',
        data: {id_actividad: id_actividad, notas: nuevas_notas},
        type: "POST",
        dataType: 'json',
        success: function (res) {},
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function set_estatus_actividad(id_estatus_actividad, color_estatus, event){
    let btn_estatus = event.target.parentElement.previousElementSibling;

    $.ajax({
        url: 'actividades/set_estatus_actividad',
        data: {id_actividad: btn_estatus.value, estatus: id_estatus_actividad},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            btn_estatus.style.backgroundColor = color_estatus;
            btn_estatus.textContent = event.target.textContent
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function agregar_usuario_actividad(id_actividad, event){
    
    let element_select_usuario = event.target.parentElement.previousElementSibling;

    if (element_select_usuario.value == 0) {
        return;
    }
    
    $.ajax({
        url: 'actividades/agregar_usuario_actividad',
        data: {id_actividad: id_actividad, usuario: element_select_usuario.value},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            console.log(res)
            document.querySelector(`#contenedor_usuarios_actividad_${id_actividad}`).innerHTML += `<div 
            class="d-flex justify-content-between bg-lightrounded">
                <div class=""><small>${element_select_usuario.options[element_select_usuario.selectedIndex].text}</small></div>
                <div class=""><i class="fas fa-trash-alt text-danger fa-xs" onclick="eliminar_usuario_actividad(${res.id_creado}, event)" style="cursor: pointer;"></i></div>
            </div>`;

            element_select_usuario.value = '';
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}

function eliminar_usuario_actividad(id_usuario_actividad, event){
    $.ajax({
        url: `actividades/eliminar_usuario_actividad/${id_usuario_actividad}`,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)
            // Eliminamos la fila del DOM
            event.target.parentElement.parentElement.remove()

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

function cargar_usuarios_actividad(id_actividad){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/usuarios_actividad/usuarios_por_actividad`,
            type: "POST",
            data: {id_actividad: id_actividad},
            dataType: 'json',
            success: function (res) {
                console.log(res);
                document.querySelector(`#contenedor_usuarios_actividad_${id_actividad}`).innerHTML = '';
                
                res.forEach(usuario_actividad => {
                    document.querySelector(`#contenedor_usuarios_actividad_${id_actividad}`).innerHTML += `<div 
                    class="d-flex justify-content-between bg-lightrounded">
                        <div class=""><small>${usuario_actividad.nombre_usuario}</small></div>
                        <div class=""><i class="fas fa-trash-alt text-danger fa-xs" onclick="eliminar_usuario_actividad(${usuario_actividad.id_usuario_actividad}, event)" style="cursor: pointer;"></i></div>
                    </div>`;
                });

                resolve('ok')
            },
            error: function (err) {
                reject()
            }
        });
    });
}