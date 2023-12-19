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
        Schema::create('modificacions', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('codigo_modificacion', 150)->unique(); //MPJ-
            $table->string('personalidad_juridica', 255);
            $table->string('estatuto_organico'); //pdf
            $table->string('reglamento_interno'); //pdf
            $table->string('domicilio_legal');
            $table->text('miembros_fundador');
            $table->text('seguimiento');
            $table->text('cite_informe_preliminar');
            $table->string('tipo');
            $table->unsignedBigInteger('otorgacion_id')->nullable(); //LLAVE FORÁNEA
            $table->unsignedBigInteger('adecuacion_id')->nullable(); //LLAVE FORÁNEA
            $table->unsignedBigInteger('administrativo_id'); //LLAVE FORÁNEA
            $table->tinyInteger('estado')->default(1); //0 => caducado, 1 => activo;  2 => finalizado 

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('caducado')->nullable();

            $table->foreign('otorgacion_id')->references('id')->on('otorgacions'); //LLAVE FORÁNEA
            $table->foreign('adecuacion_id')->references('id')->on('adecuacions'); //LLAVE FORÁNEA

            $table->foreign('administrativo_id')->references('id')->on('administrativos');
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
        Schema::dropIfExists('modificacions');
    }
};
