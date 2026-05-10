import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "온라인 상담문의",
  description:
    "푸른나무 심리센터 온라인 상담문의 - 심리상담, 심리치료, 심리검사 예약 및 문의. 전화 043-288-4040. 청주시 상당구 중고개로 180-5 5층. 월~금 9시~20시, 토 9시~18시.",
  keywords: ["청주 심리상담 예약", "심리상담 문의", "심리치료 예약", "푸른나무 상담예약"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "온라인 상담문의 | 푸른나무 심리센터",
    description:
      "심리상담·치료·검사 예약 및 문의. 전화 043-288-4040. 청주 푸른나무 심리센터.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
