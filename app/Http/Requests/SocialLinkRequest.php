<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'platform' => 'required|string|max:100',
            'url' => 'required|url|max:255',
        ];
    }

    public function messages()
    {
        return [
            'platform.required' => 'نام شبکه اجتماعی الزامی است.',
            'url.required' => 'آدرس URL الزامی است.',
            'url.url' => 'آدرس وارد شده معتبر نیست.',
        ];
    }
}
