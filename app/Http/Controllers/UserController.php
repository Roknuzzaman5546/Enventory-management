<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:view user|create user|edit user|delete user', ['only' => ['index', 'store']]);
        $this->middleware('permission:create user', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit user', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete user', ['only' => ['destroy']]);
    }
    public function index(Request $request): Response
    {
        $data = User::with('roles')->get();
        return Inertia::render('Users/UserList', [
            'userData' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        $roles = Role::orderBy('name', 'ASC')->get();
        // dd($roles);
        return Inertia::render('Users/CreateUser', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'roles' => 'required'
        ]);

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));
        $useData = User::latest()->get();
        return Inertia::render('Users/UserList', [
            'success' => 'User updated successfully',
            'userData' => $useData,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id): Response
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id): Response
    {
        $user = User::findOrFail($id);
        $roles = Role::orderBy('name', 'ASC')->get();
        $userRole = $user->roles->pluck('name');
        return Inertia::render('Users/EditUser', [
            'user' => $user,
            'roles' => $roles,
            'userRole' => $userRole
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Inertia\Response
     */
    public function update(Request $request, $id): Response
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required',
            'roles' => 'required'
        ]);

        $input = $request->all();
        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        } else {
            $input = Arr::except($input, ['password']);
        }

        $user = User::findOrFail($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id', $id)->delete();
        $user->assignRole($request->input('roles'));
        $data = User::latest()->get();
        return Inertia::render('Users/UserList', [
            'success' => 'User updated successfully',
            'userData' => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function destroy($id): Response
    {
        User::findOrFail($id)->delete();

        return redirect()->route('role.index')->with('success', 'role deleted deleted successfully.');
    }
}
