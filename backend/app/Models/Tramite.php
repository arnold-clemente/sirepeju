<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tramite extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function requisito(): BelongsTo
    {
        return $this->belongsTo(Requisito::class);
    }

    public function reglamentos(): HasMany
    {
        return $this->hasMany(Reglamento::class);
    }
}
