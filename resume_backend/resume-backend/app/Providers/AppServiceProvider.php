<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
       if (app()->environment('local') && strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // Method 1: Disable SSL verification for Guzzle
        $this->app->bind('http.client', function () {
            return new \GuzzleHttp\Client([
                'verify' => false,
                'timeout' => 60,
            ]);
        });
    }
}}