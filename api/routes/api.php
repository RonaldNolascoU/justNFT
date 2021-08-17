<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\Api\CreatorController;
use App\Http\Controllers\SubscriptionController;
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
    Route::get('/users', [UserController::class, 'index']);
});

Route::group([
    'middleware' => ['auth:api', 'admin'],
    'prefix' => 'admin'
], function () {
    Route::get('/users', [UserController::class, 'listUsers']);
    Route::get('/creator-users', [UserController::class, 'listCreators']);
});

Route::group([
    'middleware' => ['auth:api', 'isVerified']
], function () {
    Route::post('/create-creator', [CreatorController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'currentUser']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::group([
        'prefix' => 'wallet'
    ], function () {
        Route::get('/create', [WalletController::class, 'createWallet']);
    });

    Route::group([
        'prefix' => 'subscriptions'
    ], function () {
        Route::get('/', [SubscriptionController::class, 'index']);
        Route::post('subscribe', [SubscriptionController::class, 'subscribe']);
    });

    Route::group([
        'prefix' => 'posts'
    ], function () {
        Route::get('/', [PostController::class, 'index']);
        Route::get('/{post}', [PostController::class, 'show']);
    });

    Route::group([
        'prefix' => 'users'
    ], function () {
        Route::get('/{username}', [UserController::class, 'show']);
    });
});
