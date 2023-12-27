<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


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
        $this->call(CarpetaSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(InstitucionSeeder::class);
        $this->call(AdministrativoSeeder::class);
        $this->call(GobernacionSeeder::class);
        $this->call(OtorgacionGobernacionSeeder::class);
        $this->call(GobernacionFundadorSeeder::class);
        $this->call(ReservaOtorgacionSeeder::class);
        $this->call(SolicitudReservaSeeder::class);
        $this->call(HomonimiaReservaSeeder::class);
        $this->call(OtorgacionSeeder::class);
        $this->call(OtorgacionFundadorSeeder::class);
        $this->call(AdecuacionSeeder::class);
        $this->call(RegistroSeeder::class);


        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
