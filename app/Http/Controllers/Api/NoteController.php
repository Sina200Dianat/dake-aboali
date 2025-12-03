<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::where('status', Note::STATUS_APPROVED)
            ->orderBy('created_at', 'desc')
            ->get(['id','first_name','last_name','message','created_at']);

        return response()->json($notes);
    }

    public function store(NoteRequest $request)
    {
        $data = $request->validated();
        $data['status'] = Note::STATUS_PENDING;
        $note = Note::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Your note has been submitted and is awaiting approval.'
        ], 201);
    }
}
