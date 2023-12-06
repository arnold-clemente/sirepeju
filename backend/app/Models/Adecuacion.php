<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adecuacion extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    //relacion uno a muchos adecuacion - fundadores
    public function fundadores()
    {
        return $this->hasMany(FundadoresAdecuacion::class);
    }

    //relacion uno a uno adecuacion - registro_persona_adecuacion
    public function registro_persona_adecuacion()
    {
        return $this->hasOne(RegistroPersonaAdecuacion::class);
    }
}
