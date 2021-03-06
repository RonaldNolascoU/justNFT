<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Api\ForgotPasswordController;

Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
Route::get('/reset-password/{token}', [ForgotPasswordController::class, 'resetPassword'])->name('password.reset');

Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');
