<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Adecuacion;
use App\Models\Registro;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(DepartamentoSeeder::class);
        $this->call(AdministrativoSeeder::class);
        $this->call(GobernacionSeeder::class);
        $this->call(OtorgacionGobernacionSeeder::class);
        $this->call(OtorgacionGobernacionSeeder::class);
        $this->call(ReservaSolicitadosSeeder::class);
        $this->call(ReservaHomonimiaSeeder::class);
        $this->call(ReservaReservadosSeeder::class);
        $this->call(RegistroReservadosSeeder::class);
        $this->call(RegistroCaducadosSeeder::class);
        $this->call(RegistroOtorgadosSeeder::class);
        $this->call(OtorgacionSeeder::class);
        $this->call(FundadoresOtorgacionSeeder::class);
        $this->call(AdecuacionSeeder::class);
        $this->call(RegistradoSeeder::class);
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
