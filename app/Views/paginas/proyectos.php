<!-- Modal -->
<div class="modal fade" id="modal_proyectos" tabindex="-1" aria-labelledby="modal_proyectos_Label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title" id="modal_proyectos_Label">proyectos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/proyectos/create" method="POST" id="form_proyectos">
            <!-- CAMPOS OCULTOS -->
            <div hidden>
                <input type="text" name="id_proyecto" id="id_proyecto">
            </div>
            <div class="form-group row">
                <div class="col">
                    <div class="input-group input-group-sm">
                        <div class="input-group">
                            <label class="col-form-label col-form-label-sm">Nombre:</label>
                        </div>
                        <input type="text" class="form-control" name="nombre_proyecto" id="nombre_proyecto" required>
                    </div>
                </div>
            </div>

            <div class="form-group">
              <div class="">
                <label class="col-form-label col-form-label-sm">Privacidad:</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="privacidad" id="proyecto_publico" value="0" checked>
                <label class="form-check-label" for="proyecto_publico">Publico</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="privacidad" id="proyecto_privado" value="1">
                <label class="form-check-label" for="proyecto_privado">Privado</label>
              </div>
            </div>


        </form>
      </div>
      <div class="modal-footer d-flex justify-content-between">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btn_guardar_proyecto">Guardar</button>
      </div>
    </div>
  </div>
</div>