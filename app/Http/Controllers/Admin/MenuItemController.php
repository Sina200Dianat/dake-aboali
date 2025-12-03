<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $items = MenuItem::orderBy('category')->orderBy('name')->get();
        return view('admin.menu.index', compact('items'));
    }

    public function create()
    {
        return view('admin.menu.create');
    }

    public function store(MenuItemRequest $request)
    {
        MenuItem::create($request->validated());
        return redirect()->route('admin.menu-items.index')->with('success', 'آیتم منو افزوده شد');
    }

    public function edit(MenuItem $menuItem)
    {
        return view('admin.menu.edit', ['item' => $menuItem]);
    }

    public function update(MenuItemRequest $request, MenuItem $menuItem)
    {
        $menuItem->update($request->validated());
        return redirect()->route('admin.menu-items.index')->with('success', 'آیتم منو به‌روز شد');
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return redirect()->route('admin.menu-items.index')->with('success', 'آیتم منو حذف شد');
    }
}
