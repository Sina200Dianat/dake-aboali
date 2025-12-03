@extends('layouts.admin')

@section('title','بارگذاری موزیک')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.musics.store') }}" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label>عنوان</label>
                <input type="text" name="title" value="{{ old('title') }}" required>
                @error('title')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>هنرمند</label>
                <input type="text" name="artist" value="{{ old('artist') }}">
                @error('artist')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>فایل صوتی (mp3/wav)</label>
                <input type="file" name="file" accept="audio/*" required>
                @error('file')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>تصویر کاور (اختیاری)</label>
                <input type="file" name="cover_image" accept="image/*">
                @error('cover_image')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" checked> فعال</label>
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">بارگذاری</button>
                <a class="btn" href="{{ route('admin.musics.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
