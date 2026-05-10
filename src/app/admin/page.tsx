import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [unreadInquiries, totalInquiries, totalNotices, totalReviews, totalFreeBoard] =
    await Promise.all([
      prisma.inquiry.count({ where: { isRead: false } }),
      prisma.inquiry.count(),
      prisma.notice.count(),
      prisma.review.count(),
      prisma.freeBoard.count(),
    ]);

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "미확인 문의", value: unreadInquiries, href: "/admin/inquiries", accent: true },
    { label: "전체 문의", value: totalInquiries, href: "/admin/inquiries" },
    { label: "공지사항", value: totalNotices, href: "/admin/notices" },
    { label: "상담후기", value: totalReviews, href: "/admin/reviews" },
    { label: "자유게시판", value: totalFreeBoard, href: "/admin/free-board" },
  ];

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-8">대시보드</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`paper-card rounded-2xl p-5 hover:shadow-md transition-all ${
              s.accent && s.value > 0 ? "ring-2 ring-primary/30" : ""
            }`}
          >
            <p className="text-xs text-text-muted mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-primary heading-serif">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="paper-card rounded-2xl p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-primary heading-serif">최근 문의</h2>
          <Link href="/admin/inquiries" className="text-sm text-primary/70 hover:text-primary">
            전체 보기 →
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-text-muted py-6 text-center">아직 접수된 문의가 없습니다.</p>
        ) : (
          <div className="divide-y divide-primary/5">
            {recentInquiries.map((q) => (
              <Link
                key={q.id}
                href={`/admin/inquiries/${q.id}`}
                className="flex items-center justify-between py-3 hover:bg-primary/[0.02] -mx-2 px-2 rounded transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-main truncate">{q.subject}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {q.name} · {q.phone}
                    {q.gender ? ` · ${q.gender}` : ""}
                    {q.age ? ` · ${q.age}세` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!q.isRead && (
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">NEW</span>
                  )}
                  <span className="text-xs text-text-muted">
                    {new Date(q.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
