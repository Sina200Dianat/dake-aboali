<!doctype html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>پنل مدیریت</title>
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <style>
        @media (max-width: 639px) {
            .admin-sidebar { display: flex; flex-wrap: wrap; gap: 8px; }
            .admin-sidebar a { flex: 1; min-width: 45%; padding: 10px 8px; text-align: center; }
            .admin-sidebar form { flex: 1; min-width: 45%; }
            .admin-sidebar form .btn { width: 100%; }
        }
    </style>
</head>
<body>
<div class="admin-wrap">
    <aside class="admin-sidebar">
        <h3>پنل ادمین کافه</h3>
        <a href="{{ route('admin.dashboard') }}">داشبورد</a>
        <a href="{{ route('admin.menu-items.index') }}">آیتم‌های منو</a>
        <a href="{{ route('admin.musics.index') }}">موزیک‌ها</a>
        <a href="{{ route('admin.about.edit') }}">درباره ما</a>
        <a href="{{ route('admin.social-links.index') }}">شبکه‌های اجتماعی</a>
        <a href="{{ route('admin.notes.index') }}">دل‌نوشته‌ها</a>
        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button class="btn" type="submit">خروج</button>
        </form>
    </aside>
    <main class="admin-main">
        <div class="topbar">
            <div>
                <h2>@yield('title')</h2>
            </div>
            <div class="muted">وارد شده: {{ auth()->user()?->email ?? '—' }}</div>
        </div>

        @if(session('success'))
            <div class="flash">{{ session('success') }}</div>
        @endif

        <div class="card">
            @yield('content')
        </div>
    </main>
</div>
</body>
</html>
