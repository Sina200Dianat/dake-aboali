@extends('layouts.admin')

@section('title','ویرایش لینک شبکه اجتماعی')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.social-links.update', $link) }}">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>شبکه</label>
                <input type="text" name="platform" value="{{ old('platform',$link->platform) }}" required>
                @error('platform')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>آدرس</label>
                <input type="text" name="url" value="{{ old('url',$link->url) }}" required>
                @error('url')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">ذخیره</button>
                <a class="btn" href="{{ route('admin.social-links.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
