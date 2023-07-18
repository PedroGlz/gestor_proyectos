<?php namespace App\Models;

use CodeIgniter\Model;

class Estatus_actividad_Mdl extends Model
{

    protected $table = 'estatus_actividad';
    protected $primaryKey = 'id_estatus_actividad';
    protected $allowedFields = [
        'id_estatus_actividad',
        'nombre_estatus',
        'color',
        'activo',
    ];

    public function get(){
        return $this->asArray()->where(['activo' => '1'])->findAll();
    }
}