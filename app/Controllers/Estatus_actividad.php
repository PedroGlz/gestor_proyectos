<?php namespace App\Controllers;

use App\Models\Estatus_actividad_Mdl;
use App\Controllers\BaseController;

class Estatus_actividad extends BaseController
{
    public function show($id = null){
        $estatus_actividad = new Estatus_actividad_Mdl();        
        return (json_encode($estatus_actividad->get()));
    }

    public function create(){
        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        $session = session();
        
        $data = [
            'nombre_estatus' => $this->request->getPost('nombre_estatus'),
            'color' => $this->request->getPost('color'),
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ];

        $save = $estatus_actividad_mdl->insert($data);

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function update(){
        $estatus_actividad_mdl = new Estatus_actividad_Mdl();
        $session = session();
        
        $id_estatus_actividad = $this->request->getPost('id_estatus_actividad');
       
        $data = [
            'nombre_estatus' => $this->request->getPost('nombre_estatus'),
            'color' => $this->request->getPost('color'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $estatus_actividad_mdl->update($id_estatus_actividad,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
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
        $delete = $estatus_actividad_mdl->delete(['id_estatus_actividad' => $id]);
        
        // Para que entre al succes del ajax
        if($delete != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }

}