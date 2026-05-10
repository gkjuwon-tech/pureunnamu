"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "로그인 실패");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="paper-card rounded-3xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary heading-serif mb-1">관리자 로그인</h1>
          <p className="text-text-muted text-sm">푸른나무 심리센터 운영 콘솔</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">아이디</label>
            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">비밀번호</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary/90 text-white py-3 rounded-full text-sm font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/15 disabled:opacity-50"
          >
            {busy ? "로그인 중..." : "로그인"}
          </button>
        </div>

        <p className="text-xs text-text-muted/60 text-center mt-6 leading-relaxed">
          최초 비밀번호로 로그인 후 비밀번호를 변경해 주세요.
        </p>
      </form>
    </div>
  );
}
