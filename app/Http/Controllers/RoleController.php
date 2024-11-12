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
        // dd($request->all());
        // Validate the input to ensure each role name in the array is unique and at least 3 characters long
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->passes()) {
            // Loop through each role name in the array
            // Create a new role for each name
            $role = Role::create(['name' => $request->name]);

            // Assign permissions if provided
            if (!empty($request->permissions)) {
                foreach ($request->permissions as $permissionName) {
                    $role->givePermissionTo($permissionName);
                }
            }

            return redirect()->route('role.index')->with('success', 'Roles and permissions added successfully.');
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
        return Inertia::render('Roles/RoleEdit', ['permissions' => $permissions, 'hasPermissions' => $hasPermission, 'role' => $role]);
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

    public function destroy(string $id)
    {
        $role = Role::find($id);
        if ($role == null) {
            return redirect()->route('role.index')->with('error', 'role has been null.');
        }
        $role->delete();
        return redirect()->route('role.index')->with('success', 'role deleted deleted successfully.');
    }
}
