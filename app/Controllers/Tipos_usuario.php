<?php namespace App\Controllers;

use App\Models\Usuarios_Mdl;
use App\Controllers\BaseController;

class Tipos_usuario extends BaseController
{
    public function index(){
        // $session = session();
        // // Si no se ha iniciado session redirecciona al login
        // if(is_null($session->usuario) || $session->usuario == ''){
        //     $session->setFlashdata('msg', 'Es necesario iniciar sesión');
        //     return redirect()->to(base_url('/'));
        // }

        // $dataMenu = datos_menu($session);
        // $script = ['src'  => 'js/catalogos/usuarios.js'];
        return "misu desde tipo user";
    }
}