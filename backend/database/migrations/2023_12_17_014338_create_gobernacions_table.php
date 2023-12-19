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
        Schema::create('gobernacions', function (Blueprint $table) {
            $table->id();
            $table->string('nombres', 100);
            $table->string('paterno', 100);
            $table->string('materno', 100);
            $table->string('cargo', 100);
            $table->string('ci', 12)->unique(); 
            $table->string('ext_ci', 3);
            $table->tinyInteger('estado')->default(1);
            
            $table->unsignedBigInteger('user_id')->unique();
            $table->unsignedBigInteger('institucion_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('institucion_id')->references('id')->on('institucions');

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
        Schema::dropIfExists('gobernacions');
    }
};
