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

  const form = await req.formData()
  const file = form.get("file") as File | null
  if (!file) return new NextResponse("No file", { status: 400 })

  const buf = Buffer.from(await file.arrayBuffer())
  const ext = path.extname(file.name).toLowerCase() || ".bin"
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".zip", ".mp3", ".wav", ".m4a", ".ogg", ".aac"]
  if (!allowed.includes(ext)) {
    return new NextResponse("Unsupported file type", { status: 400 })
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
  const filename = `${Date.now()}-${safeName}`
  const dir = path.join(ROOT, "public", "uploads")
  const target = path.join(dir, filename)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(target, buf)

  return NextResponse.json({ url: `/uploads/${filename}` })
}



