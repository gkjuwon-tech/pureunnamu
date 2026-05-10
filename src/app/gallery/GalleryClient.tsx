"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const categories = [
  { key: "all", label: "전체" },
  { key: "facility", label: "센터 시설" },
  { key: "therapy", label: "심리치료 장면" },
  { key: "assessment", label: "심리검사" },
  { key: "activity", label: "외부강의 · 활동" },
];

export interface GalleryPhoto {
  src: string;
  title: string;
  desc: string;
  category: string;
}

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

export default function GalleryClient({ photos }: { photos: GalleryPhoto[] }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const validTabs = categories.map((c) => c.key);
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useScrollReveal(activeTab);

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

  const filtered =
    activeTab === "all" ? photos : photos.filter((p) => p.category === activeTab);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(
    () =>
      setLightbox((prev) =>
        prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
      ),
    [filtered.length]
  );
  const goNext = useCallback(
    () => setLightbox((prev) => (prev !== null ? (prev + 1) % filtered.length : null)),
    [filtered.length]
  );

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
    <div className="max-w-6xl mx-auto px-4 py-14">
      <p className="text-center text-text-muted mb-10 max-w-xl mx-auto leading-relaxed text-[15px]">
        푸른나무 심리센터의 따뜻한 공간과 치유의 순간들을 담았습니다
      </p>

      {/* 탭 */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => {
          const count =
            cat.key === "all" ? photos.length : photos.filter((p) => p.category === cat.key).length;
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

      {/* ── 깔끔한 균일 그리드 ── */}
      {filtered.length === 0 ? (
        <p className="text-center text-text-muted py-16">등록된 사진이 없습니다.</p>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {filtered.map((photo, i) => (
            <button
              key={photo.src + i}
              data-reveal
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s`,
              }}
              onClick={() => openLightbox(i)}
              className="relative aspect-square rounded-2xl overflow-hidden group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 bg-primary/[0.04]"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="text-white text-sm font-medium drop-shadow-lg line-clamp-1">
                  {photo.title}
                </p>
                {photo.desc && (
                  <p className="text-white/75 text-xs mt-0.5 line-clamp-2 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.desc}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <span className="inline-flex items-center gap-2 text-xs text-text-muted bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/[0.06]">
          총 {filtered.length}장의 사진
        </span>
      </div>

      {/* 라이트박스 */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center animate-gallery-lb-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all z-10"
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
            aria-label="이전"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
            aria-label="다음"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 max-w-md">
            <p className="text-white font-semibold text-base mb-1">{filtered[lightbox].title}</p>
            {filtered[lightbox].desc && <p className="text-white/60 text-sm">{filtered[lightbox].desc}</p>}
            <span className="text-white/40 text-xs mt-2 block">{lightbox + 1} / {filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
