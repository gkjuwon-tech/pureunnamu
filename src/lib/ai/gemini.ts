/**
 * Google Gemini 호출 헬퍼 (REST, SDK 의존성 없음)
 * 챗봇 + 게시판 모더레이션 모두 이 키 하나(GEMINI_API_KEY)로 동작.
 * thinking 은 기본 비활성화(thinkingBudget 0)로 응답 속도·토큰 절약.
 */

const GEMINI_MODEL = "gemini-2.5-flash";

export interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function geminiGenerate(opts: {
  system?: string;
  contents: GeminiContent[];
  generationConfig?: Record<string, unknown>;
}): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(opts.system ? { systemInstruction: { parts: [{ text: opts.system }] } } : {}),
        contents: opts.contents,
        generationConfig: {
          thinkingConfig: { thinkingBudget: 0 },
          ...opts.generationConfig,
        },
      }),
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" ? text : null;
}
