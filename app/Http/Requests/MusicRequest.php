<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MusicRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'title' => 'required|string|max:255',
            'artist' => 'nullable|string|max:255',
            'cover_image' => 'nullable|image|max:2048',
            'is_active' => 'sometimes|boolean',
        ];

        if ($this->isMethod('post')) {
            $rules['file'] = 'required|mimes:mp3,wav,ogg,aac|max:10240';
        } else {
            $rules['file'] = 'nullable|mimes:mp3,wav,ogg,aac|max:10240';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'title.required' => 'عنوان موزیک الزامی است.',
            'cover_image.image' => 'تصویر کاور باید یک فایل تصویری باشد.',
            'file.required' => 'فایل صوتی الزامی است.',
            'file.mimes' => 'فایل صوتی باید فرمت mp3، wav، ogg یا aac باشد.',
            'file.max' => 'اندازه فایل صوتی نباید بیش از 10 مگابایت باشد.',
        ];
    }
}
