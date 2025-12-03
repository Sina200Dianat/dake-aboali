<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuItemController as ApiMenuItemController;
use App\Http\Controllers\Api\MusicController as ApiMusicController;
use App\Http\Controllers\Api\AboutController as ApiAboutController;
use App\Http\Controllers\Api\NoteController as ApiNoteController;

Route::get('/menu-items', [ApiMenuItemController::class, 'index']);
Route::get('/musics', [ApiMusicController::class, 'index']);
Route::get('/about', [ApiAboutController::class, 'index']);
Route::get('/notes', [ApiNoteController::class, 'index']);
Route::post('/notes', [ApiNoteController::class, 'store']);
