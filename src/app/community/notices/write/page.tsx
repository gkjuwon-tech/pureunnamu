import PageBanner from "@/components/ui/PageBanner";
import BoardWriteForm from "@/components/ui/BoardWriteForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function NoticeWritePage() {
  return (
    <div>
      <PageBanner title="공지사항 글쓰기" breadcrumb={["커뮤니티", "공지사항", "글쓰기"]} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatedSection>
          <BoardWriteForm
            apiUrl="/api/notices"
            backPath="/community/notices"
            boardName="공지사항"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
