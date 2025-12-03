@extends('layouts.admin')

@section('title','افزودن لینک شبکه اجتماعی')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.social-links.store') }}">
            @csrf
            <div class="form-group">
                <label>شبکه</label>
                <input type="text" name="platform" value="{{ old('platform') }}" required>
                @error('platform')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>آدرس</label>
                <input type="text" name="url" value="{{ old('url') }}" required>
                @error('url')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">افزودن</button>
                <a class="btn" href="{{ route('admin.social-links.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
