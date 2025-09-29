import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

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
    try {
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, contents, "utf8")
      localOk = true
    } catch {}

    // Optional: auto-commit to GitHub for free persistence (works on read-only hosts)
    let ghOk = false
    const ghToken = process.env.GITHUB_TOKEN
    const ghRepo = process.env.GITHUB_REPO // e.g. "username/peedu-kass-portfolio"
    const ghBranch = process.env.GITHUB_BRANCH || "main"
    if (ghToken && ghRepo) {
      try {
        const repoPath = relPath.replace(/^\/+/, "")
        // Only allow committing under public/content/** as extra safety
        if (!/^public\/content\//.test(repoPath)) {
          return new NextResponse("Forbidden", { status: 403 })
        }
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
      } catch {}
    }

    if (localOk || ghOk) return NextResponse.json({ ok: true, localOk, ghOk })
    return new NextResponse("Write failed", { status: 500 })
  } catch (e: any) {
    return new NextResponse("Write failed", { status: 500 })
  }
}



