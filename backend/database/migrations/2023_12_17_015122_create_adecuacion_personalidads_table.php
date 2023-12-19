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
        Schema::create('adecuacion_personalidads', function (Blueprint $table) {
            $table->id();
            $table->string('estatuto_organico')->nullable(); //pdf
            $table->string('reglamento_interno')->nullable(); //pdf 
            $table->string('informe_final')->nullable(); //pdf
            $table->string('nota_final')->nullable(); //pdf
            $table->string('resolucion_ministerial', 150)->nullable();
            $table->date('fecha_resolucion')->nullable();    //se llena     
            
            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();

            $table->unsignedBigInteger('adecuacion_id'); //LLAVE FORÁNEA
            $table->foreign('adecuacion_id')->references('id')->on('adecuacions'); //LLAVE FORÁNEA
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
        Schema::dropIfExists('adecuacion_personalidads');
    }
};
