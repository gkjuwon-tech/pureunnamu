import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminFreeBoardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await prisma.freeBoard.findMany({
    where: { parentId: null },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { replies: true } } },
  });

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-8">자유게시판</h1>

      <div className="paper-card rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <p className="text-sm text-text-muted py-16 text-center">등록된 글이 없습니다.</p>
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
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/community/free-board/${p.id}`} className="text-text-main hover:text-primary">
                      {p.title}
                      {p._count.replies > 0 && (
                        <span className="ml-2 text-xs text-text-muted">[{p._count.replies}]</span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{p.author}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] border rounded-full px-2 py-0.5 ${
                      p.moderationStatus === "BLOCK"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : p.moderationStatus === "REVIEW"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }`}>
                      {p.moderationStatus === "BLOCK" ? "차단" : p.moderationStatus === "REVIEW" ? "검토필요" : "통과"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-text-muted text-xs">
                    {new Date(p.createdAt).toLocaleDateString("ko-KR")}
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
