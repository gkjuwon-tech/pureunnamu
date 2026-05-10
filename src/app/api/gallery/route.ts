import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? undefined;
  const items = await prisma.galleryItem.findMany({
    where: category ? { category } : undefined,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  try {
    const { category, title, imageUrl, sortOrder } = (await req.json()) ?? {};
    if (!category || !title || !imageUrl) {
      return NextResponse.json({ error: "카테고리, 제목, 이미지 경로는 필수입니다" }, { status: 400 });
    }
    const created = await prisma.galleryItem.create({
      data: {
        category: String(category).slice(0, 50),
        title: String(title).slice(0, 200),
        imageUrl: String(imageUrl).slice(0, 500),
        sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("gallery POST failed", e);
    return NextResponse.json({ error: "등록 실패" }, { status: 500 });
  }
}
