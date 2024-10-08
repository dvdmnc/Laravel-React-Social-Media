<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('followers', function (Blueprint $table){
            $table->id();
            $table->foreignId('following_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('follower_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique(['follower_id', 'following_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
