import { z } from "zod"

export const ReceiptSchema = z.object({
  issue_date: z.iso.date().nullable().describe("発行日（YYYY-MM-DD形式）"),
  supplier_name: z.string().nullable().describe("支払先名・店舗名・発行者名"),
  total_amount: z.number().nullable().describe("税込合計金額（カンマなしの数値、JPY）"),
})
