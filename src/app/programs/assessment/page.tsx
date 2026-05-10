import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconClipboard, IconSearch, IconTarget } from "@/components/icons";
import { IconBrain, IconChild, IconChart, IconPulse } from "@/components/icons";

export const metadata: Metadata = {
  title: "심리검사",
  description:
    "푸른나무 심리센터 심리검사 안내 - 심리검사란 무엇인지, 지능검사(WPPSI, WISC, WAIS), 아동·청소년 검사(Rorschach, HTP, KFD, K-CBCL), 성격검사(MMPI, MBTI, TCI), 신경심리검사 등. 청주 심리검사 전문.",
  keywords: ["청주 심리검사", "종합심리검사", "ADHD검사", "지능검사", "성격검사", "청주 ADHD", "아동 심리검사"],
  alternates: { canonical: "/programs/assessment" },
  openGraph: {
    title: "심리검사 | 푸른나무 심리센터",
    description: "심리검사 안내 및 종류 - 종합심리검사, 성격검사, 지능검사, ADHD검사 등",
    url: "/programs/assessment",
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

export default function AssessmentPage() {
  return (
    <div>
      <PageBanner title="심리검사" breadcrumb={["프로그램", "심리검사"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-8 heading-serif">
              심리검사는 꼭 필요한가요?
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                심리검사는 개인의 성격, 정서상태, 정신적 어려움 등을 객관적 잣대를
                이용해 측정하기 위한 도구입니다.
              </p>
              <p>
                면담을 통해 파악되는 내담자의 호소와 더불어 심리검사 결과는 상담이나
                심리치료의 진행에 필수적인 요소입니다.
              </p>
              <p>
                치료사가 자신의 주관적인 견해와 경험에 의한 판단으로만 내담자의
                심리상태를 파악하는 것은 대단히 위험할 뿐이고 성공적인 치료결과를
                얻기가 어렵습니다.
              </p>
              <p>
                이것을 과장해서 표현하자면 초음파나 엑스레이검사 등을 통해 환부의
                위치와 크기를 파악하지 않고 바로 수술에 들어가는 것과 같다고 할까요?
              </p>
              <p>
                심리치료에서 최대한의 효과를 얻기 위해서는 심리검사를 통해 도출된 보다
                신뢰성이 있는 결과를 바탕으로, 내담자의 심적 문제를 종합적으로
                파악하고 나서 상담이나 심리치료가 시작되어야 합니다.
              </p>
              <p className="font-medium text-primary">
                따라서 심리검사는 심리치료나 심리상담에 꼭 필요한 것입니다.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-8 md:p-14 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-8 heading-serif">
              심리검사는 언제 하나요?
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                대부분 심리상담이나 심리치료가 시작되기 전, 심리상태를 진단하고
                치료계획, 방법 등을 결정할 때 도움을 받고자 실시하는 것이 보통입니다.
              </p>
              <p>
                하지만 간혹 상담이 진행되고 난 후, 새롭게 부각되는 문제를 조명하기
                위해 추가적으로 실시되는 경우도 있고, 치료효과를 입증하기 위해 사전,
                사후 검사를 실시할 필요가 있을 수 있는 상담의 시작과 끝에 실시하기도
                합니다.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="paper-card rounded-3xl p-8 md:p-14">
            <h2 className="text-2xl font-bold text-primary mb-8 heading-serif">
              심리검사란?
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                심리검사는 성격, 지능, 적성 같은 인간의 다양한 심리적 특성들에 대해서
                파악하고자 하는 목적을 가지고 다양한 도구를 이용하여 이런 특성들을
                양적, 질적으로 측정하고 평가하는 일련의 절차를 말합니다.
              </p>
              <p>
                또한 심리평가는 심리검사를 통해서 얻어진 정보를 중심으로 하여 면담,
                행동관찰, 개인력 등에서의 자료를 참조하여 종합적인 평가를 내리는
                전문적인 과정입니다.
              </p>
            </div>

            {/* 포인트 카드 */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <IconClipboard size={28} />, title: "객관적 측정", desc: "표준화된 도구로 심리상태를 정확히 진단합니다" },
                { icon: <IconSearch size={28} />, title: "종합적 평가", desc: "면담, 행동관찰, 개인력을 종합하여 평가합니다" },
                { icon: <IconTarget size={28} />, title: "치료 방향 설정", desc: "검사 결과를 바탕으로 최적의 치료계획을 수립합니다" },
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

        {/* ── 심리검사의 종류 ── */}
        <AnimatedSection delay={300}>
          <h2 className="text-2xl font-bold text-primary mb-6 heading-serif mt-12">심리검사의 종류</h2>
        </AnimatedSection>

        <div className="space-y-8">
          {assessmentTypes.map((section, i) => (
            <AnimatedSection key={section.category} delay={350 + i * 100}>
              <div className="paper-card rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-primary/40">
                    {section.icon === "brain" && <IconBrain size={36} />}
                    {section.icon === "child" && <IconChild size={36} />}
                    {section.icon === "chart" && <IconChart size={36} />}
                    {section.icon === "pulse" && <IconPulse size={36} />}
                  </span>
                  <h3 className="text-2xl font-bold text-primary heading-serif">{section.category}</h3>
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
        <AnimatedSection delay={800}>
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
