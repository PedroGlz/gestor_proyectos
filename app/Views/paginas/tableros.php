<!-- Modal -->
<div class="modal fade" id="modal_tableros" tabindex="-1" aria-labelledby="modal_tableros_Label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_tableros_Label">Tableros</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/tableros/create" method="POST" id="form_tableros">
            <!-- CAMPOS OCULTOS -->
            <div hidden>
                <input type="text" name="id_tablero" id="id_tablero">
                <input type="text" name="id_espacio_trabajo_tablero" id="id_espacio_trabajo_tablero">
            </div>
            <div class="form-group row">
                <div class="col">
                    <div class="input-group input-group-sm">
                        <div class="input-group">
                            <label class="col-form-label col-form-label-sm">Nombre:</label>
                        </div>
                        <input type="text" class="form-control" name="nombre_tablero" id="nombre_tablero" required>
                    </div>
                </div>
            </div>

            <div class="form-group">
              <div class="">
                <label class="col-form-label col-form-label-sm">Privacidad:</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="privacidad" id="tablero_publico" value="0" checked>
                <label class="form-check-label" for="tablero_publico">Publico</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="privacidad" id="tablero_privado" value="1">
                <label class="form-check-label" for="tablero_privado">Privado</label>
              </div>
            </div>


        </form>
      </div>
      <div class="modal-footer d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btn_guardar_tablero">Guardar</button>
      </div>
    </div>
  </div>
</div>