/**
 * 관리자 알림 시스템
 * REVIEW/BLOCK 판정 게시물 발생 시 관리자에게 알림
 * 
 * 현재 구현: 콘솔 로그 + DB 기록 (이메일 연동은 SMTP 설정 후 확장)
 * 확장 예정: nodemailer로 dellamico@hanmail.net에 이메일 발송
 */

import prisma from "@/lib/prisma";
import type { ModerationResult } from "./moderation";

interface NotifyParams {
  postId: number;
  title: string;
  author: string;
  moderation: ModerationResult;
}

/**
 * 모더레이션 결과에 따라 관리자에게 알림을 보냅니다.
 * PASS인 경우는 무시합니다.
 */
export async function notifyAdmin({ postId, title, author, moderation }: NotifyParams) {
  if (moderation.action === "PASS") return;

  const severity = moderation.action === "BLOCK" ? "🚫 차단" : "⚠️ 검토필요";
  const logMessage = `[AI 모더레이션] ${severity} | 게시물 #${postId} "${title}" by ${author} | 사유: ${moderation.reason} (신뢰도: ${(moderation.confidence * 100).toFixed(0)}%)`;

  // 콘솔 로그 (서버 로그에 기록)
  console.log(logMessage);

  // 공지사항으로 관리자에게 알림 기록 (관리자 전용)
  try {
    await prisma.notice.create({
      data: {
        title: `[AI 모더레이션] ${severity} - 게시물 #${postId}`,
        content: `게시물 제목: ${title}\n작성자: ${author}\nAI 판정: ${moderation.action}\n사유: ${moderation.reason}\n신뢰도: ${(moderation.confidence * 100).toFixed(0)}%\n\n해당 게시물을 확인해 주세요.`,
        author: "AI 시스템",
        isNotice: false,
      },
    });
  } catch {
    console.error("[AI 알림] DB 기록 실패:", logMessage);
  }
}
