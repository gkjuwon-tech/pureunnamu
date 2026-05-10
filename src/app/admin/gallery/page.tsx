import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <AdminShell username={session.username}>
      <h1 className="text-2xl font-bold text-primary heading-serif mb-3">갤러리 관리</h1>
      <p className="text-sm text-text-muted mb-8">
        갤러리 페이지에 노출되는 사진을 관리합니다. 이미지는 <code className="bg-primary/[0.08] px-1.5 py-0.5 rounded">/public/gallery/</code> 경로에 업로드한 뒤,
        해당 파일명을 입력해 주세요. (예: <code className="bg-primary/[0.08] px-1.5 py-0.5 rounded">therapy-room-01.jpg</code>)
      </p>

      <GalleryManager initial={items} />
    </AdminShell>
  );
}
