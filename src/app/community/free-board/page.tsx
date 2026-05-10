import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BoardList from "@/components/ui/BoardList";

export const metadata: Metadata = {
  title: "자유게시판",
  description:
    "푸른나무 심리센터 자유게시판 - 마음건강, 심리상담, 육아 등 다양한 주제로 자유롭게 소통하는 공간.",
  alternates: { canonical: "/community/free-board" },
  openGraph: {
    title: "자유게시판 | 푸른나무 심리센터",
    description: "다양한 주제로 소통하는 푸른나무 심리센터 커뮤니티",
    url: "/community/free-board",
  },
};

const communitySubNav = [
  { label: "공지사항", href: "/community/notices" },
  { label: "상담후기", href: "/community/reviews" },
  { label: "자유게시판", href: "/community/free-board" },
];

export default function FreeBoardPage() {
  return (
    <div>
      <PageBanner title="자유게시판" breadcrumb={["커뮤니티", "자유게시판"]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <SubNav items={communitySubNav} />

        <AnimatedSection>
          <BoardList
            apiUrl="/api/free-board"
            detailPath="/community/free-board"
            writePath="/community/free-board/write"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
