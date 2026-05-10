"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InquiryActions({
  id,
  initialReply,
}: {
  id: number;
  initialReply: string;
}) {
  const router = useRouter();
  const [reply, setReply] = useState(initialReply || "");
  const [busy, setBusy] = useState<"save" | "delete" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setBusy("save");
    setMsg(null);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      if (!res.ok) throw new Error("저장 실패");
      setMsg("저장되었습니다.");
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    setBusy("delete");
    setMsg(null);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
      router.replace("/admin/inquiries");
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "삭제 실패");
      setBusy(null);
    }
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-primary mb-3">관리자 메모 / 답변 초안</h2>
      <textarea
        rows={5}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="답변 초안 또는 관리자 메모를 작성하세요. (공개되지 않습니다)"
        className="w-full px-4 py-3 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm resize-none"
      />

      {msg && (
        <p className="mt-3 text-sm text-primary">{msg}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-5">
        <button
          onClick={save}
          disabled={busy !== null}
          className="bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-all disabled:opacity-50"
        >
          {busy === "save" ? "저장 중..." : "메모 저장"}
        </button>
        <button
          onClick={remove}
          disabled={busy !== null}
          className="border border-red-200 text-red-500 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-50 transition-all disabled:opacity-50"
        >
          {busy === "delete" ? "삭제 중..." : "문의 삭제"}
        </button>
      </div>
    </div>
  );
}
