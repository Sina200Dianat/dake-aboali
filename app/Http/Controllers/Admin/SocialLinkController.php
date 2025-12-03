<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SocialLinkRequest;
use App\Models\SocialLink;

class SocialLinkController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $links = SocialLink::orderBy('platform')->get();
        return view('admin.social.index', compact('links'));
    }

    public function create()
    {
        return view('admin.social.create');
    }

    public function store(SocialLinkRequest $request)
    {
        SocialLink::create($request->validated());
        return redirect()->route('admin.social-links.index')->with('success', 'لینک شبکه اجتماعی افزوده شد');
    }

    public function edit(SocialLink $socialLink)
    {
        return view('admin.social.edit', ['link' => $socialLink]);
    }

    public function update(SocialLinkRequest $request, SocialLink $socialLink)
    {
        $socialLink->update($request->validated());
        return redirect()->route('admin.social-links.index')->with('success', 'لینک شبکه اجتماعی به‌روز شد');
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();
        return redirect()->route('admin.social-links.index')->with('success', 'لینک شبکه اجتماعی حذف شد');
    }
}
