<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use DB;

class PermissitionController extends Controller
{
    public function index()
    {
        $permission = DB::table('permissions')->get();
        // dd($permission);
        return Inertia::render(('Role/List'), ['permission' => $permission]);
    }

    public function create()
    {
        return Inertia::render('Role/RoleCreate');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:permissions|min:3'
        ]);
        if ($validator->passes()) {
            Permission::create(['name' => $request->name]);
            return redirect()->route('role.index')->with('success', 'Permissions added successfully.');
        } else {
            return redirect()->route('role.create')->withInput()->withErrors($validator);
        }
    }

    public function edit(string $id)
    {
        $permission = DB::table('permissions')->where('id', $id)->first();
        // dd($permission);
        return Inertia::render('Role/RoleEdit', ['permission' => $permission]);
    }
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|unique:permissions|min:3',
        ]);
        $data = array(
            'name' => $request->name,
        );
        DB::table('permissions')->where('id', $id)->update($data);
        return redirect()->route('role.index')->with('success', 'Permissions Updated successfully.');
    }
    public function destroy(string $id) {
        DB::table('permissions')->where('id', $id)->delete();
        return redirect()->route('role.index')->with('success', 'Permissions deleted successfully.');
    }
}
