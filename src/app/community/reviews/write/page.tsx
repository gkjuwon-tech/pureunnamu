import PageBanner from "@/components/ui/PageBanner";
import BoardWriteForm from "@/components/ui/BoardWriteForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ReviewWritePage() {
  return (
    <div>
      <PageBanner title="상담후기 글쓰기" breadcrumb={["커뮤니티", "상담후기", "글쓰기"]} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatedSection>
          <BoardWriteForm
            apiUrl="/api/reviews"
            backPath="/community/reviews"
            boardName="상담후기"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
