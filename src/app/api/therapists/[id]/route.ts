import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.name === "string") data.name = body.name.slice(0, 100);
    if (typeof body.title === "string") data.title = body.title.slice(0, 100);
    if (typeof body.bio === "string") data.bio = body.bio.slice(0, 5000);
    if (typeof body.photoUrl === "string") data.photoUrl = body.photoUrl.slice(0, 500);
    if (Number.isFinite(Number(body.sortOrder))) data.sortOrder = Number(body.sortOrder);
    const updated = await prisma.therapist.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("therapists PATCH failed", e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  try {
    await prisma.therapist.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("therapists DELETE failed", e);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
