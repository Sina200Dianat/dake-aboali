@extends('layouts.admin')

@section('title','افزودن آیتم منو')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.menu-items.store') }}">
            @csrf
            <div class="form-group">
                <label>نام</label>
                <input type="text" name="name" value="{{ old('name') }}" required>
                @error('name')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description">{{ old('description') }}</textarea>
                @error('description')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>قیمت</label>
                <input type="number" step="0.01" name="price" value="{{ old('price') }}" required>
                @error('price')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>دسته</label>
                <input type="text" name="category" value="{{ old('category') }}">
                @error('category')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" checked> فعال</label>
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">افزودن</button>
                <a class="btn" href="{{ route('admin.menu-items.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
