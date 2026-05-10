"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { label: "대시보드", href: "/admin" },
  { label: "온라인 문의", href: "/admin/inquiries" },
  { label: "공지사항", href: "/admin/notices" },
  { label: "상담후기", href: "/admin/reviews" },
  { label: "자유게시판", href: "/admin/free-board" },
  { label: "치료사 관리", href: "/admin/therapists" },
  { label: "갤러리 관리", href: "/admin/gallery" },
];

export default function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-[#1a3a0d] text-white/80 hidden md:flex flex-col">
        <div className="px-6 py-7 border-b border-white/[0.08]">
          <Link href="/admin" className="block">
            <p className="text-xs tracking-[0.2em] text-white/40 uppercase">Admin</p>
            <p className="text-lg font-bold heading-serif text-white">푸른나무 심리센터</p>
          </Link>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-white/[0.07] text-white border-l-2 border-soft-green/80"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white border-l-2 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-5 border-t border-white/[0.08]">
          <p className="text-xs text-white/40 mb-2">로그인 상태</p>
          <p className="text-sm text-white/90 mb-3">{username}</p>
          <button
            onClick={logout}
            className="w-full text-xs text-white/60 hover:text-white border border-white/[0.12] rounded-full py-2 transition-colors"
          >
            로그아웃
          </button>
          <Link
            href="/"
            className="block text-center text-[11px] text-white/30 hover:text-white/60 mt-3"
          >
            ↗ 사이트로 돌아가기
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* 모바일 헤더 */}
        <div className="md:hidden bg-[#1a3a0d] text-white px-5 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-bold">관리자 콘솔</Link>
          <button onClick={logout} className="text-xs text-white/70 border border-white/20 rounded-full px-3 py-1">
            로그아웃
          </button>
        </div>

        <main className="p-6 md:p-10 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
