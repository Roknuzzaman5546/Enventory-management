<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class ProductController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:view product', ['only' => ['index']]);
        $this->middleware('permission:create product', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit product', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete product', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = DB::table('products')->get();
        // dd($permission);
        return Inertia::render(('Product/ProductList'), ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/ProductCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'quantity' => 'required',
            'status' => 'required',
        ]);
        $data = array(
            'name' => $request->name,
            'quantity' => $request->quantity,
            'status' => $request->status
        );
        DB::table('products')->insert($data);
        return redirect()->route('product.index')->with('success', 'Product add successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function sell(string $id)
    {
        $user = auth()->user();
        // Eager load roles and permissions
        $user->load('roles', 'roles.permissions');
        $product = Product::findOrFail($id);
        return Inertia::render('Product/ProductSell', [
            'product' => $product,
            'userData' => $user
        ]);
    }

    public function sellUpdate(Request $request, $id){
        // dd($request->all());
        $product = Product::findOrFail($id);
        $product->quantity = $product->quantity - $request->quantity;
        $product->save();
        return redirect()->route('product.index')->with('success', 'Product sold successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->status = $request->status;
        $product->save();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
