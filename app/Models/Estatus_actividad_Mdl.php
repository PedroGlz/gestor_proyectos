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

    public function get($id = null){
        $condicion = ['id_estatus_actividad' => $id, 'activo' => 1];
        
        if($id === null){
            $condicion = ['activo' => 1];
        }

        return $this->table('estatus_actividad')->select('
            id_estatus_actividad,
            nombre_estatus,
            color,
            activo,
        ')->where($condicion)->findAll();
    }
}