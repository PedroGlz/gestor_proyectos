<?php namespace App\Controllers;

use App\Models\Espacios_trabajo_Mdl;
use App\Controllers\BaseController;

class Espacios_de_trabajo extends BaseController
{
    public function show($id = null){
        $espacios_trabajo_mdl = new Espacios_trabajo_Mdl();
        return (json_encode($espacios_trabajo_mdl->get()));
    }

    public function create(){
        $espacios_trabajo_mdl = new Espacios_trabajo_Mdl();
        $session = session();
        
        $save = $espacios_trabajo_mdl->insert([
            'nombre_espacio' => $this->request->getPost('nombre_espacio'),
            'usuario_creador' => $session->Id_Usuario,
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ]);

        // Para que entre al succes del ajax
        if($save != false){            
            return json_encode(array("status" => true ));
        }else{
            return json_encode(array("status" => false ));
        }
    }

    public function update(){
        
    }
    
    public function delete($id = null){
        
    }
}