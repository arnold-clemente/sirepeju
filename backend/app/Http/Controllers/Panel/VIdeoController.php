<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\VideoRequest;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VIdeoController extends Controller
{
    public function index()
    {
        $videos = Video::where('estado', 1)->get();

        return response()->json($videos);
    }

    public function show(Video $video)
    {
        return response()->json($video);
    }

    public function store(Request $request)
    {
        $imagen = $request->file('imagen');
        $video = $request->file('video');
        $descripcion = $request->descripcion;
        $validator = Validator::make(
            array(
                'video' => $video,
                'imagen' => $imagen,
                'descripcion' => $descripcion,
            ),
            array(
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                'video' => 'required|file|max:24000|mimes:mp4,x-flv,x-mpegURL,MP2T,3gpp,quicktime,x-msvideo,x-ms-wmv',
                'descripcion' => 'required|string|max:250',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $video = Video::create([
            'imagen' => $request->imagen->store('video', 'public'),
            'video' => $request->video->store('video', 'public'),
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            'slider' => $video,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(VideoRequest $request)
    {
        if ($request->hasFile('imagen')) {
            if ($request->hasFile('video')) {
                $rules = array(
                    'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                    'video' => 'required|file|max:24000|mimes:mp4,x-flv,x-mpegURL,MP2T,3gpp,quicktime,x-msvideo,x-ms-wmv',
                    'descripcion' => 'required|string|max:250',
                );
            } else {
                $rules = array(
                    'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                    'descripcion' => 'required|string|max:250',
                );
            }
        } else {
            if ($request->hasFile('video')) {
                $rules = array(
                    'video' => 'required|file|max:24000|mimes:mp4,x-flv,x-mpegURL,MP2T,3gpp,quicktime,x-msvideo,x-ms-wmv',
                    'descripcion' => 'required|string|max:250',
                );
            } else {
                $rules = array(
                    'descripcion' => 'required|string|max:250',
                );
            }
        }

        $imagen = $request->file('imagen');
        $video = $request->file('video');
        $descripcion = $request->descripcion;
        $validator = Validator::make(
            array(
                'video' => $video,
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


        $video = Video::find($request->video_id);
        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($video->imagen);
            $video->imagen = $request->imagen->store('video', 'public');
        }
        if ($request->hasFile('video')) {
            Storage::disk('public')->delete($video->imagen);
            $video->video = $request->video->store('video', 'public');
        }

        $video->descripcion = $request->descripcion;
        $video->save();

        return response()->json([
            'registro' => $video,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Video $video)
    {

        $video->estado = 0;
        $video->save();

        return response()->json([
            'registro' => $video,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
