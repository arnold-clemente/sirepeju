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
        Schema::create('otorgacion_gobernacions', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_persona_colectiva', 250);
            $table->string('sigla', 100);
            $table->string('resolucion',150)->comment('resolucion administrativa departamental');
            $table->date('fecha_resolucion');
            $table->text('miembros_fundador')->nullable();
            $table->text('objeto');
            $table->string('naturaleza');
            $table->string('domicilio_legal');
            $table->tinyInteger('tipo')->default(4); // gobernacion
            $table->tinyInteger('estado')->default(1); //1 -> activo; 0 -> eliminado
            $table->unsignedBigInteger('gobernacion_id');//LLAVE FORÁNEA
            $table->unsignedBigInteger('institucion_id');//LLAVE FORÁNEA

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();
            
            $table->foreign('gobernacion_id')->references('id')->on('gobernacions');
            $table->foreign('institucion_id')->references('id')->on('institucions');
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
        Schema::dropIfExists('otorgacion_gobernacions');
    }
};
