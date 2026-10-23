import type { MetadataRoute } from "next";
import { experienceItems } from "@/lib/experience";
import { labItems } from "@/lib/lab";
import { featuredProjects, moreProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: absoluteUrl(path),
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1, "weekly"),
    entry("/resume", 0.9),
    entry("/resume.pdf", 0.9),
    entry("/experience", 0.8),
    ...experienceItems.map((item) => entry(`/experience/${item.slug}`, 0.7)),
    entry("/projects", 0.8),
    ...[...featuredProjects, ...moreProjects].map((item) => entry(`/projects/${item.slug}`, 0.6)),
    entry("/research", 0.8),
    entry("/about", 0.7),
    entry("/lab", 0.4),
    ...labItems.map((item) => entry(`/lab/${item.slug}`, 0.3)),
  ];
}
