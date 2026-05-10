import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "갤러리",
  description:
    "푸른나무 심리센터 갤러리 - 심리치료 장면, 보도자료, 강의 동영상, 대내외 활동, 활동 이야기. 청주 심리상담센터의 다양한 활동을 확인하세요.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "갤러리 | 푸른나무 심리센터",
    description:
      "심리치료 장면, 보도자료, 강의 동영상, 대내외 활동 등 푸른나무 심리센터의 다양한 활동",
    url: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
