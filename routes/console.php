<?php //This file is for creating custom php artisan commands. For example here if we write php artisan inspire in the console, we get an random inspiring quote

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();
