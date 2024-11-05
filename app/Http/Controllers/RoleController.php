<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use DB;

class RoleController extends Controller

{
    //
    public function index()
    {
        $role = DB::table('roles')->get();  
        // dd($role);
        return Inertia::render(('Roles/RoleList'), ['role' => $role]);
    }

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
            $role = Role::create(['name' => $request->name]);
            if (!empty($request->permissions)) {
                foreach ($request->permissions as $name) {
                    $role->givePermissionTo($name);
                }
            }
            return redirect()->route('role.index')->with('success', 'Permissions added successfully.');
        } else {
            return redirect()->route('role.create')->withInput()->withErrors($validator);
        }
    }

    // edit data
    public function edit(string $id)
    {
        $role = Role::findOrFail($id);
        $hasPermission = $role->permissions->pluck('name');
        $permissions = Permission::orderBy('name', 'ASC')->get();
        // dd($hasPermission);
        return Inertia::render('Roles/RoleEdit', ['permissions' => $permissions, 'hasPermissions' => $hasPermission, 'role' =>$role]);
    }
}
