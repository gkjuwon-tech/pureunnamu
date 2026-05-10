import type { Metadata } from "next";
import { Suspense } from "react";
import PageBanner from "@/components/ui/PageBanner";
import prisma from "@/lib/prisma";
import GalleryClient, { GalleryPhoto } from "./GalleryClient";

export const metadata: Metadata = {
  title: "갤러리",
  description: "푸른나무 심리센터의 시설, 심리치료 장면, 심리검사, 외부 강의 활동을 담은 갤러리",
  alternates: { canonical: "/gallery" },
};

export const dynamic = "force-dynamic";

/**
 * 정적 사진 카탈로그 (public/gallery/ 의 실제 파일과 일치).
 * 추후 관리자 페이지에서 DB로 추가/제거하면 DB 항목이 우선 표시.
 *
 * NOTE: 클라이언트 요청 — AHS* 이름의 파일은 이미 미사용. 폴더에 파일명이 명확한 것만 등록.
 */
const STATIC_PHOTOS: GalleryPhoto[] = [
  // 센터 시설
  { src: "/gallery/waiting-room-1.jpg", title: "대기실 전경 A", desc: "대형창 너머로 펼쳐지는 시원한 풍경", category: "facility" },
  { src: "/gallery/waiting-room-2.jpg", title: "대기실 전경 B", desc: "따뜻한 조명 아래 편안하게 머무를 수 있는 공간", category: "facility" },
  { src: "/gallery/waiting-room-3.jpg", title: "대기실 서가", desc: "심리 관련 도서와 자료가 비치된 대기 공간", category: "facility" },
  { src: "/gallery/art-therapy-room.jpg", title: "미술치료실", desc: "다양한 미술 재료가 갖춰진 치료 공간", category: "facility" },
  { src: "/gallery/sandplay-room.jpg", title: "모래놀이치료실", desc: "모래상자와 수백 가지 피규어가 준비된 전용 치료실", category: "facility" },

  // 심리치료 장면
  { src: "/gallery/family-therapy-1.jpg", title: "가족치료 장면", desc: "가족 구성원이 함께 참여하여 관계를 회복하는 시간", category: "therapy" },
  { src: "/gallery/sandplay-1.jpg", title: "모래놀이치료", desc: "모래 위에 자신만의 세계를 만들며 내면을 표현합니다", category: "therapy" },
  { src: "/gallery/art-therapy-session.jpg", title: "미술치료 진행", desc: "그림과 조형 활동으로 감정을 표현하고 치유하는 과정", category: "therapy" },
  { src: "/gallery/art-therapy-work-1.jpg", title: "미술치료 작품 A", desc: "내담자의 내면이 담긴 미술치료 작품", category: "therapy" },
  { src: "/gallery/art-therapy-work-2.jpg", title: "미술치료 작품 B", desc: "색채와 형태로 표현된 심리적 이야기", category: "therapy" },
  { src: "/gallery/adult-counseling-1.jpg", title: "성인 상담 1", desc: "차분한 분위기 속에서 진행되는 개인상담", category: "therapy" },
  { src: "/gallery/adult-counseling-2.jpg", title: "성인 상담 2", desc: "내담자의 마음을 편안하게 열어주는 상담 환경", category: "therapy" },
  { src: "/gallery/adult-counseling-3.jpg", title: "성인 상담 3", desc: "센터의 따뜻한 상담 공간", category: "therapy" },
  { src: "/gallery/adult-counseling-4.jpg", title: "성인 상담 4", desc: "정성스러운 1:1 상담 시간", category: "therapy" },
  { src: "/gallery/adult-counseling-5.jpg", title: "성인 상담 5", desc: "마음을 편안히 둘 수 있는 자리", category: "therapy" },

  // 심리검사
  { src: "/gallery/adult-assessment.jpg", title: "성인 심리검사", desc: "표준화된 검사 도구로 진행되는 심리평가", category: "assessment" },
  { src: "/gallery/assessment-1.jpg", title: "심리검사 장면 1", desc: "전문 검사자가 진행하는 종합심리검사", category: "assessment" },
  { src: "/gallery/assessment-2.jpg", title: "심리검사 장면 2", desc: "검사 결과를 바탕으로 한 정확한 평가", category: "assessment" },
  { src: "/gallery/assessment-3.jpg", title: "종합심리검사", desc: "지능, 성격, 정서 등 다양한 영역을 종합적으로 평가", category: "assessment" },
  { src: "/gallery/assessment-4.jpg", title: "검사 도구", desc: "전문 심리검사 도구와 매뉴얼", category: "assessment" },

  // 외부강의 · 활동
  { src: "/gallery/lecture-1.jpg", title: "외부강의", desc: "유아교육기관 학부모 교육", category: "activity" },
  { src: "/gallery/lecture-2.jpg", title: "교육기관 강의", desc: "교사·상담사 대상 전문 역량 강화 연수", category: "activity" },
  { src: "/gallery/lecture-parents.jpg", title: "학부모 교육", desc: "자녀의 마음을 이해하기 위한 학부모 심리 교육", category: "activity" },
];

export default async function GalleryPage() {
  // DB에 등록된 이미지가 있으면 그걸 우선 사용, 없으면 정적 카탈로그.
  const dbItems = await prisma.galleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  let photos: GalleryPhoto[];
  if (dbItems.length > 0) {
    photos = dbItems.map((it) => ({
      src: it.imageUrl.startsWith("http") || it.imageUrl.startsWith("/") ? it.imageUrl : `/gallery/${it.imageUrl}`,
      title: it.title,
      desc: "",
      category: it.category,
    }));
  } else {
    photos = STATIC_PHOTOS;
  }

  return (
    <div>
      <PageBanner title="갤러리" breadcrumb={["갤러리"]} />
      <Suspense fallback={null}>
        <GalleryClient photos={photos} />
      </Suspense>
    </div>
  );
}
