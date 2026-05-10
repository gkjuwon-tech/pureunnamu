import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BoardList from "@/components/ui/BoardList";

export const metadata: Metadata = {
  title: "상담후기",
  description:
    "푸른나무 심리센터 상담후기 - 심리상담, 심리치료, 심리검사를 경험하신 분들의 솜직한 후기. 청주 심리상담센터.",
  alternates: { canonical: "/community/reviews" },
  openGraph: {
    title: "상담후기 | 푸른나무 심리센터",
    description: "심리상담·치료를 경험하신 분들의 솜직한 후기",
    url: "/community/reviews",
  },
};

const communitySubNav = [
  { label: "공지사항", href: "/community/notices" },
  { label: "상담후기", href: "/community/reviews" },
  { label: "자유게시판", href: "/community/free-board" },
];

export default function ReviewsPage() {
  return (
    <div>
      <PageBanner title="상담후기" breadcrumb={["커뮤니티", "상담후기"]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <SubNav items={communitySubNav} />

        <AnimatedSection>
          <BoardList
            apiUrl="/api/reviews"
            detailPath="/community/reviews"
            writePath="/community/reviews/write"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
