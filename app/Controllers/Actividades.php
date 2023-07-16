<?php namespace App\Controllers;

use App\Models\Actividades_Mdl;
use App\Controllers\BaseController;

class Actividades extends BaseController
{
    public function show($id = null){
        $actividades_mdl = new Actividades_Mdl();
        return (json_encode($actividades_mdl->actividades_por_proyecto($id)));
    }

    public function create(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $data = [
            'id_grupo' => $this->request->getPost('id_grupo'),
            'nombre_actividad' => "",
            'usuario_creador' => $session->id_usuario,
            'privacidad' => "0",
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ];

        $save = $actividades_mdl->insert($data);

        $id_creado = $actividades_mdl->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado, "data" => $data));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0, "data" => $data));
        }
    }

    public function update(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        $data = [
            'nombre_actividad' => $this->request->getPost('nombre_actividad'),
            'color_actividad' => $this->request->getPost('color_actividad'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_actividad" => $id_actividad));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_actividad" => "0"));
        }
    }
    
    public function delete($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $actividades_mdl = new Actividades_Mdl();
        $session = session();
               
        // $data = [
        //     'activo' => "0",
        //     'fecha_modificacion' => date("Y-m-d H:i:s")
        // ];

        // Actualizando la BD
        // $update = $actividades_mdl->update($id,$data);
        $delete = $actividades_mdl->delete(['id_actividad' => $id]);
        
        // Para que entre al succes del ajax
        if($delete != false){
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

    public function set_estatus_colpaso(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "estatus_colapso" => $this->request->getPost('estatus')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_color_actividad(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "color_actividad" => $this->request->getPost('color')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_nombre_actividad(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "nombre_actividad" => $this->request->getPost('nombre')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_privacidad_actividad(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "privacidad" => $this->request->getPost('privacidad')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function actividades_por_grupo($id = null){
        $actividades_mdl = new Actividades_Mdl();
        
        if($id == null){ return json_encode(array("status" => false)); }

        return (json_encode($actividades_mdl->actividades_por_grupo($id)));
    }
}