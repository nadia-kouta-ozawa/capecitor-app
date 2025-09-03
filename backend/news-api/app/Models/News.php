<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Newsモデル - ニュース記事データのEloquentモデル
 * 
 * このモデルはニュース記事のデータベースアクセスを管理します。
 * 'news'テーブルと対応し、記事の作成・取得・更新・削除を行います。
 */
class News extends Model
{
    /**
     * Mass Assignment（一括代入）を許可するフィールド
     * 
     * fillableで指定されたフィールドは、create()やupdate()メソッドで
     * 一括してデータを設定することができます。
     * セキュリティ上、許可されていないフィールドは一括代入から除外されます。
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'title',         // 記事タイトル（文字列、最大255文字）
        'description',   // 記事の要約・説明文（テキスト）
        'content',       // 記事の本文内容（長文テキスト）
        'image_url',     // 記事のメイン画像URL（文字列、NULL可）
        'published_at',  // 記事の公開日時（タイムスタンプ）
        'source',        // 記事のソース・出典（文字列）
        'category',      // 記事のカテゴリ（文字列: technology, business, sports等）
        'author',        // 記事の著者名（文字列、NULL可）
        'url'           // 元記事のURL（文字列）
    ];

    /**
     * 属性の型キャスト設定
     * 
     * データベースから取得したデータを指定された型に自動変換します。
     * これにより、PHPコード内で適切なデータ型として扱うことができます。
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime'  // published_atフィールドをCarbonインスタンス（日時オブジェクト）にキャスト
    ];

    /**
     * テーブル名の明示的指定
     * 
     * 通常、Laravelはクラス名から自動的にテーブル名を推測しますが、
     * 明示的に指定することで誤解を防ぎます。
     * 
     * @var string
     */
    protected $table = 'news';

    /**
     * JSONシリアライゼーションに含めない属性
     * 
     * API レスポンスやJSON変換時に除外したい属性を指定します。
     * （現在は設定なし：全属性をJSONに含める）
     * 
     * @var array<int, string>
     */
    protected $hidden = [
        // 必要に応じて、JSONレスポンスから除外したい属性を追加
        // 例: 'internal_notes', 'editor_id' など
    ];

    /**
     * 記事のフルURLを取得するアクセサ
     * 
     * 使用例: $news->full_url または $news->fullUrl
     * 
     * @return string 記事のフルURL
     */
    public function getFullUrlAttribute(): string
    {
        return $this->url;
    }

    /**
     * 記事の公開状況を判定するメソッド
     * 
     * 現在時刻と比較して記事が公開済みかどうかを判定します。
     * 
     * @return bool 公開済みの場合true、未公開の場合false
     */
    public function isPublished(): bool
    {
        return $this->published_at <= now();
    }

    /**
     * カテゴリの表示名を取得するメソッド
     * 
     * データベースに保存されているカテゴリコードを
     * 日本語の表示名に変換します。
     * 
     * @return string カテゴリの日本語表示名
     */
    public function getCategoryDisplayName(): string
    {
        $categories = [
            'technology' => '技術',
            'business' => 'ビジネス',
            'sports' => 'スポーツ',
            'entertainment' => 'エンターテイメント',
            'politics' => '政治',
            'general' => '一般'
        ];

        return $categories[$this->category] ?? $this->category;
    }

    /**
     * 記事の要約を指定文字数で取得するメソッド
     * 
     * 記事の本文から指定された文字数で要約を作成します。
     * 
     * @param int $length 要約の最大文字数（デフォルト: 100文字）
     * @return string 指定文字数に収めた要約テキスト
     */
    public function getExcerpt(int $length = 100): string
    {
        // HTMLタグを除去し、指定文字数で切り取り
        $text = strip_tags($this->content);
        
        if (mb_strlen($text) <= $length) {
            return $text;
        }
        
        return mb_substr($text, 0, $length) . '...';
    }

    /**
     * クエリスコープ: 公開済み記事のみを取得
     * 
     * 使用例: News::published()->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('published_at', '<=', now());
    }

    /**
     * クエリスコープ: 特定カテゴリの記事を取得
     * 
     * 使用例: News::byCategory('technology')->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $category カテゴリ名
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * クエリスコープ: 最新記事順に並び替え
     * 
     * 使用例: News::latest()->get()
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc');
    }
}
