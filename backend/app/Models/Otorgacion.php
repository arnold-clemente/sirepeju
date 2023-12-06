<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otorgacion extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    //relacion uno a muchos otorgacion - fundadores
    public function fundadores()
    {
        return $this->hasMany(FundadoresOtorgacion::class);
    }

    //relacion uno a uno otorgacion - registro_persona_colectiva
    public function registro_persona_colectiva()
    {
        return $this->hasOne(RegistroPersonaColectiva::class);
    }
}
