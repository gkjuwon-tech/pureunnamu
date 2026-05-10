import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconFamily } from "@/components/icons";

export const metadata: Metadata = {
  title: "가족심리치료",
  description:
    "푸른나무 심리센터 가족심리치료 안내 - 가족 갈등, 부부 갈등, 자녀 양육 문제 등 가족 단위의 심리 상담. 청주 가족상담 전문.",
  keywords: ["가족상담", "부부상담", "청주 가족치료", "가족심리치료", "양육 상담"],
  alternates: { canonical: "/programs/family" },
  openGraph: {
    title: "가족심리치료 | 푸른나무 심리센터",
    description: "가족 단위의 심리 상담 - 부부, 자녀, 세대 갈등 해결",
    url: "/programs/family",
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

const familyCases = [
  "아이들은 게임중독에 빠지거나 친구들과 바깥으로 돌기 일쑤이고, 부모는 상대가 나를 이해해주기만을 바라며 다툼과 불화가 깊어져요.",
  "가족의 일원이 큰 일을 당한 후, 어려움이 극복되지 않고 심리적인 문제까지 엉키기 시작하며 책임을 서로 전가시키고, 이제 같이 사는 것이 아무런 의미가 없어요.",
  "가족행사에 잘 참석하지 않고 각자 자신의 일을 더 중요시하며 가정은 뒷전이에요.",
  "우리 가족은 같이 살고 같이 죽는 엄청난 단결력을 자랑해요. 하지만 저는 그러면서도 마음 한 켠이 매우 불편하고 가끔 희생하고 있다는 느낌이 들어요.",
  "부모의 어린 시절 사랑 받지 못했던 경험 때문에, 자신이 받았던 설움을 무의식 중에 자녀에게 되돌려줘요.",
];

const approaches = [
  {
    title: "부부 / 커플 상담",
    desc: "의사소통 패턴, 갈등 해결 방식, 정서적 단절 등을 함께 점검하고 회복의 길을 찾습니다.",
  },
  {
    title: "자녀 양육 코칭",
    desc: "발달 단계에 맞는 양육 태도와 한계 설정, 정서 조율 방법을 부모와 함께 설계합니다.",
  },
  {
    title: "다세대 가족 치료",
    desc: "원가족에서 전수된 정서적 패턴을 자각하고 건강한 가족 시스템으로 재구성합니다.",
  },
  {
    title: "위기 가족 회복",
    desc: "외상 사건, 상실, 질병 등 가족 위기 상황에서의 정서적 회복을 돕습니다.",
  },
];

export default function FamilyPage() {
  return (
    <div>
      <PageBanner title="가족심리치료" breadcrumb={["프로그램", "가족심리치료"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-12 mb-8 text-center">
            <div className="text-primary/40 mb-4 inline-flex"><IconFamily size={40} /></div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary heading-serif leading-relaxed mb-4">
              가족, 함께 회복하는 길
            </h2>
            <p className="text-text-muted text-sm md:text-[15px] leading-relaxed max-w-2xl mx-auto">
              가족 구성원의 심리적 어려움은 개인의 문제로 끝나지 않습니다. 푸른나무심리센터는 가족 단위의
              상담을 통해 관계의 패턴을 점검하고, 함께 변화의 방향을 찾아갑니다.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <h3 className="text-lg font-bold text-primary mb-5 heading-serif">이런 경우 상담을 권합니다</h3>
            <div className="space-y-3">
              {familyCases.map((text, i) => (
                <div key={i} className="bg-white/60 border border-primary/10 rounded-xl p-4 flex gap-3">
                  <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
                  <p className="text-text-muted text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="paper-card rounded-3xl p-8 md:p-10">
            <h3 className="text-lg font-bold text-primary mb-5 heading-serif">상담 접근법</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approaches.map((a) => (
                <div
                  key={a.title}
                  className="bg-white/50 border border-primary/[0.08] rounded-2xl p-5 hover:bg-white/70 hover:border-primary/15 transition-all duration-500"
                >
                  <h4 className="font-semibold text-primary mb-2 text-sm">{a.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
