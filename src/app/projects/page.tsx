import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import {
  featuredProjects,
  moreProjects,
  type ProjectItem,
} from "@/lib/projects";
import JsonLd from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, personRef, webPageSchema } from "@/lib/seo";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

const meta = {
  name: "Projects — Dhyey Patel",
  description:
    "Software projects by Dhyey Patel: deployed full-stack and frontend applications, a hackathon prototype, class and course projects, and work in progress, each labelled with its status and team context.",
  path: "/projects",
};

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: meta.description,
  path: meta.path,
});

function PillLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "soft-pill soft-pill-md focus:outline-none focus:ring-2 focus:ring-stone-950/30";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1]/85 p-6 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectCard({
  item,
  featured = false,
}: {
  item: ProjectItem;
  featured?: boolean;
}) {
  return (
    <Surface className="group h-full transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex min-h-[150px] flex-col justify-between gap-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">
              {featured ? `Featured · ${item.status}` : item.status}
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-stone-950">
              {item.title}
            </h2>

            <p className="mt-2 text-sm font-medium text-stone-500">
              {item.context}
              {item.dates ? ` · ${item.dates}` : ""}
            </p>
          </div>

          <Link
            href={`/projects/${item.slug}`}
            aria-label={`Read details for ${item.title}`}
            className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
          >
            <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
          </Link>
        </div>

        <p className="text-sm leading-7 text-stone-600">{item.summary}</p>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-stone-300/80 bg-[#f7f3ec]/90 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">
          My role
        </p>

        <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
          {item.myRole.map((role) => (
            <li key={role} className="flex gap-3">
              <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
              <span>{role}</span>
            </li>
          ))}
        </ul>

        {item.teamCredit && (
          <p className="mt-4 border-t border-stone-300/70 pt-4 text-xs leading-6 text-stone-500">
            {item.teamCredit}
          </p>
        )}
      </div>

      {item.statusNote && (
        <p className="mt-4 text-xs leading-6 text-stone-500">{item.statusNote}</p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-stone-300/80 bg-[#fbf8f1]/70 px-3 py-1.5 text-xs text-stone-600"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-stone-200 pt-5">
        <Link href={`/projects/${item.slug}`} className="soft-pill soft-pill-sm font-medium">
          Read detail
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        {item.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="soft-pill soft-pill-sm font-medium"
          >
            {link.label}
            {link.label === "GitHub" ? (
              <GitHubIcon className="h-3.5 w-3.5" />
            ) : (
              <ExternalLink className="h-3.5 w-3.5" />
            )}
          </a>
        ))}
      </div>
    </Surface>
  );
}

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <JsonLd
        data={graph(
          webPageSchema({
            type: "CollectionPage",
            ...meta,
            extra: {
              about: personRef,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [...featuredProjects, ...moreProjects].map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: project.title,
                  url: absoluteUrl(`/projects/${project.slug}`),
                })),
              },
            },
          }),
          breadcrumbSchema([{ name: "Projects", path: "/projects" }])
        )}
      />
      <SiteNav active="projects" />

      <section className="px-6 pb-10 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            Projects
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                Things I&apos;ve built.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                Projects outside my professional roles: solo builds, a hackathon prototype, and class
                and course projects. Each one is labelled with its status, how it was built, and what
                I personally did.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PillLink href="/experience">
                  View experience
                  <ArrowRight className="h-4 w-4" />
                </PillLink>
                <PillLink href="/resume.pdf" external>
                  Resume
                  <FileText className="h-4 w-4" />
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-4 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
              Featured projects
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
              Deployed and ready to try.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((item) => (
              <ProjectCard key={item.slug} item={item} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
              More projects
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
              Prototypes, work in progress, and course projects.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}