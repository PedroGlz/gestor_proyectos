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
        $condicion = ['id_grupo' => $id,'activo' => '1'];

        if($id === null){
            $condicion = ['activo' => '1'];
        }

        return $this->table('grupos')->select('
            id_grupo,
            id_proyecto,
            nombre_grupo,
            color_grupo,
            estatus_colapso,
            DATE_FORMAT(fecha_inicio,"%d/%m/%Y") as fecha_inicio,
            DATE_FORMAT(fecha_fin,"%d/%m/%Y") as fecha_fin,
            usuario_creador,
            privacidad,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = grupos.usuario_creador) as tipo_usuario
        ')->where($condicion)->findAll();
    }

    public function grupos_por_proyecto($id_proyecto = null, $id_grupo = null, $datos_session = null){
        if($id_proyecto === null){return;}

        $condicion = "id_proyecto = ".$id_proyecto." AND activo = 1 AND (id_grupo = ".$id_grupo." OR usuario_creador = ".$datos_session["id_usuario"].")";
        
        if ($datos_session["tipo_usuario"] == 1) {
            $condicion = ['id_proyecto' => $id_proyecto,'activo' => '1'];
        }

        return $this->table('grupos')->select('
            id_grupo,
            id_proyecto,
            nombre_grupo,
            color_grupo,
            estatus_colapso,
            DATE_FORMAT(fecha_inicio,"%d/%m/%Y") as fecha_inicio,
            DATE_FORMAT(fecha_fin,"%d/%m/%Y") as fecha_fin,
            usuario_creador,
            privacidad,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = grupos.usuario_creador) as tipo_usuario
        ')->where($condicion)->findAll();
    }
}