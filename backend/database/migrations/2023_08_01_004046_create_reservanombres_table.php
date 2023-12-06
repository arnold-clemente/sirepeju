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
        Schema::create('reservanombres', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_reg');
            $table->integer('hr')->comment('hoja de ruta');
            $table->string('entidad',300);
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
            $table->tinyInteger('estado')->default(1);//1:solicitado,2: homonimia 3: registro
            $table->integer('create_admin');
            $table->integer('update_admin');
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
        Schema::dropIfExists('reservanombres');
    }
};
