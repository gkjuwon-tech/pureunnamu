"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconClipboard } from "@/components/icons";

interface BoardItem {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  views: number;
  isNotice?: boolean;
}

interface BoardListProps {
  apiUrl: string;
  detailPath: string;
  writePath: string;
  showNoticeTag?: boolean;
}

export default function BoardList({ apiUrl, detailPath, writePath, showNoticeTag = false }: BoardListProps) {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}?page=${page}&limit=15`);
        const data = await res.json();
        setItems(data.items || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, page]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <div>
      {/* 상단 정보 */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-muted">
          총 <span className="font-bold text-primary">{total}</span>건
        </p>
        <Link
          href={writePath}
          className="bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/15"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시판 테이블 */}
      <div className="paper-card rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[60px_1fr_100px_100px_60px] bg-primary/[0.03] border-b border-primary/[0.06]">
          <div className="py-3 px-3 text-center text-xs text-primary/60">번호</div>
          <div className="py-3 px-3 text-xs text-primary/60">제목</div>
          <div className="py-3 px-3 text-center text-xs text-primary/60">작성자</div>
          <div className="py-3 px-3 text-center text-xs text-primary/60">날짜</div>
          <div className="py-3 px-3 text-center text-xs text-primary/60">조회</div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-text-muted">
            <div className="animate-pulse">로딩 중...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-text-muted">
            <div className="text-primary/20 mb-3 flex justify-center"><IconClipboard size={36} /></div>
            <p>등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <div>
            {items.map((item, i) => (
              <Link
                key={item.id}
                href={`${detailPath}/${item.id}`}
                className={`block md:grid md:grid-cols-[60px_1fr_100px_100px_60px] border-b border-primary/5 hover:bg-soft-green/10 transition-colors ${
                  i % 2 === 0 ? "" : "bg-primary/[0.02]"
                }`}
              >
                {/* 모바일 레이아웃 */}
                <div className="md:hidden p-4">
                  <div className="flex items-start gap-2">
                    {showNoticeTag && item.isNotice && (
                      <span className="shrink-0 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        공지
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-text-main line-clamp-1">{item.title}</h3>
                  </div>
                  <div className="flex gap-3 mt-1.5 text-xs text-text-muted">
                    <span>{item.author}</span>
                    <span>{formatDate(item.createdAt)}</span>
                    <span>조회 {item.views}</span>
                  </div>
                </div>

                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:flex items-center justify-center py-3 px-3 text-xs text-text-muted">
                  {showNoticeTag && item.isNotice ? (
                    <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">공지</span>
                  ) : (
                    item.id
                  )}
                </div>
                <div className="hidden md:flex items-center py-3 px-3 text-sm text-text-main font-medium">
                  {item.title}
                </div>
                <div className="hidden md:flex items-center justify-center py-3 px-3 text-xs text-text-muted">
                  {item.author}
                </div>
                <div className="hidden md:flex items-center justify-center py-3 px-3 text-xs text-text-muted">
                  {formatDate(item.createdAt)}
                </div>
                <div className="hidden md:flex items-center justify-center py-3 px-3 text-xs text-text-muted">
                  {item.views}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded text-sm text-text-muted hover:bg-primary/5 disabled:opacity-30 transition-colors"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
            .map((p, i, arr) => (
              <span key={p}>
                {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-text-muted">…</span>}
                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
                    page === p
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-primary/5"
                  }`}
                >
                  {p}
                </button>
              </span>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded text-sm text-text-muted hover:bg-primary/5 disabled:opacity-30 transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
