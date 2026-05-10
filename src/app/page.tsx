import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroSection from "@/components/ui/HeroSection";
import { SITE } from "@/lib/constants";
import { IconTree, IconHeart, IconMail, IconClipboard, IconCamera, IconMapPin, IconChild, IconTeen, IconAdult, IconFamily, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "푸른나무 심리센터 | 청주 심리상담·심리치료 전문기관",
  description:
    "청주 푸른나무 심리센터 - 아동·청소년·성인·가족 심리치료 전문. 놀이치료, 미술치료, 음악치료, 모래놀이치료, 심리검사(ADHD, 지능검사, 성격검사) 전문기관. 2010년 개소, 연평균 1500시간 이상 임상경험. 100% 예약제. 043-288-4040",
  alternates: { canonical: "/" },
  openGraph: {
    title: "푸른나무 심리센터 | 청주 심리상담·심리치료 전문기관",
    description:
      "청주 푸른나무 심리센터 - 아동·청소년·성인·가족 심리치료 전문. 2010년 개소, 100% 예약제. 043-288-4040",
    url: "/",
  },
};

const quickLinks = [
  {
    title: "센터 소개",
    desc: "따뜻한 공감과 전문성으로\n당신의 행복을 돕겠습니다.",
    href: "/about",
    icon: "tree",
  },
  {
    title: "프로그램 안내",
    desc: "전문가와 함께하는 체계적인\n맞춤형 치유 과정입니다.",
    href: "/programs/therapy",
    icon: "heart",
  },
  {
    title: "상담 문의",
    desc: "궁금하신 점이나 상담 예약 등\n무엇이든 편하게 남겨주세요.",
    href: "/contact",
    icon: "mail",
  },
  {
    title: "공지사항",
    desc: "푸른나무심리센터의\n최신 소식과 주요 일정을 전해드립니다.",
    href: "/community/notices",
    icon: "clipboard",
  },
  {
    title: "대내외 활동",
    desc: "지역사회와 함께하는\n센터의 다양한 발자취를 소개합니다.",
    href: "/gallery?tab=activities",
    icon: "camera",
  },
  {
    title: "오시는 길",
    desc: "편안한 방문이 되실 수 있도록\n상세한 위치를 안내해 드립니다.",
    href: "/about/directions",
    icon: "mappin",
  },
];

const targets = [
  { label: "아동", desc: "분리불안, 틱장애, ADHD 등", icon: "child" },
  { label: "청소년", desc: "학교부적응, 우울, 따돌림 등", icon: "teen" },
  { label: "성인", desc: "우울증, 강박증, 사회공포 등", icon: "adult" },
  { label: "가족", desc: "가족갈등, 부부상담 등", icon: "family" },
];

export default function Home() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 슬로건 섹션 */}
      <section className="py-24 md:py-32 text-center relative overflow-hidden">
        {/* 장식 요소 */}
        <div className="absolute top-12 left-[5%] w-[300px] h-[300px] bg-primary/[0.02] rounded-full blur-[80px]" />
        <div className="absolute bottom-8 right-[8%] w-[200px] h-[200px] bg-primary/[0.03] rounded-full blur-[60px]" />
        <svg className="absolute top-20 right-[15%] text-primary/[0.06] rotate-[25deg] leaf-drift" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
        </svg>
        <svg className="absolute bottom-16 left-[12%] text-primary/[0.05] -rotate-[40deg] leaf-drift-reverse" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
        </svg>
        <AnimatedSection>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-5 heading-serif leading-snug">
            {SITE.slogan}
          </h2>
          <p className="text-text-muted max-w-md mx-auto px-4 text-sm leading-relaxed mb-12">
            {SITE.subSlogan}
          </p>

          {/* ── 부설 센터 안내 (클라이언트 요청: 슬로건과 동일한 글자 크기) ── */}
          <div className="max-w-3xl mx-auto px-4">
            <div className="inline-block">
              <span className="block text-xs tracking-[0.25em] text-primary/40 uppercase mb-4">
                Affiliated Center
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-primary heading-serif leading-snug">
              부설 푸른숲마음발달센터 운영중
              <span className="block mt-3 text-xl md:text-2xl text-primary/80">
                : 사회성 그룹 치료, 인지 학습 치료 전문
              </span>
            </h2>
          </div>
        </AnimatedSection>
      </section>

      {/* 대상별 안내 */}
      <section className="max-w-5xl mx-auto px-4 pb-24 relative">
        {/* 우측 장식 잎 */}
        <svg className="absolute -top-4 right-8 text-primary/[0.04] rotate-[50deg]" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
        </svg>
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-primary/50 uppercase mb-3">Who We Help</p>
            <h3 className="text-2xl font-bold text-primary heading-serif">
              심리치료의 대상
            </h3>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {targets.map((target, i) => (
            <AnimatedSection key={target.label} delay={i * 100}>
              <Link href="/programs/targets" className="block">
                <div className="paper-card rounded-3xl p-7 text-center group cursor-pointer">
                  <div className="mb-4 flex justify-center text-primary/50 group-hover:text-primary/70 transition-colors group-hover:scale-105 transition-transform duration-500">
                    {target.icon === "child" && <IconChild size={36} />}
                    {target.icon === "teen" && <IconTeen size={36} />}
                    {target.icon === "adult" && <IconAdult size={36} />}
                    {target.icon === "family" && <IconFamily size={36} />}
                  </div>
                  <h4 className="font-semibold text-primary text-base mb-1.5">{target.label}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{target.desc}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 퀵 링크 카드 */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickLinks.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80}>
              <Link href={item.href} className="block">
                <div className="paper-card rounded-3xl p-7 group h-full">
                  <span className="block mb-4 text-primary/40 group-hover:text-primary/60 transition-colors">
                    {item.icon === "tree" && <IconTree size={28} />}
                    {item.icon === "heart" && <IconHeart size={28} />}
                    {item.icon === "mail" && <IconMail size={28} />}
                    {item.icon === "clipboard" && <IconClipboard size={28} />}
                    {item.icon === "camera" && <IconCamera size={28} />}
                    {item.icon === "mappin" && <IconMapPin size={28} />}
                  </span>
                  <h4 className="font-semibold text-primary text-sm mb-2 whitespace-pre-line group-hover:text-primary-light transition-colors leading-relaxed">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 섹션 구분 장식 */}
      <div className="flex justify-center pb-16">
        <div className="flex items-center gap-4 text-primary/10">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/15" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary/[0.12]">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/15" />
        </div>
      </div>

      {/* 이용안내 배너 */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <AnimatedSection>
          <div className="green-gradient rounded-[2rem] p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/[0.04] rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/[0.03] rounded-full blur-[40px]" />
            </div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-5 heading-serif">이용안내</h3>
              <p className="text-white/50 mb-8 text-sm font-light">
                언제나 친절한 상담을 해드립니다. 전화예약 필수입니다.
              </p>
              <div className="flex justify-center mb-8">
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-3xl md:text-4xl font-bold hover:text-soft-green/80 transition-colors flex items-center gap-3 heading-serif"
                >
                  <IconPhone size={28} /> {SITE.phone}
                </a>
              </div>
              <div className="text-xs text-white/40 space-y-1.5 tracking-wide">
                <p>평일: {SITE.hours.weekday}</p>
                <p>토요일: {SITE.hours.saturday}</p>
                <p>{SITE.hours.holiday}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
