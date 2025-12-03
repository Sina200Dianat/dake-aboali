<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\MenuItem;
use App\Models\Music;
use App\Models\AboutPage;
use App\Models\SocialLink;
use App\Models\Note;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::updateOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin',
            'password' => Hash::make('password')
        ]);

        // Sample menu items
        MenuItem::firstOrCreate(['name'=>'Cappuccino'], ['description'=>'Espresso with steamed milk foam','price'=>3.50,'category'=>'Coffee','is_active'=>true]);
        MenuItem::firstOrCreate(['name'=>'Iced Tea'], ['description'=>'Cold brewed tea','price'=>2.50,'category'=>'Cold Drinks','is_active'=>true]);

        // Sample about
        AboutPage::firstOrCreate([], ['header_text'=>'Welcome to Our Cozy Cafe','description'=>'We are a small cafe located in the heart of the city.'] );

        SocialLink::firstOrCreate(['platform'=>'instagram'], ['url'=>'https://instagram.com/ourcafe']);
        SocialLink::firstOrCreate(['platform'=>'telegram'], ['url'=>'https://t.me/ourcafe']);

        // Sample note
        Note::firstOrCreate(['first_name'=>'Ali','last_name'=>'Ahmadi','message'=>'This cafe is amazing!'], ['status'=>Note::STATUS_APPROVED]);
    }
}
