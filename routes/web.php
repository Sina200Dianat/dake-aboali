<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Admin Auth
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\MenuItemController as AdminMenuItemController;
use App\Http\Controllers\Admin\MusicController as AdminMusicController;
use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\SocialLinkController as AdminSocialLinkController;
use App\Http\Controllers\Admin\NoteController as AdminNoteController;

Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function(){ return redirect()->route('admin.menu-items.index'); })->name('dashboard');
    Route::resource('menu-items', AdminMenuItemController::class);
    Route::resource('musics', AdminMusicController::class);
    Route::get('about/edit', [AdminAboutController::class, 'edit'])->name('about.edit');
    Route::post('about', [AdminAboutController::class, 'update'])->name('about.update');
    Route::resource('social-links', AdminSocialLinkController::class)->except(['show']);
    Route::get('notes', [AdminNoteController::class, 'index'])->name('notes.index');
    Route::get('notes/create', [AdminNoteController::class, 'create'])->name('notes.create');
    Route::post('notes', [AdminNoteController::class, 'store'])->name('notes.store');
    Route::get('notes/{note}/edit', [AdminNoteController::class, 'edit'])->name('notes.edit');
    Route::put('notes/{note}', [AdminNoteController::class, 'update'])->name('notes.update');
    Route::get('notes/{note}', [AdminNoteController::class, 'show'])->name('notes.show');
    Route::post('notes/{note}/approve', [AdminNoteController::class, 'approve'])->name('notes.approve');
    Route::post('notes/{note}/reject', [AdminNoteController::class, 'reject'])->name('notes.reject');
    Route::delete('notes/{note}', [AdminNoteController::class, 'destroy'])->name('notes.destroy');
});
