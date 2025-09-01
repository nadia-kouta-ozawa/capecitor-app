

## ニュースアプリ実装

このプロジェクトでは、Capacitor + React + TypeScript + TailwindCSSで作成したニュースアプリを実装しています。

### 機能
- 📰 ニュース記事一覧表示（グリッドレイアウト）
- 📖 記事詳細ページ（タップ/クリックで表示）
- 🏷️ カテゴリ別フィルタリング（テクノロジー、ビジネス、スポーツ等）
- 🌙 ダークモード切り替え
- 📱 レスポンシブデザイン（Web/モバイル対応）
- 🖼️ 画像付き記事カード
- 🕒 日時表示（日本語フォーマット）

### プロジェクト構造
```
src/
├── components/
│   ├── Header.tsx          # ヘッダー・ダークモード切り替え
│   ├── NewsList.tsx        # ニュース一覧・カテゴリフィルター
│   ├── NewsCard.tsx        # ニュース記事カード
│   └── NewsDetail.tsx      # ニュース詳細ページ
├── types/
│   └── news.ts             # TypeScript型定義
├── data/
│   └── mockNews.ts         # モックデータ
└── App.tsx                 # メインアプリロジック
```

### 開発手順
```bash
# 1. 依存関係インストール
pnpm install

# 2. 開発サーバー起動
npm run dev

# 3. ビルド
npm run build

# 4. Capacitorプロジェクト同期
npx cap sync

# 5. モバイルアプリ実行
npx cap run ios      # iOS
npx cap run android  # Android

# または IDE で開く
npx cap open ios     # Xcode
npx cap open android # Android Studio
```

### 技術スタック
- **フロントエンド**: React 19 + TypeScript
- **スタイリング**: TailwindCSS v4
- **ビルドツール**: Vite
- **モバイル**: Capacitor 7
- **データ**: モックデータ（将来的にAPI連携可能）

### アクセス方法
- **Web**: http://localhost:5173/
- **iOS**: Xcodeシミュレータ
- **Android**: Androidエミュレータ
