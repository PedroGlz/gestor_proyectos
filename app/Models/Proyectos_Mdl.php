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
        $condicion = ['id_proyecto' => $id,'activo' => '1'];

        if($id === null){
            $condicion = ['activo' => '1'];
        }

        return $this->table('proyectos')->select('
            id_proyecto,
            nombre_proyecto,
            DATE_FORMAT(fecha_inicio,"%d/%m/%Y") as fecha_inicio,
            DATE_FORMAT(fecha_fin,"%d/%m/%Y") as fecha_fin,
            usuario_creador,
            privacidad,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = proyectos.usuario_creador) as tipo_usuario
        ')->where($condicion)->findAll();
    }

    public function proyectos_por_usuario($id_usuario, $id_tipo_usuario, $array_proyectos_asignados = []){
        if($id_usuario === null){return;}

        // Si no tiene proyectos asignadosel array se va con un valor 0 para que no truene el orWhereIn
        if(empty($array_proyectos_asignados)){$array_proyectos_asignados = [0];}
        
        // Si no es administrador, ver los poryectos creados por el usuario logeado o los proyectos asignados al usuario en el orWhereIn
        $condicion = "activo = 1 AND usuario_creador = ".$id_usuario."";

        // Si es administrador ve todo
        if($id_tipo_usuario == 1){
            $condicion = "activo = 1";
        }

        return $this->table('proyectos')->select('
            id_proyecto,
            nombre_proyecto,
            DATE_FORMAT(fecha_inicio,"%d/%m/%Y") as fecha_inicio,
            DATE_FORMAT(fecha_fin,"%d/%m/%Y") as fecha_fin,
            usuario_creador,
            privacidad,
            activo,
            fecha_creacion,
            fecha_modificacion,
            (SELECT id_tipo_usuario FROM usuarios WHERE usuarios.id_usuario = proyectos.usuario_creador) as tipo_usuario
        ')->where($condicion)
        ->orWhereIn('id_proyecto',$array_proyectos_asignados)
        ->findAll();
    }
}