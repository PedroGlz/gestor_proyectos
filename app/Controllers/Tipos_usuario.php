<?php namespace App\Controllers;

use App\Models\Tipos_usuario_Mdl;
use App\Controllers\BaseController;

class Tipos_usuario extends BaseController
{
    public function index(){}

    public function show($id = null){
        $tipos_usuario_Mdl = new Tipos_usuario_Mdl();        
        return (json_encode($tipos_usuario_Mdl->get()));
    }

    public function create(){
        $tipos_usuario_Mdl = new Tipos_usuario_Mdl();
        $session = session();
        
        $save = $tipos_usuario_Mdl->insert([
            'tipo_usuario'=>$this->request->getPost('tipo_usuario'),
            'activo'=> 1,
            'fecha_creacion'=> date("Y-m-d H:i:s"),
        ]);

        // Para que entre al succes del ajax
        if($save != false){
            echo json_encode(array("status" => true ));
        }
        else{
            echo json_encode(array("status" => false ));
        }
    }

    public function update(){
        $tipos_usuario_Mdl = new Tipos_usuario_Mdl();
        $session = session();

        $id_tipo_usuario = $this->request->getPost('id_tipo_usuario');

        $data = [
            'tipo_usuario'=>$this->request->getPost('tipo_usuario'),
            'fecha_modificacion'=> date("Y-m-d H:i:s"),
        ];

        $update = $tipos_usuario_Mdl->update($id_tipo_usuario,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            echo json_encode(array("status" => true));
        }else{
            echo json_encode(array("status" => false));
        }
    }
    
    public function delete($id = null){
        $tipos_usuario_Mdl = new Tipos_usuario_Mdl();

        $delete = $tipos_usuario_Mdl->delete(['id_tipo_usuario' => $id]);
        
        // Para que entre al succes del ajax
        if($delete){
           echo json_encode(array("status" => true));
        }else{
           echo json_encode(array("status" => false));
        }
    }
}