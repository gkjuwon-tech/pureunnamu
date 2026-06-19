import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "센터장 소개",
  description:
    "푸른나무 심리센터장 조미애 / 부설 푸른숲마음발달센터장 김미 소개. 학력, 자격, 임상수련 정보 제공.",
  alternates: { canonical: "/about/director" },
  openGraph: {
    title: "센터장 소개 | 푸른나무 심리센터",
    description: "푸른나무심리센터장 조미애 / 부설 푸른숲마음발달센터장 김미 프로필",
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

interface ProfileSection {
  title: string;
  items: string[];
}

interface DirectorProfile {
  name: string;
  role: string;
  subtitle: string;
  photo?: string; // /public/director/<name>.jpg 경로 (자료 제공 시 등록)
  highlight: string;
  education: { year?: string; detail: string }[];
  sections: ProfileSection[];
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
  sections: [
    {
      title: "자격 / 임상수련",
      items: [
        "한국심리학회 정회원 / 발달심리사 2급",
        "한국미술치료학회 정회원 / 임상미술심리상담사 1급",
        "학교 폭력 예방교육 / 치료 전문가",
        "충북대병원 정신건강의학과 외래 임상심리실 심리평가 수련",
        "충북대병원 정신건강의학과 병동 집단미술심리치료 실시",
        "충북아동보호전문기관 피해아동 심리평가 및 미술치료",
      ],
    },
  ],
};

const sub: DirectorProfile = {
  name: "김미",
  role: "현 / 부설 푸른숲마음발달센터장",
  subtitle: "한국상담심리학회 · 임상경력 8년",
  // photo: "/director/kim-mi.jpg",
  highlight: "아동·청소년·가족 상담 및 사회성그룹·미술놀이치료 전문 / 임상경력 8년",
  education: [
    { detail: "나사렛대학교 심리재활학과 학사 졸업" },
    { detail: "한양대학교 상담심리대학원 상담심리전공 석사 졸업" },
    { detail: "차의과학대학교 일반대학원 의학과 임상상담심리전공 박사 재학" },
  ],
  sections: [
    { title: "소속", items: ["한국상담심리학회"] },
    {
      title: "주요경력",
      items: [
        "아동심리치료, 청소년상담, 가족상담, 사회성그룹치료, 미술놀이치료, 양육상담, 부모교육",
      ],
    },
    {
      title: "논문",
      items: ["초기성인의 감각처리민감성과 사회적 지지 수준에 따른 정신건강의 차이"],
    },
  ],
};

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

// 클라이언트 요청: 한 명씩 세로로 쭉 — 좌(조미애) / 우(김미) 한 컬럼에 모든 정보를 위에서 아래로 이음
function ProfileColumn({ p, accent = false }: { p: DirectorProfile; accent?: boolean }) {
  return (
    <div>
      <div className="text-center">
        <div className="mx-auto mb-5 relative w-32 h-32 rounded-full overflow-hidden bg-primary/[0.06] border border-primary/10">
          {p.photo ? (
            <Image src={p.photo} alt={`${p.name} 사진`} fill className="object-cover" sizes="128px" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-xs text-center leading-tight">
              사진 자료
              <br />
              업로드 예정
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-primary heading-serif">{p.name}</h2>
        <p className="text-primary/60 text-sm mt-1">{p.role}</p>
        <p className="text-primary/40 text-xs mt-1">{p.subtitle}</p>
      </div>

      <div
        className={`mt-5 rounded-2xl p-4 border ${
          accent ? "bg-primary/[0.05] border-primary/15" : "bg-primary/[0.03] border-primary/[0.06]"
        }`}
      >
        <p className="text-primary text-sm leading-relaxed text-center">{p.highlight}</p>
      </div>

      <div className="mt-8 space-y-8">
        <ColumnSection
          title="학력"
          items={p.education.map((e, i) => (
            <span key={i}>
              {e.year && <span className="font-semibold text-primary/70 mr-2">{e.year}</span>}
              {e.detail}
            </span>
          ))}
        />
        {p.sections.map((s) => (
          <ColumnSection
            key={s.title}
            title={s.title}
            items={s.items.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          />
        ))}
      </div>
    </div>
  );
}

export default function DirectorPage() {
  return (
    <div>
      <PageBanner title="센터장소개" breadcrumb={["센터소개", "센터장소개"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        {/* 클라이언트 요청: 세로로 토막내지 말고 왼쪽=조미애 한 줄, 오른쪽=김미 한 줄로 구분 */}
        <AnimatedSection>
          <div className="paper-card rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="md:pr-10">
                <ProfileColumn p={main} accent />
              </div>
              <div className="mt-10 pt-10 border-t border-primary/10 md:mt-0 md:pt-0 md:border-t-0 md:border-l md:pl-10">
                <ProfileColumn p={sub} />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
