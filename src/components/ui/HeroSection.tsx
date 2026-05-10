"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { IconPhone } from "@/components/icons";

// 떠다니는 잎사귀 데이터 (텍스트 뒤로 은은하게)
const LEAVES = [
  { id: 1, left: "5%", delay: 0, duration: 18, size: 28, rotate: 45, opacity: 0.08 },
  { id: 2, left: "15%", delay: 3, duration: 22, size: 22, rotate: -30, opacity: 0.06 },
  { id: 3, left: "25%", delay: 7, duration: 20, size: 34, rotate: 60, opacity: 0.07 },
  { id: 4, left: "35%", delay: 2, duration: 24, size: 20, rotate: -45, opacity: 0.05 },
  { id: 5, left: "45%", delay: 5, duration: 19, size: 26, rotate: 30, opacity: 0.06 },
  { id: 6, left: "55%", delay: 8, duration: 21, size: 30, rotate: -60, opacity: 0.07 },
  { id: 7, left: "65%", delay: 1, duration: 23, size: 18, rotate: 15, opacity: 0.05 },
  { id: 8, left: "75%", delay: 6, duration: 17, size: 24, rotate: -20, opacity: 0.07 },
  { id: 9, left: "85%", delay: 10, duration: 25, size: 36, rotate: 75, opacity: 0.06 },
  { id: 10, left: "92%", delay: 4, duration: 20, size: 20, rotate: -50, opacity: 0.05 },
];

function LeafSVG({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
    </svg>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden green-gradient text-white min-h-[600px] md:min-h-[700px]">
      {/* 배경 그라데이션 오브들 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] w-[400px] h-[400px] bg-white/[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-soft-green/[0.05] rounded-full blur-[80px]" />
        {/* 추가: 우측 상단 따뜻한 빛 */}
        <div className="absolute top-0 right-[20%] w-[350px] h-[350px] bg-[#8BC34A]/[0.04] rounded-full blur-[90px]" />
      </div>

      {/* 떠다니는 잎사귀 애니메이션 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {LEAVES.map((leaf) => (
            <div
              key={leaf.id}
              className="absolute text-white hero-leaf"
              style={{
                left: leaf.left,
                opacity: leaf.opacity,
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`,
              }}
            >
              <LeafSVG
                size={leaf.size}
                className={`transform rotate-[${leaf.rotate}deg]`}
              />
            </div>
          ))}
        </div>
      )}

      {/* 하단 곡선 구분선 (한지 텍스쳐 포함) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <defs>
            <pattern id="hanji-wave" patternUnits="userSpaceOnUse" width="250" height="250">
              <rect width="250" height="250" fill="#F7F3EC" />
              <image href="https://www.transparenttextures.com/patterns/rice-paper.png" width="250" height="250" />
            </pattern>
          </defs>
          <path d="M0 80V60C240 20 480 0 720 10C960 20 1200 50 1440 40V80H0Z" fill="url(#hanji-wave)" />
        </svg>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center">
          
          {/* 텍스트 영역 */}
          <div>
            <div
              className={`transition-all duration-1000 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-white/40 text-xs tracking-[0.3em] mb-5 uppercase font-light">
                GreenTree Psychotherapy Center
              </p>
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.25] mb-4 heading-serif">
                <span className="bg-gradient-to-r from-white via-white to-[#a5d6a7] bg-clip-text text-transparent">안녕하세요,</span>
                <br />
                <span className="bg-gradient-to-r from-[#c8e6c9] via-white to-white bg-clip-text text-transparent">푸른나무심리센터입니다</span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 ease-out`}
              style={{ transitionDelay: "400ms", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(2rem)" }}
            >
              <p className="text-base md:text-lg text-white/50 mb-4 max-w-md mx-auto font-light leading-relaxed">
                {SITE.slogan}
              </p>
              <p className="text-sm text-white/30 mb-8 max-w-sm mx-auto leading-relaxed">
                2010년부터 15년간, 연평균 1,500시간 이상의 임상경험으로<br className="hidden sm:inline" />
                당신의 행복한 삶을 도와드리겠습니다.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 ease-out`}
              style={{ transitionDelay: "600ms", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(2rem)" }}
            >
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-white/95 text-primary px-7 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  온라인 상담문의
                </Link>
                <a
                  href={`tel:${SITE.phone}`}
                  className="border border-white/25 text-white/85 px-7 py-3.5 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all text-sm"
                >
                  <span className="flex items-center gap-2"><IconPhone size={15} /> {SITE.phone}</span>
                </a>
              </div>

              {/* 신뢰 뱃지 */}
              <div className="flex items-center gap-4 mt-8 justify-center text-white/25 text-xs">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  100% 예약제
                </span>
                <span className="w-px h-3 bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  전문자격 보유
                </span>
                <span className="w-px h-3 bg-white/15 hidden sm:block" />
                <span className="hidden sm:flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  SINCE 2010
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
