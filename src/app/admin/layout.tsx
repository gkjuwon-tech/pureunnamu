import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "관리자 | 푸른나무 심리센터",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // 의도적으로 일반 Header/Footer 미적용 — 별도 톤앤매너로 컴팩트하게 운영.
  // 단, 색감/폰트는 사이트 글로벌과 동일.
  return <div className="min-h-screen bg-[#f7f3ec]">{children}</div>;
}
