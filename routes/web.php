<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissitionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
    // permission routes
    Route::get('/permission/create', [PermissitionController::class, 'create'])->name('permission.create');
    Route::post('/permission/store', [PermissitionController::class, 'store'])->name('permission.store');
    Route::get('/permission/index', [PermissitionController::class, 'index'])->name('permission.index');
    Route::get('/permission/edit/{id}', [PermissitionController::class, 'edit'])->name('permission.edit');
    Route::post('/permission/update/{id}', [PermissitionController::class, 'update'])->name('permission.update');
    Route::post('/permission/delete/{id}', [PermissitionController::class, 'destroy'])->name('permission.destroy');
    Route::post('/permission/view/{id}', [PermissitionController::class, 'view'])->name('permission.view');

    // Roles routes
    Route::get('role/create', [RoleController::class, 'create'])->name('role.create');
    Route::post('role/store', [RoleController::class, 'store'])->name('role.store');
    Route::get('role/index', [RoleController::class, 'index'])->name('role.index');
    Route::get('role/{id}/edit', [RoleController::class, 'edit'])->name('role.edit');
    Route::post('role/{id}/update', [RoleController::class, 'update'])->name('role.update');
    Route::post('role/{id}/destroy', [RoleController::class, 'destroy'])->name('role.destroy');

    // Product routes
    Route::get('product/index', [ProductController::class, 'index'])->name('product.index');
    Route::get('product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('product/store', [ProductController::class, 'store'])->name('product.store');
    Route::post('product/{id}/update', [ProductController::class, 'update'])->name('product.update');
    Route::get('product/{id}/sell', [ProductController::class, 'sell'])->name('product.sell');
    Route::post('product/{id}/sell', [ProductController::class, 'sellUpdate'])->name('product.sell.update');

    // Users routes
    Route::get('users/index', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::post('users/store', [UserController::class, 'store'])->name('users.store');
    Route::post('users/{id}/update', [UserController::class, 'update'])->name('users.update');
});

require __DIR__ . '/auth.php';
