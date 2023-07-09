<?php namespace App\Models;

use CodeIgniter\Model;

class Usuarios_Mdl extends Model
{

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    protected $allowedFields = [
        'id_usuario',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'usuario',
        'password',
        'correo',
        'telefono',
        'id_tipo_usuario',
        'activo',
        'fecha_creacion',
        'fecha_modificacion'
    ];

    public function get($id = null){
        if($id === null){
            return $this->findAll();
        }

        return $this->asArray()->where(['id_usuario' => $id])->first();
    }

    public function validar_usuario($data){
        return $this->where($data)->first();
    }
}