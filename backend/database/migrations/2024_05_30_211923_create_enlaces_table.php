<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enlaces', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('enlace');
            $table->string('imagen');
            $table->tinyInteger('tipo'); // 1 interes, 2- gobernaciones
            
            $table->tinyInteger('estado')->default(1); //1 -> activo; 0 -> eliminado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enlaces');
    }
};
