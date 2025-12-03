<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;

class MenuItemController extends Controller
{
    public function index()
    {
        $items = MenuItem::where('is_active', true)
            ->orderBy('category')
            ->orderBy('name')
            ->get(['id','name','description','price','category']);

        return response()->json($items);
    }
}
