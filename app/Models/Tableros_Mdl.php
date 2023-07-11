<?php namespace App\Models;

use CodeIgniter\Model;

class Tableros_Mdl extends Model
{

    protected $table = 'tableros';
    protected $primaryKey = 'id_tablero';
    protected $allowedFields = [
        'id_tablero',
        'id_espacio_trabajo',
        'nombre_tablero',
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

        return $this->asArray()->where(['id_tablero' => $id,'activo' => '1'])->first();
    }

    public function tableros_por_espacio_trabajo($id = null){
        return $this->asArray()->where(['id_espacio_trabajo' => $id,'activo' => '1'])->findAll();
    }
}