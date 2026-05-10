import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BoardList from "@/components/ui/BoardList";

export const metadata: Metadata = {
  title: "공지사항",
  description:
    "푸른나무 심리센터 공지사항 - 청주 심리상담센터의 최신 소식, 주요 일정, 상담 안내 사항을 전해드립니다.",
  alternates: { canonical: "/community/notices" },
  openGraph: {
    title: "공지사항 | 푸른나무 심리센터",
    description: "푸른나무 심리센터의 최신 소식과 주요 일정",
    url: "/community/notices",
  },
};

const communitySubNav = [
  { label: "공지사항", href: "/community/notices" },
  { label: "상담후기", href: "/community/reviews" },
  { label: "자유게시판", href: "/community/free-board" },
];

export default function NoticesPage() {
  return (
    <div>
      <PageBanner title="공지사항" breadcrumb={["커뮤니티", "공지사항"]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <SubNav items={communitySubNav} />

        <AnimatedSection>
          <BoardList
            apiUrl="/api/notices"
            detailPath="/community/notices"
            writePath="/community/notices/write"
            showNoticeTag
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
