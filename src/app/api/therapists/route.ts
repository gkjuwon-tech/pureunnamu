import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  const list = await prisma.therapist.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  try {
    const { name, title, bio, photoUrl, sortOrder } = (await req.json()) ?? {};
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "이름은 필수입니다" }, { status: 400 });
    }
    const created = await prisma.therapist.create({
      data: {
        name: name.trim().slice(0, 100),
        title: (title ?? "").toString().slice(0, 100),
        bio: (bio ?? "").toString().slice(0, 5000),
        photoUrl: (photoUrl ?? "").toString().slice(0, 500),
        sortOrder: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("therapists POST failed", e);
    return NextResponse.json({ error: "등록 실패" }, { status: 500 });
  }
}
