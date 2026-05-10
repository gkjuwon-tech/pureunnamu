"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavItem {
  label: string;
  href: string;
}

export default function SubNav({ items }: { items: SubNavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-2.5 my-10">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`px-6 py-2.5 rounded-full text-sm transition-all duration-400 font-medium ${
              isActive
                ? "btn-primary shadow-md"
                : "texture-bg bg-white/95 text-text-muted border border-primary/[0.08] hover:border-primary/20 hover:text-primary hover:bg-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
