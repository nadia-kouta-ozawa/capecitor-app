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


## serena 
```bash
# SerenaをClaude Codeに統合
claude mcp add-json "serena" '{"command":"uvx","args":["--from","git+https://github.com/oraios/serena","serena-mcp-server"]}'
```