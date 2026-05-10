import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "센터장 소개",
  description:
    "푸른나무 심리센터 센터장 조미애 / 부설 푸른숲마음발달센터장 소개. 학력, 자격, 임상수련 정보 제공.",
  alternates: { canonical: "/about/director" },
  openGraph: {
    title: "센터장 소개 | 푸른나무 심리센터",
    description: "푸른나무심리센터장 조미애 / 부설 푸른숲마음발달센터장 프로필",
    url: "/about/director",
  },
};

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "치료사 소개", href: "/about/therapists" },
  { label: "찾아오시는길", href: "/about/directions" },
];

interface DirectorProfile {
  name: string;
  role: string;
  subtitle: string;
  photo?: string; // /public/director/<name>.jpg 경로 (자료 제공 시 등록)
  highlight: string;
  education: { year: string; detail: string }[];
  career: string[]; // 자격 + 임상수련 + 경력 통합
}

const main: DirectorProfile = {
  name: "조미애",
  role: "푸른나무 심리센터장",
  subtitle: "임상미술심리상담사 1급 / 발달심리사 2급",
  // photo: "/director/cho-mie.jpg", // 자료 제공 시 추가
  highlight: "2008년부터 현재까지 한해 평균 1,500시간 이상의 심리상담 실시",
  education: [
    { year: "2008. 02", detail: "충북대학교 일반대학원 심리학과 졸업 (석사)" },
    { year: "1996. 06", detail: "이탈리아 카라라 국립미술아카데미 조각과 졸업" },
    { year: "1984. 02", detail: "홍익대학교 미술대학 조소과 졸업" },
  ],
  career: [
    "한국심리학회 정회원 / 발달심리사 2급",
    "한국미술치료학회 정회원 / 임상미술심리상담사 1급",
    "학교 폭력 예방교육 / 치료 전문가",
    "충북대병원 정신건강의학과 외래 임상심리실 심리평가 수련",
    "충북대병원 정신건강의학과 병동 집단미술심리치료 실시",
    "충북아동보호전문기관 피해아동 심리평가 및 미술치료",
  ],
};

const sub: DirectorProfile = {
  name: "푸른숲마음발달센터",
  role: "부설 센터장",
  subtitle: "사회성 그룹치료 · 인지학습치료 전문",
  // photo: "/director/sub-director.jpg",
  highlight: "사회성 그룹 치료, 인지 학습 치료, 느린학습자 상담 전문",
  education: [
    // 자료 제공 시 채워짐
    { year: "추후 자료 제공", detail: "—" },
  ],
  career: [
    "사회성 향상 집단상담 진행",
    "인지학습치료 · 느린학습자 상담",
    "석사 이상 심리상담 전문가 주 진행",
  ],
};

function DirectorCard({ p, accent = false }: { p: DirectorProfile; accent?: boolean }) {
  return (
    <div className={`paper-card rounded-3xl p-7 md:p-9 text-center ${accent ? "ring-1 ring-primary/15" : ""}`}>
      <div className="mx-auto mb-5 relative w-32 h-32 rounded-full overflow-hidden bg-primary/[0.06] border border-primary/10">
        {p.photo ? (
          <Image src={p.photo} alt={`${p.name} 사진`} fill className="object-cover" sizes="128px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-xs">
            사진 자료
            <br />
            업로드 예정
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-primary heading-serif">{p.name}</h2>
      <p className="text-primary/60 text-sm mt-1">{p.role}</p>
      <p className="text-primary/40 text-xs mt-1">{p.subtitle}</p>

      <div className="mt-5 bg-primary/[0.03] rounded-2xl p-4 border border-primary/[0.06]">
        <p className="text-primary text-sm leading-relaxed">{p.highlight}</p>
      </div>
    </div>
  );
}

function ColumnSection({ title, items }: { title: string; items: React.ReactNode[] }) {
  return (
    <div>
      <h3 className="text-base font-bold text-primary mb-4 heading-serif flex items-center gap-2">
        <span className="w-1 h-4 bg-primary/40 rounded-full" /> {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-text-muted leading-relaxed flex gap-2">
            <span className="text-primary/50 shrink-0">·</span>
            <span className="min-w-0">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DirectorPage() {
  return (
    <div>
      <PageBanner title="센터장소개" breadcrumb={["센터소개", "센터장소개"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        {/* 클라이언트 요청: 두 센터장을 좌우 2단으로 배치 */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <DirectorCard p={main} accent />
            <DirectorCard p={sub} />
          </div>
        </AnimatedSection>

        {/* 클라이언트 요청: 학력 / 약력도 좌우로 토막 */}
        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-7 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <ColumnSection
                title={`${main.name} · 학력`}
                items={main.education.map((e) => (
                  <span key={e.year}>
                    <span className="font-semibold text-primary/70 mr-2">{e.year}</span>
                    {e.detail}
                  </span>
                ))}
              />
              <ColumnSection
                title={`${main.name} · 자격 / 임상`}
                items={main.career.map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              />
            </div>

            <div className="mt-12 pt-10 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <ColumnSection
                title={`부설 ${sub.name} · 학력`}
                items={sub.education.map((e) => (
                  <span key={e.year}>
                    <span className="font-semibold text-primary/70 mr-2">{e.year}</span>
                    {e.detail}
                  </span>
                ))}
              />
              <ColumnSection
                title={`부설 ${sub.name} · 운영 분야`}
                items={sub.career.map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
