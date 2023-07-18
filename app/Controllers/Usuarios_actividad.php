<?php namespace App\Controllers;

use App\Models\Usuarios_actividad_Mdl;
use App\Controllers\BaseController;

class Usuarios_actividad extends BaseController
{
    public function usuarios_por_actividad(){
        $usuarios_actividad_mdl = new Usuarios_actividad_Mdl();
        
        $id_actividad = $this->request->getPost('id_actividad');
        
        return (json_encode($usuarios_actividad_mdl->usuarios_por_actividad($id_actividad)));
    }

}