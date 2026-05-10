import { NextRequest, NextResponse } from "next/server";
import { getChatResponse, ChatMessage } from "@/lib/ai/chatbot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "메시지를 입력해주세요" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user" || !lastMessage.content.trim()) {
      return NextResponse.json(
        { error: "유효한 메시지를 입력해주세요" },
        { status: 400 }
      );
    }

    // 메시지 길이 제한 (토큰 비용 보호)
    if (lastMessage.content.length > 500) {
      return NextResponse.json(
        { error: "메시지가 너무 깁니다 (500자 이내)" },
        { status: 400 }
      );
    }

    const reply = await getChatResponse(messages);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "챗봇 응답 생성에 실패했습니다" },
      { status: 500 }
    );
  }
}
