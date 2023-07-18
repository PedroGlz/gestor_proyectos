<?php namespace App\Models;

use CodeIgniter\Model;

class Usuarios_actividad_Mdl extends Model
{

    protected $table = 'usuarios_actividad';
    protected $primaryKey = 'id_usuario_actividad';
    protected $allowedFields = [
        'id_usuario_actividad',
        'id_usuario',
        'id_actividad',
    ];

    public function usuarios_por_actividad($id = null){
        if($id === null){
            return;
        }

        return $this->table('usuarios_actividad')->select('
            id_usuario_actividad,
            id_usuario,
            id_actividad,
            (SELECT CONCAT(nombre," ",apellido_paterno," ",apellido_materno) FROM usuarios WHERE usuarios.id_usuario = usuarios_actividad.id_usuario) AS nombre_usuario
        ')->where(['id_actividad' => $id])->findAll();
    }

}