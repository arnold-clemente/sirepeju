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
        Schema::create('adecuacions', function (Blueprint $table) {
            $table->id();
            $table->string('personalidad_juridica', 250);
            $table->string('sigla', 100);
            $table->string('representante', 200);
            $table->string('ci_rep', 12); //carnet de identitadad representante
            $table->string('ext_ci_rep', 3); // extension de carnet de identidad representante
            $table->string('naturaleza');
            $table->string('persona_colectiva');
            $table->date('fecha_ingreso_tramite'); //se llena 
            $table->string('codigo_adecuacion', 150)->unique(); //APJ-            
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

            //personalidad juridica
            $table->string('estatuto_organico')->nullable(); //pdf
            $table->string('reglamento_interno')->nullable(); //pdf 
            $table->string('informe_final')->nullable(); //pdf
            $table->string('nota_final')->nullable(); //pdf
            $table->string('resolucion_ministerial', 150)->nullable();
            $table->date('fecha_resolucion')->nullable();   //se llena  

            // para la revocatoria 
            $table->string('nota_revocatorio')->nullable();
            $table->date('fecha_revocatoria')->nullable();
            $table->string('revocatoria')->nullable();

            // para la extintos 
            $table->string('nota_extincion')->nullable();
            $table->date('fecha_extenion')->nullable();
            $table->string('extincion')->nullable();
            $table->date('fecha_modificacion')->nullable();

            $table->tinyInteger('tipo')->default(3); // adecuacion Personalidad Juridica
            $table->tinyInteger('estado')->default(1); //0 -> eliminado; 1 -> tramite; 2 -> archivado; 3 -> caducado; 4 -> personalidad; 5 -> revocado; 6 -> extinguido; 7 -> modficacion; 8 -> archivado modificacion;


            $table->bigInteger('create')->nullable();
            $table->bigInteger('personalidad')->nullable();
            $table->bigInteger('modificacion')->nullable();
            $table->bigInteger('revocado')->nullable();
            $table->bigInteger('archivado')->nullable();
            $table->bigInteger('caducado')->nullable();
            $table->bigInteger('extinguido')->nullable();

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
        Schema::dropIfExists('adecuacions');
    }
};
