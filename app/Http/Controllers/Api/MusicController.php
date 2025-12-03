<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Music;

class MusicController extends Controller
{
    public function index()
    {
        $musics = Music::where('is_active', true)->get()->map(function ($m) {
            return [
                'id' => $m->id,
                'title' => $m->title,
                'artist' => $m->artist,
                'audio_url' => $m->audio_url,
                'cover_image_url' => $m->cover_image_url,
            ];
        });

        return response()->json($musics);
    }
}
