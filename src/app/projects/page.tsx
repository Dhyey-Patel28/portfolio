import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import {
  featuredProjects,
  moreProjects,
  type ProjectItem,
} from "@/lib/projects";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

export const metadata: Metadata = {
  title: "Projects | Dhyey Patel",
  description:
    "Shipped and recruiter-safe projects across data visualization, full-stack products, algorithms, ML, and data engineering.",
};

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
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-400">
              {featured ? "Featured project" : item.status}
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-stone-950">
              {item.title}
            </h2>

            <p className="mt-2 text-sm font-medium text-stone-500">
              {item.type}
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
          Why it matters
        </p>

        <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
          {item.proof.map((proof) => (
            <li key={proof} className="flex gap-3">
              <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
              <span>{proof}</span>
            </li>
          ))}
        </ul>
      </div>

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
      <SiteNav active="projects" />

      <section className="px-6 pb-10 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            Projects
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                Shipped pieces of how I think.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                These projects are separated from professional experience. They show product taste,
                data visualization, algorithms, ML engineering, and systems work that I built outside
                a formal workplace.
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
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
              Featured projects
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
              Polished work with clear product, data, and algorithm signals.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((item) => (
              <ProjectCard key={item.slug} item={item} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
              More projects
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
              Additional systems across ML, data engineering, and backend workflows.
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