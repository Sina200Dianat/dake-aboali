@extends('layouts.admin')

@section('title','آیتم‌های منو')

@section('content')
    <p><a class="btn" href="{{ route('admin.menu-items.create') }}">افزودن آیتم</a></p>
    <div style="overflow-x:auto">
        <table>
            <thead>
            <tr><th>نام</th><th>قیمت</th><th>دسته</th><th>وضعیت</th><th>عملیات</th></tr>
            </thead>
            <tbody>
            @foreach($items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ number_format($item->price,2) }}</td>
                    <td>{{ $item->category }}</td>
                    <td>{{ $item->is_active ? 'فعال' : 'غیرفعال' }}</td>
                    <td>
                        <div style="display:flex; gap:8px; flex-wrap:wrap">
                            <a class="btn" href="{{ route('admin.menu-items.edit', $item) }}">ویرایش</a>
                            <form method="POST" action="{{ route('admin.menu-items.destroy', $item) }}">
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
