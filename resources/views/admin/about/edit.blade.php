@extends('layouts.admin')

@section('title','درباره ما')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.about.update') }}">
            @csrf
            <div class="form-group">
                <label>عنوان</label>
                <input type="text" name="header_text" value="{{ old('header_text',$about->header_text) }}">
                @error('header_text')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description">{{ old('description',$about->description) }}</textarea>
                @error('description')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">ذخیره</button>
                <a class="btn" href="{{ route('admin.dashboard') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
