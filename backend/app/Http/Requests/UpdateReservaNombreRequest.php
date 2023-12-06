<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservaNombreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'hr' => 'required|numeric|max:99999999',
            'fecha' => 'required',
            'entidad' => 'required|string|max:250',
            'sigla' => 'required|string|max:100',
            'representante' => 'required|string|max:200',
            'persona_colectiva' => 'required',
            'naturaleza' => 'required',
            'obs' => 'required|string|max:150',
            'telefono' => 'required|string|min:8|max:50',
            'correo' => 'required|email|max:150',
        ];
    }
}
