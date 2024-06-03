<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\SliderRequest;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::where('estado', 1)->get();

        return response()->json($sliders);
    }

    public function show(Slider $slider)
    {
        return response()->json($slider);
    }

    public function store(Request $request)
    {
        $imagen = $request->file('imagen');
        $titulo = $request->titulo;
        $fecha = $request->fecha;
        $descripcion = $request->descripcion;
        $validator = Validator::make(
            array(
                'titulo' => $titulo,
                'fecha' => $fecha,
                'imagen' => $imagen,
                'descripcion' => $descripcion,
            ),
            array(
                'titulo' => 'required|string|max:250',
                'fecha' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                'descripcion' => 'required|string|max:500',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $slider = Slider::create([
            'imagen' => $request->imagen->store('slider', 'public'),
            'titulo' => $request->titulo,
            'fecha' => $request->fecha,
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'slider' => $slider,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('imagen')) {
            $rules = array(
                'titulo' => 'required|string|max:250',
                'fecha' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                'descripcion' => 'required|string|max:500',
            );
        } else {
            $rules = array(
                'titulo' => 'required|string|max:250',
                'fecha' => 'required|string|max:250',
                'descripcion' => 'required|string|max:500',
            );
        }

        $imagen = $request->file('imagen');
        $titulo = $request->titulo;
        $fecha = $request->fecha;
        $descripcion = $request->descripcion;
        $validator = Validator::make(
            array(
                'titulo' => $titulo,
                'fecha' => $fecha,
                'imagen' => $imagen,
                'descripcion' => $descripcion,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $slider = Slider::find($request->slider_id);
        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($slider->imagen);
            $slider->imagen = $request->imagen->store('slider', 'public');
        }

        $slider->titulo = $request->titulo;
        $slider->fecha = $request->fecha;
        $slider->descripcion = $request->descripcion;

        $slider->save();

        return response()->json([
            'registro' => $slider,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Slider $slider)
    {

        $slider->estado = 0;
        $slider->save();

        return response()->json([
            'registro' => $slider,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
