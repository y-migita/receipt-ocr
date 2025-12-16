# receipt-ocr

レシート画像からAIで情報を抽出するツールです。

複数のAIモデル（GPT-4o, Gemini, Claude, Grok）で同時に処理して、精度を比較できます。

## 使い方

```bash
# インストール
bun install

# work/input/ にレシート画像を入れて実行
bun run start

# 結果は work/output/results.json に出力されます
```

## 抽出項目

- 発行日
- 店舗名
- 合計金額（税込）

## 必要な設定

`.env` ファイルを作成して、Vercel AI Gatewayで取得したAPIキーを入力してください。

```
# AI Gateway API Key https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2F&title=
AI_GATEWAY_API_KEY=your_api_key_here
```

## 結果の確認

```bash
# 実行結果を比較するビューアーを起動
bun run viewer
```
