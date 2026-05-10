import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import InquiryActions from "./InquiryActions";

export const dynamic = "force-dynamic";

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  // 자동으로 읽음 처리
  if (!inquiry.isRead) {
    await prisma.inquiry.update({ where: { id }, data: { isRead: true } });
  }

  return (
    <AdminShell username={session.username}>
      <Link href="/admin/inquiries" className="text-sm text-primary/70 hover:text-primary mb-6 inline-block">
        ← 문의 목록으로
      </Link>

      <div className="paper-card rounded-2xl p-7 md:p-10">
        <h1 className="text-xl font-bold text-primary heading-serif mb-2">{inquiry.subject}</h1>
        <p className="text-xs text-text-muted mb-6">
          {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
        </p>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-8 pb-8 border-b border-primary/5">
          <Field label="이름" value={inquiry.name} />
          <Field label="연락처" value={inquiry.phone} link={`tel:${inquiry.phone}`} />
          <Field label="이메일" value={inquiry.email || "-"} link={inquiry.email ? `mailto:${inquiry.email}` : undefined} />
          <Field label="성별 / 나이" value={[inquiry.gender, inquiry.age ? `${inquiry.age}세` : null].filter(Boolean).join(" / ") || "-"} />
        </dl>

        <h2 className="text-sm font-semibold text-primary mb-3">문의 내용</h2>
        <div className="bg-primary/[0.03] border border-primary/[0.06] rounded-xl p-5 mb-8 whitespace-pre-wrap text-sm leading-relaxed text-text-main">
          {inquiry.content}
        </div>

        <InquiryActions id={inquiry.id} initialReply={inquiry.reply} />
      </div>
    </AdminShell>
  );
}

function Field({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <dt className="text-xs text-text-muted mb-1">{label}</dt>
      <dd className="text-text-main">
        {link ? (
          <a href={link} className="hover:text-primary transition-colors">{value}</a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
