import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 상담후기 상세
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: {
        replies: { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
  }
}

// 상담후기 삭제 (비밀번호 확인)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해주세요" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, review.password);
    if (!isValid) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다" }, { status: 403 });
    }

    // 답글도 함께 삭제
    await prisma.review.deleteMany({ where: { parentId: id } });
    await prisma.review.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
