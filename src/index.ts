import { join } from "node:path"
import { consola } from "consola"
import { processImages } from "./extractor"

// 入力ディレクトリ
const INPUT_DIR = "work/input"
// 出力ディレクトリ
const OUTPUT_DIR = "work/output"
// 使用モデル
const models = [
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "google/gemini-2.5-flash",
  "anthropic/claude-3-5-haiku-latest",
  "xai/grok-2-vision-1212",
]

const glob = new Bun.Glob("*.{jpg,jpeg,png,webp,gif,pdf}")
const images = Array.from(glob.scanSync(INPUT_DIR)).map((f) => join(INPUT_DIR, f))

if (images.length === 0) {
  consola.error(`🚫 画像が見つかりません: ${INPUT_DIR}`)
  process.exit(1)
}

consola.info(`🖼️  ${images.length}枚 × ${models.length}モデル`)

const results = await processImages(models, images)

const outputPath = join(OUTPUT_DIR, "results.json")
await Bun.write(outputPath, JSON.stringify(results, null, 2))

consola.success(`💾 ${outputPath}`)
