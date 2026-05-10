"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";

/* ─── 카테고리 ─── */
const categories = [
  { key: "all", label: "전체" },
  { key: "facility", label: "센터 시설" },
  { key: "therapy", label: "심리치료 장면" },
  { key: "assessment", label: "심리검사" },
  { key: "activity", label: "외부강의 · 활동" },
];

/* ─── 사진 데이터 ─── */
interface GalleryPhoto {
  src: string;
  title: string;
  desc: string;
  category: string;
  span?: "tall" | "wide" | "large"; // masonry hint
}

const photos: GalleryPhoto[] = [
  // ── 센터 시설 ──
  { src: "/gallery/waiting-room-1.jpg", title: "대기실전경A", desc: "대형창을 통해보는 시원한 풍경", category: "facility", span: "wide" },
  { src: "/gallery/waiting-room-2.jpg", title: "대기실전경B", desc: "따뜻한 조명아래 편안하게 대기하실수 있는 공간", category: "facility" },
  { src: "/gallery/waiting-room-3.jpg", title: "대기실 서가", desc: "심리 관련 도서와 자료가 비치된 대기 공간", category: "facility" },
  { src: "/gallery/art-therapy-room.jpg", title: "미술치료실", desc: "다양한 미술 재료와 작품이 가득한 치료 공간", category: "facility", span: "tall" },
  { src: "/gallery/sandplay-room.jpg", title: "모래놀이치료실", desc: "모래상자와 수백 가지 피규어가 준비된 전용 치료실", category: "facility", span: "wide" },

  // ── 심리치료 장면 ──
  { src: "/gallery/family-therapy-1.jpg", title: "가족치료 장면", desc: "가족 구성원이 함께 참여하여 관계를 회복하는 시간", category: "therapy", span: "large" },
  { src: "/gallery/sandplay-1.jpg", title: "모래놀이치료", desc: "모래 위에 자신만의 세계를 만들며 내면을 표현합니다", category: "therapy", span: "tall" },
  { src: "/gallery/art-therapy-session.jpg", title: "미술치료 진행", desc: "그림과 조형 활동으로 감정을 표현하고 치유하는 과정", category: "therapy", span: "wide" },
  { src: "/gallery/art-therapy-work-1.jpg", title: "미술치료 작품 A", desc: "내담자의 내면이 담긴 미술치료 작품", category: "therapy" },
  { src: "/gallery/art-therapy-work-2.jpg", title: "미술치료 작품 B", desc: "색채와 형태로 표현된 심리적 이야기", category: "therapy" },
  { src: "/gallery/adult-counseling-2.jpg", title: "상담 환경", desc: "차분한 분위기 속에서 진행되는 개인상담", category: "therapy" },
  { src: "/gallery/adult-counseling-3.jpg", title: "상담소품", desc: "내담자의 마음을 편안하게 열어주는 센터소품들", category: "therapy", span: "tall" },

  // ── 심리검사 ──
  { src: "/gallery/assessment-3.jpg", title: "종합심리검사", desc: "지능, 성격, 정서 등 다양한 영역을 종합적으로 평가", category: "assessment", span: "wide" },
  { src: "/gallery/assessment-4.jpg", title: "검사 도구", desc: "전문 심리검사 도구와 매뉴얼", category: "assessment" },

  // ── 외부강의 · 활동 ──
  { src: "/gallery/lecture-1.jpg", title: "외부강의", desc: "유아교육기관학부모교육", category: "activity", span: "large" },
  { src: "/gallery/lecture-2.jpg", title: "교육기관 강의", desc: "교사·상담사 대상 전문 역량 강화 연수", category: "activity", span: "wide" },
  { src: "/gallery/lecture-parents.jpg", title: "학부모 교육", desc: "자녀의 마음을 이해하기 위한 학부모 심리 교육", category: "activity", span: "tall" },
];

/* ─── 스크롤 페이드인 훅 ─── */
function useScrollReveal(key?: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const items = el.querySelectorAll("[data-reveal]");
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [key]);
  return ref;
}

/* ─── 메이슨리 span → CSS class 매핑 ─── */
function spanClass(span?: string) {
  switch (span) {
    case "large": return "sm:col-span-2 sm:row-span-2";
    case "wide":  return "sm:col-span-2";
    case "tall":  return "sm:row-span-2";
    default:      return "";
  }
}

export default function GalleryPage() {
  return (
    <Suspense>
      <GalleryContent />
    </Suspense>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = categories.map((c) => c.key);
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useScrollReveal(activeTab);

  useEffect(() => {
    const tabs = categories.map((c) => c.key);
    if (tabParam && tabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const filtered =
    activeTab === "all"
      ? photos
      : photos.filter((p) => p.category === activeTab);

  /* ─── featured hero (전체 탭일 때만) ─── */
  const hero = activeTab === "all" ? filtered[0] : null;
  const gridPhotos = activeTab === "all" ? filtered.slice(1) : filtered;

  const openLightbox = useCallback((index: number) => {
    setLightbox(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [lightbox, closeLightbox, goPrev, goNext]);

  return (
    <div>
      <PageBanner title="갤러리" breadcrumb={["갤러리"]} />

      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* 인트로 문구 */}
        <p className="text-center text-text-muted mb-10 max-w-xl mx-auto leading-relaxed text-[15px]">
          푸른나무 심리센터의 따뜻한 공간과 치유의 순간들을 담았습니다
        </p>

        {/* 탭 네비게이션 */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? photos.length
                : photos.filter((p) => p.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat.key
                    ? "bg-primary/90 text-white shadow-md shadow-primary/20"
                    : "bg-white/60 backdrop-blur-sm text-text-muted hover:bg-white/80 border border-primary/[0.08] hover:border-primary/20"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* 히어로 피처 이미지 (전체 탭) */}
        {hero && (
          <button
            onClick={() => openLightbox(0)}
            className="w-full mb-8 rounded-3xl overflow-hidden relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <div className="aspect-[21/9] relative overflow-hidden">
              <Image
                src={hero.src}
                alt={hero.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
              />
              {/* 그래디언트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              {/* 텍스트 */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-2 block">Featured</span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{hero.title}</h2>
                <p className="text-white/80 text-sm sm:text-base max-w-lg">{hero.desc}</p>
              </div>
            </div>
          </button>
        )}

        {/* 메이슨리 그리드 */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[220px] lg:auto-rows-[240px]"
        >
          {gridPhotos.map((photo, i) => {
            const globalIndex = activeTab === "all" ? i + 1 : i;
            return (
              <button
                key={photo.src}
                data-reveal
                style={{
                  opacity: 0,
                  transform: "translateY(32px)",
                  transition: `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`,
                }}
                onClick={() => openLightbox(globalIndex)}
                className={`relative rounded-2xl overflow-hidden group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${spanClass(photo.span)}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* 기본 하단 그래디언트 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* 호버 시 텍스트 오버레이 */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">{photo.title}</p>
                  <p className="text-white/75 text-xs mt-0.5 line-clamp-2 drop-shadow">{photo.desc}</p>
                </div>
                {/* 살짝 보이는 타이틀 (hover 전) */}
                <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-white/90 text-xs font-medium drop-shadow">{photo.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 하단 사진 개수 표시 */}
        <div className="text-center mt-10">
          <span className="inline-flex items-center gap-2 text-xs text-text-muted bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/[0.06]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            총 {filtered.length}장의 사진
          </span>
        </div>
      </div>

      {/* ─── 라이트박스 ─── */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center animate-gallery-lb-in"
          onClick={closeLightbox}
        >
          {/* 닫기 */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all z-10"
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* 이전 */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
            aria-label="이전"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 다음 */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
            aria-label="다음"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* 이미지 */}
          <div
            className="relative max-w-[90vw] max-h-[82vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* 캡션 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 max-w-md">
            <p className="text-white font-semibold text-base mb-1">{filtered[lightbox].title}</p>
            <p className="text-white/60 text-sm">{filtered[lightbox].desc}</p>
            <span className="text-white/40 text-xs mt-2 block">{lightbox + 1} / {filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
