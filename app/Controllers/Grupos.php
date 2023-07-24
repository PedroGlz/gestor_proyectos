<?php namespace App\Controllers;

use App\Models\Grupos_Mdl;
use App\Models\Actividades_Mdl;
use App\Models\Usuarios_asignaciones_Mdl;
use App\Controllers\BaseController;

class Grupos extends BaseController
{
    public function show($id_proyecto = null){
        $grupos_mdl = new Grupos_Mdl();
        $usuarios_asignaciones_Mdl = new Usuarios_asignaciones_Mdl();
        $session = session();

        // Obtenemos los grupos en los que esta asignado el usuario logeado y que sean del proyecto solicitado
        $array_grupos_asignados = $usuarios_asignaciones_Mdl->usuarios_asignacion_grupos($session->id_usuario, $id_proyecto);
        
        return (json_encode($grupos_mdl->grupos_por_proyecto($id_proyecto, $session->tipo_usuario, $session->id_usuario, $array_grupos_asignados)));
    }

    public function create(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $data = [
            'id_proyecto' => $this->request->getPost('id_proyecto'),
            'nombre_grupo' => "",
            'fecha_inicio' => "",
            'fecha_fin' => "",
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
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        $data = [
            'nombre_grupo' => $this->request->getPost('nombre_grupo'),
            'color_grupo' => $this->request->getPost('color_grupo'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ];

        // Actualizando la BD
        $update = $grupos_mdl->update($id_grupo,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true, "data" => $data, "id_grupo" => $id_grupo));
        }else{
            return json_encode(array("status" => false, "data" => $data, "id_grupo" => "0"));
        }
    }
    
    public function delete($id = null){
        $grupos_mdl = new Grupos_Mdl();
        $actividades_mdl = new Actividades_Mdl();
        $session = session();
        
        if($id == null){ return json_encode(array("status" => false)); }
        
        if(count($actividades_mdl->actividades_por_grupo($id)) > 0){
            return json_encode(array("status" => false));
        }
        // $data = [
        //     'activo' => "0",
        //     'fecha_modificacion' => date("Y-m-d H:i:s")
        // ];

        // Actualizando la BD
        // $update = $grupos_mdl->update($id,$data);
        $delete = $grupos_mdl->delete(['id_grupo' => $id]);
        
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
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        // Actualizando la BD
        $update = $grupos_mdl->update($id_grupo,[
            "estatus_colapso" => $this->request->getPost('estatus'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_color_grupo(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        // Actualizando la BD
        $update = $grupos_mdl->update($id_grupo,[
            "color_grupo" => $this->request->getPost('color'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_nombre_grupo(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        // Actualizando la BD
        $update = $grupos_mdl->update($id_grupo,[
            "nombre_grupo" => $this->request->getPost('nombre'),
            'fecha_modificacion' => date("Y-m-d H:i:s")
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }

    public function set_privacidad_grupo(){
        $grupos_mdl = new Grupos_Mdl();
        $session = session();
        
        $id_grupo = $this->request->getPost('id_grupo');
       
        // Actualizando la BD
        $update = $grupos_mdl->update($id_grupo,[
            "privacidad" => $this->request->getPost('privacidad'),
            'fecha_modificacion' => date("Y-m-d H:i:s"),
        ]);
        
        // Para que entre al succes del ajax
        if($update != false){
            return json_encode(array("status" => true));
        }else{
            return json_encode(array("status" => false));
        }
    }
}