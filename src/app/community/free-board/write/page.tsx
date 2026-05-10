import PageBanner from "@/components/ui/PageBanner";
import BoardWriteForm from "@/components/ui/BoardWriteForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FreeBoardWritePage() {
  return (
    <div>
      <PageBanner title="자유게시판 글쓰기" breadcrumb={["커뮤니티", "자유게시판", "글쓰기"]} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatedSection>
          <BoardWriteForm
            apiUrl="/api/free-board"
            backPath="/community/free-board"
            boardName="자유게시판"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
