@extends('layouts.admin')

@section('title','شبکه‌های اجتماعی')

@section('content')
    <p><a class="btn" href="{{ route('admin.social-links.create') }}">افزودن لینک</a></p>
    <div style="overflow-x:auto">
        <table>
            <thead>
            <tr><th>شبکه</th><th>آدرس</th><th>عملیات</th></tr>
            </thead>
            <tbody>
            @foreach($links as $link)
                <tr>
                    <td>{{ $link->platform }}</td>
                    <td style="word-break:break-all"><a href="{{ $link->url }}" target="_blank" style="color:#2563eb">{{ $link->url }}</a></td>
                    <td>
                        <div style="display:flex; gap:8px; flex-wrap:wrap">
                            <a class="btn" href="{{ route('admin.social-links.edit', $link) }}">ویرایش</a>
                            <form method="POST" action="{{ route('admin.social-links.destroy', $link) }}">
                                @csrf
                                @method('DELETE')
                                <button class="btn danger" type="submit">حذف</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
