# Capacitor News App - Laravel API & React Frontend

このプロジェクトはLaravel APIとReact Capacitorアプリで構成されたニュースアプリケーションです。

## 📁 プロジェクト構成

```
capecitor-app/
├── api/news-api/          # Laravel API (バックエンド)
├── app/                   # React Capacitor App (フロントエンド)
└── README.md
```

## 🚀 Laravel API セットアップ

### 前提条件

- PHP 8.2 以上
- Composer
- MySQL または SQLite

### インストール手順

1. **Laravel API ディレクトリに移動**
   ```bash
   cd api/news-api
   ```

2. **依存関係のインストール**
   ```bash
   composer install
   ```

3. **環境設定ファイルのコピー**
   ```bash
   cp .env.example .env
   ```

4. **アプリケーションキーの生成**
   ```bash
   php artisan key:generate
   ```

5. **データベース設定**
   `.env`ファイルでデータベース設定を行います：
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=/path/to/database/database.sqlite
   ```
   または MySQL を使用する場合：
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=news_api
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **マイグレーション実行**
   ```bash
   php artisan migrate
   ```

### API 起動方法

```bash
# Laravel API サーバー起動
cd api/news-api
php artisan serve --port=8000
```

サーバーは http://127.0.0.1:8000 で起動します。

## 📱 React App セットアップ

### 前提条件

- Node.js 20.19+ または 22.12+
- npm または pnpm

### インストール手順

1. **React App ディレクトリに移動**
   ```bash
   cd app
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   pnpm install
   ```

### React App 起動方法

```bash
# React開発サーバー起動
cd app
npm run dev
# または
pnpm dev
```

サーバーは http://localhost:5173 または http://localhost:5174 で起動します。

## 🔗 API エンドポイント

### ニュース記事 API

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/news` | ニュース記事一覧取得 |
| GET | `/api/news/{id}` | 特定記事取得 |
| POST | `/api/news` | 新規記事作成 |
| PUT | `/api/news/{id}` | 記事更新 |
| DELETE | `/api/news/{id}` | 記事削除 |

### APIレスポンス例

**GET /api/news**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "title": "テストニュース",
      "description": "これはテスト用のニュース記事です。",
      "content": "詳細な内容...",
      "image_url": "https://via.placeholder.com/800x600",
      "published_at": "2025-09-02T11:25:16.000000Z",
      "source": "Test Source",
      "category": "technology",
      "author": "テスト投稿者",
      "url": "https://example.com/test-news",
      "created_at": "2025-09-02T11:25:17.000000Z",
      "updated_at": "2025-09-02T11:25:17.000000Z"
    }
  ],
  "total": 1,
  "per_page": 10,
  "current_page": 1
}
```

**POST /api/news**
```json
{
  "title": "新しいニュース",
  "description": "ニュースの説明",
  "content": "詳細な記事内容",
  "image_url": "https://example.com/image.jpg",
  "published_at": "2025-09-02T12:00:00Z",
  "source": "ニュースソース",
  "category": "technology",
  "author": "記事作成者",
  "url": "https://example.com/news-article"
}
```

## 🔄 React と Laravel の連携

### API設定

React アプリは `src/services/api.ts` でLaravel APIと通信します：

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### CORS設定

Laravel側で React アプリからのアクセスを許可するため、CORS設定を行っています：

```php
// config/cors.php
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
```

### エラーハンドリング

React アプリは API エラー時に自動的にモックデータにフォールバックします：

1. API からデータ取得を試行
2. 失敗した場合、モックデータを使用
3. ユーザーに適切なメッセージを表示

## 📝 記事登録の方法

Laravel APIでニュース記事を登録する方法は複数あります。以下で詳しく解説します。

### 方法1: HTTP API経由での記事登録（推奨）

#### cURLを使用した登録

```bash
curl -X POST http://127.0.0.1:8000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新しいニュース記事",
    "description": "記事の要約・説明文がここに入ります",
    "content": "記事の詳細な内容。HTMLタグも使用可能です。この部分に記事の本文を記載します。",
    "image_url": "https://via.placeholder.com/800x600",
    "published_at": "2025-09-02T12:00:00Z",
    "source": "ニュースソース名",
    "category": "technology",
    "author": "記事作成者名",
    "url": "https://example.com/original-article"
  }'
```

#### 成功レスポンス例
```json
{
  "id": 2,
  "title": "新しいニュース記事",
  "description": "記事の要約・説明文がここに入ります",
  "content": "記事の詳細な内容...",
  "image_url": "https://via.placeholder.com/800x600",
  "published_at": "2025-09-02T12:00:00.000000Z",
  "source": "ニュースソース名",
  "category": "technology",
  "author": "記事作成者名",
  "url": "https://example.com/original-article",
  "created_at": "2025-09-02T12:00:15.000000Z",
  "updated_at": "2025-09-02T12:00:15.000000Z"
}
```

### 方法2: React アプリから登録

React アプリケーション内で `newsAPI.create()` を使用：

```typescript
import { newsAPI, transformNewsArticleToAPI } from '../services/api';

// 記事データを作成
const newArticle = {
  title: "React から投稿した記事",
  description: "React アプリから API 経由で投稿",
  content: "記事の詳細内容...",
  imageUrl: "https://example.com/image.jpg",
  publishedAt: new Date().toISOString(),
  source: "React App",
  category: "technology",
  author: "開発者",
  url: "https://example.com/react-article"
};

// API に送信
try {
  const response = await newsAPI.create(transformNewsArticleToAPI(newArticle));
  console.log('記事作成成功:', response);
} catch (error) {
  console.error('記事作成エラー:', error);
}
```

### 方法3: Laravel Tinker を使用（開発・テスト用）

```bash
cd api/news-api
php artisan tinker
```

```php
// 単一記事作成
App\Models\News::create([
    'title' => 'Tinkerで作成した記事',
    'description' => 'Laravel Tinker を使用して作成',
    'content' => '詳細な記事内容がここに入ります。',
    'image_url' => 'https://via.placeholder.com/800x600',
    'published_at' => now(),
    'source' => 'Tinker',
    'category' => 'technology',
    'author' => '開発者',
    'url' => 'https://example.com/tinker-article'
]);

// 複数記事を一括作成
$articles = [
    [
        'title' => '技術ニュース1',
        'description' => '最新の技術動向について',
        'content' => '技術関連の詳細内容...',
        'image_url' => 'https://via.placeholder.com/800x400',
        'published_at' => now(),
        'source' => 'Tech News',
        'category' => 'technology',
        'author' => 'Tech Writer',
        'url' => 'https://example.com/tech-1'
    ],
    [
        'title' => 'ビジネスニュース1',
        'description' => '経済・ビジネス関連の最新情報',
        'content' => 'ビジネス関連の詳細内容...',
        'image_url' => 'https://via.placeholder.com/800x400',
        'published_at' => now(),
        'source' => 'Business News',
        'category' => 'business',
        'author' => 'Business Writer',
        'url' => 'https://example.com/business-1'
    ]
];

foreach ($articles as $article) {
    App\Models\News::create($article);
}
```

### 方法4: Postman を使用

1. **新しいリクエストを作成**
2. **メソッド**: `POST`
3. **URL**: `http://127.0.0.1:8000/api/news`
4. **Headers**:
   - `Content-Type: application/json`
5. **Body** (raw JSON):
```json
{
  "title": "Postmanから投稿",
  "description": "Postmanを使用してAPI経由で投稿した記事",
  "content": "記事の詳細な内容をここに記載します。",
  "image_url": "https://example.com/postman-image.jpg",
  "published_at": "2025-09-02T15:30:00Z",
  "source": "Postman",
  "category": "tools",
  "author": "API Tester",
  "url": "https://example.com/postman-article"
}
```

## 📋 記事データの必須項目と形式

### 必須フィールド
- `title` (string): 記事タイトル
- `description` (string): 記事の要約
- `content` (string): 記事の本文
- `published_at` (datetime): 公開日時 (ISO 8601形式)
- `source` (string): ニュースソース
- `category` (string): カテゴリ
- `url` (string): 元記事URL

### オプションフィールド
- `image_url` (string|null): 画像URL
- `author` (string|null): 記事作成者

### カテゴリ一覧
現在サポートしているカテゴリ：
- `technology` - 技術
- `business` - ビジネス
- `sports` - スポーツ
- `entertainment` - エンターテイメント
- `politics` - 政治
- `general` - 一般

### 日時形式の注意点
`published_at` は以下の形式で指定してください：
- ISO 8601: `2025-09-02T15:30:00Z`
- Laravel形式: `2025-09-02 15:30:00`
- PHP関数: `now()` (Tinker使用時)

## 🔍 登録後の確認方法

### 作成された記事の確認
```bash
# 全記事一覧
curl http://127.0.0.1:8000/api/news

# 特定記事確認
curl http://127.0.0.1:8000/api/news/1

# Laravel Tinkerで確認
php artisan tinker
App\Models\News::latest()->first(); // 最新記事
App\Models\News::count(); // 総記事数
```

## 🧪 テストデータの一括作成

```bash
cd api/news-api
php artisan tinker
```

```php
// テスト用記事を10件作成
for ($i = 1; $i <= 10; $i++) {
    App\Models\News::create([
        'title' => "テスト記事 {$i}",
        'description' => "これは{$i}番目のテスト記事です。",
        'content' => "テスト記事{$i}の詳細な内容がここに入ります。Laravel APIの動作確認用です。",
        'image_url' => "https://via.placeholder.com/800x600?text=Article+{$i}",
        'published_at' => now()->subDays(rand(0, 30)),
        'source' => 'Test Source',
        'category' => collect(['technology', 'business', 'sports', 'entertainment'])->random(),
        'author' => "テスト作成者{$i}",
        'url' => "https://example.com/test-article-{$i}"
    ]);
}
echo "テスト記事10件を作成しました！";
```

## 🛠️ 開発時のトラブルシューティング

### CORS エラーが発生する場合

1. Laravel API サーバーが起動していることを確認
2. `config/cors.php` でReactアプリのURLが許可されていることを確認
3. ブラウザのキャッシュをクリア

### API接続エラーが発生する場合

1. Laravel API サーバーのURLが正しいことを確認
2. `src/services/api.ts` の `API_BASE_URL` を確認
3. ネットワーク設定を確認

### データベース接続エラーが発生する場合

1. `.env` ファイルのデータベース設定を確認
2. データベースが作成されていることを確認
3. マイグレーションが実行されていることを確認

## 📦 プロダクション環境への配置

### Laravel API

1. 本番用 `.env` ファイルの設定
2. `php artisan config:cache` でキャッシュ生成
3. `php artisan route:cache` でルートキャッシュ生成
4. `php artisan optimize` で最適化

### React App

1. `npm run build` でプロダクションビルド
2. `dist/` フォルダをWebサーバーに配置
3. API_BASE_URL を本番環境URLに変更

## 🔧 開発コマンド一覧

### Laravel API

```bash
# 開発サーバー起動
php artisan serve --port=8000

# マイグレーション実行
php artisan migrate

# マイグレーションリセット
php artisan migrate:reset

# ルート一覧表示
php artisan route:list

# Tinker起動
php artisan tinker
```

### React App

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# リント実行
npm run lint

# 型チェック
npm run type-check
```

---

## 📱 Capacitor モバイルアプリ開発

### 開発中の更新サイクル
```bash
# 1. Reactアプリをビルド
npm run build

# 2. 変更をネイティブにコピー
npx cap copy

# 3. ネイティブプロジェクトで実行
npx cap run ios    # または
npx cap run android
npx cap open ios
npx cap open android
```

### ライブリロード（開発時）
```bash
# ローカルサーバーでReactアプリを起動
npm start

# 別ターミナルで
npx cap run ios --live-reload --external
npx cap run android --live-reload --external
```

### 導入参考記事
https://zenn.dev/yoshinani_dev/articles/20240802_capacitorjs


## 📚 技術スタック

### バックエンド (Laravel API)
- Laravel 12.x
- PHP 8.2+
- SQLite/MySQL
- Laravel Sanctum (API認証)

### フロントエンド (React App)
- React 18
- TypeScript
- Vite 7
- TailwindCSS v4
- Capacitor (モバイル対応)

## 🎨 TailwindCSS v4 設定

### インストール
```bash
# TailwindCSS v4とViteプラグインをインストール
pnpm add -D tailwindcss @tailwindcss/vite
```

### 設定ファイル

**vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css**
```css
@import "tailwindcss";

/* その他のCSSスタイル */
```

### 特徴
- ゼロコンフィグレーション（設定ファイル不要）
- Viteプラグインで最適化されたパフォーマンス
- autoprefixer、postcss-import内蔵
- CSS-firstな設定（必要に応じて@theme使用）

## 🧰 開発ツール

### プロジェクトに serena MCPを追加
```bash
# SerenaをClaude Codeに統合
claude mcp add-json "serena" '{"command":"uvx","args":["--from","git+https://github.com/oraios/serena","serena-mcp-server"]}'
```

## 📄 ライセンス

MIT License