import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [totalNotices, totalReviews, totalFreeBoard, totalTherapists] = await Promise.all([
    prisma.notice.count(),
    prisma.review.count(),
    prisma.freeBoard.count(),
    prisma.therapist.count(),
  ]);

  const stats = [
    { label: "공지사항", value: totalNotices, href: "/admin/notices" },
    { label: "상담후기", value: totalReviews, href: "/admin/reviews" },
    { label: "자유게시판", value: totalFreeBoard, href: "/admin/free-board" },
    { label: "치료사", value: totalTherapists, href: "/admin/therapists" },
  ];

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-8">대시보드</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="paper-card rounded-2xl p-5 hover:shadow-md transition-all"
          >
            <p className="text-xs text-text-muted mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-primary heading-serif">{s.value}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
