<!-- Modal -->
<div class="modal fade" id="modal_espacios_trabajo" tabindex="-1" aria-labelledby="modal_espacios_trabajo_Label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_espacios_trabajo_Label">Espacios de trabajo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/espacios_trabajo/create" method="POST" id="form_espacios_trabajo">
            <!-- CAMPOS OCULTOS -->
            <div hidden>
                <input type="text" name="id_espacio_trabajo" id="id_espacio_trabajo">
            </div>
            <div class="form-group row">
                <div class="col">
                    <div class="input-group input-group-sm">
                        <div class="input-group">
                            <label class="col-form-label col-form-label-sm">Nombre:</label>
                        </div>
                        <input type="text" class="form-control" name="nombre_espacio" id="nombre_espacio" required>
                    </div>
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btn_guardar_espacio_trabajo">Guardar</button>
      </div>
    </div>
  </div>
</div>