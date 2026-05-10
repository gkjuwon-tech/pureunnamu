import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const reviews = await prisma.review.findMany({
    where: { parentId: null },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { replies: true } } },
  });

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-8">상담후기</h1>

      <div className="paper-card rounded-2xl overflow-hidden">
        {reviews.length === 0 ? (
          <p className="text-sm text-text-muted py-16 text-center">등록된 후기가 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary/[0.05] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">작성자</th>
                <th className="px-4 py-3 text-left">검수</th>
                <th className="px-4 py-3 text-right">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/community/reviews/${r.id}`} className="text-text-main hover:text-primary">
                      {r.title}
                      {r._count.replies > 0 && (
                        <span className="ml-2 text-xs text-text-muted">[{r._count.replies}]</span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{r.author}</td>
                  <td className="px-4 py-3">
                    <ModerationBadge status={r.moderationStatus} />
                  </td>
                  <td className="px-4 py-3 text-right text-text-muted text-xs">
                    {new Date(r.createdAt).toLocaleDateString("ko-KR")}
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

function ModerationBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    PASS: { label: "통과", cls: "bg-green-50 text-green-700 border-green-200" },
    REVIEW: { label: "검토필요", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    BLOCK: { label: "차단", cls: "bg-red-50 text-red-700 border-red-200" },
  };
  const meta = map[status] ?? map.PASS;
  return (
    <span className={`text-[10px] border rounded-full px-2 py-0.5 ${meta.cls}`}>
      {meta.label}
    </span>
  );
}
