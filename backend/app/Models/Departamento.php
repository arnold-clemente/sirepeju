<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_departamento',
    ];

    //relacion uno a muchos admintstrativo - reservas
    public function gobernacion()
    {
        return $this->hasMany(Gobernacion::class);
    }
}
