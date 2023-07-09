<?php namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Usuarios_Mdl;

class Login extends BaseController
{
    public function index()
    {
        $session = session();
        // Mostrar el login solo cuando no se ha iniciado session 
        if(is_null($session->usuario) || $session->usuario == ''){
            // return redirect()->to(base_url('/'));
            return view('paginas/login');
        }
                
        return redirect()->route('principal');
       
    }

    public function validar(){
        // helper('cookie');
        // Obteniendo valores de la vista login
        $usuario = $this->request->getPost('Usuario');
        $password = $this->request->getPost('Password');
        // $recordarme = $this->request->getPost('remember');

        $usuarioMdl = new Usuarios_Mdl();
        $session = session();

        // Obteniendo resultados de la consulta
        $datos_usuario = $usuarioMdl->validar_usuario(['usuario' => $usuario,]);

        // validando datos del usuario
        if(!is_null($datos_usuario) && password_verify($password,$datos_usuario['password'])){
            // Creando variables de session
            $data = [
                "id_usuario" => $datos_usuario['id_usuario'],
                "usuario" => $datos_usuario['usuario'],
                "apellido_paterno" => $datos_usuario['apellido_paterno'],
                "nombre" => $datos_usuario['nombre'],
                "tipo_usuario" => $datos_usuario['id_tipo_usuario'],
                "fecha_login" => date("Y-m-d H:i:s")
            ];
            $session->set($data);

            //Creando las cookies para el btn de recordarme
            // if(!empty($recordarme)){
            //     set_cookie('usuario',$usuario,time()+3600*24*7);
            //     set_cookie('password',$password,time()+3600*24*7);
            // }

            return redirect()->route('principal');
        
        }else{
            $session->setFlashdata('msg', 'El nombre de usuario o contraseña son incorrectos');
            return redirect()->to(base_url('/'));
        }  

    }

    public function salir(){
        $session = session();
        $session->destroy();
        return redirect()->to(base_url('/'));
    }

    public function principal(){
        $session = session();
        // Mostrar el login solo cuando no se ha iniciado session 
        if(is_null($session->usuario) || $session->usuario == ''){
            return redirect()->to(base_url('/'));
        }

        $datos_sesion = [
            "id_usuario" => $session->id_usuario,
            "usuario" => $session->usuario,
            "nombre" => $session->nombre,
            "apellido_paterno" => $session->apellido_paterno,
            "tipo_usuario" => $session->tipo_usuario,
            "fecha_login" => date("Y-m-d H:i:s")
        ];

        return view('paginas/principal',$datos_sesion);
    }
}