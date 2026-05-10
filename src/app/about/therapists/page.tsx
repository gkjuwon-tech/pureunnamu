import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import prisma from "@/lib/prisma";
import { IconLeaf } from "@/components/icons";

export const metadata: Metadata = {
  title: "치료사 소개",
  description: "푸른나무 심리센터 치료사 소개. 공신력 있는 학회의 자격을 갖춘 경험 있는 전문 인력 안내.",
  alternates: { canonical: "/about/therapists" },
};

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "치료사 소개", href: "/about/therapists" },
  { label: "찾아오시는길", href: "/about/directions" },
];

export const dynamic = "force-dynamic";

export default async function TherapistsPage() {
  const therapists = await prisma.therapist.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <PageBanner title="치료사 소개" breadcrumb={["센터소개", "치료사 소개"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-12 mb-8 text-center">
            <div className="text-primary/30 mb-4 inline-flex">
              <IconLeaf size={36} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-primary heading-serif leading-relaxed mb-3">
              공신력 있는 학회의 자격을 갖춘 <br className="hidden sm:inline" />
              경험 있는 전문 인력으로 구성되어 있습니다.
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
              심리학 및 관련학과 전공자들로 구성된 치료사 / 검사 전문가들이 신뢰할 수 있는 임상 경험을 바탕으로
              상담을 진행합니다.
            </p>
          </div>
        </AnimatedSection>

        {therapists.length === 0 ? (
          <AnimatedSection delay={100}>
            <div className="paper-card rounded-3xl p-10 text-center text-text-muted text-sm">
              치료사 소개 자료는 추후 업데이트 예정입니다.
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {therapists.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 80}>
                <div className="paper-card rounded-3xl p-7 md:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <h3 className="text-lg font-bold text-primary heading-serif">{t.name}</h3>
                    {t.title && <span className="text-xs text-primary/60 mt-1.5">{t.title}</span>}
                  </div>
                  {t.bio && (
                    <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">{t.bio}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
