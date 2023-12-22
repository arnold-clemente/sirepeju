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
            $table->string('personalidad_juridica', 250);
            $table->string('sigla', 100);
            $table->string('representante', 200);
            $table->string('ci_rep', 12); //carnet de identitadad representante
            $table->string('ext_ci_rep', 3); // extension de carnet de identidad representante
            $table->string('naturaleza');
            $table->string('persona_colectiva');

            // se llena             
            $table->date('fecha_ingreso_tramite'); //se llena 
            $table->string('codigo_otorgacion', 150)->unique(); //OPJ-            
            $table->string('domicilio_legal');
            $table->text('objeto');
            $table->text('seguimiento');
            $table->text('cite_informe_preliminar');
            $table->text('miembros_fundador');

            // etapa final de registro 
            $table->string('nota_interna_final')->nullable();
            $table->string('numero_informe_final')->nullable();
            $table->date('fecha_envio')->nullable();
            $table->string('alfanumerico')->nullable(); //encriptado les vale valor - nombre entidad, naturaleza, codigo otorgacion

            // para la revocatoria 
            $table->string('nota_revocatorio')->nullable();
            $table->date('fecha_revocatoria')->nullable();
            $table->string('revocatoria')->nullable();

            // para la extintos 
            $table->string('nota_extincion')->nullable();
            $table->date('fecha_extenion')->nullable();
            $table->string('extincion')->nullable();
            $table->date('fecha_modificacion')->nullable();

            $table->tinyInteger('tipo')->default(2); // otorgacion Personalidad Juridica
            $table->tinyInteger('estado')->default(1); //1 -> tramite; 2 -> archivado; 3 -> caducado; 4 -> personalidad; 5 -> revocado; 6 -> extinguido; 7 -> modficacion; 8 -> archivado modificacion;

            $table->unsignedBigInteger('reserva_otorgacion_id')->nullable(); //LLAVE FORÁNEA
            $table->unsignedBigInteger('administrativo_id'); //LLAVE FORÁNEA

            $table->bigInteger('create')->nullable();
            $table->bigInteger('personalidad')->nullable();
            $table->bigInteger('modificacion')->nullable();
            $table->bigInteger('revocado')->nullable();
            $table->bigInteger('archivado')->nullable();
            $table->bigInteger('caducado')->nullable();
            $table->bigInteger('extinguido')->nullable();

            $table->foreign('reserva_otorgacion_id')->references('id')->on('reserva_otorgacions');
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
