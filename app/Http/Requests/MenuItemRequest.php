<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuItemRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:100',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'نام آیتم الزامی است.',
            'name.string' => 'نام باید متن باشد.',
            'name.max' => 'نام نباید بیش از 255 کاراکتر باشد.',
            'price.required' => 'قیمت الزامی است.',
            'price.numeric' => 'قیمت باید یک عدد باشد.',
            'price.min' => 'قیمت نمی‌تواند منفی باشد.',
            'category.max' => 'دسته‌بندی نباید بیش از 100 کاراکتر باشد.',
        ];
    }
}
