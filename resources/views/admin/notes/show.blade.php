@extends('layouts.admin')

@section('title','مشاهده دل‌نوشته')

@section('content')
    <div style="word-wrap:break-word">
        <strong style="font-size:16px; display:block; margin-bottom:12px">{{ $note->first_name }} {{ $note->last_name }}</strong>
        <p style="margin:12px 0; line-height:1.6">{{ $note->message }}</p>
        <p class="muted">وضعیت:
            @if($note->status === \App\Models\Note::STATUS_APPROVED)
                تایید شده
            @elseif($note->status === \App\Models\Note::STATUS_REJECTED)
                رد شده
            @else
                در انتظار
            @endif
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:16px">
            <form method="POST" action="{{ route('admin.notes.approve', $note) }}">
                @csrf
                <button class="btn" type="submit">تایید</button>
            </form>
            <form method="POST" action="{{ route('admin.notes.reject', $note) }}">
                @csrf
                <button class="btn danger" type="submit">رد</button>
            </form>
            <a class="btn" href="{{ route('admin.notes.index') }}" style="background:#6b7280">بازگشت</a>
        </div>
    </div>
@endsection
