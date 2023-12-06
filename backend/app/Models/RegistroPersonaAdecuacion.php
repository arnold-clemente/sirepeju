<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroPersonaAdecuacion extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // relacion uno a uno fundadores - adecuacion
    public function adecuacion()
    {
        return $this->belongsTo(Adecuacion::class);
    }
}
