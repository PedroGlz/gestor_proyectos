<?php namespace App\Controllers;

use App\Models\Usuarios_Mdl;
use App\Controllers\BaseController;

class Usuarios extends BaseController
{
    public function index(){}

    public function show(){
        $usuarios = new Usuarios_Mdl();
        echo (json_encode($usuarios->get()));
    }

    public function create(){
        $usuarios_Mdl = new Usuarios_Mdl();
        $session = session();
        
        // (!empty($this->request->getPost('Estatus'))) ? $estatus = 'Activo' : $estatus = 'Inactivo';
        $save = $usuarios_Mdl->insert([
            'nombre' => $this->request->getPost('nombre'),
            'apellido_paterno' => $this->request->getPost('apellido_paterno'),
            'apellido_materno' => $this->request->getPost('apellido_materno'),
            'usuario' => $this->request->getPost('usuario'),
            'password' => password_hash($this->request->getPost('password'), PASSWORD_BCRYPT),
            'correo' => $this->request->getPost('correo'),
            'telefono' => $this->request->getPost('telefono'),
            'id_tipo_usuario' => $this->request->getPost('tipo_usuario_select'),
            'activo' => 1,
            'Fecha_Creacion'=> date("Y-m-d H:i:s"),
        ]);

        // Para que entre al succes del ajax
        if($save != false){
            echo json_encode(array("status" => true ));
        }else{
            echo json_encode(array("status" => false ));
        }
    }

    public function update(){
        
        $usuarios_Mdl = new Usuarios_Mdl();
        $session = session();

        $id_usuario = $this->request->getPost('id_usuario');    

        $data = [
            'nombre' => $this->request->getPost('nombre'),
            'apellido_paterno' => $this->request->getPost('apellido_paterno'),
            'apellido_materno' => $this->request->getPost('apellido_materno'),
            'usuario' => $this->request->getPost('usuario'),
            'password' => $this->request->getPost('password'),
            'correo' => $this->request->getPost('correo'),
            'telefono' => $this->request->getPost('telefono'),
            'id_tipo_usuario' => $this->request->getPost('tipo_usuario_select'),
            'fecha_modificacion' => date("Y-m-d H:i:s"),
        ];

        // Obteniendo el valor del campo password de la vista
        $password = $this->request->getPost('password');
        // Validando si viene una contraseña o no
        if($password != ""){
            // Agregando el password para el update
            $data['password'] = password_hash($password, PASSWORD_BCRYPT);
        }

        // Actualizando la BD
        $update = $usuarios_Mdl->update($id_usuario,$data);
        
        // Para que entre al succes del ajax
        if($update != false){
            echo json_encode(array("status" => true));
        }else{
            echo json_encode(array("status" => false));
        }
    }
    
    public function delete($id = null){
        $usuarios_Mdl = new Usuarios_Mdl();

        $delete = $usuarios_Mdl->delete(['id_usuario' => $id]);
        
        // Para que entre al succes del ajax
        if($delete){
           echo json_encode(array("status" => true));
        }else{
           echo json_encode(array("status" => false));
        }
    }
}