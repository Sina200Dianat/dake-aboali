<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Http\Requests\NoteRequest;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $notes = Note::orderBy('created_at', 'desc')->get();
        return view('admin.notes.index', compact('notes'));
    }

    public function create()
    {
        return view('admin.notes.create');
    }

    public function store(NoteRequest $request)
    {
        $data = $request->validated();
        // Admin-created notes are approved by default if status not provided
        if (!isset($data['status'])) {
            $data['status'] = Note::STATUS_APPROVED;
        }
        Note::create($data);
        return redirect()->route('admin.notes.index')->with('success', 'دل‌نوشته افزوده شد');
    }

    public function show(Note $note)
    {
        return view('admin.notes.show', compact('note'));
    }

    public function edit(Note $note)
    {
        return view('admin.notes.edit', compact('note'));
    }

    public function update(NoteRequest $request, Note $note)
    {
        $note->update($request->validated());
        return redirect()->route('admin.notes.index')->with('success', 'دل‌نوشته به‌روز شد');
    }

    public function approve(Note $note)
    {
        $note->update(['status' => Note::STATUS_APPROVED]);
        return redirect()->back()->with('success', 'دل‌نوشته تایید شد');
    }

    public function reject(Note $note)
    {
        $note->update(['status' => Note::STATUS_REJECTED]);
        return redirect()->back()->with('success', 'دل‌نوشته رد شد');
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->route('admin.notes.index')->with('success', 'دل‌نوشته حذف شد');
    }
}
