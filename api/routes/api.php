<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CreatorController;
use App\Http\Controllers\Auth\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api'
], function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('isVerified');
    Route::post('/signup', [AuthController::class, 'register']);
    Route::post('/signup-metamask', [AuthController::class, 'registerWithMetamask']);
    Route::post('password/email', [ForgotPasswordController::class, 'forgot']);
    Route::post('password/reset', [ForgotPasswordController::class, 'reset']);
});

Route::group([
    'middleware' => ['auth:api', 'isVerified']
], function () {
    Route::post('/create-creator', [CreatorController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'currentUser']);
    Route::get('/getWallet', [AuthController::class, 'getWallet']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
});
