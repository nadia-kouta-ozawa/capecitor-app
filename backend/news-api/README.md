# News API - Laravel Backend

このプロジェクトは、ニュース記事を管理するためのLaravel REST APIです。React Capacitorアプリのバックエンドとして開発されています。

## 📋 プロジェクト概要

- **プロジェクト名**: News API
- **フレームワーク**: Laravel 12.x
- **PHP バージョン**: 8.2+
- **データベース**: SQLite (デフォルト) / MySQL 対応
- **認証**: Laravel Sanctum
- **用途**: ニュース記事のCRUD操作API

## 🚀 セットアップ

### 前提条件

- PHP 8.2以上
- Composer
- SQLite または MySQL

### インストール手順

1. **依存関係のインストール**
   ```bash
   composer install
   ```

2. **環境設定**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **データベース設定**
   
   **SQLite使用の場合（推奨）**:
   ```bash
   touch database/database.sqlite
   ```
   
   **MySQL使用の場合**:
   `.env`ファイルを編集
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=news_api
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. **マイグレーション実行**
   ```bash
   php artisan migrate
   ```

5. **サーバー起動**
   ```bash
   # ローカル開発用
   php artisan serve
   
   # ネットワーク経由でアクセス（Capacitorアプリ用）
   php artisan serve --host=0.0.0.0 --port=8000
   ```

## 📡 API エンドポイント

### ニュース記事 API

| HTTP メソッド | エンドポイント | 説明 | 認証 |
|---------------|---------------|------|------|
| GET | `/api/news` | ニュース記事一覧取得 | 不要 |
| GET | `/api/news/{id}` | 特定記事取得 | 不要 |
| POST | `/api/news` | 新規記事作成 | 不要 |
| PUT | `/api/news/{id}` | 記事更新 | 不要 |
| DELETE | `/api/news/{id}` | 記事削除 | 不要 |

### レスポンス例

**GET /api/news**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "title": "サンプルニュース",
      "description": "ニュースの説明文",
      "content": "記事の詳細内容...",
      "image_url": "https://example.com/image.jpg",
      "published_at": "2025-09-02T12:00:00.000000Z",
      "source": "News Source",
      "category": "technology",
      "author": "記事作成者",
      "url": "https://example.com/article",
      "created_at": "2025-09-02T12:00:00.000000Z",
      "updated_at": "2025-09-02T12:00:00.000000Z"
    }
  ],
  "first_page_url": "http://127.0.0.1:8000/api/news?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "http://127.0.0.1:8000/api/news?page=1",
  "links": [...],
  "next_page_url": null,
  "path": "http://127.0.0.1:8000/api/news",
  "per_page": 10,
  "prev_page_url": null,
  "to": 1,
  "total": 1
}
```

**POST /api/news (リクエスト)**
```json
{
  "title": "新しいニュース記事",
  "description": "記事の要約・説明",
  "content": "記事の詳細な内容...",
  "image_url": "https://example.com/image.jpg",
  "published_at": "2025-09-02T12:00:00Z",
  "source": "ニュースソース",
  "category": "technology",
  "author": "記事作成者",
  "url": "https://example.com/original-article"
}
```

## 🗃️ データベース構造

### newsテーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|----|----|------|
| id | bigint | PRIMARY KEY | 記事ID |
| title | varchar(255) | NOT NULL | 記事タイトル |
| description | text | NOT NULL | 記事の要約 |
| content | longtext | NOT NULL | 記事の本文 |
| image_url | varchar(255) | NULLABLE | 画像URL |
| published_at | timestamp | NOT NULL | 公開日時 |
| source | varchar(255) | NOT NULL | ニュースソース |
| category | varchar(255) | NOT NULL | カテゴリ |
| author | varchar(255) | NULLABLE | 記事作成者 |
| url | varchar(255) | NOT NULL | 元記事URL |
| created_at | timestamp | NOT NULL | 作成日時 |
| updated_at | timestamp | NOT NULL | 更新日時 |

## 📝 バリデーションルール

### 作成時（POST）- 全て必須
- **title**: 文字列、最大255文字
- **description**: 文字列
- **content**: 文字列
- **image_url**: URL形式（オプション）
- **published_at**: 日時形式
- **source**: 文字列
- **category**: 文字列
- **author**: 文字列（オプション）
- **url**: URL形式

### 更新時（PUT）- 部分更新可能
- すべてのフィールドが`sometimes`バリデーション
- 同じバリデーションルールを適用

## 📂 カテゴリ一覧

現在サポートしているカテゴリ：
- `technology` - 技術
- `business` - ビジネス
- `sports` - スポーツ
- `entertainment` - エンターテイメント
- `politics` - 政治
- `general` - 一般

## 🧪 テストデータ作成

### Laravel Tinkerを使用

```bash
php artisan tinker
```

```php
// 単一記事作成
App\Models\News::create([
    'title' => 'テスト記事',
    'description' => 'テスト記事の説明',
    'content' => 'テスト記事の詳細内容...',
    'image_url' => 'https://via.placeholder.com/800x600',
    'published_at' => now(),
    'source' => 'Test Source',
    'category' => 'technology',
    'author' => 'テスト作成者',
    'url' => 'https://example.com/test-article'
]);

// 複数記事一括作成
$categories = ['technology', 'business', 'sports', 'entertainment', 'politics', 'general'];
for ($i = 1; $i <= 10; $i++) {
    App\Models\News::create([
        'title' => "テスト記事 {$i}",
        'description' => "テスト記事 {$i} の説明です。",
        'content' => "テスト記事 {$i} の詳細な内容がここに入ります。",
        'image_url' => "https://via.placeholder.com/800x600?text=Article+{$i}",
        'published_at' => now()->subDays(rand(0, 30)),
        'source' => 'Test Source',
        'category' => $categories[array_rand($categories)],
        'author' => "テスト作成者 {$i}",
        'url' => "https://example.com/test-article-{$i}"
    ]);
}
```

### cURLでの作成

```bash
curl -X POST http://127.0.0.1:8000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "cURL作成記事",
    "description": "cURLで作成したテスト記事",
    "content": "cURLコマンドを使って作成した記事の詳細内容...",
    "image_url": "https://via.placeholder.com/800x600?text=cURL+Article",
    "published_at": "2025-09-02T12:00:00Z",
    "source": "cURL Test",
    "category": "general",
    "author": "cURL User",
    "url": "https://example.com/curl-article"
  }'
```

## 🌐 CORS設定

React Capacitorアプリとの連携のため、以下のオリジンを許可：

```php
// config/cors.php
'allowed_origins' => [
    'http://localhost:5173',     // Vite dev server
    'http://127.0.0.1:5173',    // Vite dev server (alt)
    'http://localhost:5174',     // Vite dev server (port conflict)
    'capacitor://localhost',     // Capacitor iOS
    'ionic://localhost',         // Capacitor Android
    'http://localhost',          // General localhost
    'https://localhost'          // HTTPS localhost
],
```

## 🔧 開発コマンド

```bash
# 開発サーバー起動
php artisan serve

# ネットワーク経由でアクセス可能にする（Capacitor用）
php artisan serve --host=0.0.0.0 --port=8000

# マイグレーション実行
php artisan migrate

# マイグレーションロールバック
php artisan migrate:rollback

# マイグレーションリセット
php artisan migrate:reset

# ルート一覧表示
php artisan route:list

# Tinker起動（インタラクティブシェル）
php artisan tinker

# キャッシュクリア
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## 🏗️ アーキテクチャ

### ディレクトリ構造

```
backend/news-api/
├── app/
│   ├── Http/Controllers/Api/
│   │   └── NewsController.php    # ニュースAPI コントローラー
│   └── Models/
│       ├── News.php               # ニュースモデル
│       └── User.php               # ユーザーモデル
├── config/
│   ├── cors.php                   # CORS設定
│   └── ...
├── database/
│   ├── migrations/
│   │   ├── *_create_news_table.php
│   │   └── *_create_personal_access_tokens_table.php
│   └── database.sqlite            # SQLiteデータベース
├── routes/
│   └── api.php                    # APIルート定義
└── ...
```

### 主要ファイル

**NewsController.php** - API エンドポイントの実装
```php
class NewsController extends Controller
{
    public function index()     // GET /api/news
    public function store()     // POST /api/news
    public function show()      // GET /api/news/{id}
    public function update()    // PUT /api/news/{id}
    public function destroy()   // DELETE /api/news/{id}
}
```

**News.php** - Eloquent モデル
```php
class News extends Model
{
    protected $fillable = [
        'title', 'description', 'content', 'image_url',
        'published_at', 'source', 'category', 'author', 'url'
    ];
    
    protected $casts = [
        'published_at' => 'datetime'
    ];
}
```

## 🔒 セキュリティ

- **Laravel Sanctum**: API認証システム（設定済み、未使用）
- **Mass Assignment Protection**: `$fillable` による保護
- **CORS**: 適切なオリジン制限
- **Input Validation**: 全エンドポイントでバリデーション実装
- **SQL Injection**: Eloquent ORMによる保護

## 📊 パフォーマンス

- **ページネーション**: 一覧取得時に10件ずつ表示
- **インデックス**: 主キーと作成日時にインデックス設定
- **N+1クエリ対策**: 単純なCRUD操作のため影響なし

## 🧪 テスト

```bash
# テスト実行
php artisan test

# 特定のテストクラス実行
php artisan test tests/Feature/NewsApiTest.php

# カバレッジレポート生成
php artisan test --coverage
```

## 📈 モニタリング

- **ログ**: `storage/logs/laravel.log`
- **デバッグ**: `.env` で `APP_DEBUG=true` 設定
- **エラートラッキング**: Laravel標準のエラーハンドリング

## 🚀 本番環境デプロイ

```bash
# 本番環境用最適化
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# 依存関係インストール（本番用）
composer install --no-dev --optimize-autoloader
```

## 📞 API使用例

### JavaScript/TypeScript

```typescript
// 記事一覧取得
const response = await fetch('http://127.0.0.1:8000/api/news');
const data = await response.json();

// 記事作成
const response = await fetch('http://127.0.0.1:8000/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '新しい記事',
    description: '記事の説明',
    content: '記事の内容...',
    published_at: new Date().toISOString(),
    source: 'My App',
    category: 'general',
    url: 'https://example.com/article'
  })
});
```

### PHP

```php
// 記事一覧取得
$response = file_get_contents('http://127.0.0.1:8000/api/news');
$data = json_decode($response, true);

// cURLを使った記事作成
$ch = curl_init('http://127.0.0.1:8000/api/news');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'title' => '新しい記事',
    'description' => '記事の説明',
    'content' => '記事の内容...',
    'published_at' => date('c'),
    'source' => 'My App',
    'category' => 'general',
    'url' => 'https://example.com/article'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
```

## ⚠️ トラブルシューティング

### よくある問題

1. **CORS エラー**
   - `config/cors.php` でオリジンが許可されているか確認
   - サーバーが正しく起動しているか確認

2. **データベース接続エラー**
   - `.env` ファイルのDB設定を確認
   - SQLiteファイルの存在と権限を確認

3. **404 Not Found**
   - `routes/api.php` が正しく設定されているか確認
   - `bootstrap/app.php` でAPIルートが有効か確認

4. **バリデーションエラー**
   - リクエストボディのフィールド名と型を確認
   - 必須フィールドが全て含まれているか確認

## 📄 ライセンス

このプロジェクトは [MIT License](https://opensource.org/licenses/MIT) の下で公開されています。

## 👥 貢献

バグ報告や機能提案は GitHub Issues でお願いします。
プルリクエストも歓迎します。

---

**開発者**: Claude AI Assistant  
**作成日**: 2025年9月2日  
**バージョン**: 1.0.0