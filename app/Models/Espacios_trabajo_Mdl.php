<?php namespace App\Models;

use CodeIgniter\Model;

class Espacios_trabajo_Mdl extends Model
{

    protected $table = 'espacios_trabajo';
    protected $primaryKey = 'id_espacio_trabajo';
    protected $allowedFields = [
        'id_espacio_trabajo',
        'nombre_espacio',
        'imagen_espacio',
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

        return $this->asArray()->where(['id_espacio_trabajo' => $id,'activo' => '1'])->first();
    }
}