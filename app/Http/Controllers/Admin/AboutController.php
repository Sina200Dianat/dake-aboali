<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutRequest;
use App\Models\AboutPage;

class AboutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $about = AboutPage::first();
        if (! $about) {
            $about = AboutPage::create([ 'header_text' => '', 'description' => '' ]);
        }
        return view('admin.about.edit', compact('about'));
    }

    public function update(AboutRequest $request)
    {
        $about = AboutPage::first();
        if (! $about) {
            $about = AboutPage::create($request->validated());
        } else {
            $about->update($request->validated());
        }

        return redirect()->route('admin.about.edit')->with('success', 'محتوای درباره ما به‌روز شد');
    }
}
