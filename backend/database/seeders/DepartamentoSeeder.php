<?php

namespace Database\Seeders;

use App\Models\Departamento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartamentoSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Beni', 'nombre' => 'Beni']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Chuquisaca', 'nombre' => 'Chuquisaca']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Cochabamba', 'nombre' => 'Cochabamba']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de La Paz', 'nombre' => 'La Paz']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Oruro', 'nombre' => 'Oruro']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Pando', 'nombre' => 'Pando']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Potosi', 'nombre' => 'Potosi']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Santa Cruz', 'nombre' => 'Santa Cruz']);
    Departamento::create(['institucion' => 'Gobierno Autonomo Departamental de Tarija', 'nombre' => 'Tarija']);
  }
}
