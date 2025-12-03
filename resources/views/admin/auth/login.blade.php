@extends('layouts.auth')

@section('content')
    <form method="POST" action="{{ route('admin.login.post') }}">
        @csrf
        @if($errors->any())
            <div class="flash">{{ $errors->first() }}</div>
        @endif
        <div class="form-group">
            <label>ایمیل</label>
            <input type="email" name="email" value="{{ old('email') }}" required autofocus>
        </div>
        <div class="form-group">
            <label>رمز عبور</label>
            <input type="password" name="password" required>
        </div>
        <button class="btn" type="submit">ورود</button>
    </form>
@endsection
