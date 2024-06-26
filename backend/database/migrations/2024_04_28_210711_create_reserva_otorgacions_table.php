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
        Schema::create('reserva_otorgacions', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_reg');
            $table->integer('hr')->comment('hoja de ruta');
            $table->string('entidad',250);
            $table->string('sigla',100);
            $table->string('persona_colectiva');//1 PERSONA NATURAL 2 ENTE DE COORDINACIÓN
            $table->string('nro_certificado',150);//00-0X
            $table->string('naturaleza');//OPCIONES 1 FUNDACIÓN 2 ENTIDAD SIN FINES DE LUCRO 3 ONG,4 ORGANIZACIÓN SOCIAL
            $table->string('obs',150);
            $table->date('fecha_entrega')->nullable();
            $table->string('representante',200);
            $table->string('ci_rep',12); //carnet de identitadad representante
            $table->string('ext_ci_rep',3);// extension de carnet de identidad representante
            $table->string('telefono',50);
            $table->string('correo',150);
            $table->tinyInteger('tipo')->default(1); // reserva de nombre
            $table->tinyInteger('estado')->default(1);//0 -> eliminado; 1 -> solicitado; 2 -> homonimia; 3 -> reservado; 4 -> caducado; 5 -> otorgacion;

            $table->bigInteger('create')->nullable();
            $table->bigInteger('update')->nullable();
            $table->bigInteger('homonimia')->nullable();
            $table->bigInteger('reserva')->nullable();
            $table->bigInteger('caducado')->nullable();

            $table->unsignedBigInteger('user_administrativo_id'); //LLAVE FORÁNEA
            $table->foreign('user_administrativo_id')->references('id')->on('user_administrativos');
            
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
        Schema::dropIfExists('reserva_otorgacions');
    }
};
