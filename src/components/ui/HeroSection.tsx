"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/constants";
import { IconPhone } from "@/components/icons";

/**
 * 떨어지는 잎사귀 애니메이션 — 클라이언트 요청
 *
 * 1. 사이즈 버라이어티: 14 ~ 64px
 * 2. 색상은 흰색 X → 투명 / 살짝 푸른 톤. SVG 그라디언트 + 잎맥(라인) 디테일
 * 3. 속도 3단 레이어:
 *    - fast: 작거나 중간 사이즈 일부, 4 ~ 7초     (앞쪽 레이어, 살짝 큼직)
 *    - mid : 중간 8 ~ 12초                        (메인 레이어)
 *    - slow: 13 ~ 20초                             (뒤쪽 레이어, 작은 잎)
 * 4. 입체감: opacity / blur / scale을 레이어별로 다르게 → 원근감
 */

type Speed = "fast" | "mid" | "slow";

interface Leaf {
  id: number;
  left: number;
  size: number;
  speed: Speed;
  delay: number;
  duration: number;
  rotateStart: number;
  rotateEnd: number;
  opacity: number;
  blur: number;
  hue: "deep" | "mid" | "light";
  swayPhase: number;
  flipX: boolean;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeLeaves(count = 36): Leaf[] {
  const out: Leaf[] = [];
  for (let i = 0; i < count; i++) {
    // 속도 분배: fast 30%, mid 45%, slow 25% — 우수수 떨어지는 느낌
    const r = Math.random();
    let speed: Speed;
    if (r < 0.3) speed = "fast";
    else if (r < 0.75) speed = "mid";
    else speed = "slow";

    let size: number;
    let duration: number;
    let opacity: number;
    let blur: number;
    if (speed === "fast") {
      // 큰건 빨리 떨어지게
      size = rand(36, 64);
      duration = rand(4.5, 7);
      opacity = rand(0.55, 0.85);
      blur = 0;
    } else if (speed === "mid") {
      size = rand(22, 38);
      duration = rand(8, 12);
      opacity = rand(0.35, 0.6);
      blur = 0.4;
    } else {
      // 작은건 천천히 떨어지게
      size = rand(12, 22);
      duration = rand(13, 20);
      opacity = rand(0.18, 0.35);
      blur = 1.2;
    }

    out.push({
      id: i,
      left: rand(-2, 100), // -2 ~ 100% (살짝 좌우 밖에서도 시작)
      size,
      speed,
      delay: rand(-duration, 0), // 음수 delay → 페이지 로드 시 이미 진행 중
      duration,
      rotateStart: rand(-180, 180),
      rotateEnd: rand(-180, 180) + (Math.random() < 0.5 ? -360 : 360),
      opacity,
      blur,
      hue: pick<Leaf["hue"]>(["deep", "mid", "light"]),
      swayPhase: rand(0, 4),
      flipX: Math.random() < 0.5,
    });
  }
  return out;
}

/**
 * 디테일한 잎사귀 SVG. 잎맥(중앙맥 + 측맥) 포함, 그라디언트로 입체감.
 * 색상은 푸른 톤 + 살짝 투명. fill / stroke 모두 currentColor 기반이지만
 * 실제 컬러는 props 그라디언트로 제어.
 */
function DetailedLeaf({
  size,
  hue,
  flipX,
  uid,
}: {
  size: number;
  hue: Leaf["hue"];
  flipX: boolean;
  uid: number;
}) {
  // 푸른나무 톤 ‒ 잎의 위→아래 그라디언트
  const colors: Record<Leaf["hue"], { top: string; bot: string; vein: string }> = {
    deep: { top: "rgba(200, 230, 201, 0.9)", bot: "rgba(74, 124, 46, 0.55)", vein: "rgba(45, 80, 22, 0.5)" },
    mid: { top: "rgba(220, 240, 215, 0.85)", bot: "rgba(110, 160, 80, 0.5)", vein: "rgba(60, 100, 35, 0.45)" },
    light: { top: "rgba(240, 250, 235, 0.9)", bot: "rgba(170, 210, 140, 0.45)", vein: "rgba(100, 140, 70, 0.4)" },
  };
  const c = colors[hue];
  const gradId = `leafGrad-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ transform: flipX ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={c.top} />
          <stop offset="100%" stopColor={c.bot} />
        </linearGradient>
      </defs>

      {/* 잎 본체 */}
      <path
        d="M32 4
           C 18 8, 8 22, 6 38
           C 5 48, 12 56, 22 58
           C 30 59, 38 56, 46 49
           C 55 41, 60 28, 58 14
           C 52 8, 42 4, 32 4 Z"
        fill={`url(#${gradId})`}
        stroke={c.vein}
        strokeWidth="0.6"
        strokeOpacity="0.7"
      />

      {/* 중앙맥 */}
      <path
        d="M32 5 C 30 18, 26 32, 22 46 C 20 52, 22 56, 24 58"
        fill="none"
        stroke={c.vein}
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* 측맥들 */}
      <g stroke={c.vein} strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M30 14 C 24 14, 18 18, 14 24" />
        <path d="M28 22 C 22 22, 16 26, 12 32" />
        <path d="M26 30 C 20 30, 14 34, 11 40" />
        <path d="M24 38 C 18 39, 14 42, 12 46" />
        <path d="M30 14 C 36 14, 42 16, 48 18" />
        <path d="M28 22 C 36 22, 44 24, 50 27" />
        <path d="M26 30 C 34 31, 42 33, 50 36" />
        <path d="M24 38 C 32 39, 40 41, 46 44" />
      </g>
    </svg>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  // 고정 시드 없이 클라이언트에서 한번만 만들고 메모이제이션
  const leaves = useMemo(() => (typeof window === "undefined" ? [] : makeLeaves(44)), []);

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
        <div className="absolute top-0 right-[20%] w-[350px] h-[350px] bg-[#8BC34A]/[0.04] rounded-full blur-[90px]" />
      </div>

      {/* ── 떨어지는 잎사귀 (3단 속도 레이어) ── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {leaves.map((leaf) => (
            <span
              key={leaf.id}
              className={`hero-leaf-fall hero-leaf-${leaf.speed}`}
              style={{
                left: `${leaf.left}%`,
                top: `-${leaf.size + 20}px`,
                animationDelay: `${leaf.delay}s`,
                animationDuration: `${leaf.duration}s`,
                opacity: leaf.opacity,
                filter: leaf.blur ? `blur(${leaf.blur}px)` : undefined,
                ["--rot-start" as string]: `${leaf.rotateStart}deg`,
                ["--rot-end" as string]: `${leaf.rotateEnd}deg`,
                ["--sway-phase" as string]: `${leaf.swayPhase}s`,
              }}
            >
              <DetailedLeaf size={leaf.size} hue={leaf.hue} flipX={leaf.flipX} uid={leaf.id} />
            </span>
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
              className="transition-all duration-1000 ease-out"
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
              className="transition-all duration-1000 ease-out"
              style={{ transitionDelay: "600ms", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(2rem)" }}
            >
              {/* 클라이언트 요청: 히어로에선 전화 버튼만 노출. (온라인문의는 상단 GNB / 하단 섹션에 유지) */}
              <div className="flex justify-center">
                <a
                  href={`tel:${SITE.phone}`}
                  className="bg-white/95 text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 text-sm hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2.5"
                >
                  <IconPhone size={16} />
                  {SITE.phone}
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
