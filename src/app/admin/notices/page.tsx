import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const notices = await prisma.notice.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell username={session.username}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary heading-serif">공지사항</h1>
        <Link
          href="/community/notices/write"
          className="bg-primary/90 text-white px-5 py-2 rounded-full text-sm hover:bg-primary"
        >
          + 새 글 작성
        </Link>
      </div>

      <div className="paper-card rounded-2xl overflow-hidden">
        {notices.length === 0 ? (
          <p className="text-sm text-text-muted py-16 text-center">등록된 공지사항이 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary/[0.05] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">작성자</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">조회</th>
                <th className="px-4 py-3 text-right">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/community/notices/${n.id}`} className="text-text-main hover:text-primary">
                      {n.isNotice && (
                        <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full mr-2">필독</span>
                      )}
                      {n.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{n.author}</td>
                  <td className="px-4 py-3 text-right text-text-muted hidden sm:table-cell">{n.views}</td>
                  <td className="px-4 py-3 text-right text-text-muted text-xs">
                    {new Date(n.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
