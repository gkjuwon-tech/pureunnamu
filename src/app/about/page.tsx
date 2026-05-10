import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "센터소개 - 인사말",
  description:
    "청주 푸른나무 심리센터 인사말 - 2010년 개소 이래 따뜻한 공감과 전문성으로 행복한 삶을 돕는 심리상담 전문기관. 아동·청소년·성인·가족 심리치료. 충북 청주시 상당구.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "센터소개 - 인사말 | 푸른나무 심리센터",
    description: "청주 푸른나무 심리센터 - 따뜻한 공감과 전문성으로 행복한 삶을 돕는 심리상담 전문기관.",
    url: "/about",
  },
};

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "찾아오시는길", href: "/about/directions" },
];

export default function AboutPage() {
  return (
    <div>
      <PageBanner title="인사말" breadcrumb={["센터소개", "인사말"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 heading-serif leading-relaxed">
              안녕하세요?
              <br />
              모든 사람들이 편안하고 행복한 마음을 갖기를 소망하는
              <br />
              푸른나무심리센터입니다.
              <br />
              홈페이지를 방문해 주셔서 감사합니다.
            </h2>

            <div className="text-text-muted leading-[1.9] space-y-6 text-left md:text-center max-w-2xl mx-auto text-[15px]">
              <p>
                푸른나무심리센터는 심리적 어려움을 겪고 있는{" "}
                <strong className="text-primary">아동, 청소년, 성인, 부부, 커플, 가족</strong>을
                대상으로 한 심리치료 전문기관입니다.
              </p>

              <p>
                센터 내에서는 예약에 의해 철저하게 비밀이 보장된 상태에서 개인 상담과
                또래관계 개선 등을 위한 집단 상담이 실시되고 있고, 또한 대외적으로는 기관과
                협약을 맺어 각급 학교, 관공서, 기업체 등에 필요한 정서 지지와 공감능력 향상,
                사회성 향상 프로그램, 인지 능력 및 주의력 향상 프로그램, 체제 적응 훈련 등을
                전문 인력을 파견하여 실시하고 있습니다.
              </p>

              <p>
                저희 기관에서 일하시는 치료사 및 검사 전문가 등은 심리학 및 관련학과 전공자들로서
                <strong className="text-primary">
                  {" "}공신력 있는 학회의 해당 치료사 자격을 갖춘 경험 있는 전문 인력
                </strong>
                으로 구성되어 있으므로 신뢰하시고 방문하셔도 좋습니다.
              </p>

              <div className="bg-primary/[0.03] rounded-2xl p-6 md:p-8 mt-8 border border-primary/[0.06]">
                <p className="text-primary font-medium text-[15px] leading-relaxed break-keep">
                  &ldquo;마음 안에 힘든 부분이나 선뜻 공개하기 힘든 정신적 어려움이 있으시다면
                  주저하지 마시고 문을 두드려 주세요. 방문하시는 모든 분들을 우리 가족이라
                  생각하고 사랑과 정성을 다하여 치료에 매진하고 있으니 좋은 결과로 찾아올
                  것이라 기대합니다.&rdquo;
                </p>
              </div>

              <p className="text-right text-text-muted">감사합니다.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
