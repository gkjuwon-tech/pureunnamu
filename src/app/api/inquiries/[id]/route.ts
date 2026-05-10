import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  }
  try {
    const { reply, isRead } = (await req.json()) ?? {};
    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(typeof reply === "string" ? { reply: reply.slice(0, 5000) } : {}),
        ...(typeof isRead === "boolean" ? { isRead } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("inquiry PATCH failed", e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  }
  try {
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("inquiry DELETE failed", e);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
