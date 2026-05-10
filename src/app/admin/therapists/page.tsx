import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import TherapistsManager from "./TherapistsManager";

export const dynamic = "force-dynamic";

export default async function AdminTherapistsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const therapists = await prisma.therapist.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-3">치료사 관리</h1>
      <p className="text-sm text-text-muted mb-8">
        센터소개 → 치료사 소개 페이지에 노출되는 치료사 정보를 관리합니다. 사진 자료는 추후 제공 예정.
      </p>

      <TherapistsManager initial={therapists} />
    </AdminShell>
  );
}
