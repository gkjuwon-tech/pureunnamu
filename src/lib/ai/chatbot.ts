/**
 * AI 챗봇 API - Google Gemini (gemini-2.5-flash)
 * 센터의 모든 정보를 포괄하는 상세 시스템 프롬프트로 FAQ 역할까지 수행
 * 대화 히스토리 최근 10턴만 유지 → 장기 대화에서도 토큰 절약
 */

import { CHATBOT_SYSTEM_PROMPT } from "./context";
import { geminiGenerate } from "./gemini";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_HISTORY = 10;

/**
 * 챗봇 응답을 생성합니다.
 * @param messages 대화 히스토리 (최근 MAX_HISTORY개만 사용)
 * @returns AI 응답 텍스트
 */
export async function getChatResponse(
  messages: ChatMessage[]
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return "AI 챗봇이 현재 설정되지 않았습니다. 센터에 직접 문의해 주세요. 📞 043-288-4040";
  }

  try {
    // 토큰 최적화: 최근 대화만 전송
    const recentMessages = messages.slice(-MAX_HISTORY);

    const text = await geminiGenerate({
      system: CHATBOT_SYSTEM_PROMPT,
      contents: recentMessages.map((m) => ({
        role: m.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
    });

    if (text) return text;

    return "죄송합니다, 응답을 생성하지 못했습니다. 센터에 직접 문의해 주세요. 📞 043-288-4040";
  } catch {
    return "일시적인 오류가 발생했습니다. 센터에 직접 문의해 주세요. 📞 043-288-4040";
  }
}
