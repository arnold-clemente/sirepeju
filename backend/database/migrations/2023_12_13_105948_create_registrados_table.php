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
        Schema::create('registrados', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('codigo', 150)->unique(); 
            $table->string('personalidad_juridica', 300);
            $table->string('sigla', 100);
            $table->string('naturaleza');            
            $table->string('observacion')->nullable();   
            $table->tinyInteger('estado')->default(7); //0 eliminado - 1 activo
            $table->unsignedBigInteger('administrativo_id'); //LLAVE FORÁNEA
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
        Schema::dropIfExists('registrados');
    }
};
