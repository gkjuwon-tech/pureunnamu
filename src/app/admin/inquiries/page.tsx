import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const inquiries = await prisma.inquiry.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminShell username={session.username}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary heading-serif">온라인 문의</h1>
        <p className="text-sm text-text-muted">총 {inquiries.length}건</p>
      </div>

      <div className="paper-card rounded-2xl overflow-hidden">
        {inquiries.length === 0 ? (
          <p className="text-sm text-text-muted py-16 text-center">접수된 문의가 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-primary/[0.05] text-text-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left">이름</th>
                <th className="px-4 py-3 text-left">연락처</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">성별/나이</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">접수일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {inquiries.map((q) => (
                <tr key={q.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-4 py-3 align-top">
                    {q.isRead ? (
                      <span className="text-[10px] text-text-muted">확인</span>
                    ) : (
                      <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">NEW</span>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-[280px]">
                    <Link href={`/admin/inquiries/${q.id}`} className="font-medium text-text-main hover:text-primary block truncate">
                      {q.subject}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{q.name}</td>
                  <td className="px-4 py-3 text-text-muted">{q.phone}</td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {[q.gender, q.age ? `${q.age}세` : null].filter(Boolean).join(" / ") || "-"}
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell text-xs">
                    {new Date(q.createdAt).toLocaleDateString("ko-KR")}
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
