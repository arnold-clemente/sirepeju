<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gobernacion extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    //relacion muchos a uno  Gobernacions - departamento
    public function departamento()
    {
        return $this->belongsTo(Departamento::class);
    }

    // relacion uno a uno gobernacion - user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //relacion uno a uno gobernacion - otorgacion_gobernacion
    public function otorgacion_gobernacion()
    {
        return $this->hasMany(OtorgacionGobernacion::class);
    }
}
