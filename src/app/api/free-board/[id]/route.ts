import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 자유게시판 상세
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const post = await prisma.freeBoard.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: {
        replies: { orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
  }
}

// 자유게시판 삭제
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

    const post = await prisma.freeBoard.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, post.password);
    if (!isValid) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다" }, { status: 403 });
    }

    await prisma.freeBoard.deleteMany({ where: { parentId: id } });
    await prisma.freeBoard.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
