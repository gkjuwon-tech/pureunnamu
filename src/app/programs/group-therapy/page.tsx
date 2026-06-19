import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconLeaf } from "@/components/icons";

export const metadata: Metadata = {
  title: "사회성그룹치료",
  description:
    "푸른나무 심리센터 사회성그룹치료(구 사회성향상집단상담) 프로그램 안내. 또래관계 개선, 사회적 기술 훈련, 자기표현 향상. 청주 심리상담 전문.",
  alternates: { canonical: "/programs/group-therapy" },
  openGraph: {
    title: "사회성그룹치료 | 푸른나무 심리센터",
    description: "사회성그룹치료 프로그램 안내",
    url: "/programs/group-therapy",
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

export default function GroupTherapyPage() {
  return (
    <div>
      <PageBanner title="사회성그룹치료" breadcrumb={["프로그램", "사회성그룹치료"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14 text-center">
            <div className="text-primary/30 mb-6"><IconLeaf size={48} /></div>
            <h2 className="text-2xl font-bold text-primary heading-serif mb-2">
              사회성그룹치료
            </h2>
            <p className="text-primary/50 text-xs tracking-wider mb-6">구 · 사회성향상집단상담</p>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
              아동의 특성을 반영해 설계된 집단 프로그램 속에서 또래와의 상호작용을 통해 의사소통과 감정조절을
              습득합니다. 그룹에서 실제적인 연습을 통해 사회적응능력을 향상시킵니다.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
