<?php namespace App\Controllers;

use App\Models\Estatus_actividad_Mdl;
use App\Controllers\BaseController;

class Estatus_actividad extends BaseController
{
    public function show(){
        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        return (json_encode($estatus_actividad_mdl->get()));
    }

    public function create(){
        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        $session = session();
        
        $data = [
            'id_proyecto' => $this->request->getPost('id_proyecto'),
            'nombre_grupo' => "",
            'color_grupo' => "#".$this->hexadecimalAzar(6),
            'usuario_creador' => $session->id_usuario,
            'privacidad' => "0",
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ];

        $save = $estatus_actividad_mdl->insert($data);

        $id_creado = $estatus_actividad_mdl->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado, "data" => $data));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0, "data" => $data));
        }
    }

    public function update(){
        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        $session = session();
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        $data = [
            'nombre_grupo' => $this->request->getPost('nombre_grupo'),
            'color_grupo' => $this->request->getPost('color_grupo'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $estatus_actividad_mdl->update($id_grupo,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_grupo" => $id_grupo));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_grupo" => "0"));
        }
    }
    
    public function delete($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        $session = session();
               
        // $data = [
        //     'activo' => "0",
        //     'fecha_modificacion' => date("Y-m-d H:i:s")
        // ];

        // Actualizando la BD
        // $update = $estatus_actividad_mdl->update($id,$data);
        $delete = $estatus_actividad_mdl->delete(['id_grupo' => $id]);
        
        // Para que entre al succes del ajax
        if($delete != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }

}