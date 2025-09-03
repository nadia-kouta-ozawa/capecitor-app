<?php

/**
 * ニュース記事テーブル作成マイグレーション
 * 
 * ファイル名: 2025_09_02_111924_create_news_table.php
 * 作成日時: 2025年9月2日 11:19:24
 * 
 * このマイグレーションファイルは news テーブルの構造を定義します。
 * ニュース記事の全ての必要な情報を格納するためのカラムを作成します。
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * マイグレーションの実行（テーブル作成）
     * 
     * このメソッドは `php artisan migrate` 実行時に呼び出されます。
     * news テーブルを作成し、必要なカラムとインデックスを定義します。
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            // 主キー（自動インクリメントのID）
            $table->id();
            
            // 記事の基本情報
            $table->string('title');                    // 記事タイトル（最大255文字、NOT NULL）
            $table->text('description');               // 記事の要約・説明（TEXT型、NOT NULL）
            $table->longText('content');               // 記事の本文（LONGTEXT型、長文対応、NOT NULL）
            
            // 記事のメタ情報
            $table->string('image_url')->nullable();   // 記事画像のURL（255文字、NULL許可）
            $table->timestamp('published_at');         // 公開日時（TIMESTAMP型、NOT NULL）
            $table->string('source');                  // ニュースソース・出典（255文字、NOT NULL）
            $table->string('category');                // カテゴリ（255文字、NOT NULL）
            $table->string('author')->nullable();      // 著者名（255文字、NULL許可）
            $table->string('url');                     // 元記事のURL（255文字、NOT NULL）
            
            // Laravel標準のタイムスタンプ（created_at, updated_at）
            $table->timestamps();
            
            // インデックスの作成（検索パフォーマンス向上のため）
            $table->index('published_at');             // 公開日時でのソート・検索用
            $table->index('category');                 // カテゴリフィルタリング用
            $table->index('source');                   // ニュースソースでの検索用
            $table->index(['category', 'published_at']); // カテゴリ別最新記事取得用の複合インデックス
        });
    }

    /**
     * マイグレーションのロールバック（テーブル削除）
     * 
     * このメソッドは `php artisan migrate:rollback` 実行時に呼び出されます。
     * up() メソッドで作成したテーブルを削除し、データベースを前の状態に戻します。
     */
    public function down(): void
    {
        // news テーブルが存在する場合のみ削除
        // dropIfExists() により、テーブルが存在しない場合でもエラーになりません
        Schema::dropIfExists('news');
    }
};
