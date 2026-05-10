import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconSprout, IconStrength, IconSun } from "@/components/icons";

export const metadata: Metadata = {
  title: "심리치료란?",
  description:
    "청주 푸른나무 심리센터 심리치료 안내 - 놀이치료, 미술치료, 음악치료, 모래놀이치료, 요가명상치료 등 전문 심리치료 프로그램. 전문가와 함께하는 체계적인 맞춤형 치유 과정.",
  keywords: ["청주 심리치료", "놀이치료", "미술치료", "음악치료", "모래놀이치료", "청주 아동심리치료"],
  alternates: { canonical: "/programs/therapy" },
  openGraph: {
    title: "심리치료란? | 푸른나무 심리센터",
    description: "놀이치료, 미술치료, 음악치료, 모래놀이치료 등 전문 심리치료 프로그램 안내",
    url: "/programs/therapy",
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

export default function TherapyPage() {
  return (
    <div>
      <PageBanner title="심리치료란?" breadcrumb={["프로그램", "심리치료란?"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14">
            <h2 className="text-3xl font-bold text-primary mb-2 heading-serif">심리치료</h2>
            <p className="text-primary/60 text-sm mb-10 tracking-wide uppercase font-medium">PSYCHOTHERAPY</p>

            <div className="space-y-6 text-text-muted leading-relaxed">
              <p>
                사회가 복잡해지고 스트레스의 요인이 많아지고 있는 현대사회에서, 신체적
                건강상태의 질은 갈수록 높아지고 수명도 늘어나고 있지만 정신적 측면은 그렇지
                못한 것이 현실입니다.
              </p>

              <p>
                자신의 심리적 어려움의 실체를 파악하고 그것으로부터 벗어나려는 의지를 갖게 하며,
                자신 안에 내재되어 있는 행동변화의 힘을 외현화 할 수 있도록 도와주는 것이
                심리치료의 과정입니다.
              </p>

              <p>
                심리치료가 성공적으로 이루어진다면 개인의 부정적 사고가 긍정적 사고로 변화하며
                약한 자아에서 강한 자아로 탈바꿈하게 됩니다.
              </p>

              <p>
                따라서 자신의 내면에 대한 통찰을 바탕으로 감정을 조절할 수 있게 되며
                자신의 문제를 조정할 수 있는 힘이 생기게 됩니다.
              </p>
            </div>

            {/* 포인트 강조 */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <IconSprout size={28} />, title: "자기 이해", desc: "심리적 어려움의 실체를 파악합니다" },
                { icon: <IconStrength size={28} />, title: "내면의 힘", desc: "변화의 힘을 발견하고 키웁니다" },
                { icon: <IconSun size={28} />, title: "긍정적 변화", desc: "부정적 사고를 긍정으로 바꿉니다" },
              ].map((item) => (
                <div key={item.title} className="bg-primary/[0.03] rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-3 text-primary/40">{item.icon}</div>
                  <h4 className="font-semibold text-primary text-sm mb-1.5">{item.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
