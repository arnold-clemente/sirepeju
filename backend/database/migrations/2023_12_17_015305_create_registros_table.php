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
        Schema::create('registros', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('codigo', 150)->unique(); 
            $table->string('personalidad_juridica', 300);
            $table->string('sigla', 100);
            $table->string('naturaleza');            
            $table->string('observacion')->nullable();   

            $table->tinyInteger('tipo')->default(5); // otorgacion Personalidad Juridica             
            $table->tinyInteger('estado')->default(1); //0 eliminado - 1 activo
            
            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();

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
        Schema::dropIfExists('registros');
    }
};
