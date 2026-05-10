import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { moderateContent } from "@/lib/ai/moderation";
import { notifyAdmin } from "@/lib/ai/notify";

// 자유게시판 목록
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "15")));
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.freeBoard.findMany({
        where: {
          parentId: null,
          moderationStatus: { not: "BLOCK" },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          replies: { orderBy: { createdAt: "asc" } },
        },
      }),
      prisma.freeBoard.count({
        where: {
          parentId: null,
          moderationStatus: { not: "BLOCK" },
        },
      }),
    ]);

    return NextResponse.json({
      items: posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// 자유게시판 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, password, parentId } = body;

    if (!title || !content || !author || !password) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요" }, { status: 400 });
    }

    if (title.length > 200 || content.length > 10000 || author.length > 50 || password.length > 100) {
      return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
    }

    // AI 모더레이션 (GPT-4.1-nano)
    const moderation = await moderateContent(title, content);

    if (moderation.action === "BLOCK" && moderation.confidence >= 0.8) {
      return NextResponse.json(
        { error: "게시물이 커뮤니티 규정에 맞지 않아 등록할 수 없습니다." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const post = await prisma.freeBoard.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        password: hashedPassword,
        parentId: parentId ? parseInt(parentId) : null,
        moderationStatus: moderation.action,
        moderationReason: moderation.reason,
      },
    });

    // REVIEW/BLOCK 판정 시 관리자 알림 (비동기, 실패해도 게시물 등록은 유지)
    if (moderation.action !== "PASS") {
      notifyAdmin({
        postId: post.id,
        title: title.trim(),
        author: author.trim(),
        moderation,
      }).catch(() => {});
    }

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "작성 실패" }, { status: 500 });
  }
}
