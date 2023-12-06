<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroPersonaColectiva extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // relacion uno a uno registro_persona_colectiva - otorgacion
    public function otorgacion()
    {
        return $this->belongsTo(Otorgacion::class);
    }
}
