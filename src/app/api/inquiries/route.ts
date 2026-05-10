import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

// 문의 목록 조회 (관리자만)
export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 401 });
  }
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// 문의 작성 (공개)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, gender, age, subject, content } = body ?? {};

    if (!name || !phone || !subject || !content) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요" }, { status: 400 });
    }

    if (
      String(name).length > 50 ||
      String(phone).length > 20 ||
      String(subject).length > 200 ||
      String(content).length > 5000
    ) {
      return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
    }

    let ageVal: number | null = null;
    if (age !== undefined && age !== null && age !== "") {
      const n = Number(age);
      if (!Number.isFinite(n) || n < 1 || n > 120) {
        return NextResponse.json({ error: "나이를 1~120 사이로 입력해주세요" }, { status: 400 });
      }
      ageVal = Math.floor(n);
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : "",
        gender: gender ? String(gender).trim() : "",
        age: ageVal,
        subject: String(subject).trim(),
        content: String(content).trim(),
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (e) {
    console.error("inquiry POST failed", e);
    return NextResponse.json({ error: "문의 접수 실패" }, { status: 500 });
  }
}
