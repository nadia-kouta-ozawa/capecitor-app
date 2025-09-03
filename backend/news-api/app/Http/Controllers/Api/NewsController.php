<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * ニュース記事API コントローラー
 * 
 * このクラスはニュース記事に関するCRUD操作を処理します。
 * 全てのメソッドはJSON形式でレスポンスを返します。
 */
class NewsController extends Controller
{
    /**
     * ニュース記事一覧の取得
     * 
     * GET /api/news
     * 
     * 機能説明:
     * - 全てのニュース記事を公開日時の降順（新しい順）で取得
     * - ページネーション機能により1ページ10件ずつ表示
     * - レスポンスにはページング情報も含まれる
     * 
     * @return \Illuminate\Http\JsonResponse ページング情報付きのニュース記事一覧
     */
    public function index()
    {
        // published_at（公開日時）の降順でソートし、10件ずつページネーション
        $news = News::orderBy('published_at', 'desc')->paginate(10);
        
        // JSON形式でレスポンスを返す
        // レスポンスには data, current_page, total, per_page 等の情報が含まれる
        return response()->json($news);
    }

    /**
     * 新しいニュース記事の作成
     * 
     * POST /api/news
     * 
     * 機能説明:
     * - リクエストデータのバリデーション（必須項目・形式チェック）
     * - データベースに新しい記事を保存
     * - 作成された記事情報をJSON形式で返却
     * 
     * @param \Illuminate\Http\Request $request HTTPリクエストオブジェクト
     * @return \Illuminate\Http\JsonResponse 作成された記事データ（ステータス201）
     */
    public function store(Request $request)
    {
        // 入力データのバリデーション実行
        // バリデーション失敗時は自動的に422エラーが返される
        $validated = $request->validate([
            'title' => 'required|string|max:255',        // タイトル（必須、文字列、最大255文字）
            'description' => 'required|string',          // 説明文（必須、文字列）
            'content' => 'required|string',              // 本文（必須、文字列）
            'image_url' => 'nullable|url',               // 画像URL（オプション、URL形式）
            'published_at' => 'required|date',           // 公開日時（必須、日付形式）
            'source' => 'required|string',               // ニュースソース（必須、文字列）
            'category' => 'required|string',             // カテゴリ（必須、文字列）
            'author' => 'nullable|string',               // 著者名（オプション、文字列）
            'url' => 'required|url'                      // 元記事URL（必須、URL形式）
        ]);

        // バリデーション済みデータでニュース記事を作成
        $news = News::create($validated);
        
        // HTTP 201 (Created) ステータスコードと共に作成されたデータを返す
        return response()->json($news, Response::HTTP_CREATED);
    }

    /**
     * 特定のニュース記事の詳細取得
     * 
     * GET /api/news/{id}
     * 
     * 機能説明:
     * - URLパラメータで指定されたIDの記事を取得
     * - Laravel の Route Model Binding により自動的にNewsモデルが注入される
     * - 記事が見つからない場合は自動的に404エラーが返される
     * 
     * @param \App\Models\News $news Route Model Bindingにより自動注入されるNewsインスタンス
     * @return \Illuminate\Http\JsonResponse 指定された記事の詳細データ
     */
    public function show(News $news)
    {
        // Route Model Bindingにより既に取得済みの記事データをJSON形式で返す
        return response()->json($news);
    }

    /**
     * 既存のニュース記事の更新
     * 
     * PUT /api/news/{id}
     * 
     * 機能説明:
     * - 部分更新（一部フィールドのみの更新）に対応
     * - リクエストに含まれたフィールドのみバリデーション・更新
     * - 更新されたデータをレスポンスとして返却
     * 
     * @param \Illuminate\Http\Request $request HTTPリクエストオブジェクト
     * @param \App\Models\News $news 更新対象のNewsインスタンス
     * @return \Illuminate\Http\JsonResponse 更新された記事データ
     */
    public function update(Request $request, News $news)
    {
        // 部分更新用のバリデーション
        // 'sometimes' ルールにより、フィールドが存在する場合のみバリデーションが実行される
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',       // タイトル（任意、文字列、最大255文字）
            'description' => 'sometimes|string',         // 説明文（任意、文字列）
            'content' => 'sometimes|string',             // 本文（任意、文字列）
            'image_url' => 'nullable|url',               // 画像URL（任意、URL形式またはnull）
            'published_at' => 'sometimes|date',          // 公開日時（任意、日付形式）
            'source' => 'sometimes|string',              // ニュースソース（任意、文字列）
            'category' => 'sometimes|string',            // カテゴリ（任意、文字列）
            'author' => 'nullable|string',               // 著者名（任意、文字列またはnull）
            'url' => 'sometimes|url'                     // 元記事URL（任意、URL形式）
        ]);

        // バリデーション済みデータで記事を更新
        // updated_at は自動的に現在時刻に更新される
        $news->update($validated);
        
        // 更新された記事データをJSON形式で返す
        return response()->json($news);
    }

    /**
     * 指定されたニュース記事の削除
     * 
     * DELETE /api/news/{id}
     * 
     * 機能説明:
     * - 指定されたIDの記事をデータベースから物理削除
     * - 削除成功時はHTTP 204 (No Content) を返却
     * - レスポンスボディは空
     * 
     * @param \App\Models\News $news 削除対象のNewsインスタンス
     * @return \Illuminate\Http\JsonResponse 空のレスポンス（ステータス204）
     */
    public function destroy(News $news)
    {
        // データベースから記事を物理削除
        $news->delete();
        
        // HTTP 204 (No Content) ステータスコードと空のレスポンスを返す
        // 削除処理が成功したことを示す
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
