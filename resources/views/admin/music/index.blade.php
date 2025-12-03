@extends('layouts.admin')

@section('title','موزیک‌ها')

@section('content')
    <p><a class="btn" href="{{ route('admin.musics.create') }}">بارگذاری موزیک</a></p>
    <div style="overflow-x:auto">
        <table>
            <thead>
            <tr><th>عنوان</th><th>هنرمند</th><th>وضعیت</th><th>عملیات</th></tr>
            </thead>
            <tbody>
            @foreach($musics as $music)
                <tr>
                    <td>{{ $music->title }}</td>
                    <td>{{ $music->artist }}</td>
                    <td>{{ $music->is_active ? 'فعال' : 'غیرفعال' }}</td>
                    <td>
                        <div style="display:flex; gap:8px; flex-wrap:wrap">
                            <a class="btn" href="{{ route('admin.musics.edit', $music) }}">ویرایش</a>
                            <form method="POST" action="{{ route('admin.musics.destroy', $music) }}">
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
