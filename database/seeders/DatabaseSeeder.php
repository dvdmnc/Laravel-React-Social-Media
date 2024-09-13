<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
            $users = User::factory(10)
            ->has(Post::factory()->count(3))
            ->create();

            $users->each(function ($user){
                $plainPassword = Str::random(20);

                $user->update(['password'=>Hash::make($plainPassword)]);

                $this->command->info("Generated password for user {$user->email}: {$plainPassword}"); //Log the email and the password in the console
            });
        //Just so i get the plain password to connect to each user account created. I can't use the password field with a random string in the User Factory because for Laravel Authentication Mechanism to work the password has to be hashed in the db.
    }
}
