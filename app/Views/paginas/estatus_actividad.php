<div class="">
    <div class="d-flex justify-content-between align-items-end mb-3">
        <div>
            <h3><i class="nav-icon fas fa-tags fa-sm"></i>&nbsp;&nbsp;Estatus de actividades</h3>
        </div>
        <div>
            <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modal_estatus_actividad" id="btn_nuevo_estatus_actividad">Nuevo</button>
        </div>
    </div>

    <div class="card card-primary card-outline">
        <div class="card-body">
            <table id="tabla_estatus_actividad" class="display table table-striped table-bordered text-center" style="width:100%;">
                <thead class="bg-gray-dark color-palette">
                    <tr>
                        <th>id_estatus_actividad</th>
                        <th>Estatus</th>
                        <th>Color</th>
                        <th>activo</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_estatus_actividad" tabindex="-1" aria-labelledby="modal_estatus_actividad_Label" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bg-info">
                <h5 class="modal-title" id="modal_estatus_actividad_Label">Estatus</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <!-- Cuerpo del modal -->
            <div class="modal-body">
                <form action="/estatus_actividad/create" method="POST" id="form_estatus_actividad">
                    <div class="box-body">
                        <!-- campo de usuario -->
                        <div hidden>
                            <input type="text" name="id_estatus_actividad" id="id_estatus_actividad" value="0">
                        </div>

                        <div class="form-group">
                            <label for="nombre_estatus" class="col-form-label col-form-label-sm">Estatus:</label>
                            <input type="text" class="form-control form-control-sm" id="nombre_estatus" name="nombre_estatus" placeholder="Ej: Listo">
                        </div>
                        <div class="form-group">
                            <label for="color" class="col-form-label col-form-label-sm">Color:</label>
                            <input type="color" class="form-control form-control-sm col-6" id="color" name="color" value="#e66465">
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btn_guardar_estatus_actividad" class="btn btn-primary btn-sm">Guardar</button>
            </div>
        </div>
    </div>
</div>