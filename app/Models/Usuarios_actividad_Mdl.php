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
        'usuario_creador',
    ];

    public function usuarios_por_actividad($id = null){
        $condicion = ['id_actividad' => $id];

        return $this->table('usuarios_actividad')->select('
            id_usuario_actividad,
            id_usuario,
            id_actividad,
            usuario_creador,
            (SELECT CONCAT(nombre," ",apellido_paterno," ",apellido_materno) FROM usuarios WHERE usuarios.id_usuario = usuarios_actividad.id_usuario) AS nombre_usuario,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = usuarios_actividad.usuario_creador) as tipo_usuario,
        ')->where($condicion)->findAll();
    }

}