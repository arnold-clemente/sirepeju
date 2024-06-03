<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class SliderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(Request $request)
    {
        if ($request->hasFile('imagen')) {
            return [
                'titulo' => 'required|string|max:250',
                'fecha' => 'required|string|max:250',
                'imagen' => 'file|max:1000|mimes:jpeg,jpg,png',
                'descripcion' => 'required|string|max:500',
            ];
        } else {
            return [
                'titulo' => 'required|string|max:250',
                'fecha' => 'required|string|max:250',
                'descripcion' => 'required|string|max:500',
            ];
        }
    }
}
