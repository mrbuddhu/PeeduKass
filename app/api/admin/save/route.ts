import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const ROOT = process.cwd()

export async function POST(req: NextRequest) {
  const user = req.headers.get("x-admin-user") || ""
  const pass = req.headers.get("x-admin-pass") || ""
  const u = process.env.NEXT_PUBLIC_ADMIN_USER || "peedukas"
  const p = process.env.NEXT_PUBLIC_ADMIN_PASS || "kaks4Xmx"
  if (user !== u || pass !== p) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { path: relPath, contents } = await req.json()
  if (!relPath || typeof contents !== "string") {
    return new NextResponse("Bad request", { status: 400 })
  }

  // Only allow writing under public/content
  const safeBase = path.join(ROOT, "public", "content")
  const target = path.join(ROOT, "public", relPath.replace(/^\/+/, ""))
  if (!target.startsWith(safeBase)) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, contents, "utf8")
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return new NextResponse(e?.message || "Write failed", { status: 500 })
  }
}



