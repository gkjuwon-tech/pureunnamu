import PageBanner from "@/components/ui/PageBanner";
import BoardDetail from "@/components/ui/BoardDetail";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageBanner title="공지사항" breadcrumb={["커뮤니티", "공지사항"]} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatedSection>
          <BoardDetail
            apiUrl="/api/notices"
            listPath="/community/notices"
            postId={params.id}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
