import { basename } from "node:path"
import { generateObject } from "ai"
import { consola } from "consola"
import { ReceiptSchema } from "./schema"

const SYSTEM_PROMPT = `
日本語のOCR・情報抽出エンジンです。
画像に明確に記載されている情報のみを抽出し、見つからない場合は null を返してください。
推測や補完は絶対にしないでください。
`

const extract = async (image: string, model: string) => {
  const { object } = await generateObject({
    model,
    schema: ReceiptSchema,
    system: SYSTEM_PROMPT,
    messages: [
      { role: "user", content: [{ type: "image", image: await Bun.file(image).arrayBuffer() }] },
    ],
  })
  return object
}

export async function processImages(models: string[], images: string[]) {
  const tasks = models.flatMap((model) => images.map((image) => ({ model, image })))
  let done = 0

  consola.info(`処理開始: ${tasks.length}タスク`)

  const results = await Promise.all(
    tasks.map(async ({ model, image }) => {
      try {
        const data = await extract(image, model)
        return { model, image: basename(image), success: true, data }
      } catch (e) {
        return { model, image: basename(image), success: false, error: String(e) }
      } finally {
        process.stdout.write(`\r  進捗: ${++done}/${tasks.length}`)
      }
    }),
  )

  console.log()
  const ok = results.filter((r) => r.success).length
  consola.success(`完了: ${ok}成功 / ${results.length - ok}失敗`)
  return results
}
