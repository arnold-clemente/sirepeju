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
        Schema::create('gobernacion_fundadors', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_completo');
            $table->string('ci')->nullable();
            $table->tinyInteger('estado')->default(1); //0 => eliminado, 1 => activo ---- eliminar

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();

            $table->unsignedBigInteger('gobernacion_id'); //LLAVE FORÁNEA
            $table->foreign('gobernacion_id')->references('id')->on('gobernacions'); //LLAVE FORÁNEA
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
        Schema::dropIfExists('gobernacion_fundadors');
    }
};
