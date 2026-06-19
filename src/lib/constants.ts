export const SITE = {
  name: "푸른나무 심리센터",
  nameEn: "GreenTree Psychotherapy Center",
  url: "https://greentreect.com",
  phone: "043-288-4040",
  email: "dellamico@hanmail.net",
  address: "충북 청주시 상당구 중고개로 180-5 5층(용암동2656)",
  addressShort: "청주시 상당구 중고개로 180-5 5층",
  region: "충청북도",
  city: "청주시",
  postalCode: "28576",
  geo: { lat: 36.6358, lng: 127.4914 },
  // 0이 붙은 시간(08시) 대신 자연스러운 표기
  hours: {
    weekday: "오전 9시 ~ 오후 8시",
    saturday: "오전 9시 ~ 오후 6시",
    holiday: "일요일, 공휴일 휴무",
  },
  bus: "115, 111, 823, 502, 117, 872-1, 112, 113, 500, 115-1",
  busStop: "청주농협용암지점",
  slogan: "푸른나무심리센터는 마음을 담습니다.",
  subSlogan:
    "푸른나무심리센터가 있는 이유, 잃어버린 당신의 삶을 회복시켜주는 등대입니다.",
  subsidiary: {
    name: "푸른숲마음발달센터",
    description: "사회성 그룹 치료, 인지 학습 치료 전문",
  },
  since: 2010,
  blogUrl: "https://blog.naver.com/greentreect/221530622467",
} as const;

export const NAV_ITEMS = [
  {
    label: "센터소개",
    href: "/about",
    children: [
      { label: "인사말", href: "/about" },
      { label: "연혁", href: "/about/history" },
      { label: "센터장소개", href: "/about/director" },
      { label: "치료사 소개", href: "/about/therapists" },
      { label: "찾아오시는길", href: "/about/directions" },
    ],
  },
  {
    label: "프로그램",
    href: "/programs/therapy",
    // 클라이언트 요청 순서: 1.심리치료란? 2.심리검사 3.개인심리치료 4.가족심리치료 5.사회성그룹치료 6.인지학습치료
    children: [
      { label: "심리치료란?", href: "/programs/therapy" },
      { label: "심리검사", href: "/programs/assessment" },
      { label: "개인심리치료", href: "/programs/targets" },
      { label: "가족심리치료", href: "/programs/family" },
      { label: "사회성그룹치료", href: "/programs/group-therapy" },
      { label: "인지학습치료", href: "/programs/cognitive-learning" },
    ],
  },
  {
    label: "갤러리",
    href: "/gallery",
    children: [
      { label: "전체보기", href: "/gallery" },
      { label: "센터 시설", href: "/gallery?tab=facility" },
      { label: "심리치료 장면", href: "/gallery?tab=therapy" },
      { label: "심리검사", href: "/gallery?tab=assessment" },
      { label: "외부강의 · 활동", href: "/gallery?tab=activity" },
    ],
  },
  {
    label: "커뮤니티",
    href: "/community/notices",
    children: [
      { label: "공지사항", href: "/community/notices" },
      { label: "상담후기", href: "/community/reviews" },
      { label: "자유게시판", href: "/community/free-board" },
    ],
  },
] as const;
