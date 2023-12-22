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
        Schema::create('otorgacion_personalidads', function (Blueprint $table) {
            $table->id();
            $table->string('estatuto_organico'); //pdf
            $table->string('reglamento_interno'); //pdf 
            $table->string('informe_final'); //pdf
            $table->string('nota_final'); //pdf
            $table->string('resolucion_ministerial', 150)->nullable();
            $table->date('fecha_resolucion');    //se llena      

            $table->unsignedBigInteger('otorgacion_id'); //LLAVE FORÁNEA

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();

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
        Schema::dropIfExists('otorgacion_personalidads');
    }
};
