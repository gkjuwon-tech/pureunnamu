"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface BoardWriteFormProps {
  apiUrl: string;
  backPath: string;
  boardName: string;
}

export default function BoardWriteForm({ apiUrl, backPath, boardName }: BoardWriteFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "작성 실패");
      }

      router.push(backPath);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="paper-card rounded-2xl p-8 md:p-10">
      <h2 className="text-xl font-bold text-primary mb-6">{boardName} 글쓰기</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              작성자 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
              placeholder="이름"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              비밀번호 <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              required
              maxLength={100}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
              placeholder="삭제 시 필요합니다"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            제목 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={200}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            내용 <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={10}
            maxLength={10000}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm resize-none"
            placeholder="내용을 입력하세요"
          />
        </div>

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
            글 작성에 실패했습니다. 다시 시도해 주세요.
          </div>
        )}

        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-2.5 rounded-full text-sm font-semibold border border-primary/20 text-text-muted hover:bg-primary/5 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-primary text-white px-8 py-2.5 rounded-full font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
