import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "찾아오시는 길",
  description:
    "푸른나무 심리센터 오시는 길 - 충북 청주시 상당구 중고개로 180-5 5층(용암동). 버스: 115, 111, 823, 502번 등 청주농협용암지점 하차. 전화 043-288-4040. 월~금 09:00~20:00, 토 09:00~18:00.",
  alternates: { canonical: "/about/directions" },
  openGraph: {
    title: "찾아오시는 길 | 푸른나무 심리센터",
    description: "푸른나무 심리센터 위치 안내 - 충북 청주시 상당구 중고개로 180-5 5층. 043-288-4040",
    url: "/about/directions",
  },
};
import { IconMapPin, IconPhone, IconMail, IconBusStop, IconBus, IconMap } from "@/components/icons";

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "찾아오시는길", href: "/about/directions" },
];

export default function DirectionsPage() {
  return (
    <div>
      <PageBanner title="찾아오시는길" breadcrumb={["센터소개", "찾아오시는길"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-primary font-bold min-w-[80px] flex items-center gap-1"><IconMapPin size={16} /> ADDRESS</span>
                  <span className="text-text-muted">{SITE.address}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold min-w-[80px] flex items-center gap-1"><IconPhone size={16} /> TEL</span>
                  <a href={`tel:${SITE.phone}`} className="text-text-muted hover:text-primary transition-colors">
                    {SITE.phone}
                  </a>
                </div>

                <div className="flex gap-3">
                  <span className="text-primary font-bold min-w-[80px] flex items-center gap-1"><IconMail size={16} /> E-mail</span>
                  <a href={`mailto:${SITE.email}`} className="text-text-muted hover:text-primary transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-primary font-bold min-w-[80px] flex items-center gap-1"><IconBusStop size={16} /> 정류소</span>
                  <span className="text-text-muted">{SITE.busStop}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold min-w-[80px] flex items-center gap-1"><IconBus size={16} /> 버스</span>
                  <span className="text-text-muted">{SITE.bus}</span>
                </div>
              </div>
            </div>

            {/* 지도 영역 */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-primary/[0.06]">
              <iframe
                src={`https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&t=m&z=17&output=embed&iwloc=near`}
                className="w-full aspect-[16/9]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="푸른나무 심리센터 위치"
              />
            </div>

            {/* 길찾기 버튼 */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a
                href={`https://map.kakao.com/link/to/푸른나무 심리센터,${SITE.geo.lat},${SITE.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FEE500] text-[#191919] font-medium text-sm hover:brightness-95 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.473-.176.664-.638 2.408-.731 2.783-.114.462.17.456.357.332.147-.097 2.346-1.593 3.302-2.242.52.078 1.053.118 1.564.118 5.523 0 10-3.463 10-7.464C22 6.463 17.523 3 12 3"/></svg>
                카카오맵 길찾기
              </a>
              <a
                href={`https://map.naver.com/v5/search/${encodeURIComponent(SITE.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#03C75A] text-white font-medium text-sm hover:brightness-95 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/></svg>
                네이버지도 길찾기
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4285F4] text-white font-medium text-sm hover:brightness-95 transition-all"
              >
                <IconMap size={18} />
                Google Maps 길찾기
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
