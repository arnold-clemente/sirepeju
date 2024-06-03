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
        Schema::create('reglamentos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 200);  
            $table->string('descripcion', 250);  
            $table->date('fecha');
            $table->string('archivo'); 
            $table->tinyInteger('estado')->default(1); //1 -> activo; 0 -> eliminado

            $table->unsignedBigInteger('tramite_id'); 
            $table->foreign('tramite_id')->references('id')->on('tramites');
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
        Schema::dropIfExists('reglamentos');
    }
};
