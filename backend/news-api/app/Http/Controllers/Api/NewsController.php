<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::orderBy('published_at', 'desc')->paginate(10);
        return response()->json($news);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'published_at' => 'required|date',
            'source' => 'required|string',
            'category' => 'required|string',
            'author' => 'nullable|string',
            'url' => 'required|url'
        ]);

        $news = News::create($validated);
        return response()->json($news, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return response()->json($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'content' => 'sometimes|string',
            'image_url' => 'nullable|url',
            'published_at' => 'sometimes|date',
            'source' => 'sometimes|string',
            'category' => 'sometimes|string',
            'author' => 'nullable|string',
            'url' => 'sometimes|url'
        ]);

        $news->update($validated);
        return response()->json($news);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
