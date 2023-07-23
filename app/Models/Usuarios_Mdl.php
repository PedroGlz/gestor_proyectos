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
        $condicion = ['id_usuario' => $id, 'activo' => 1];
        
        if($id === null){
            $condicion = ['activo' => 1];
        }

        return $this->table('usuarios')->select('
            id_usuario,
            nombre,
            apellido_paterno,
            apellido_materno,
            usuario,
            password,
            correo,
            telefono,
            id_tipo_usuario,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT tipo_usuario FROM tipos_usuario WHERE tipos_usuario.id_tipo_usuario = usuarios.id_tipo_usuario) as tipo_usuario
        ')->where($condicion)->findAll();
    }

    public function validar_usuario($data){
        return $this->where($data)->first();
    }
}