"use client"

import React, { useEffect, useState } from "react"

type SectionKey = "news" | "gigs" | "videos" | "audio" | "bands" | "photos" | "pressKit" | "pressPhotos"

const sections: { key: SectionKey; label: string; file: string }[] = [
  { key: "news", label: "Home – News", file: "/content/news.json" },
  { key: "bands", label: "About – Bands", file: "/content/bands.json" },
  { key: "gigs", label: "Calendar – Concerts", file: "/content/gigs.json" },
  { key: "photos", label: "Gallery – Photos", file: "/content/photos.json" },
  { key: "videos", label: "Gallery – Videos", file: "/content/videos.json" },
  { key: "audio", label: "Audio – Tracks", file: "/content/audio.json" },
  { key: "pressKit", label: "Press – Kit", file: "/content/press-kit.json" },
  { key: "pressPhotos", label: "Press – Photos", file: "/content/press-photos.json" },
]

const fieldConfigs: Record<SectionKey, { key: string; label: string; type: "text" | "textarea" | "select"; options?: string[] }[]> = {
  news: [
    { key: "id", label: "ID", type: "text" },
    { key: "date", label: "Date", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image", label: "Image URL / Upload file", type: "text" },
    { key: "link", label: "Link", type: "text" },
    { key: "type", label: "Type", type: "select", options: ["news", "instagram", "link"] },
  ],
  gigs: [
    { key: "id", label: "ID", type: "text" },
    { key: "date", label: "Date", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "venue", label: "Venue", type: "text" },
    { key: "link", label: "Link", type: "text" },
  ],
  videos: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "embedUrl", label: "Google Drive /preview URL / Upload file", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  audio: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "artist", label: "Artist", type: "text" },
    { key: "spotifyUrl", label: "Spotify URL / Upload file", type: "text" },
    { key: "artwork", label: "Artwork URL / Upload file", type: "text" },
  ],
  bands: [
    { key: "id", label: "ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "members", label: "Members (one per line)", type: "textarea" },
    { key: "image", label: "Image URL / Upload file", type: "text" },
    { key: "link", label: "Link", type: "text" },
  ],
  photos: [
    { key: "id", label: "ID", type: "text" },
    { key: "src", label: "Image URL / Upload file", type: "text" },
    { key: "alt", label: "Alt text", type: "text" },
    { key: "caption", label: "Caption", type: "text" },
  ],
  pressKit: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "type", label: "Type (PDF/ZIP)", type: "text" },
    { key: "downloadUrl", label: "File URL / Upload file", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  pressPhotos: [
    { key: "id", label: "ID", type: "text" },
    { key: "src", label: "Image URL / Upload file", type: "text" },
    { key: "alt", label: "Alt text", type: "text" },
    { key: "title", label: "Credit/Title", type: "text" },
    { key: "resolution", label: "Resolution text", type: "text" },
  ],
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState<SectionKey>("news")
  const [content, setContent] = useState<Record<SectionKey, string>>({
    news: "",
    gigs: "",
    videos: "",
    audio: "",
    bands: "",
    photos: "",
    pressKit: "",
    pressPhotos: "",
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [items, setItems] = useState<Record<SectionKey, any[]>>({ news: [], gigs: [], videos: [], audio: [], bands: [], photos: [], pressKit: [], pressPhotos: [] })

  useEffect(() => {
    if (!authed) return
    sections.forEach(async (s) => {
      try {
        const res = await fetch(s.file, { cache: "no-store" })
        const txt = await res.text()
        setContent((c) => ({ ...c, [s.key]: txt }))
        try {
          const parsed = JSON.parse(txt)
          if (Array.isArray(parsed)) setItems((i) => ({ ...i, [s.key]: parsed }))
        } catch {}
      } catch {}
    })
  }, [authed])

  const doLogin = () => {
    const u = process.env.NEXT_PUBLIC_ADMIN_USER || "peedukas"
    const p = process.env.NEXT_PUBLIC_ADMIN_PASS || "kaks4Xmx"
    if (username === u && password === p) {
      setAuthed(true)
      setMessage("")
    } else {
      setMessage("Invalid credentials")
    }
  }

  const save = async () => {
    setSaving(true)
    setMessage("")
    try {
      const section = sections.find((s) => s.key === active)!
      const pretty = JSON.stringify(items[active], null, 2)

      // 1) Write a timestamped backup copy
      try {
        const ts = new Date().toISOString().replace(/[:.]/g, "-")
        const backupPath = `/content/_backups/${active}-${ts}.json`
        await fetch("https://peedukass.com/api/save.php?secret=peedukass-admin-2024", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: backupPath, contents: pretty, secret: "peedukass-admin-2024" }),
        })
      } catch {}

      // 2) Write the primary file
      const res = await fetch("https://peedukass.com/api/save.php?secret=peedukass-admin-2024", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: section.file, contents: pretty, secret: "peedukass-admin-2024" }),
      })
      if (!res.ok) throw new Error(await res.text())
      setMessage("Saved ✓ (backup created)")
      // notify open pages to refetch this section
      if (typeof window !== "undefined") {
        try {
          const bc = new BroadcastChannel("cms")
          bc.postMessage({ type: "updated", section: active })
          bc.close()
        } catch {}
        window.dispatchEvent(new CustomEvent("cms:content-updated", { detail: active }))
      }
    } catch (e: any) {
      setMessage(e?.message || "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => {
    const newItem: any = { id: Date.now() }
    fieldConfigs[active].forEach((f) => {
      if (f.type === "select") newItem[f.key] = f.options?.[0] || ""
      else if (f.key === "members") newItem[f.key] = ""
      else newItem[f.key] = ""
    })
    setItems({ ...items, [active]: [...items[active], newItem] })
  }

  const deleteItem = (idx: number) => {
    const list = [...items[active]]
    list.splice(idx, 1)
    setItems({ ...items, [active]: list })
  }

  const updateField = (idx: number, key: string, value: string) => {
    const list = [...items[active]]
    list[idx] = { ...list[idx], [key]: value }
    setItems({ ...items, [active]: list })
  }

  const moveItem = (idx: number, dir: "up" | "down") => {
    const list = [...items[active]]
    const newIdx = dir === "up" ? idx - 1 : idx + 1
    if (newIdx < 0 || newIdx >= list.length) return
    ;[list[idx], list[newIdx]] = [list[newIdx], list[idx]]
    setItems({ ...items, [active]: list })
  }

  if (!authed) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full max-w-sm border rounded-lg p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <input className="w-full border rounded p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-black text-white rounded p-2" onClick={doLogin}>Login</button>
          {message && <p className="text-sm text-red-600">{message}</p>}
          <p className="text-xs text-gray-500">For staging only</p>
        </div>
      </section>
    )
  }

  return (
    <section className="p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Content Admin (Staging)</h1>
        
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">📸 Image Upload Instructions:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>For Live Website:</strong> Use external image URLs (recommended: imgur.com)</p>
            <p><strong>For Testing:</strong> Upload files locally (won't work on live site)</p>
            <p><strong>How to get imgur URL:</strong> Go to imgur.com → Upload image → Copy "Direct Link"</p>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`px-4 py-2 rounded ${active === s.key ? "bg-black text-white" : "bg-gray-200"}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addItem}>
              Add {sections.find((s) => s.key === active)?.label}
            </button>
            <button className="bg-black text-white rounded px-4 py-2" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            {message && <span className="text-sm text-green-700">{message}</span>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {items[active].map((it, idx) => (
              <div key={idx} className="border-2 border-gray-800 rounded-lg p-4 space-y-2 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Item {idx + 1}</span>
                  <div className="flex gap-1">
                    <button
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                      onClick={() => moveItem(idx, "up")}
                      disabled={idx === 0}
                    >
                      ↑
                    </button>
                    <button
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                      onClick={() => moveItem(idx, "down")}
                      disabled={idx === items[active].length - 1}
                    >
                      ↓
                    </button>
                    <button className="text-xs bg-red-200 px-2 py-1 rounded" onClick={() => deleteItem(idx)}>
                      ×
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {fieldConfigs[active].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs font-medium text-gray-600">{f.label}</label>
                      {f.type === "textarea" ? (
                        <textarea
                          className="w-full border rounded p-1 text-xs"
                          rows={2}
                          value={it[f.key] || ""}
                          onChange={(e) => updateField(idx, f.key, e.target.value)}
                        />
                      ) : f.type === "select" ? (
                        <select
                          className="w-full border rounded p-1 text-xs"
                          value={it[f.key] || f.options?.[0] || ""}
                          onChange={(e) => updateField(idx, f.key, e.target.value)}
                        >
                          {(f.options || []).map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (f.key === "image" || f.key === "artwork" || f.key === "embedUrl" || f.key === "spotifyUrl" || f.key === "src" || f.key === "downloadUrl") ? (
                        <div className="space-y-1">
                          <input
                            className="w-full border rounded p-1 text-xs"
                            placeholder={
                              f.key === "image"
                                ? "Image URL (imgur.com or peedukass.com/uploads)"
                                : f.key === "artwork"
                                ? "Artwork URL (imgur.com or peedukass.com/uploads)"
                                : f.key === "embedUrl"
                                ? "Google Drive /preview URL"
                                : f.key === "spotifyUrl"
                                ? "Audio URL (peedukass.com/uploads) or Spotify URL"
                                : f.key === "src"
                                ? "Image/Audio URL (peedukass.com/uploads)"
                                : f.key === "downloadUrl"
                                ? "File URL"
                                : "Paste URL"
                            }
                            value={it[f.key] || ""}
                            onChange={(e) => updateField(idx, f.key, e.target.value)}
                          />
                        </div>
                      ) : (
                        <input
                          className="w-full border rounded p-1 text-xs"
                          placeholder={f.key === "id" ? "Enter ID" : f.key === "date" ? "Enter date" : f.key === "title" ? "Enter title" : f.key === "location" ? "Enter location" : f.key === "venue" ? "Enter venue" : f.key === "link" ? "Enter link URL" : f.key === "artist" ? "Enter artist name" : f.key === "spotifyUrl" ? "Enter Spotify URL" : f.key === "name" ? "Enter band name" : "Enter text"}
                          value={it[f.key] || ""}
                          onChange={(e) => updateField(idx, f.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}