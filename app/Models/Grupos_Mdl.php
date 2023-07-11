<?php namespace App\Models;

use CodeIgniter\Model;

class Grupos_Mdl extends Model
{

    protected $table = 'grupos';
    protected $primaryKey = 'id_grupo';
    protected $allowedFields = [
        'id_grupo',
        'id_tablero',
        'nombre_grupo',
        'color_grupo',
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

        return $this->asArray()->where(['id_grupo' => $id,'activo' => '1'])->first();
    }

    public function grupos_por_tablero($id = null){
        if($id === null){
            return;
        }
        return $this->asArray()->where(['id_tablero' => $id,'activo' => '1'])->findAll();
    }
}