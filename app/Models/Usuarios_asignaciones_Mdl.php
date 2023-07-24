<?php namespace App\Models;

use CodeIgniter\Model;

class Usuarios_asignaciones_Mdl extends Model
{
    protected $table = 'usuarios_asignaciones';
    protected $primaryKey = 'id_asignacion';
    protected $allowedFields = [
        'id_asignacion',
        'id_usuario',
        'id_actividad',
        'id_grupo',
        'id_proyecto',
    ];

    public function usuarios_asignacion_proyectos($id = null){
        $condicion = 'id_usuario = '.$id;

        $resultado = $this->table('usuarios_asignaciones')->select('id_proyecto')->where($condicion)->findAll();
        
        $array_proyectos_asignados =[];
        foreach ($resultado as $valor) {
            array_push($array_proyectos_asignados,$valor["id_proyecto"]);
        }

        return $array_proyectos_asignados;
    }

    public function usuarios_asignacion_grupos($id = null, $id_proyecto){
        $condicion = "id_usuario = ".$id." AND id_proyecto = ".$id_proyecto;

        $resultado = $this->table('usuarios_asignaciones')->select('id_grupo')->where($condicion)->findAll();
        
        $array_grupos_asignados =[];
        foreach ($resultado as $valor) {
            array_push($array_grupos_asignados,$valor["id_grupo"]);
        }

        return $array_grupos_asignados;
    }

}