"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Therapist {
  id: number;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  sortOrder: number;
}

export default function TherapistsManager({ initial }: { initial: Therapist[] }) {
  const router = useRouter();
  const [list] = useState(initial);
  const [form, setForm] = useState({ name: "", title: "", bio: "", sortOrder: 0 });
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/therapists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("등록 실패");
      setForm({ name: "", title: "", bio: "", sortOrder: 0 });
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "등록 실패");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/therapists/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("삭제 실패");
  }

  return (
    <div className="space-y-8">
      {/* 목록 */}
      <div className="paper-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-primary mb-4">등록된 치료사 ({list.length}명)</h2>
        {list.length === 0 ? (
          <p className="text-sm text-text-muted py-6 text-center">등록된 치료사가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-primary/5">
            {list.map((t) => (
              <li key={t.id} className="py-3 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-text-main">
                    {t.name}
                    {t.title ? <span className="text-text-muted text-sm ml-2">{t.title}</span> : null}
                  </p>
                  {t.bio && <p className="text-sm text-text-muted mt-1 whitespace-pre-wrap">{t.bio}</p>}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="text-xs text-red-500 hover:text-red-700 shrink-0"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 추가 폼 */}
      <form onSubmit={add} className="paper-card rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-primary">새 치료사 등록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-muted mb-1">이름 *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">직함</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="예: 임상심리사"
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">소개 / 약력</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="텍스트 자료는 추후 제공 예정"
            className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 text-sm focus:outline-none focus:border-primary/40 resize-none"
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
