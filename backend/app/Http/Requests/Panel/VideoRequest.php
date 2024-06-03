<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class VideoRequest extends FormRequest
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
            if ($request->hasFile('video')) {
                return [
                    'imagen' => 'file|max:1000|mimes:jpeg,jpg,png',
                    'video' => 'file|max:24000|mimes:mp4,x-flv,x-mpegURL,MP2T,3gpp,quicktime,x-msvideo,x-ms-wmv',
                    'descripcion' => 'required|string|max:250',
                ];
            } else {
                return [
                    'imagen' => 'file|max:1000|mimes:jpeg,jpg,png',
                    'descripcion' => 'required|string|max:250',
                ];
            }
        } else {
            return [
                'descripcion' => 'required|string|max:250',
            ];
        }
    }
}
