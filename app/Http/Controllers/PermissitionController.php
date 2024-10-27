<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissitionController extends Controller
{
    public function index() {
        return Inertia::render(('Role/List'));
    }
    public function create()
    {
        return Inertia::render('Role/RoleCreate');
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|unique:permissions|min:3'
        ]);
        if ($validator->passes()) {
            Permission::create(['name' => $request->name]);
            return redirect()->route('role.index')->with('success', 'Permissions added successfully.');
        }
        else{
            return redirect()->route('role.create')->withInput()->withErrors($validator);    
        }
    }
    public function update() {}
    public function edit() {}
    public function destroy() {}
}
