<div class="">
    <div class="d-flex justify-content-between align-items-end mb-3">
        <div>
            <h3><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Usuarios</h3>
        </div>
        <div>
            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modal_usuarios"
                id="btn_nuevo_usuario">Nuevo</button>
        </div>
    </div>

    <div class="card card-primary card-outline">
        <div class="card-body">
            <table id="tabla_usuarios" class="display table table-striped table-bordered text-center"
                style="width:100%;">
                <thead class="bg-gray-dark color-palette">
                    <tr>
                        <th>id_usuario</th>
                        <th>Nombre</th>
                        <th>apellido_paterno</th>
                        <th>apellido_materno</th>
                        <th>Usuario</th>
                        <th>password</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Tipo</th>
                        <th>activo</th>
                        <th>fecha_creacion</th>
                        <th>fecha_modificacion</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_usuarios" tabindex="-1" aria-labelledby="modal_usuarios_Label" aria-hidden="true"
    data-backdrop="static">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header bg-info">
                <h5 class="modal-title" id="modal_usuarios_Label">Datos del usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Cuerpo del modal -->
            <div class="modal-body">
                <form action="/usuarios/create" method="POST" id="form_usuarios">
                    <div class="box-body">

                        <!-- Campo de id oculto -->
                        <div hidden>
                            <input type="text" name="id_usuario" id="id_usuario" value="0">
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label class="col-form-label col-form-label-sm">Nombres:</label>
                                    <input type="text" class="form-control form-control-sm" name="nombre" id="nombre">
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label class="col-form-label col-form-label-sm">Apelledo Paterno:</label>
                                    <input type="text" class="form-control form-control-sm" name="apellido_paterno"
                                        id="apellido_paterno">
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label class="col-form-label col-form-label-sm">Apellido Materno:</label>
                                    <input type="text" class="form-control form-control-sm" name="apellido_materno"
                                        id="apellido_materno">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label class="col-form-label col-form-label-sm">Correo:</label>
                                    <input type="email" class="form-control form-control-sm" name="correo" id="correo"
                                        placeholder="correo@gmail.com">
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group">
                                    <label class="col-form-label col-form-label-sm">Teléfono:</label>
                                    <input type="text" class="form-control form-control-sm" name="telefono"
                                        id="telefono">
                                </div>
                            </div>
                        </div>

                        <hr />

                        <!-- campo de usuario -->
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="usuario" class="col-form-label col-form-label-sm">Usuario:</label>
                                    <input type="text" class="form-control form-control-sm" id="usuario" name="usuario"
                                        placeholder="">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="tipo_usuario_select" class="col-form-label col-form-label-sm">Tipo de usuario:</label>
                                    <select class="form-control form-control-sm" id="tipo_usuario_select" name="tipo_usuario_select"></select>
                                </div>
                            </div>
                        </div>

                        <!-- campo de password -->
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="Password" class="col-form-label col-form-label-sm">Contraseña:</label>
                                    <input type="password" class="form-control form-control-sm" id="password"
                                        name="password">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="rPassword" class="col-form-label col-form-label-sm">Confirmar
                                        contraseña:</label>
                                    <input type="password" class="form-control form-control-sm" id="rPassword"
                                        name="rPassword">
                                </div>
                            </div>
                        </div>
                        <!-- Cargar imagen -->
                        <!-- <div class="">
                            <div class="form-group">
                                <label>Seleccionar foto:</label>
                                <input type="file" class="form-control" id="Foto" name="Foto">
                            </div>
                        </div> -->

                        <!-- Estatus -->
                        <!-- <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" name="Estatus" id="Estatus" value="A"
                                checked>
                            <label class="custom-control-label" for="Estatus">Activo</label>
                        </div> -->
                        
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btn_guardar_usuario" class="btn btn-primary btn-sm">Guardar</button>
            </div>
        </div>
    </div>
</div>