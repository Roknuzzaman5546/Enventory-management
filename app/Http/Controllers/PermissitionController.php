<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use DB;

class PermissitionController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:view permission|create permission|edit permission|delete permission', ['only' => ['index', 'store']]);
        $this->middleware('permission:create permission', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit permission', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete permission', ['only' => ['destroy']]);
    }

    public function index()
    {
        $permission = DB::table('permissions')->get();
        // dd($permission);
        return Inertia::render(('Permission/List'), ['permission' => $permission]);
    }

    public function create()
    {
        return Inertia::render('Permission/PermissionCreate');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:permissions|min:3'
        ]);
        if ($validator->passes()) {
            Permission::create(['name' => $request->name]);
            return redirect()->route('permission.index')->with('success', 'Permissions added successfully.');
        } else {
            return redirect()->route('permission.create')->withInput()->withErrors($validator);
        }
    }

    public function edit(string $id)
    {
        $permission = DB::table('permissions')->where('id', $id)->first();
        // dd($permission);
        return Inertia::render('Permission/PermissionEdit', ['permission' => $permission]);
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
        return redirect()->route('permission.index')->with('success', 'Permissions Updated successfully.');
    }

    public function view(string $id)
    {
        $permissionRoleData = DB::table('permissions')->where('id', $id)->first();
        return Inertia::render('Permission/PermissionView', ['permissionRoleData' => $permissionRoleData]);
    }

    public function destroy(string $id)
    {
        // dd($id);
        DB::table('permissions')->where('id', $id)->delete();
        return redirect()->route('permission.index')->with('success', 'Permissions deleted successfully.');
    }
}
