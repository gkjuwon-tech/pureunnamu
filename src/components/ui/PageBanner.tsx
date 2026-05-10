interface PageBannerProps {
  title: string;
  breadcrumb?: string[];
  backgroundImage?: string;
}

export default function PageBanner({ title, breadcrumb, backgroundImage }: PageBannerProps) {
  return (
    <div
      className="relative h-52 md:h-72 flex items-center justify-center overflow-hidden green-gradient"
      style={{
        ...(backgroundImage && {
          background: `linear-gradient(rgba(26, 58, 13, 0.7), rgba(45, 80, 22, 0.5)), url(${backgroundImage}) center/cover`
        })
      }}
    >
      {/* 장식 원 */}
      <div className="absolute top-10 left-[10%] w-48 h-48 bg-white/[0.03] rounded-full blur-[60px]" />
      <div className="absolute bottom-0 right-[15%] w-32 h-32 bg-white/[0.04] rounded-full blur-[40px]" />
      <div className="absolute top-1/2 left-[60%] w-64 h-64 bg-[#8BC34A]/[0.03] rounded-full blur-[80px]" />

      {/* 떠다니는 잎사귀 장식 (정적) */}
      <svg className="absolute top-8 left-[8%] text-white/[0.06] rotate-[30deg]" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
      </svg>
      <svg className="absolute bottom-12 right-[12%] text-white/[0.05] -rotate-[20deg]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
      </svg>
      <svg className="absolute top-16 right-[30%] text-white/[0.04] rotate-[60deg]" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.63 20 17.97 14.63 17 8Z" />
      </svg>

      <div className="relative text-center text-white z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 heading-serif tracking-tight">{title}</h2>
        {breadcrumb && (
          <div className="text-xs text-white/40 tracking-wider">
            {breadcrumb.join(" · ")}
          </div>
        )}
      </div>

      {/* 하단 곡선 구분선 */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <defs>
            <pattern id="hanji-banner" patternUnits="userSpaceOnUse" width="250" height="250">
              <rect width="250" height="250" fill="#F7F3EC" />
              <image href="https://www.transparenttextures.com/patterns/rice-paper.png" width="250" height="250" />
            </pattern>
          </defs>
          <path d="M0 50V35C360 10 720 0 1080 15C1260 22 1380 35 1440 30V50H0Z" fill="url(#hanji-banner)" />
        </svg>
      </div>
    </div>
  );
}
