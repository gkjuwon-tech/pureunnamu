import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconBrain, IconChild, IconChart, IconPulse } from "@/components/icons";

export const metadata: Metadata = {
  title: "심리검사의 종류",
  description:
    "푸른나무 심리센터 심리검사 종류 - 지능검사(WPPSI, WISC, WAIS), 아동·청소년 검사(Rorschach, HTP, KFD), 성격검사(MMPI, MBTI, TCI), 신경심리검사 등. 청주 심리검사 전문.",
  keywords: ["지능검사", "WISC", "WAIS", "Rorschach검사", "MMPI", "종합심리검사", "아동심리검사", "HTP검사", "청주심리검사"],
  alternates: { canonical: "/programs/assessment-types" },
  openGraph: {
    title: "심리검사의 종류 | 푸른나무 심리센터",
    description: "지능검사, 성격검사, 신경심리검사 등 다양한 심리검사 종류 안내",
    url: "/programs/assessment-types",
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

const assessmentTypes = [
  {
    category: "지능검사",
    icon: "brain",
    items: [
      { name: "유아용 WPPSI", desc: "3세 ~ 7세 3개월" },
      { name: "아동용 WISC", desc: "6세 ~ 16세 11개월" },
      { name: "성인용 WAIS", desc: "16세 이상 성인" },
      { name: "그림지능검사 PTI", desc: "4세 ~ 7세, 의사소통에 문제가 있는 아동" },
    ],
  },
  {
    category: "아동·청소년 검사",
    icon: "child",
    items: [
      { name: "Rorschach 검사", desc: "모호한 자극의 인지적 해석" },
      { name: "HTP 검사", desc: "집, 나무, 사람 그림검사" },
      { name: "KFD 검사", desc: "동적 가족화 / 가족구성원의 역동" },
      { name: "TAT", desc: "주제통각검사" },
      { name: "CAT", desc: "아동용 회화 통각검사" },
      { name: "SCT", desc: "문장완성검사 (아동용, 성인용)" },
    ],
  },
  {
    category: "아동·청소년 행동평가",
    icon: "child",
    items: [
      { name: "K-CBCL", desc: "아동·청소년 행동평가척도" },
    ],
  },
  {
    category: "성격(인성) 및 적성검사",
    icon: "chart",
    items: [
      { name: "MMPI", desc: "미네소타 다면적 인성검사" },
      { name: "MBTI", desc: "성격유형검사 / 경향성 검사" },
      { name: "TCI", desc: "기질 및 성격검사" },
      { name: "직업흥미검사", desc: "직업 흥미 및 적성 파악" },
      { name: "진로적성검사", desc: "진로 방향 설정을 위한 적성검사" },
    ],
  },
  {
    category: "신경심리 및 주의력 검사",
    icon: "pulse",
    items: [
      { name: "BGT", desc: "기하도형 자극카드의 모사를 통한 신경심리검사 및 투사검사" },
      { name: "CCTT", desc: "아동 선로 잇기검사 (주의력 테스트)" },
      { name: "MFFT", desc: "아동 충동성 검사" },
      { name: "SNSB", desc: "신경심리검사 (치매 진단, 인지기능 평가)" },
      { name: "CAT", desc: "주의력 검사 (ADHD)" },
    ],
  },
];

export default function AssessmentTypesPage() {
  return (
    <div>
      <PageBanner title="심리검사의 종류" breadcrumb={["프로그램", "심리검사의 종류"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <div className="space-y-8">
          {assessmentTypes.map((section, i) => (
            <AnimatedSection key={section.category} delay={i * 100}>
              <div className="paper-card rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-primary/40">
                    {section.icon === "brain" && <IconBrain size={36} />}
                    {section.icon === "child" && <IconChild size={36} />}
                    {section.icon === "chart" && <IconChart size={36} />}
                    {section.icon === "pulse" && <IconPulse size={36} />}
                  </span>
                  <h2 className="text-2xl font-bold text-primary heading-serif">{section.category}</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary/[0.08]">
                        <th className="text-left py-3.5 px-4 text-primary font-semibold text-xs tracking-wider uppercase w-1/3">
                          검사명
                        </th>
                        <th className="text-left py-3.5 px-4 text-primary font-semibold text-xs tracking-wider uppercase">
                          설명
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, j) => (
                        <tr
                          key={item.name}
                          className={j % 2 === 0 ? "bg-primary/[0.02]" : ""}
                        >
                          <td className="py-3 px-4 font-semibold text-text-main text-sm">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-text-muted text-sm">
                            {item.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* 안내 문구 */}
        <AnimatedSection delay={400}>
          <div className="mt-10 bg-primary/[0.03] border border-primary/[0.06] rounded-3xl p-8 text-center">
            <p className="text-text-muted text-sm leading-relaxed">
              검사의 종류와 조합은 내담자의 상태와 목적에 따라 달라질 수 있습니다.
              <br />
              전문 치료사와 상담 후 적합한 검사를 안내받으시기 바랍니다.
            </p>
            <a
              href="tel:043-288-4040"
              className="inline-block mt-5 bg-primary/90 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              전화 상담: 043-288-4040
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
