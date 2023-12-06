<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundadoresOtorgacion extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // relacion muchos a uno fundadores - otorgacion
    public function otorgacion()
    {
        return $this->belongsTo(Otorgacion::class);
    }
}
