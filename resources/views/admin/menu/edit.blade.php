@extends('layouts.admin')

@section('title','ویرایش آیتم منو')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.menu-items.update', $item) }}">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label>نام</label>
                <input type="text" name="name" value="{{ old('name',$item->name) }}" required>
                @error('name')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>توضیحات</label>
                <textarea name="description">{{ old('description',$item->description) }}</textarea>
                @error('description')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>قیمت</label>
                <input type="number" step="0.01" name="price" value="{{ old('price',$item->price) }}" required>
                @error('price')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label>دسته</label>
                <input type="text" name="category" value="{{ old('category',$item->category) }}">
                @error('category')<div class="error">{{ $message }}</div>@enderror
            </div>
            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" {{ $item->is_active ? 'checked' : '' }}> فعال</label>
            </div>
            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">ذخیره</button>
                <a class="btn" href="{{ route('admin.menu-items.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
