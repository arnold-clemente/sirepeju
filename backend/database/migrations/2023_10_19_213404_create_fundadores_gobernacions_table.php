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
        Schema::create('fundadores_gobernacions', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_completo');
            $table->string('ci')->nullable();
            $table->unsignedBigInteger('otorgacion_gobernacion_id'); //LLAVE FORÁNEA
            $table->tinyInteger('estado')->default(1); //0 => eliminado, 1 => activo ---- eliminar
            $table->foreign('otorgacion_gobernacion_id')->references('id')->on('otorgacion_gobernacions'); //LLAVE FORÁNEA
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
        Schema::dropIfExists('fundadores_gobernacions');
    }
};
