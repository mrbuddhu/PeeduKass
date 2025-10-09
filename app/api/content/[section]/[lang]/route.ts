import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function GET(_req: NextRequest, { params }: { params: { section: string, lang: string } }) {
  const { section, lang } = params
  const safeSection = String(section || "").replace(/[^a-zA-Z0-9_-]/g, "")
  const safeLang = lang === "est" ? "est" : "en"
  const fallbackLang = safeLang === "est" ? "en" : "est"

  // 1) Try Supabase first (with language fallback)
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
      // Fallback to other language in Supabase
      const { data: fbData, error: fbErr } = await supa
        .from("cms_content")
        .select("data")
        .eq("section", safeSection)
        .eq("lang", fallbackLang)
        .maybeSingle()
      if (!fbErr && fbData && fbData.data) {
        return NextResponse.json(fbData.data, { headers: { "Cache-Control": "no-store" } })
      }
    } catch {}
  }

  // 2) Fallback to JSON file (with language fallback)
  try {
    const rel = `/content/${safeSection}${safeLang === "est" ? "_est" : ""}.json`
    const filePath = path.join(process.cwd(), "public", rel)
    const contents = await fs.readFile(filePath, "utf8")
    const json = JSON.parse(contents)
    return NextResponse.json(json, { headers: { "Cache-Control": "no-store" } })
  } catch {}

  // 3) Try other language file as a final fallback
  try {
    const relFb = `/content/${safeSection}${fallbackLang === "est" ? "_est" : ""}.json`
    const filePathFb = path.join(process.cwd(), "public", relFb)
    const contentsFb = await fs.readFile(filePathFb, "utf8")
    const jsonFb = JSON.parse(contentsFb)
    return NextResponse.json(jsonFb, { headers: { "Cache-Control": "no-store" } })
  } catch {}

  return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } })
}


