import PageBanner from "@/components/ui/PageBanner";
import BoardDetail from "@/components/ui/BoardDetail";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FreeBoardDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageBanner title="자유게시판" breadcrumb={["커뮤니티", "자유게시판"]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatedSection>
          <BoardDetail
            apiUrl="/api/free-board"
            listPath="/community/free-board"
            postId={params.id}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
