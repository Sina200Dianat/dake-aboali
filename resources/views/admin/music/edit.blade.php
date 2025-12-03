@extends('layouts.admin')

@section('title','ویرایش موزیک')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.musics.update', $music) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>عنوان</label>
                <input type="text" name="title" value="{{ old('title',$music->title) }}" required>
                @error('title')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>هنرمند</label>
                <input type="text" name="artist" value="{{ old('artist',$music->artist) }}">
                @error('artist')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>جایگزینی فایل صوتی (برای حفظ فایل فعلی خالی بگذارید)</label>
                <input type="file" name="file" accept="audio/*">
                @error('file')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>جایگزینی تصویر کاور</label>
                <input type="file" name="cover_image" accept="image/*">
                @error('cover_image')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" {{ $music->is_active ? 'checked' : '' }}> فعال</label>
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">ذخیره</button>
                <a class="btn" href="{{ route('admin.musics.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
