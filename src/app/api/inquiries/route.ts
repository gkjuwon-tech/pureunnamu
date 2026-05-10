import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 문의 목록 조회
export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// 문의 작성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, content } = body;

    if (!name || !phone || !subject || !content) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요" }, { status: 400 });
    }

    // 입력값 길이 제한
    if (name.length > 50 || phone.length > 20 || subject.length > 200 || content.length > 5000) {
      return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        subject: subject.trim(),
        content: content.trim(),
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "문의 접수 실패" }, { status: 500 });
  }
}
