<?php namespace App\Controllers;

use App\Models\Actividades_Mdl;
use App\Models\Usuarios_actividad_Mdl;
use App\Controllers\BaseController;

class Actividades extends BaseController
{

    public function actividades_por_grupo($id = null){
        $actividades_mdl = new Actividades_Mdl();
        
        if($id == null){ return json_encode(array("status" => false)); }

        return (json_encode($actividades_mdl->actividades_por_grupo($id)));
    }

    public function create(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $data = [
            'id_grupo' => $this->request->getPost('id_grupo'),
            'nombre_actividad' => "",
            'id_estatus_actividad' => 4,
            'usuario_creador' => $session->id_usuario,
            'fecha_inicio' => "",
            'fecha_fin' => "",
            'notas' => "",
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
    
    public function set_fecha_inicio(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "fecha_inicio" => $this->request->getPost('fecha_inicio')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_fecha_fin(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "fecha_fin" => $this->request->getPost('fecha_fin')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }
    
    public function set_notas_actividad(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "notas" => $this->request->getPost('notas')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_estatus_actividad(){
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        $id_actividad = $this->request->getPost('id_actividad');
       
        // Actualizando la BD
        $update = $actividades_mdl->update($id_actividad,[
            "id_estatus_actividad" => $this->request->getPost('estatus')
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function agregar_usuario_actividad(){
        $usuarios_actividad_Mdl = new Usuarios_actividad_Mdl();
        $session = session();
            
        $data = [
            "id_usuario" => $this->request->getPost('usuario'),
            "id_actividad" => $this->request->getPost('id_actividad')
        ];

        // Creando registro
        $save = $usuarios_actividad_Mdl->insert($data);

        $id_creado = $usuarios_actividad_Mdl->getInsertID();
        
        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado, "data" => $data));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0, "data" => $data));
        }
    }

    public function eliminar_usuario_actividad($id = null){
        if($id == null){ return json_encode(array("status" => false)); }

        $usuarios_actividad_Mdl = new Usuarios_actividad_Mdl();
        $session = session();
               
        $delete = $usuarios_actividad_Mdl->delete(['id_usuario_actividad' => $id]);
        
        // Para que entre al succes del ajax
        if($delete != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }
}