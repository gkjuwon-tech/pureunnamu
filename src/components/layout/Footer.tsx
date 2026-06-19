import Link from "next/link";
import { SITE } from "@/lib/constants";
import { IconTree, IconMapPin, IconPhone, IconMail } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="mt-24 relative">
      {/* 상단 물결 곡선 */}
      <div className="relative -mb-px">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <path d="M0 60V40C240 15 480 5 720 20C960 35 1200 25 1440 10V60H0Z" fill="#1a3a0d" />
        </svg>
      </div>

      <div className="bg-[#1a3a0d] text-white/90 relative overflow-hidden">
        {/* 장식 요소 */}
        <div className="absolute top-10 right-[10%] w-[250px] h-[250px] bg-white/[0.01] rounded-full blur-[80px]" />
        <svg className="absolute top-8 left-[5%] text-white/[0.03] rotate-[35deg]" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
        </svg>
        <svg className="absolute bottom-16 right-[8%] text-white/[0.025] -rotate-[25deg]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* 센터 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2.5 heading-serif">
              <IconTree size={20} className="text-soft-green/70" /> {SITE.name}
            </h3>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p className="flex items-center gap-2.5"><IconMapPin size={14} className="shrink-0 text-white/40" /> {SITE.address}</p>
              <p className="flex items-center gap-2.5"><IconPhone size={14} className="shrink-0 text-white/40" /> {SITE.phone}</p>
              <p className="flex items-center gap-2.5"><IconMail size={14} className="shrink-0 text-white/40" /> {SITE.email}</p>
            </div>
          </div>

          {/* 이용시간 */}
          <div>
            <h3 className="text-lg font-bold mb-5 heading-serif">이용시간 안내</h3>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>평일(월~금): {SITE.hours.weekday}</p>
              <p>토요일: {SITE.hours.saturday}</p>
              <p>{SITE.hours.holiday}</p>
              <p className="mt-4 text-accent/90 font-medium text-xs tracking-wider uppercase">100% 예약제 운영</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-bold mb-5 heading-serif">바로가기</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/60">
              <Link href="/about" className="hover:text-white/90 transition-colors">센터소개</Link>
              <Link href="/programs/therapy" className="hover:text-white/90 transition-colors">프로그램</Link>
              <Link href="/gallery" className="hover:text-white/90 transition-colors">갤러리</Link>
              <Link href="/community/notices" className="hover:text-white/90 transition-colors">공지사항</Link>
              <Link href="/community/reviews" className="hover:text-white/90 transition-colors">상담후기</Link>
            </div>
            <div className="mt-5">
              <a
                href={SITE.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 bg-white/[0.07] rounded-full text-sm text-white/70 hover:bg-white/[0.12] hover:text-white/90 transition-all"
              >
                네이버 블로그 →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] mt-12 pt-8 text-center text-xs text-white/30 tracking-wider">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
