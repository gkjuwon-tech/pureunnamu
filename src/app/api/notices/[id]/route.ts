import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 공지사항 상세 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    // 조회수 증가
    const notice = await prisma.notice.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(notice);
  } catch {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
  }
}

// 공지사항 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const body = await request.json();
    const { title, content, isNotice } = body;

    if (title && title.length > 200) {
      return NextResponse.json({ error: "제목이 너무 깁니다" }, { status: 400 });
    }

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(content && { content: content.trim() }),
        ...(isNotice !== undefined && { isNotice: Boolean(isNotice) }),
      },
    });

    return NextResponse.json(notice);
  } catch {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// 공지사항 삭제
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
