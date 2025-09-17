import { NextRequest } from "next/server"

type Token = {
  access_token: string
  token_type: string
  expires_in: number
}

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAppToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET")
  }

  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now + 30_000) {
    return cachedToken.token
  }

  const body = new URLSearchParams({ grant_type: "client_credentials" })
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body,
    cache: "no-store",
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`Spotify token error: ${res.status} ${msg}`)
  }
  const data = (await res.json()) as Token
  const token = data.access_token
  cachedToken = { token, expiresAt: now + data.expires_in * 1000 }
  return token
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getAppToken()
    const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (!trackRes.ok) {
      return new Response("Track not found", { status: 404 })
    }
    const track = await trackRes.json()
    const previewUrl: string | null = track.preview_url
    if (!previewUrl) {
      return new Response("No preview available", { status: 404 })
    }
    // Redirect to Spotify's CDN preview mp3. The audio element will follow 302 redirects.
    return Response.redirect(previewUrl, 302)
  } catch (e: any) {
    return new Response(e?.message || "Error", { status: 500 })
  }
}


