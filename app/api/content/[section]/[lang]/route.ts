import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function GET(_req: NextRequest, { params }: { params: { section: string, lang: string } }) {
  const { section, lang } = params
  const safeSection = String(section || "").replace(/[^a-zA-Z0-9_-]/g, "")
  const safeLang = lang === "est" ? "est" : "en"

  // 1) Try Supabase first
  const supa = getSupabaseServer()
  if (supa) {
    try {
      const { data, error } = await supa
        .from("cms_content")
        .select("data")
        .eq("section", safeSection)
        .eq("lang", safeLang)
        .maybeSingle()
      if (!error && data && data.data) {
        return NextResponse.json(data.data, { headers: { "Cache-Control": "no-store" } })
      }
    } catch {}
  }

  // 2) Fallback to JSON file
  try {
    const rel = `/content/${safeSection}${safeLang === "est" ? "_est" : ""}.json`
    const filePath = path.join(process.cwd(), "public", rel)
    const contents = await fs.readFile(filePath, "utf8")
    const json = JSON.parse(contents)
    return NextResponse.json(json, { headers: { "Cache-Control": "no-store" } })
  } catch {}

  return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } })
}


