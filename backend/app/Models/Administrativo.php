<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrativo extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    // relacion uno a uno administrativo - user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //relacion uno a muchos admintstrativo - reservas
    public function reservas()
    {
        return $this->hasMany(ReservaNombre::class);
    }

    //relacion uno a muchos admintstrativo - registro
    public function registro()
    {
        return $this->hasMany(Registro::class);
    }
}
