<?php

use App\Http\Controllers\PermissitionController;
use App\Http\Controllers\ProfileController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/permission/create', [PermissitionController::class, 'create'])->name('role.create');
    Route::post('/permission/store', [PermissitionController::class, 'store'])->name('role.store');
    Route::get('/permission/index', [PermissitionController::class, 'index'])->name('role.index');
    Route::get('/permission/edit/{id}', [PermissitionController::class, 'edit'])->name('role.edit');
    Route::post('/permission/update/{id}', [PermissitionController::class, 'update'])->name('role.update');
    Route::post('/permission/update/{id}', [PermissitionController::class, 'distroy'])->name('role.distroy');
});

require __DIR__ . '/auth.php';
