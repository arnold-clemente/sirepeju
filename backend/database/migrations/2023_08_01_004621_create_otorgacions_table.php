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
        Schema::create('otorgacions', function (Blueprint $table) {
            $table->id();

            // viene de registro 
            $table->string('personalidad_juridica', 300);
            $table->string('sigla', 100);
            $table->string('representante', 200);
            $table->string('ci_rep', 12); //carnet de identitadad representante
            $table->string('ext_ci_rep', 3); // extension de carnet de identidad representante
            $table->string('naturaleza');
            $table->string('persona_colectiva');

            // se llena             
            $table->date('fecha_ingreso_tramite'); //se llena 
            $table->string('codigo_otorgacion', 150); //OPJ-            
            $table->string('domicilio_legal');
            $table->text('objeto');
            $table->text('seguimiento')->nullable();
            $table->text('cite_informe_preliminar')->nullable();

            // registro persona colectiva --> crear tabla
            $table->text('miembros_fundador')->nullable(); //borrar obeservar

            // etapa final de registro 
            $table->string('nota_interna_final')->nullable();
            $table->string('numero_informe_final')->nullable();
            $table->date('fecha_envio')->nullable();
            $table->string('alfanumerico')->nullable(); //encriptado les vale valor - nombre entidad, naturaleza, codigo otorgacion

            // para la revocatoria 
            $table->string('nota_revocatorio')->nullable();
            $table->date('fecha_revocatoria')->nullable();
            $table->string('observacion')->nullable();

            $table->tinyInteger('estado')->default(7); //7:en tramite-activo,8: caducado 9;archivado 10 personalidad_juridica_otorgada 0 REVOCADO
            $table->unsignedBigInteger('registro_id'); //LLAVE FORÁNEA

            $table->foreign('registro_id')->references('id')->on('registros');
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
        Schema::dropIfExists('otorgacions');
    }
};
