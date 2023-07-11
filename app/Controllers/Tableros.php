<?php namespace App\Controllers;

use App\Models\Tableros_Mdl;
use App\Controllers\BaseController;

class Tableros extends BaseController
{
    public function show($id = null){
        $tableros = new Tableros_Mdl();
        return (json_encode($tableros->tableros_por_espacio_trabajo($id)));
    }

    public function create(){
        $tableros = new Tableros_Mdl();
        $session = session();
        
        $save = $tableros->insert([
            'nombre_tablero' => $this->request->getPost('nombre_tablero'),
            'id_espacio_trabajo' => $this->request->getPost('id_espacio_trabajo_tablero'),
            'usuario_creador' => $session->id_usuario,
            'privacidad' => $this->request->getPost('privacidad'),
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ]);

        $id_creado = $tableros->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado ));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0));
        }
    }

    public function update(){
        $tableros = new Tableros_Mdl();
        $session = session();
        
        $id_tablero = $this->request->getPost('id_tablero');
       
         $data = [
            'nombre_tablero' => $this->request->getPost('nombre_tablero'),
            'privacidad' => $this->request->getPost('privacidad'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $tableros->update($id_tablero,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_tablero" => $id_tablero));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_tablero" => "0"));
        }
    }
    
    public function delete($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $tableros = new Tableros_Mdl();
        $session = session();
               
        $data = [
            'activo' => "0",
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $tableros->update($id,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }
}