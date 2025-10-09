import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"
import { getSupabaseServer } from "@/lib/supabase-server"

export async function POST(req: NextRequest) {
  // Quick auth check
  const user = req.headers.get("x-admin-user")
  const pass = req.headers.get("x-admin-pass")
  const expectedUser = process.env.NEXT_PUBLIC_ADMIN_USER || "peedukas"
  const expectedPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "kaks4Xmx"
  if (user !== expectedUser || pass !== expectedPass) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { path: relPath, contents } = await req.json()
    if (!relPath || typeof contents !== "string") {
      return new NextResponse("Bad request", { status: 400 })
    }

    // Only allow writing under public/content
    const safeBase = path.join(process.cwd(), "public", "content")
    const target = path.join(process.cwd(), "public", relPath.replace(/^\/+/, ""))
    if (!target.startsWith(safeBase)) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    let localOk = false
    let localSyncOk = false
    try {
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, contents, "utf8")
      localOk = true

      // Special handling for gigs: also sync to the other language file
      const section = relPath.replace(/^\/+/, "").replace(/^public\//, "").replace(/^content\//, "").replace(/(_est)?\.json$/, "")
      if (section === "gigs" && Array.isArray(JSON.parse(contents))) {
        try {
          const isEstFile = /_est\.json$/.test(relPath)
          const otherLangFile = isEstFile 
            ? relPath.replace("_est.json", ".json")
            : relPath.replace(".json", "_est.json")
          
          const otherTarget = path.join(process.cwd(), "public", otherLangFile.replace(/^\/+/, ""))
          if (otherTarget.startsWith(safeBase)) {
            await fs.writeFile(otherTarget, contents, "utf8")
            localSyncOk = true
          }
        } catch {}
      }
    } catch {}

    // Upsert into Supabase cms_content (section + lang)
    let supaOk = false
    let syncOk = false
    try {
      const supa = getSupabaseServer()
      if (supa) {
        const lang = /_est\.json$/.test(relPath) ? "est" : "en"
        const section = relPath.replace(/^\/+/, "").replace(/^public\//, "").replace(/^content\//, "").replace(/(_est)?\.json$/, "")
        const parsed = JSON.parse(contents)
        const { error } = await supa
          .from("cms_content")
          .upsert({ section, lang, data: parsed }, { onConflict: "section,lang" })
        supaOk = !error

        // Special handling for gigs: mirror EXACT data to the other language
        if (section === "gigs" && Array.isArray(parsed)) {
          try {
            const otherLang = lang === "est" ? "en" : "est"
            const { error: syncError } = await supa
              .from("cms_content")
              .upsert({ section, lang: otherLang, data: parsed }, { onConflict: "section,lang" })
            syncOk = !syncError
          } catch {}
        }
      }
    } catch {}

    // Optional: auto-commit to GitHub for free persistence (works on read-only hosts)
    let ghOk = false
    const ghToken = process.env.GITHUB_TOKEN
    const ghRepo = process.env.GITHUB_REPO // e.g. "username/peedu-kass-portfolio"
    const ghBranch = process.env.GITHUB_BRANCH || "main"
    if (ghToken && ghRepo) {
      try {
        // Ensure repoPath is under public/content/** in the repo
        // Accept incoming relPath like "/content/xyz.json" and prefix with "public/"
        const cleaned = relPath.replace(/^\/+/, "") // e.g. content/news.json
        const repoPath = cleaned.startsWith("public/") ? cleaned : `public/${cleaned}` // public/content/news.json
        if (!repoPath.startsWith("public/content/")) {
          // Skip GH commit if target is outside allowed area, but don't fail the request
          // localOk/supaOk may still be true
        } else {
        const apiBase = `https://api.github.com/repos/${ghRepo}/contents`
        const url = `${apiBase}/${repoPath}`
        // Get existing file SHA (if any)
        let sha: string | undefined
        const getRes = await fetch(`${url}?ref=${encodeURIComponent(ghBranch)}`, {
          headers: { Authorization: `token ${ghToken}`, "User-Agent": "cms-writer" },
        })
        if (getRes.ok) {
          const json: any = await getRes.json()
          sha = json?.sha
        }
        const b64 = Buffer.from(contents, "utf8").toString("base64")
        const commitRes = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `token ${ghToken}`,
            "User-Agent": "cms-writer",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `CMS: update ${repoPath}`,
            content: b64,
            sha,
            branch: ghBranch,
          }),
        })
        ghOk = commitRes.ok
        }
      } catch {}
    }

    if (localOk || supaOk || ghOk) return NextResponse.json({ ok: true, localOk, supaOk, ghOk, syncOk, localSyncOk })
    return new NextResponse("Write failed", { status: 500 })
  } catch (e: any) {
    return new NextResponse("Write failed", { status: 500 })
  }
}



