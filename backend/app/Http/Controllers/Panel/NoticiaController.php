<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = Noticia::where('estado', 1)->get();

        return response()->json($noticias);
    }

    public function show(Noticia $noticia)
    {
        return response()->json($noticia);
    }

    public function store(Request $request)
    {
        $imagen = $request->file('imagen');
        $titulo = $request->titulo;
        $validator = Validator::make(
            array(
                'titulo' => $titulo,
                'imagen' => $imagen,
            ),
            array(
                'titulo' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $noticia = Noticia::create([
            'imagen' => $request->imagen->store('noticia', 'public'),
            'titulo' => $request->titulo,
        ]);

        return response()->json([
            'noticia' => $noticia,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('imagen')) {
            $rules = array(
                'titulo' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
            );
        } else {
            $rules = array(
                'titulo' => 'required|string|max:250',
            );
        }

        $imagen = $request->file('imagen');
        $titulo = $request->titulo;
        $validator = Validator::make(
            array(
                'titulo' => $titulo,
                'imagen' => $imagen,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $noticia = Noticia::find($request->noticia_id);
        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($noticia->imagen);
            $noticia->imagen = $request->imagen->store('noticia', 'public');
        }

        $noticia->titulo = $request->titulo;

        $noticia->save();

        return response()->json([
            'registro' => $noticia,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Noticia $noticia)
    {

        $noticia->estado = 0;
        $noticia->save();

        return response()->json([
            'registro' => $noticia,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
