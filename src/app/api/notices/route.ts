import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 공지사항 목록
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "15")));
    const skip = (page - 1) * limit;

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        orderBy: [{ isNotice: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.notice.count(),
    ]);

    return NextResponse.json({
      items: notices,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// 공지사항 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, isNotice } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요" }, { status: 400 });
    }

    if (title.length > 200 || content.length > 10000 || author.length > 50) {
      return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        isNotice: Boolean(isNotice),
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch {
    return NextResponse.json({ error: "작성 실패" }, { status: 500 });
  }
}
