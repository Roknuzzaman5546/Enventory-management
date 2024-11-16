<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Get the logged-in user
        $user = auth()->user();
        // Eager load roles and permissions
        $user->load('roles', 'roles.permissions');
        return Inertia::render('Dashboard', [
            'userData' => $user,
        ]);
    }

}
