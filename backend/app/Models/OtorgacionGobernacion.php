<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtorgacionGobernacion extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // relacion uno a uno otorgacion_gobernacion - gobernacion
    public function gobernacion()
    {
        return $this->belongsTo(Gobernacion::class);
    }
}
