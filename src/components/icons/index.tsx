/**
 * 푸른나무 심리센터 SVG 아이콘 모음
 * 부드러운 선(stroke), 둥근 linecap/linejoin, 따뜻한 느낌
 * 모든 아이콘은 currentColor를 사용하여 부모 text-color를 따름
 */

interface IconProps {
  className?: string;
  size?: number;
}

const defaults = { size: 24 };

/* ─── 일반 아이콘 ─── */

export function IconTree({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22V14" />
      <path d="M12 14C8.5 14 6 11 6 8.5C6 6 8 3 12 2C16 3 18 6 18 8.5C18 11 15.5 14 12 14Z" />
      <path d="M9 18C7 17.5 5.5 16 5.5 14" />
      <path d="M15 18C17 17.5 18.5 16 18.5 14" />
    </svg>
  );
}

export function IconLeaf({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22C12 22 4 16 4 10C4 6 7 2 12 2C17 2 20 6 20 10C20 16 12 22 12 22Z" />
      <path d="M12 22V8" />
      <path d="M8 14C9.5 12.5 10.5 11 12 10" />
      <path d="M16 12C14.5 11 13.5 10 12 10" />
    </svg>
  );
}

export function IconSprout({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 10 6 6C10 6 12 8 12 12Z" />
      <path d="M12 12C12 12 16 9 18 5C14 5 12 8 12 12Z" />
      <path d="M8 22H16" />
    </svg>
  );
}

export function IconHeart({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20C12 20 4 14 4 8.5C4 5.5 6.5 3 9 3C10.5 3 11.5 3.8 12 4.5C12.5 3.8 13.5 3 15 3C17.5 3 20 5.5 20 8.5C20 14 12 20 12 20Z" />
    </svg>
  );
}

export function IconSun({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2V5" />
      <path d="M12 19V22" />
      <path d="M4.93 4.93L7.05 7.05" />
      <path d="M16.95 16.95L19.07 19.07" />
      <path d="M2 12H5" />
      <path d="M19 12H22" />
      <path d="M4.93 19.07L7.05 16.95" />
      <path d="M16.95 7.05L19.07 4.93" />
    </svg>
  );
}

export function IconStrength({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  );
}

/* ─── 연락/UI 아이콘 ─── */

export function IconPhone({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.63 21 20.27 21 19.9 21C10.46 21 2.86 13.73 3.03 4.1C3.03 3.54 3.49 3.08 4.05 3.05H7.05C7.55 3.05 7.97 3.42 8.02 3.92C8.12 4.92 8.35 5.88 8.7 6.8L7.05 8.45C8.47 11.28 10.72 13.53 13.55 14.95L15.2 13.3C16.12 13.65 17.08 13.88 18.08 13.98C18.58 14.03 18.95 14.45 18.95 14.95L19.08 16.92H22Z" />
    </svg>
  );
}

export function IconMobile({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
    </svg>
  );
}

export function IconMail({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7L12 13L21 7" />
    </svg>
  );
}

export function IconMapPin({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21C12 21 19 14.5 19 9C19 5.13 15.87 2 12 2C8.13 2 5 5.13 5 9C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9" r="3" />
    </svg>
  );
}

export function IconMap({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" />
      <path d="M9 3V18" />
      <path d="M15 6V21" />
    </svg>
  );
}

export function IconClock({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15 14" />
    </svg>
  );
}

export function IconBus({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="14" height="16" rx="3" />
      <path d="M5 12H19" />
      <circle cx="8" cy="16" r="1" />
      <circle cx="16" cy="16" r="1" />
      <path d="M5 7H19" />
      <path d="M8 19V21" />
      <path d="M16 19V21" />
    </svg>
  );
}

export function IconBusStop({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="3" width="10" height="8" rx="1" />
      <path d="M12 11V22" />
      <path d="M9 22H15" />
      <path d="M10 6H14" />
    </svg>
  );
}

/* ─── 콘텐츠/게시판 아이콘 ─── */

export function IconClipboard({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2H15V4H9V2Z" />
      <path d="M9 10H15" />
      <path d="M9 14H13" />
    </svg>
  );
}

export function IconCamera({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function IconFolder({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

export function IconCheck({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12L11 15L16 9" />
    </svg>
  );
}

export function IconSad({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15C9 13.5 10.5 13 12 13C13.5 13 15 13.5 16 15" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
    </svg>
  );
}

export function IconUser({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20C5 17 8 14 12 14C16 14 19 17 19 20" />
    </svg>
  );
}

export function IconCalendar({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2V6" />
      <path d="M8 2V6" />
      <path d="M3 10H21" />
    </svg>
  );
}

export function IconEye({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ─── 대상 그룹 아이콘 ─── */

export function IconAdult({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="3.5" />
      <path d="M7 22V16C7 13.5 9 12 12 12C15 12 17 13.5 17 16V22" />
    </svg>
  );
}

export function IconChild({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M9 22V17C9 15 10 14 12 14C14 14 15 15 15 17V22" />
      <path d="M8 4C8 4 9 2 12 2C15 2 16 4 16 4" />
    </svg>
  );
}

export function IconTeen({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M8 22V16C8 13.5 9.5 12 12 12C14.5 12 16 13.5 16 16V22" />
      <path d="M7 12L5 16" />
      <path d="M17 12L19 16" />
    </svg>
  );
}

export function IconFamily({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8" cy="6" r="2.5" />
      <circle cx="16" cy="6" r="2.5" />
      <path d="M5 22V17C5 15.5 6 14 8 14" />
      <path d="M19 22V17C19 15.5 18 14 16 14" />
      <circle cx="12" cy="12" r="2" />
      <path d="M10 22V19C10 18 10.5 17 12 17C13.5 17 14 18 14 19V22" />
    </svg>
  );
}

/* ─── 검사 카테고리 아이콘 ─── */

export function IconBrain({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5C5 5.5 3 7.5 3 10C3 12 4.5 13.5 6 14C6 16.5 8 19 12 19C16 19 18 16.5 18 14C19.5 13.5 21 12 21 10C21 7.5 19 5.5 17 5.5C16.5 3.5 14.5 2 12 2Z" />
      <path d="M12 2V19" />
      <path d="M12 22V19" />
    </svg>
  );
}

export function IconChart({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 20H21" />
      <path d="M7 16V10" />
      <path d="M12 16V4" />
      <path d="M17 16V8" />
    </svg>
  );
}

export function IconPulse({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12H6L9 4L12 20L15 8L18 12H22" />
    </svg>
  );
}

export function IconSearch({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21L16.5 16.5" />
    </svg>
  );
}

export function IconTarget({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

/* ─── 건물/공간 ─── */

export function IconHome({ className, size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10L12 3L21 10V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10Z" />
      <path d="M9 21V14H15V21" />
    </svg>
  );
}
