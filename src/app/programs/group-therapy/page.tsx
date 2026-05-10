import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconLeaf } from "@/components/icons";

export const metadata: Metadata = {
  title: "사회성향상집단상담",
  description:
    "푸른나무 심리센터 사회성향상집단상담 프로그램 안내. 또래관계 개선, 사회적 기술 훈련, 자기표현 향상. 청주 심리상담 전문.",
  alternates: { canonical: "/programs/group-therapy" },
  openGraph: {
    title: "사회성향상집단상담 | 푸른나무 심리센터",
    description: "사회성향상집단상담 프로그램 안내",
    url: "/programs/group-therapy",
  },
};

const programSubNav = [
  { label: "심리치료란?", href: "/programs/therapy" },
  { label: "개인심리치료", href: "/programs/targets" },
  { label: "심리검사", href: "/programs/assessment" },
  { label: "사회성향상집단상담", href: "/programs/group-therapy" },
  { label: "인지학습치료", href: "/programs/cognitive-learning" },
];

export default function GroupTherapyPage() {
  return (
    <div>
      <PageBanner title="사회성향상집단상담" breadcrumb={["프로그램", "사회성향상집단상담"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14 text-center">
            <div className="text-primary/30 mb-6"><IconLeaf size={48} /></div>
            <h2 className="text-2xl font-bold text-primary heading-serif mb-4">
              사회성향상집단상담
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              상세 내용은 준비 중입니다.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
