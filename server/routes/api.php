<?php

use Illuminate\Http\Request;

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

    Route::post('register', 'UserControler@register');
    Route::post('login', 'UserControler@authenticate');
    
    Route::group([ 'middleware' => 'api' ], function ($router) { 
        
        // Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::post('me', 'AuthController@me');
        
        Route::get('transactions', 'TransactionController@transactions');
        Route::post('transaction', 'TransactionController@createTransaction');
        Route::delete('transaction/{id}', 'TransactionController@deleteTransaction');
        Route::put('transaction/{id}', 'TransactionController@updateTransaction');
    });
