<?php namespace App\Models;

use CodeIgniter\Model;

class Proyectos_Mdl extends Model
{

    protected $table = 'proyectos';
    protected $primaryKey = 'id_proyecto';
    protected $allowedFields = [
        'id_proyecto',
        'nombre_proyecto',
        'fecha_inicio',
        'fecha_fin',
        'usuario_creador',
        'privacidad',
        'activo',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function get($id = null){
        if($id === null){
            return $this->where(['activo' => '1'])->findAll();
        }

        return $this->asArray()->where(['id_proyecto' => $id,'activo' => '1'])->first();
    }

    public function proyectos_por_usuario($id_usuario, $id_tipo_usuario){
        if($id_tipo_usuario == 1){
            return $this->where(['activo' => '1'])->findAll();
        }

        return $this->asArray()->where(['usuario_creador' => $id_usuario,'activo' => '1'])->findAll();
    }
}