<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class PermissitionController extends Controller
{
    public function index() {}
    public function create()
    {
        return Inertia::render('Role/RoleCreate');
    }
    public function store() {}
    public function update() {}
    public function edit() {}
    public function destroy() {}
}
