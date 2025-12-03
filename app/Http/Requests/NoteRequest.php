<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoteRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'message' => 'required|string',
            'status' => 'sometimes|in:pending,approved,rejected',
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'نام الزامی است.',
            'last_name.required' => 'نام خانوادگی الزامی است.',
            'message.required' => 'پیام الزامی است.',
            'status.in' => 'وضعیت نامعتبر است.',
        ];
    }
}
