<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use App\Models\SocialLink;

class AboutController extends Controller
{
    public function index()
    {
        $about = AboutPage::first();
        $links = SocialLink::orderBy('platform')->get(['platform','url']);

        return response()->json([
            'header_text' => $about?->header_text,
            'description' => $about?->description,
            'social_links' => $links,
        ]);
    }
}
