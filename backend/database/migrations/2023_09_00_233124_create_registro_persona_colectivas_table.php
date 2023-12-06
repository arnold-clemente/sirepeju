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
        Schema::create('registro_persona_colectivas', function (Blueprint $table) {
            $table->id();
             // registro persona colectiva --> crear tabla
             $table->string('estatuto_organico')->nullable();//pdf
             $table->string('reglamento_interno')->nullable(); //pdf 
             $table->string('informe_final')->nullable(); //pdf
             $table->string('nota_final')->nullable(); //pdf
             $table->string('resolucion_ministerial', 150)->nullable();
             $table->date('fecha_resolucion')->nullable();    //se llena      
            
            $table->unsignedBigInteger('otorgacion_id'); //LLAVE FORÁNEA

            $table->foreign('otorgacion_id')->references('id')->on('otorgacions'); //LLAVE FORÁNEA
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
        Schema::dropIfExists('registro_persona_colectivas');
    }
};
