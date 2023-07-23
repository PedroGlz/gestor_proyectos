<?php namespace App\Models;

use CodeIgniter\Model;

class Tipos_usuario_Mdl extends Model
{

    protected $table = 'tipos_usuario';
    protected $primaryKey = 'id_tipo_usuario';
    protected $allowedFields = [
        'id_tipo_usuario',
        'tipo_usuario',
        'activo',
    ];

    public function get($id = null){
        $condicion = ['id_tipo_usuario' => $id, 'activo' => 1];
        
        if($id === null){
            $condicion = ['activo' => 1];
        }

        return $this->table('tipos_usuario')->select('
            id_tipo_usuario,
            tipo_usuario,
            activo,
        ')->where($condicion)->findAll();
    }

}