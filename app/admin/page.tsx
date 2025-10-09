"use client"

import React, { useEffect, useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"

type SectionKey = "news" | "gigs" | "videos" | "audio" | "bands" | "photos" | "pressKit" | "pressPhotos" | "awards" | "bio"

// Order aligned with site navigation: Home, About (Bio, Bands, Awards), Calendar, Gallery (Photos, Videos), Audio, Press (Kit, Photos)
const sections: { key: SectionKey; label: string; file: string }[] = [
  { key: "news", label: "Home – News", file: "/content/news.json" },
  { key: "bio", label: "About – Bio", file: "/content/bio.json" },
  { key: "bands", label: "About – Bands", file: "/content/bands.json" },
  { key: "awards", label: "About – Awards", file: "/content/awards.json" },
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
    { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "image", label: "Image URL (postimages.org/imgbb.com)", type: "text" },
    { key: "link", label: "Link", type: "text" },
    { key: "type", label: "Type", type: "select", options: ["news", "instagram", "link"] },
  ],
  gigs: [
    { key: "id", label: "ID", type: "text" },
    { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
    { key: "time", label: "Time (HH:mm)", type: "text" },
    { key: "venue", label: "Venue", type: "text" },
    { key: "city", label: "City", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "ticketLink", label: "Ticket Link", type: "text" },
    { key: "status", label: "Status", type: "select", options: ["upcoming", "past"] },
  ],
  videos: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "embedUrl", label: "Video URL (Google Drive /preview, YouTube, Vimeo)", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  audio: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "artist", label: "Artist", type: "text" },
    { key: "spotifyUrl", label: "Audio URL (Spotify, SoundCloud, external hosting)", type: "text" },
    { key: "artwork", label: "Artwork URL (postimages.org/imgbb.com)", type: "text" },
  ],
  bands: [
    { key: "id", label: "ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "members", label: "Members (one per line)", type: "textarea" },
    { key: "image", label: "Image URL (postimages.org/imgbb.com)", type: "text" },
    { key: "link", label: "Link", type: "text" },
  ],
  photos: [
    { key: "id", label: "ID", type: "text" },
    { key: "src", label: "Image URL (postimages.org/imgbb.com)", type: "text" },
    { key: "alt", label: "Alt text", type: "text" },
    { key: "caption", label: "Caption", type: "text" },
  ],
  pressKit: [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "type", label: "Type (PDF/ZIP)", type: "text" },
    { key: "downloadUrl", label: "File URL (Google Drive, Dropbox, etc.)", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  pressPhotos: [
    { key: "id", label: "ID", type: "text" },
    { key: "src", label: "Image URL (postimages.org/imgbb.com)", type: "text" },
    { key: "alt", label: "Alt text", type: "text" },
    { key: "title", label: "Credit/Title", type: "text" },
    { key: "resolution", label: "Resolution text", type: "text" },
  ],
  awards: [
    { key: "id", label: "ID", type: "text" },
    { key: "text", label: "Award text", type: "textarea" },
  ],
  bio: [
    { key: "id", label: "ID", type: "text" },
    { key: "text", label: "Paragraph", type: "textarea" },
  ],
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState<SectionKey>("news")
  const [adminLang, setAdminLang] = useState<"en" | "est">("en")
  const [content, setContent] = useState<Record<SectionKey, string>>({
    news: "",
    gigs: "",
    videos: "",
    audio: "",
    bands: "",
    photos: "",
    pressKit: "",
    pressPhotos: "",
    awards: "",
    bio: "",
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [items, setItems] = useState<Record<SectionKey, any[]>>({ news: [], gigs: [], videos: [], audio: [], bands: [], photos: [], pressKit: [], pressPhotos: [], awards: [], bio: [] })
  const [helpExpanded, setHelpExpanded] = useState(false)

  const getFileForLang = (file: string): string => {
    if (adminLang === "en") return file
    // insert _est before .json
    return file.replace(/\.json$/, "_est.json")
  }

  // Keep original labels; language is chosen via the toggle above
  const labeledSections = useMemo(() => sections, [])

  useEffect(() => {
    if (!authed) return
    sections.forEach(async (s) => {
      try {
        const res = await fetch(getFileForLang(s.file), { cache: "no-store" })
        if (!res.ok) {
          setContent((c) => ({ ...c, [s.key]: "[]" }))
          setItems((i) => ({ ...i, [s.key]: [] }))
          return
        }
        const txt = await res.text()
        setContent((c) => ({ ...c, [s.key]: txt }))
        try {
          const parsed = JSON.parse(txt)
          if (Array.isArray(parsed)) {
            setItems((i) => ({ ...i, [s.key]: parsed }))
          } else {
            setItems((i) => ({ ...i, [s.key]: [] }))
          }
        } catch {
          setItems((i) => ({ ...i, [s.key]: [] }))
        }
      } catch {
        setContent((c) => ({ ...c, [s.key]: "[]" }))
        setItems((i) => ({ ...i, [s.key]: [] }))
      }
    })
  }, [authed, adminLang])

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

      // Save to local API
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-user": process.env.NEXT_PUBLIC_ADMIN_USER || "peedukas",
          "x-admin-pass": process.env.NEXT_PUBLIC_ADMIN_PASS || "kaks4Xmx",
        },
        body: JSON.stringify({ path: getFileForLang(section.file), contents: pretty }),
      })
      if (!res.ok) throw new Error(await res.text())
      const info = await res.json().catch(() => ({})) as any
      const parts = [
        info?.supaOk ? "db ✓" : "db –",
        info?.localOk ? "file ✓" : "file –",
        info?.ghOk ? "git ✓" : "git –",
      ]
      
      // Add sync status for gigs
      if (active === "gigs") {
        const syncParts = [
          info?.syncOk ? "sync ✓" : "sync –",
          info?.localSyncOk ? "file-sync ✓" : "file-sync –",
        ]
        parts.push(...syncParts)
      }
      
      setMessage(`Saved (${parts.join(", ")})`)
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

  const validateDateFormat = (date: string): boolean => {
    if (!date) return true
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(date)
  }

  const validateTimeFormat = (time: string): boolean => {
    if (!time) return true
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
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
        
        {/* Instructions - Collapsible */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
      <button
        onClick={() => setHelpExpanded(!helpExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-100 transition-colors"
      >
        <h3 className="font-semibold text-blue-800">📋 How to Add Content:</h3>
        <ChevronDown 
          className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${
            helpExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {helpExpanded && (
        <div className="px-4 pb-4">
          <div className="text-sm text-blue-700 space-y-3">
        
        <div>
          <p className="font-semibold text-blue-800 mb-1">📸 Images:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Postimages.org</strong> - Upload image → Copy direct link</li>
            <li><strong>ImgBB.com</strong> - Upload image → Copy BBCode or direct link</li>
            <li><strong>Google Drive</strong> - Share image → Copy direct link</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-blue-800 mb-1">🎥 Videos:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Google Drive</strong> - Upload video → Share → Copy /preview URL</li>
            <li><strong>YouTube</strong> - Copy embed URL or video ID</li>
            <li><strong>Vimeo</strong> - Copy embed URL</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-blue-800 mb-1">🎵 Audio:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Spotify</strong> - Copy track URL (works best)</li>
            <li><strong>SoundCloud</strong> - Copy track URL</li>
            <li><strong>External hosting</strong> - Any direct audio file URL</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-blue-800 mb-1">📰 News Cards:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Regular news</strong> - Add title, content, image URL</li>
            <li><strong>Instagram posts</strong> - Paste Instagram URL, type: "instagram"</li>
            <li><strong>External links</strong> - Add title, link URL, type: "link"</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-blue-800 mb-1">📅 Date & Time Formats:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Date format:</strong> YYYY-MM-DD (e.g., 2024-03-15)</li>
            <li><strong>Time format:</strong> HH:mm (e.g., 19:30, 14:00)</li>
            <li><strong>Examples:</strong> 2024-12-25, 19:30, 14:00</li>
          </ul>
        </div>

        <div className="mt-3 p-2 bg-green-100 rounded border border-green-300">
          <p className="text-green-700 font-semibold">✅ All changes appear instantly on the live website!</p>
        </div>
          </div>
        </div>
      )}
    </div>
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-gray-600">Language:</span>
            <button
              className={`px-3 py-1 rounded-full border transition ${adminLang === 'en' ? 'bg-black text-white border-black shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setAdminLang('en')}
            >EN</button>
            <button
              className={`px-3 py-1 rounded-full border transition ${adminLang === 'est' ? 'bg-black text-white border-black shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setAdminLang('est')}
            >EST</button>
          </div>
          <div className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`px-4 py-2 rounded-full border whitespace-nowrap transition ${active === s.key ? "bg-black text-white border-black shadow-sm" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setActive(s.key)}
            >
              {labeledSections.find(ls => ls.key === s.key)?.label || s.label}
            </button>
          ))}
          </div>
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
                                ? "Paste image URL (postimages.org/imgbb.com)"
                                : f.key === "artwork"
                                ? "Paste artwork URL (postimages.org/imgbb.com)"
                                : f.key === "embedUrl"
                                ? "Paste video URL (Google Drive /preview, YouTube, Vimeo)"
                                : f.key === "spotifyUrl"
                                ? "Paste audio URL (Spotify, SoundCloud, external hosting)"
                                : f.key === "src"
                                ? "Paste image URL (postimages.org/imgbb.com)"
                                : f.key === "downloadUrl"
                                ? "Paste file URL (Google Drive, Dropbox, etc.)"
                                : "Paste URL"
                            }
                            value={it[f.key] || ""}
                            onChange={(e) => updateField(idx, f.key, e.target.value)}
                          />
                          {/* Image Preview */}
                          {(f.key === "image" || f.key === "artwork" || f.key === "src") && it[f.key] && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Preview:</div>
                              <div className="border rounded p-2 bg-gray-50">
                                <img
                                  src={it[f.key]}
                                  alt="Preview"
                                  className="max-w-full h-20 object-cover rounded"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                                    if (nextElement) nextElement.style.display = 'block'
                                  }}
                                />
                                <div className="text-xs text-red-500 hidden">❌ Image failed to load</div>
                              </div>
                            </div>
                          )}
                          {/* Video Preview */}
                          {f.key === "embedUrl" && it[f.key] && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Preview:</div>
                              <div className="border rounded p-2 bg-gray-50">
                                <div className="text-xs text-blue-600">🎥 Video URL detected</div>
                                <div className="text-xs text-gray-600 mt-1 break-all">{it[f.key]}</div>
                              </div>
                            </div>
                          )}
                          {/* Audio Preview */}
                          {f.key === "spotifyUrl" && it[f.key] && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Preview:</div>
                              <div className="border rounded p-2 bg-gray-50">
                                <div className="text-xs text-green-600">🎵 Audio URL detected</div>
                                <div className="text-xs text-gray-600 mt-1 break-all">{it[f.key]}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <input
                            className={`w-full border rounded p-1 text-xs ${
                              (f.key === "date" && it[f.key] && !validateDateFormat(it[f.key])) ||
                              (f.key === "time" && it[f.key] && !validateTimeFormat(it[f.key]))
                                ? "border-red-300 bg-red-50" 
                                : "border-gray-300"
                            }`}
                            placeholder={
                              f.key === "id" ? "Enter ID" : 
                              f.key === "date" ? "YYYY-MM-DD (e.g., 2024-03-15)" : 
                              f.key === "time" ? "HH:mm (e.g., 19:30)" :
                              f.key === "title" ? "Enter title" : 
                              f.key === "location" ? "Enter location" : 
                              f.key === "venue" ? "Enter venue" : 
                              f.key === "link" ? "Enter link URL" : 
                              f.key === "artist" ? "Enter artist name" : 
                              f.key === "name" ? "Enter band name" : 
                              f.key === "alt" ? "Enter alt text" : 
                              f.key === "caption" ? "Enter caption" : 
                              f.key === "description" ? "Enter description" : 
                              f.key === "type" ? "Enter type (PDF/ZIP)" : 
                              f.key === "resolution" ? "Enter resolution text" : 
                              "Enter text"
                            }
                            value={it[f.key] || ""}
                            onChange={(e) => updateField(idx, f.key, e.target.value)}
                          />
                          {/* Format validation messages */}
                          {f.key === "date" && it[f.key] && !validateDateFormat(it[f.key]) && (
                            <div className="text-xs text-red-600">⚠️ Use format: YYYY-MM-DD (e.g., 2024-03-15)</div>
                          )}
                          {f.key === "time" && it[f.key] && !validateTimeFormat(it[f.key]) && (
                            <div className="text-xs text-red-600">⚠️ Use format: HH:mm (e.g., 19:30)</div>
                          )}
                        </div>
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