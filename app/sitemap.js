import { boardCategories } from "@/data/boards";
import { absoluteUrl } from "@/lib/site";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/boards"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...boardCategories.map((category) => ({
      url: absoluteUrl(`/boards/${category.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];
}
