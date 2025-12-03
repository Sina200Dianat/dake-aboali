@extends('layouts.admin')

@section('title','دل‌نوشته‌ها')

@section('content')
    <p><a class="btn" href="{{ route('admin.notes.create') }}">افزودن دل‌نوشته</a></p>
    <div style="overflow-x:auto">
        <table>
            <thead>
            <tr><th>نام</th><th>پیام</th><th>وضعیت</th><th>تاریخ</th><th>عملیات</th></tr>
            </thead>
            <tbody>
            @foreach($notes as $note)
                <tr>
                    <td>{{ $note->first_name }} {{ $note->last_name }}</td>
                    <td>{{ Str::limit($note->message,60) }}</td>
                    <td>
                        @if($note->status === \App\Models\Note::STATUS_APPROVED)
                            تایید شده
                        @elseif($note->status === \App\Models\Note::STATUS_REJECTED)
                            رد شده
                        @else
                            در انتظار
                        @endif
                    </td>
                    <td>{{ $note->created_at->format('Y-m-d') }}</td>
                    <td>
                        <div style="display:flex; gap:8px; flex-wrap:wrap">
                            <a class="btn" href="{{ route('admin.notes.show', $note) }}">مشاهده</a>
                            <a class="btn" href="{{ route('admin.notes.edit', $note) }}">ویرایش</a>
                            <form method="POST" action="{{ route('admin.notes.destroy', $note) }}">
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
