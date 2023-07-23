<?php
/**
  * Este archivo es para uso de la aplicacion etic.
*/

if (! function_exists('datos_session')) {
    /**
     * Funcion global para eliminar imagenes
     */
    function datos_session(object $session){
      $datos_session = [
        "id_usuario" => $session->id_usuario,
        "usuario" => $session->usuario,
        "apellido_paterno" => $session->apellido_paterno,
        "nombre" => $session->nombre,
        "tipo_usuario" => $session->tipo_usuario,
      ];
      
      return $datos_session;
    }
}