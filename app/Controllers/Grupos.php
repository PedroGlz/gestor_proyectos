<?php namespace App\Controllers;

use App\Models\Grupos_Mdl;
use App\Controllers\BaseController;

class Grupos extends BaseController
{
    public function show($id = null){
        $grupos_mdl = new Grupos_Mdl();
        return (json_encode($grupos_mdl->grupos_por_tablero($id)));
    }

    public function create(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $data = [
            'id_tablero' => $this->request->getPost('id_tablero'),
            'nombre_grupo' => "Grupo nuevo",
            'color_grupo' => "#".$this->hexadecimalAzar(6),
            'usuario_creador' => $session->id_usuario,
            'privacidad' => "0",
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ];

        $save = $grupos_mdl->insert($data);

        $id_creado = $grupos_mdl->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado, "data" => $data));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0, "data" => $data));
        }
    }

    public function update(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $id_tablero = $this->request->getPost('id_tablero');
       
         $data = [
            'nombre_tablero' => $this->request->getPost('nombre_tablero'),
            'privacidad' => $this->request->getPost('privacidad'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $grupos_mdl->update($id_tablero,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_tablero" => $id_tablero));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_tablero" => "0"));
        }
    }
    
    public function delete($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $grupos_mdl = new Grupos_Mdl();
        $session = session();
               
        $data = [
            'activo' => "0",
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $grupos_mdl->update($id,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }

    function hexadecimalAzar($caracteres){

        $caracteresPosibles = "0123456789abcdef";
        $azar = '';
    
        for($i=0; $i<$caracteres; $i++){
    
            $azar .= $caracteresPosibles[rand(0,strlen($caracteresPosibles)-1)];
    
        }
    
        return $azar;
    
    }
}