import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/about/history", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/about/director", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/about/directions", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/programs/therapy", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/programs/targets", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/programs/assessment", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/programs/assessment-types", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/community/notices", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/community/reviews", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/community/free-board", priority: 0.5, changeFrequency: "weekly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
