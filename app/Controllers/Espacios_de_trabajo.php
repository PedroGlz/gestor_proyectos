<?php namespace App\Controllers;

use App\Models\Espacios_trabajo_Mdl;
use App\Controllers\BaseController;

class Espacios_de_trabajo extends BaseController
{
    public function show($id = null){
        $espacios_trabajo = new Espacios_trabajo_Mdl();
        return (json_encode($espacios_trabajo->get()));
    }

    public function create(){
        
    }

    public function update(){
        
    }
    
    public function delete($id = null){
        
    }
}