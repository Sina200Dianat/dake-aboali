<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MusicRequest;
use App\Models\Music;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MusicController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $musics = Music::orderBy('created_at', 'desc')->get();
        return view('admin.music.index', compact('musics'));
    }

    public function create()
    {
        return view('admin.music.create');
    }

    public function store(MusicRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('musics', 'public');
            $data['file_path'] = $path;
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('musics/covers', 'public');
        }

        Music::create($data);

        return redirect()->route('admin.musics.index')->with('success', 'موزیک بارگذاری شد');
    }

    public function edit(Music $music)
    {
        return view('admin.music.edit', compact('music'));
    }

    public function update(MusicRequest $request, Music $music)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($music->file_path) { Storage::disk('public')->delete($music->file_path); }
            $data['file_path'] = $request->file('file')->store('musics', 'public');
        }

        if ($request->hasFile('cover_image')) {
            if ($music->cover_image) { Storage::disk('public')->delete($music->cover_image); }
            $data['cover_image'] = $request->file('cover_image')->store('musics/covers', 'public');
        }

        $music->update($data);
        return redirect()->route('admin.musics.index')->with('success', 'موزیک به‌روز شد');
    }

    public function destroy(Music $music)
    {
        if ($music->file_path) { Storage::disk('public')->delete($music->file_path); }
        if ($music->cover_image) { Storage::disk('public')->delete($music->cover_image); }
        $music->delete();
        return redirect()->route('admin.musics.index')->with('success', 'موزیک حذف شد');
    }
}
