"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
  sortOrder: number;
}

const CATEGORIES = [
  { id: "facility", label: "센터 시설" },
  { id: "therapy", label: "심리치료 장면" },
  { id: "assessment", label: "심리검사" },
  { id: "activity", label: "외부강의 · 활동" },
];

export default function GalleryManager({ initial }: { initial: GalleryItem[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ category: "facility", title: "", imageUrl: "", sortOrder: 0 });
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.imageUrl.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("등록 실패");
      setForm({ category: form.category, title: "", imageUrl: "", sortOrder: 0 });
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "등록 실패");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("삭제 실패");
  }

  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => {
        const items = initial.filter((i) => i.category === cat.id);
        return (
          <div key={cat.id} className="paper-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-primary mb-4">
              {cat.label} <span className="text-text-muted font-normal">({items.length})</span>
            </h2>
            {items.length === 0 ? (
              <p className="text-xs text-text-muted py-4 text-center">등록된 항목이 없습니다.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {items.map((it) => (
                  <div key={it.id} className="relative group rounded-lg overflow-hidden border border-primary/10 bg-white/40">
                    <div className="aspect-square relative bg-primary/[0.04]">
                      {it.imageUrl ? (
                        <Image
                          src={resolveUrl(it.imageUrl)}
                          alt={it.title}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-text-main truncate">{it.title}</p>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-text-muted rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-all"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <form onSubmit={add} className="paper-card rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-primary">새 사진 등록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-muted mb-1">카테고리 *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">제목 *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">
            이미지 경로 또는 URL * <span className="text-text-muted/60">(예: therapy-room-01.jpg 또는 /gallery/foo.jpg)</span>
          </label>
          <input
            required
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40 font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm hover:bg-primary disabled:opacity-50"
        >
          {busy ? "등록 중..." : "등록"}
        </button>
      </form>
    </div>
  );
}

function resolveUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  return `/gallery/${url}`;
}
