import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconLeaf } from "@/components/icons";

export const metadata: Metadata = {
  title: "인지학습치료",
  description:
    "푸른나무 심리센터 인지학습치료 프로그램 안내. 학습부진, 인지발달, 집중력 향상. 청주 심리상담 전문.",
  alternates: { canonical: "/programs/cognitive-learning" },
  openGraph: {
    title: "인지학습치료 | 푸른나무 심리센터",
    description: "인지학습치료 프로그램 안내",
    url: "/programs/cognitive-learning",
  },
};

const programSubNav = [
  { label: "심리치료란?", href: "/programs/therapy" },
  { label: "심리검사", href: "/programs/assessment" },
  { label: "개인심리치료", href: "/programs/targets" },
  { label: "가족심리치료", href: "/programs/family" },
  { label: "사회성그룹치료", href: "/programs/group-therapy" },
  { label: "인지학습치료", href: "/programs/cognitive-learning" },
];

export default function CognitiveLearningPage() {
  return (
    <div>
      <PageBanner title="인지학습치료" breadcrumb={["프로그램", "인지학습치료"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14 text-center">
            <div className="text-primary/30 mb-6"><IconLeaf size={48} /></div>
            <h2 className="text-2xl font-bold text-primary heading-serif mb-4">
              인지학습치료
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
              아동의 인지 기능과 학습 수준을 평가하여 교과 수준에 맞춘 맞춤형 프로그램입니다. 취약한 인지 영역을
              중심으로 단계적인 학습을 지원합니다.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
