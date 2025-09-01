# capecitor-app
capecitor練習用アプリ

## 開発中の更新サイクル
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

# ライブリロード（開発時）
```bash
# ローカルサーバーでReactアプリを起動
npm start

# 別ターミナルで
npx cap run ios --live-reload --external
npx cap run android --live-reload --external
```
## 導入はこちら
https://zenn.dev/yoshinani_dev/articles/20240802_capacitorjs


## TailwindCSS v4 設定

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

## プロジェクトに serena MCPを追加
```bash
# SerenaをClaude Codeに統合
claude mcp add-json "serena" '{"command":"uvx","args":["--from","git+https://github.com/oraios/serena","serena-mcp-server"]}'
```