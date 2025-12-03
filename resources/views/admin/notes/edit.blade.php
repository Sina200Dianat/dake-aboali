@extends('layouts.admin')

@section('title','ویرایش دل‌نوشته')

@section('content')
    <div style="max-width:600px">
        <form method="POST" action="{{ route('admin.notes.update', $note) }}">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label>نام</label>
                <input type="text" name="first_name" value="{{ old('first_name', $note->first_name) }}">
                @error('first_name')<div class="error">{{ $message }}</div>@enderror
            </div>

            <div class="form-group">
                <label>نام خانوادگی</label>
                <input type="text" name="last_name" value="{{ old('last_name', $note->last_name) }}">
                @error('last_name')<div class="error">{{ $message }}</div>@enderror
            </div>

            <div class="form-group">
                <label>پیام</label>
                <textarea name="message">{{ old('message', $note->message) }}</textarea>
                @error('message')<div class="error">{{ $message }}</div>@enderror
            </div>

            <div class="form-group">
                <label>وضعیت</label>
                <select name="status">
                    <option value="pending" {{ old('status', $note->status) == 'pending' ? 'selected' : '' }}>در انتظار</option>
                    <option value="approved" {{ old('status', $note->status) == 'approved' ? 'selected' : '' }}>تایید شده</option>
                    <option value="rejected" {{ old('status', $note->status) == 'rejected' ? 'selected' : '' }}>رد شده</option>
                </select>
                @error('status')<div class="error">{{ $message }}</div>@enderror
            </div>

            <div style="display:flex; gap:8px">
                <button class="btn" type="submit">ذخیره</button>
                <a class="btn" href="{{ route('admin.notes.index') }}" style="background:#6b7280">انصراف</a>
            </div>
        </form>
    </div>
@endsection
