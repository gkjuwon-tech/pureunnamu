"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import MobileNav from "./MobileNav";
import { IconPhone } from "@/components/icons";

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* 상단 연락처 바 */}
      <div className="green-gradient text-white/90 text-xs tracking-wide py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="hidden sm:inline font-light">
            {SITE.hours.weekday} | 토 {SITE.hours.saturday}
          </span>
          <div className="flex gap-5 ml-auto">
            <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors flex items-center gap-1.5">
              <IconPhone size={12} /> {SITE.phone}
            </a>
            <a
              href={SITE.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-white transition-colors"
            >
              블로그
            </a>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="texture-bg bg-white/95 border-b border-primary/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo-full.png"
            alt="푸른나무 심리센터"
            width={1311}
            height={469}
            className="h-12 w-auto drop-shadow-sm group-hover:-translate-y-0.5 transition-transform duration-500"
            priority
          />
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setHoveredMenu(item.label)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                href={item.href}
                className="px-5 py-2.5 text-sm text-text-main hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary/[0.04]"
              >
                {item.label}
              </Link>

              {item.children.length > 0 && hoveredMenu === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[200px]">
                  <div className="glass rounded-2xl py-3 shadow-lg shadow-black/[0.06] animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-primary/[0.04] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 전화 CTA + 모바일 메뉴 */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden sm:flex items-center gap-2 btn-primary px-5 py-2.5 rounded-full text-sm font-medium"
          >
            <IconPhone size={14} /> 상담예약
          </a>
          <MobileNav />
        </div>
        </div>
      </nav>
    </header>
  );
}
