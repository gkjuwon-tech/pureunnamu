import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconLeaf } from "@/components/icons";

export const metadata: Metadata = {
  title: "센터장 소개",
  description:
    "청주 푸른나무 심리센터 센터장 조미애 소개 - 충북대 심리학 석사, 홍익대 미대 졸업, 이탈리아 카라라 국립미술아카데미 졸업. 발달심리사, 임상미술심리상담사. 2008년부터 연 평균 1500시간 이상 심리상담.",
  alternates: { canonical: "/about/director" },
  openGraph: {
    title: "센터장 소개 | 푸른나무 심리센터",
    description: "푸른나무 심리센터 센터장 조미애 프로필 - 전문 심리상담사 소개",
    url: "/about/director",
  },
};

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "찾아오시는길", href: "/about/directions" },
];

const education = [
  { year: "2008년 2월", detail: "충북대학교 일반대학원 심리학과 졸업 (석사학위 취득)" },
  { year: "1996년 6월", detail: "이탈리아 카라라 국립미술아카데미 조각과 졸업" },
  { year: "1984년 2월", detail: "홍익대학교 미술대학 조소과 졸업" },
];

const qualifications = [
  "한국심리학회 정회원 / 발달심리사 2급",
  "한국미술치료학회 정회원 / 임상미술심리상담사 1급",
  "학교 폭력 예방교육 / 치료 전문가",
];

const clinicalTraining = [
  "충북대병원 정신건강의학과 외래 임상심리실 심리평가 수련",
  "충북대병원 정신건강의학과 병동 집단미술심리치료 실시",
  "충북아동보호전문기관 피해아동 심리평가 및 미술치료",
];

export default function DirectorPage() {
  return (
    <div>
      <PageBanner title="센터장소개" breadcrumb={["센터소개", "센터장소개"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        {/* 두 센터장 소개 – 좌우 2열 */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 좌측: 푸른나무심리센터장 */}
            <div className="paper-card rounded-3xl p-8 md:p-10 text-center">
              <div className="text-primary/30 mb-4"><IconLeaf size={40} /></div>
              <h2 className="text-2xl font-bold text-primary heading-serif mb-1">조미애</h2>
              <p className="text-primary/60 text-sm tracking-wide mb-5">푸른나무심리센터장</p>
              <div className="bg-primary/[0.03] rounded-2xl p-5 border border-primary/[0.06]">
                <p className="text-primary font-medium text-[14px] leading-relaxed">
                  2008년부터 현재까지 한해 평균 1,500시간 이상의 심리상담 실시
                </p>
              </div>
            </div>

            {/* 우측: 부설 푸른숲마음발달센터 */}
            <div className="paper-card rounded-3xl p-8 md:p-10 text-center">
              <div className="text-primary/30 mb-4"><IconLeaf size={40} /></div>
              <h2 className="text-xl font-bold text-primary heading-serif mb-1">부설: 푸른숲마음발달센터</h2>
              <p className="text-primary/60 text-sm tracking-wide mb-5">메디플러스빌딩 6층</p>
              <div className="bg-primary/[0.03] rounded-2xl p-5 border border-primary/[0.06] space-y-2">
                <p className="text-text-muted text-[14px] leading-relaxed">
                  사회성향상 집단상담 · 그룹치료 전문
                </p>
                <p className="text-text-muted text-[14px] leading-relaxed">
                  인지학습치료 · 느린학습자 상담
                </p>
                <p className="text-text-muted text-[14px] leading-relaxed">
                  석사 이상 심리상담 전문가 주 진행
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 학력 */}
        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <h3 className="text-xl font-bold text-primary mb-6 heading-serif">학력</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.year} className="flex gap-4 items-start">
                  <span className="text-primary/70 font-semibold text-sm whitespace-nowrap min-w-[100px]">{edu.year}</span>
                  <p className="text-text-muted text-sm leading-relaxed">{edu.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 자격 */}
        <AnimatedSection delay={200}>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <h3 className="text-xl font-bold text-primary mb-6 heading-serif">자격</h3>
            <div className="space-y-3">
              {qualifications.map((q) => (
                <div key={q} className="flex gap-3 items-start">
                  <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
                  <p className="text-text-muted text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 임상수련 */}
        <AnimatedSection delay={300}>
          <div className="paper-card rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-bold text-primary mb-6 heading-serif">임상수련</h3>
            <div className="space-y-3">
              {clinicalTraining.map((t) => (
                <div key={t} className="flex gap-3 items-start">
                  <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
                  <p className="text-text-muted text-sm leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
