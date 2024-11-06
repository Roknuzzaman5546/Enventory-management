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
        $role = Role::with('permissions')->get();
        return Inertia::render(('Roles/RoleList'), ['role' => $role]);
    }

    // create data
    public function create()
    {
        $permissition = Permission::orderBy('name', 'ASC')->get();
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
    
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $id . '|min:3', // Ensure uniqueness except for the current role
            'permissions' => 'array', // Ensure permissions is an array if you're passing it
        ]);

        // Retrieve the role by ID
        $role = Role::findOrFail($id);

        // Update the role name
        $role->name = $request->name;
        $role->save();

        // Sync the permissions
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('role.index')->with('success', 'Role updated successfully.');
    }

    
}
