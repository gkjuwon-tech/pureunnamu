"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-main hover:text-primary transition-colors"
        aria-label="메뉴 열기"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 w-80 h-full texture-bg bg-white/95 z-50 shadow-2xl animate-slide-in overflow-y-auto">
            <div className="p-6 border-b border-primary/10 flex justify-between items-center">
              <span className="text-lg font-bold text-primary">푸른나무 심리센터</span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-text-muted hover:text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-primary/5">
                  <button
                    onClick={() => {
                      if (item.children.length > 0) {
                        setOpenSub(openSub === item.label ? null : item.label);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="w-full flex justify-between items-center px-6 py-4 text-text-main hover:text-primary hover:bg-soft-green/20 transition-colors"
                  >
                    {item.children.length === 0 ? (
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {item.children.length > 0 && (
                      <svg
                        className={`w-4 h-4 transition-transform ${openSub === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {item.children.length > 0 && openSub === item.label && (
                    <div className="bg-soft-green/10 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-10 py-3 text-sm text-text-muted hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-6 bg-soft-green/20 mx-4 rounded-xl mt-4">
              <p className="text-sm text-text-muted mb-2">상담/예약전화</p>
              <a href={`tel:${SITE.phone}`} className="text-xl font-bold text-primary">
                {SITE.phone}
              </a>
              <p className="text-xs text-text-muted mt-2">{SITE.hours.weekday}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
