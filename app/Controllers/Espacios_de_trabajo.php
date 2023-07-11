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
            'usuario_creador' => $session->id_usuario,
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ]);

        $id_creado = $espacios_trabajo_mdl->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado ));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0));
        }
    }

    public function update(){
        $espacios_trabajo_mdl = new Espacios_trabajo_Mdl();
        $session = session();
        
        $id_espacio_trabajo = $this->request->getPost('id_espacio_trabajo');
       
         $data = [
            'nombre_espacio' => $this->request->getPost('nombre_espacio'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $espacios_trabajo_mdl->update($id_espacio_trabajo,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }
    
    public function delete($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $espacios_trabajo_mdl = new Espacios_trabajo_Mdl();
        $session = session();
               
        $data = [
            'activo' => "0",
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $espacios_trabajo_mdl->update($id,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }
}