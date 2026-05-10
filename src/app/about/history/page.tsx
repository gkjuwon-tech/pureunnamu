import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "센터 연혁",
  description:
    "푸른나무 심리센터 연혁 - 2010년 개소 이래 초등학교 집단상담, 소방서 정신건강평가, 몽골 드림스타트 복지사업 등 다양한 사회공헌활동. 충북 청주 심리상담 전문기관.",
  alternates: { canonical: "/about/history" },
  openGraph: {
    title: "센터 연혁 | 푸른나무 심리센터",
    description: "2010년 개소 이래 다양한 사회공헌활동과 심리치료 전문 경력",
    url: "/about/history",
  },
};

const aboutSubNav = [
  { label: "인사말", href: "/about" },
  { label: "연혁", href: "/about/history" },
  { label: "센터장소개", href: "/about/director" },
  { label: "치료사 소개", href: "/about/therapists" },
  { label: "찾아오시는길", href: "/about/directions" },
];

const historyData = [
  {
    year: "2026",
    items: [
      "CJB청주방송 교양강좌 출연강의 '디지털, 건강한 거리두기'",
      "증평군가족센터, 중년을 위한 집단미술치료 진행",
    ],
  },
  {
    year: "2023~현재",
    items: ["충북유아교육진흥원 협약체결, 유아 및 부모 심리상담, 양육코칭"],
  },
  {
    year: "2019~현재",
    items: [
      "충남 지방소방공무원 최종면접관 발탁",
      "흥덕정신건강복지센터, 충북가정위탁지원센터, 상당정신건강복지센터, 충북학대피해노인전용쉼터, 성폭행피해여성쉼터, 청주시 직원 심리상담 협약",
    ],
  },
  {
    year: "2018",
    items: ["SMR코리아(SMR Automotive Module Korea) 노사갈등 조정 집단상담 실시"],
  },
  {
    year: "2015",
    items: [
      "증평 드림스타트 지원 집단심리치료 실시",
      "중앙소방학교 의무소방대원 모집 최종면접관 발탁",
    ],
  },
  {
    year: "2014~2017",
    items: [
      "충북 학습종합클리닉 청주거점센터와 학습부진아동의 정서 행동 발달과 안정 도모를 위한 업무 협약",
      "청주 교육지원청 초등교육과 학습코칭 슈퍼비전",
      "청주 동부소방서 소속 직원 정신건강평가",
    ],
  },
  {
    year: "2013",
    items: ["충북경찰청 소속 직원 심리검사"],
  },
  {
    year: "2012~2023",
    items: [
      "충북, 청주지역 초등학교 집단상담, 부모교육, 교사연수 실시",
      "성폭행피해여성쉼터 모퉁잇돌 심리치료 협력",
      "모자원 해오름마을 거주민 심리치료 협력",
      "청주 시니어클럽 교통안전지킴이 직무연수",
      "청주 시니어클럽 방과후지도사 직무연수",
    ],
  },
  {
    year: "2011~현재",
    items: [
      "청주교육지원청 특수교육지원센터 치료지원서비스 바우처 기관 선정, 심리치료 협력",
      "진천교육지원청 특수교육지원센터 치료지원서비스 바우처 기관 선정, 심리치료 협력",
      "괴산증평 교육지원청 특수교육지원센터 치료지원서비스 바우처 기관 선정, 심리치료 협력",
    ],
  },
  {
    year: "2010",
    items: [
      "7월 1일 개소",
      "연간 약 2,500시간 이상의 상담·치료 실시",
    ],
  },
];

export default function HistoryPage() {
  return (
    <div>
      <PageBanner title="연혁" breadcrumb={["센터소개", "연혁"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <SubNav items={aboutSubNav} />

        <div className="relative">
          {/* 타임라인 중앙선 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2" />

          {historyData.map((yearData, yi) => (
            <AnimatedSection key={yearData.year} delay={yi * 100}>
              <div className="relative mb-16">
                {/* 연도 뱃지 */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative z-10 bg-primary/90 text-white px-8 py-2.5 rounded-full font-bold text-lg shadow-md shadow-primary/15">
                    {yearData.year}
                  </div>
                </div>

                {/* 내용 */}
                <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="paper-card bg-paper rounded-2xl p-8 md:p-10 space-y-4 text-center">
                    {yearData.items.map((item, i) => (
                      <p key={i} className="text-text-muted text-[15px] leading-relaxed break-keep">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
