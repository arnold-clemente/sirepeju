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
        Schema::create('user_administrativos', function (Blueprint $table) {
            $table->id();
            $table->string('nombres',100);
            $table->string('paterno',100);
            $table->string('materno',100);
            $table->string('cargo',100);
            $table->tinyInteger('estado')->default(1);//0 eliminado 1 activo
            $table->string('ci',12)->unique(); //carnet de identidad 
            $table->string('ext_ci',3);// extension de carnet de identidad
           
            $table->unsignedBigInteger('user_id')->unique(); 
            $table->foreign('user_id')->references('id')->on('users');

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('delete')->nullable();
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
        Schema::dropIfExists('user_administrativos');
    }
};
