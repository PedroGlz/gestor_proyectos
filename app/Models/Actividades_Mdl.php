<?php namespace App\Models;

use CodeIgniter\Model;

class Actividades_Mdl extends Model
{

    protected $table = 'actividades';
    protected $primaryKey = 'id_actividad';
    protected $allowedFields = [
        'id_actividad',
        'id_grupo',
        'usuario_creador',
        'nombre_actividad',
        'id_estatus_actividad',
        'fecha_inicio',
        'fecha_fin',
        'notas',
        'privacidad',
        'activo',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function get($id = null){
        if($id === null){
            return $this->where(['activo' => '1'])->findAll();
        }

        return $this->asArray()->where(['id_actividad' => $id,'activo' => '1'])->first();
    }

    public function actividades_por_grupo($id = null){
        if($id === null){
            return;
        }

        return $this->table('actividades')->select('
            id_actividad,
            id_grupo,
            usuario_creador,
            nombre_actividad,
            id_estatus_actividad,
            fecha_inicio,
            fecha_fin,
            notas,
            privacidad,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT color FROM estatus_actividad WHERE estatus_actividad.id_estatus_actividad = actividades.id_estatus_actividad) AS color_estatus,
            (SELECT nombre_estatus FROM estatus_actividad WHERE estatus_actividad.id_estatus_actividad = actividades.id_estatus_actividad) AS nombre_estatus
        ')->where(['id_grupo' => $id,'activo' => '1'])->findAll();
    }
}