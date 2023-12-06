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
            $table->string('nombre_persona_colectiva',250);
            $table->string('resolucion',150)->comment('resolucion administrativa departamental');
            $table->date('fecha_resolucion');
            $table->string('sigla');
            $table->text('miembros_fundador')->nullable();//borrar obeservar
            $table->text('objeto');
            $table->string('naturaleza');
            $table->string('domicilio_legal');
            $table->tinyInteger('estado')->default(11); //11 activo 12 eliminado
            $table->unsignedBigInteger('gobernacion_id');//LLAVE FORÁNEA
            $table->unsignedBigInteger('departamento_id');//LLAVE FORÁNEA
            $table->foreign('gobernacion_id')->references('id')->on('gobernacions');
            $table->foreign('departamento_id')->references('id')->on('departamentos');
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
