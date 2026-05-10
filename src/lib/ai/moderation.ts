/**
 * 게시판 AI 모더레이션 - GPT-4.1-nano
 *
 * nano는 뇌가 나노 사이즈라 JSON을 맘대로 꾸밈.
 * 대비책: 퓨삿 5개(시스템) + 대화턴 퓨삿 2개 + 정규식 4단계 폴백 파서
 *
 * nano의 창의적 출력 패턴:
 * - ```json { ... } ``` 마크다운으로 감싸기
 * - "네! 분석 결과입니다:" 서론 붙이기
 * - JSON 안에 줄바꿈 넣기
 * - confidence를 "높음"이라고 쓰기
 * - 중괄호 안 닫기
 *
 * 토큰: 시스템 ~500 + 퓨삿대화 ~100 + 유저 ~200 = 요청당 ~800토큰
 * 비용: 글 1건당 약 0.08원
 */

import OpenAI from "openai";
import { MODERATION_SYSTEM_PROMPT } from "./context";

export interface ModerationResult {
  action: "PASS" | "REVIEW" | "BLOCK";
  reason: string;
  confidence: number;
}

const DEFAULT_RESULT: ModerationResult = {
  action: "PASS",
  reason: "AI 모더레이션 스킵됨 (API 키 미설정)",
  confidence: 0,
};

const VALID_ACTIONS = new Set(["PASS", "REVIEW", "BLOCK"]);

/**
 * nano가 JSON을 못 지킬 때를 위한 정규식 4단계 폴백 파서.
 */
function parseNanoResponse(raw: string): ModerationResult | null {
  // 1단계: 깨끗한 JSON 직접 파싱
  try {
    const parsed = JSON.parse(raw);
    if (VALID_ACTIONS.has(parsed.action)) return parsed;
  } catch {
    // nano가 또 창의력 발휘 중...
  }

  // 2단계: { ... } 블록 추출 후 파싱 (마크다운/서론 제거)
  const jsonMatch = raw.match(/\{[^{}]*"action"\s*:\s*"[^"]*"[^{}]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (VALID_ACTIONS.has(parsed.action)) return parsed;
    } catch {
      // JSON처럼 생겼는데 JSON이 아닌 nano의 예술작품
    }
  }

  // 3단계: 정규식으로 개별 필드 추출 (최후의 수단)
  const actionMatch = raw.match(/"action"\s*:\s*"(PASS|REVIEW|BLOCK)"/);
  const reasonMatch = raw.match(/"reason"\s*:\s*"([^"]*)"/);
  const confMatch = raw.match(/"confidence"\s*:\s*(\d+\.?\d*)/);

  if (actionMatch) {
    return {
      action: actionMatch[1] as ModerationResult["action"],
      reason: reasonMatch?.[1] || "사유 파싱 실패",
      confidence: confMatch ? parseFloat(confMatch[1]) : 0.5,
    };
  }

  // 4단계: BLOCK/REVIEW 키워드라도 있는지 확인
  const upperRaw = raw.toUpperCase();
  if (upperRaw.includes("BLOCK")) {
    return { action: "BLOCK", reason: "키워드 감지 (파싱 실패)", confidence: 0.5 };
  }
  if (upperRaw.includes("REVIEW")) {
    return { action: "REVIEW", reason: "키워드 감지 (파싱 실패)", confidence: 0.5 };
  }

  // nano가 뭔 소리를 한 건지 모르겠으면 그냥 통과
  return null;
}

/**
 * 게시물 내용을 AI로 검토합니다.
 * API 키가 없으면 기본 PASS를 반환합니다 (개발 환경 대비).
 */
export async function moderateContent(
  title: string,
  content: string
): Promise<ModerationResult> {
  if (!process.env.OPENAI_API_KEY) {
    return DEFAULT_RESULT;
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 토큰 최적화: 제목+내용을 500자로 제한
    const truncatedContent = content.length > 400 ? content.slice(0, 400) + "..." : content;
    const truncatedTitle = title.length > 100 ? title.slice(0, 100) + "..." : title;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: MODERATION_SYSTEM_PROMPT },
        // 퓨삿: assistant 턴으로 모범답안을 직접 보여줘서 nano도 따라하게
        {
          role: "user",
          content: "제목: 놀이치료 후기\n내용: 아이가 많이 좋아졌어요 감사합니다",
        },
        {
          role: "assistant",
          content: '{"action":"PASS","reason":"센터 이용 후기","confidence":0.95}',
        },
        {
          role: "user",
          content: "제목: ★대출★\n내용: 신용불량도 OK 010-1234-5678",
        },
        {
          role: "assistant",
          content: '{"action":"BLOCK","reason":"불법 대출 광고","confidence":0.99}',
        },
        // 실제 판단 대상
        {
          role: "user",
          content: `제목: ${truncatedTitle}\n내용: ${truncatedContent}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 100,
    });

    const text = response.choices[0]?.message?.content?.trim();
    if (!text) return DEFAULT_RESULT;

    const parsed = parseNanoResponse(text);
    if (!parsed) return DEFAULT_RESULT;

    return {
      action: parsed.action,
      reason: parsed.reason || "사유 없음",
      confidence: Math.min(1, Math.max(0, parsed.confidence || 0)),
    };
  } catch {
    // AI 오류 시 게시물 차단하지 않음 (가용성 우선)
    return DEFAULT_RESULT;
  }
}
