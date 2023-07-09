<div class="p-3">
    <div class="d-flex justify-content-between align-items-end mb-3">
        <div>
            <h3><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Usuarios</h3>
        </div>
        <div>
            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modal_usuarios" id="btn_nuevo_usuario">Nuevo</button>
        </div>
    </div>

    <div class="card card-primary card-outline">
        <div class="card-body">
            <div class="table-responsive">
                <table id="tabla_usuarios" class="table table-striped text-center table-hover" style="width:100%;">
                    <thead class="table-dark">
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
                            <th>Opciones</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_usuarios" tabindex="-1" aria-labelledby="modal_usuarios_Label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_usuarios_Label">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <!-- Cuerpo del modal -->
            <div class="modal-body">
                <form action="/usuarios/create" method="POST" id="FrmUsuarios">
                    <div class="box-body">

                        <!-- Campo de id oculto -->
                        <div hidden>
                            <input type="text" name="Id_Usuario" id="Id_Usuario" value="0">
                            <input type="text" name="foto_Actual" id="foto_Actual" value="">
                        </div>


                        <div class="form-group row">
                            <div class="col">
                                <div class="input-group input-group-sm">
                                    <div class="input-group">
                                        <label class="col-form-label col-form-label-sm">Nombres:</label>
                                    </div>
                                    <input type="text" class="form-control" name="nombre" id="nombre">
                                </div>
                            </div>

                            <div class="col">
                                <div class="input-group input-group-sm">
                                    <div class="input-group">
                                        <label class="col-form-label col-form-label-sm">Apelledo Paterno:</label>
                                    </div>
                                    <input type="text" class="form-control" name="apellido_paterno" id="apellido_paterno">
                                </div>
                            </div>

                            <div class="col">
                                <div class="input-group input-group-sm">
                                    <div class="input-group">
                                        <label class="col-form-label col-form-label-sm">Apellido Materno:</label>
                                    </div>
                                    <input type="text" class="form-control" name="apellido_materno" id="apellido_materno">
                                </div>
                            </div>
                        </div>


                        <div class="form-group row">
                            <div class="col">
                                <div class="input-group input-group-sm">
                                    <div class="input-group">
                                        <label class="col-form-label col-form-label-sm">Correo:</label>
                                    </div>
                                    <input type="email" class="form-control" name="correo" id="correo">
                                </div>
                            </div>

                            <div class="col">
                                <div class="input-group input-group-sm">
                                    <div class="input-group">
                                        <label class="col-form-label col-form-label-sm">Teléfono</label>
                                    </div>
                                    <input type="text" class="form-control" name="telefono" id="telefono">
                                </div>
                            </div>
                        </div>


                        <hr />
                        <!-- campo de password -->
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="Password">Contraseña:</label>
                                    <input type="password" class="form-control" id="Password" name="Password"
                                        placeholder="Ingresa la contraseña">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="rPassword">Repite la contraseña:</label>
                                    <input type="password" class="form-control" id="rPassword" name="rPassword"
                                        placeholder="Repite la contraseña">
                                </div>
                            </div>
                        </div>
                        <!-- Cargar imagen -->
                        <div class="">
                            <div class="form-group">
                                <label>Seleccionar foto:</label>
                                <input type="file" class="form-control" id="Foto" name="Foto">
                            </div>
                        </div>

                        <!-- Estatus -->
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" name="Estatus" id="Estatus" value="A"
                                checked>
                            <label class="custom-control-label" for="Estatus">Activo</label>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btn_guardar_usuario" class="btn btn-primary">Guardar cambios</button>
            </div>
        </div>
    </div>
</div>