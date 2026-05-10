import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import { SITE } from "@/lib/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2E7D32",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "푸른나무 심리센터 | 청주 심리상담·심리치료 전문",
    template: "%s | 푸른나무 심리센터",
  },
  description:
    "청주 푸른나무 심리센터 - 아동, 청소년, 성인, 가족 심리치료 전문기관. 2010년 개소 이래 연평균 1500시간 이상의 임상경험. 놀이치료, 미술치료, 음악치료, 심리검사, ADHD검사 전문. 100% 예약제. 043-288-4040",
  keywords: [
    "청주심리상담",
    "청주심리상담센터",
    "청주심리치료",
    "청주심리검사",
    "충북심리상담",
    "푸른나무심리센터",
    "아동심리상담",
    "청소년심리상담",
    "성인심리상담",
    "가족상담",
    "놀이치료",
    "미술치료",
    "음악치료",
    "심리검사",
    "ADHD검사",
    "지능검사",
    "우울증상담",
    "불안장애",
    "청주놀이치료",
    "청주아동심리",
    "충청북도심리상담",
    "심리치료전문",
    "모래놀이치료",
    "청주가족상담",
    "청주부부상담",
  ],
  authors: [{ name: "푸른나무 심리센터" }],
  creator: "푸른나무 심리센터",
  publisher: "푸른나무 심리센터",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "푸른나무 심리센터",
    title: "푸른나무 심리센터 | 청주 심리상담·심리치료 전문",
    description:
      "청주 푸른나무 심리센터 - 아동, 청소년, 성인, 가족 심리치료 전문기관. 놀이치료, 미술치료, 음악치료, 심리검사 전문. 2010년 개소. 043-288-4040",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "푸른나무 심리센터 | 청주 심리상담·심리치료 전문",
    description:
      "청주 푸른나무 심리센터 - 아동, 청소년, 성인, 가족 심리치료 전문기관. 043-288-4040",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "구글서치콘솔-인증코드-여기에-넣기",
    // other: { "naver-site-verification": "네이버-인증코드-여기에-넣기" },
  },
};

function LocalBusinessJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: [SITE.nameEn, "푸른나무심리센터", "푸른나무 심리상담센터"],
    description:
      "청주 푸른나무 심리센터 - 아동, 청소년, 성인, 가족 심리치료 전문기관. 놀이치료, 미술치료, 음악치료, 심리검사, ADHD검사 전문. 2010년 개소, 연평균 2500시간 이상 임상경험.",
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: "2010-07-01",
    image: [
      `${SITE.url}/gallery/waiting-room-1.jpg`,
      `${SITE.url}/gallery/art-therapy-room.jpg`,
      `${SITE.url}/gallery/sandplay-room.jpg`,
    ],
    logo: `${SITE.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "중고개로 180-5 5층",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [SITE.blogUrl],
    areaServed: {
      "@type": "City",
      name: "청주시",
    },
    founder: {
      "@type": "Person",
      name: "조미애",
      jobTitle: "소장",
      description: "발달심리사 2급, 임상미술심리상담사 1급. 충북대학교 심리학 석사. 2005년부터 20년 이상 임상경험.",
    },
    medicalSpecialty: [
      "심리상담",
      "심리치료",
      "심리검사",
      "놀이치료",
      "미술치료",
      "음악치료",
      "모래놀이치료",
      "가족치료",
      "부부상담",
      "ADHD검사",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "심리상담 프로그램",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "종합심리검사" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "놀이치료" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "미술치료" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "음악치료" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "모래놀이치료" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "가족상담" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "성인상담" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "사회성향상 집단상담" } },
      ],
    },
    priceRange: "$$",
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: "청주 푸른나무 심리센터 공식 홈페이지",
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "ko-KR",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "푸른나무 심리센터의 상담 시간은 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "평일(월~금) 오전 9시~오후 9시, 토요일 오전 9시~오후 6시 운영합니다. 100% 예약제로 운영됩니다. 예약 전화: 043-288-4040",
        },
      },
      {
        "@type": "Question",
        name: "어떤 심리검사를 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "종합심리검사(풀배터리), K-WISC-V(웩슬러 지능검사), MMPI-2(다면적 인성검사), TCI(기질및성격검사), K-CBCL(아동청소년행동평가), SNSB(신경심리검사), CAT(ADHD주의력검사), HTP/KFD(투사검사) 등 다양한 표준화 검사를 실시합니다.",
        },
      },
      {
        "@type": "Question",
        name: "아동 놀이치료도 가능한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 전용 놀이치료실과 모래놀이치료실을 갖추고 있으며, 놀이치료, 미술치료, 음악치료 등 아동·청소년 전문 심리치료를 제공합니다.",
        },
      },
      {
        "@type": "Question",
        name: "예약은 어떻게 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "전화(043-288-4040), 문자(010-5169-4248), 또는 홈페이지 온라인 문의를 통해 예약하실 수 있습니다. 100% 예약제로 운영됩니다.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
