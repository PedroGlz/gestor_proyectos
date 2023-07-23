<div class="">
    <div class="d-flex justify-content-between align-items-end mb-3">
        <div>
            <h3><i class="nav-icon fas fa-user-lock fa-sm"></i>&nbsp;&nbsp;Tipos de usuario</h3>
        </div>
        <div>
            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modal_tipos_usuario" id="btn_nuevo_tipo_usuario">Nuevo</button>
        </div>
    </div>

    <div class="card card-primary card-outline">
        <div class="card-body">
            <table id="tabla_tipos_usuario" class="display table table-striped table-bordered text-center" style="width:100%;">
                <thead class="bg-gray-dark color-palette">
                    <tr>
                        <th>id_tipos_usuario</th>
                        <th>Tipo</th>
                        <th>activo</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_tipos_usuario" tabindex="-1" aria-labelledby="modal_tipos_usuario_Label" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bg-info">
                <h5 class="modal-title" id="modal_tipos_usuario_Label">Tipos de usuarios</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <!-- Cuerpo del modal -->
            <div class="modal-body">
                <form action="/tipos_usuario/create" method="POST" id="form_tipos_usuario">
                    <div class="box-body">
                        <!-- campo de usuario -->
                        <div hidden>
                            <input type="text" name="id_tipo_usuario" id="id_tipo_usuario" value="0">
                        </div>

                        <div class="form-group">
                            <label for="tipo_usuario" class="col-form-label col-form-label-sm">Tipo:</label>
                            <input type="text" class="form-control form-control-sm" id="tipo_usuario" name="tipo_usuario" placeholder="Ej: Administrador">
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btn_guardar_tipo_usuario" class="btn btn-primary btn-sm">Guardar</button>
            </div>
        </div>
    </div>
</div>