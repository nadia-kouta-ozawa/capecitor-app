<?php

/**
 * API ルート定義ファイル
 * 
 * このファイルではニュースAPIのエンドポイントを定義します。
 * 全てのルートは '/api' プレフィックスが自動的に付加されます。
 */

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;

/**
 * ニュース記事API のルートグループ
 * 
 * APIミドルウェアグループを適用し、以下の機能を提供：
 * - Content-Type: application/json のヘッダー設定
 * - リクエスト/レスポンスの自動JSON変換
 * - レート制限の適用
 */
Route::middleware(['api'])->group(function () {
    /**
     * ニュース記事のRESTful APIリソース
     * 
     * apiResource() により以下のルートが自動生成されます：
     * - GET    /api/news         → NewsController@index   (記事一覧取得)
     * - POST   /api/news         → NewsController@store   (記事作成)
     * - GET    /api/news/{id}    → NewsController@show    (記事詳細取得)
     * - PUT    /api/news/{id}    → NewsController@update  (記事更新)
     * - DELETE /api/news/{id}    → NewsController@destroy (記事削除)
     * 
     * 注意: apiResource() では create/edit アクションは除外されます
     *       （APIでは通常HTMLフォーム表示が不要なため）
     */
    Route::apiResource('news', NewsController::class);
});

/**
 * 認証済みユーザー情報取得エンドポイント
 * 
 * Laravel Sanctum による認証が必要です。
 * 有効なトークンを持つユーザーの情報を返します。
 * 
 * 使用例:
 * Authorization: Bearer {your-api-token}
 * GET /api/user
 */
Route::get('/user', function (Request $request) {
    // 現在認証されているユーザー情報をJSON形式で返却
    return $request->user();
})->middleware('auth:sanctum');