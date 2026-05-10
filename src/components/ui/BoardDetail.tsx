"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconSad, IconUser, IconCalendar, IconEye } from "@/components/icons";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  replies?: Post[];
}

interface BoardDetailProps {
  apiUrl: string;
  listPath: string;
  postId: string;
}

export default function BoardDetail({ apiUrl, listPath, postId }: BoardDetailProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${apiUrl}/${postId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPost(data);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [apiUrl, postId]);

  const handleDelete = async () => {
    if (!deletePassword) return;
    setDeleteError("");

    try {
      const res = await fetch(`${apiUrl}/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        setDeleteError(data.error || "삭제 실패");
        return;
      }

      router.push(listPath);
    } catch {
      setDeleteError("삭제에 실패했습니다.");
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="paper-card rounded-2xl p-16 text-center text-text-muted animate-pulse">
        로딩 중...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="paper-card rounded-2xl p-16 text-center">
        <div className="text-primary/20 mb-4 flex justify-center"><IconSad size={36} /></div>
        <p className="text-text-muted mb-4">게시글을 찾을 수 없습니다.</p>
        <Link href={listPath} className="text-primary hover:underline text-sm">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="paper-card rounded-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="border-b border-primary/[0.06] p-6 md:p-8">
          <h1 className="text-xl font-bold text-text-main mb-4 heading-serif">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-text-muted/70">
            <span className="flex items-center gap-1"><IconUser size={14} /> {post.author}</span>
            <span className="flex items-center gap-1"><IconCalendar size={14} /> {formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1"><IconEye size={14} /> {post.views}</span>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-6 md:p-8 min-h-[200px]">
          <div className="text-text-muted leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-between items-center border-t border-primary/[0.06] p-4 md:p-6">
          <Link
            href={listPath}
            className="px-5 py-2.5 rounded-full text-sm border border-primary/[0.1] text-text-muted hover:bg-primary/[0.03] transition-all"
          >
            목록
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-2.5 rounded-full text-sm text-red-400/80 border border-red-200/60 hover:bg-red-50/50 transition-all"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 답글 */}
      {post.replies && post.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {post.replies.map((reply) => (
            <div key={reply.id} className="paper-card rounded-xl p-5 ml-6 border-l-4 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                  답글
                </span>
                <span className="text-xs text-text-muted">{reply.author}</span>
                <span className="text-xs text-text-muted">{formatDate(reply.createdAt)}</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 삭제 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-paper rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-text-main mb-4">게시글 삭제</h3>
            <p className="text-sm text-text-muted mb-4">
              작성 시 입력한 비밀번호를 입력해주세요.
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm mb-3"
              placeholder="비밀번호"
            />
            {deleteError && (
              <p className="text-red-500 text-xs mb-3">{deleteError}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="px-4 py-2 rounded-full text-sm text-text-muted hover:bg-primary/5 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
