<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'header_text', 'description',
    ];

    public function socialLinks()
    {
        return $this->hasMany(SocialLink::class);
    }
}
