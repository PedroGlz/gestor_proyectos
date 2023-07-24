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
        $condicion = ['id_actividad' => $id,'activo' => '1'];
        
        if($id === null){
            $condicion = ['activo' => '1'];
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
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = actividades.usuario_creador) as tipo_usuario
        ')->where($condicion)->findAll();
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
            (SELECT nombre_estatus FROM estatus_actividad WHERE estatus_actividad.id_estatus_actividad = actividades.id_estatus_actividad) AS nombre_estatus,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = actividades.usuario_creador) as tipo_usuario,
            (SELECT id_usuario FROM usuarios_actividad WHERE usuarios_actividad.id_actividad = actividades.id_actividad) as usuario_asignado
        ')->where(['id_grupo' => $id,'activo' => '1'])->findAll();
        
        // NOTA IMPORTANTE
        // El ultimo campo para encontrar el usuario asignado a la actividad, solo funciona mientras se asigne un solo usuario a la actividad
        // si se asigna masde 1 usuario por actividad hay que corregir la consultapara evitar error "more tha 1 row"

    }
}