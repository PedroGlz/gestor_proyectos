<?php namespace App\Controllers;

use App\Models\Proyectos_Mdl;
use App\Models\Grupos_Mdl;
use App\Controllers\BaseController;

class Proyectos extends BaseController
{
    public function show(){
        $proyectos_mdl = new Proyectos_Mdl();
        $session = session();
        $db = db_connect();

        $id_actividad = $db->query("SELECT id_actividad FROM usuarios_actividad WHERE id_usuario = $session->id_usuario")->getRowArray();
        $id_actividad = is_null($id_actividad) ? "0" : $id_actividad['id_actividad'];
        $id_grupo = $db->query("SELECT id_grupo FROM actividades WHERE id_actividad = $id_actividad")->getRowArray();
        $id_grupo = is_null($id_grupo) ? "0" : $id_grupo['id_grupo'];
        $id_proyecto = $db->query("SELECT id_proyecto FROM grupos WHERE id_grupo = $id_grupo")->getRowArray();
        $id_proyecto = is_null($id_proyecto) ? 0 : $id_proyecto['id_proyecto'];
        
        return (json_encode($proyectos_mdl->proyectos_por_usuario($session->id_usuario, $session->tipo_usuario, $id_proyecto)));
    }

    public function datos_proyecto(){
        $proyectos_mdl = new Proyectos_Mdl();
        $id_proyecto = $this->request->getPost('id_proyecto');
        
        return (json_encode($proyectos_mdl->get($id_proyecto)));
    }

    public function create(){
        $proyectos_mdl = new Proyectos_Mdl();
        $session = session();
        
        $data = [
            'nombre_proyecto' => $this->request->getPost('nombre_proyecto'),
            'usuario_creador' => $session->id_usuario,
            'fecha_inicio' => "",
            'fecha_fin' => "",
            'privacidad' => $this->request->getPost('privacidad'),
            'activo' => 1,
            'fecha_creacion' => date("Y-m-d H:i:s")
        ];

        $save = $proyectos_mdl->insert($data);

        $id_creado = $proyectos_mdl->getInsertID();

        // Para que entre al succes del ajax
        if($save != false){
            return json_encode(array("status" => true, "id_creado" => $id_creado, "data" =>  $data));
        }else{
            return json_encode(array("status" => false, "id_creado" => 0, "data" =>  $data));
        }
    }

    public function update(){
        $proyectos_mdl = new Proyectos_Mdl();
        $session = session();
        
        $id_proyecto = $this->request->getPost('id_proyecto');
       
        $data = [
            'nombre_proyecto' => $this->request->getPost('nombre_proyecto'),
            'privacidad' => $this->request->getPost('privacidad'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $proyectos_mdl->update($id_proyecto,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_proyecto" => $id_proyecto));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_proyecto" => "0"));
        }
    }
    
    public function delete($id = null){
        $proyectos_mdl = new Proyectos_Mdl();
        $grupos_Mdl = new Grupos_Mdl();
        $session = session();
        
        if($id == null){ return json_encode(array("status" => false)); }
        if(count($grupos_Mdl->grupos_por_proyecto($id)) > 0){
            return json_encode(array("status" => false));
        }
        
        $data = [
            'activo' => "0",
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        // $update = $proyectos_mdl->update($id,$data);
        $delete = $proyectos_mdl->delete(['id_proyecto' => $id]);
        
        // Para que entre al succes del ajax
        if($delete != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        } 
    }
}