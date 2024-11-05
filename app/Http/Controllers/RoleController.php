<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class RoleController extends Controller

{
    //
    public function index() {}

    // create data
    public function create()
    {
        $permissition = Permission::orderBy('name', 'ASC')->get();
        // dd($permissition);
        return Inertia::render('Roles/RoleCreate', ['permissition' => $permissition]);
    }

    // store data
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:roles|min:3'
        ]);
        if ($validator->passes()) {
            // dd($request->permissions);
            Role::create(['name' => $request->name]);
            return redirect()->route('permission.index')->with('success', 'Permissions added successfully.');
        } else {
            return redirect()->route('permission.create')->withInput()->withErrors($validator);
        }
    }
}
