<?php namespace App\Models;

use CodeIgniter\Model;

class Grupos_Mdl extends Model
{

    protected $table = 'grupos';
    protected $primaryKey = 'id_grupo';
    protected $allowedFields = [
        'id_grupo',
        'id_proyecto',
        'nombre_grupo',
        'color_grupo',
        'estatus_colapso',
        'fecha_inicio',
        'fecha_fin',
        'usuario_creador',
        'privacidad',
        'activo',
        'fecha_creacion',
        'fecha_modificacio',
    ];

    public function get($id = null){
        if($id === null){
            return $this->where(['activo' => '1'])->findAll();
        }

        return $this->asArray()->where(['id_grupo' => $id,'activo' => '1'])->first();
    }

    public function grupos_por_proyecto($id = null){
        if($id === null){
            return;
        }
        return $this->asArray()->where(['id_proyecto' => $id,'activo' => '1'])->findAll();
    }
}