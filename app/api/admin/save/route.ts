import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  // Quick auth check
  const user = req.headers.get("x-admin-user")
  const pass = req.headers.get("x-admin-pass")
  if (user !== process.env.NEXT_PUBLIC_ADMIN_USER || pass !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
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

    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, contents, "utf8")
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return new NextResponse("Write failed", { status: 500 })
  }
}



