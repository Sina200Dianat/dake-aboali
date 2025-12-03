<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    /**
     * Explicit table name to avoid uninflected 'music' -> 'music' mapping.
     */
    protected $table = 'musics';

    protected $fillable = [
        'title', 'artist', 'file_path', 'cover_image', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getAudioUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }

    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image ? asset('storage/' . $this->cover_image) : null;
    }
}
