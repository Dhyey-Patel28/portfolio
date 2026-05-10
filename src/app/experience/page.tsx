import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { experienceItems } from "@/lib/experience";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Experience | Dhyey Patel",
  description:
    "Professional software engineering experience across university web tools, internal platforms, dashboards, and data-rich workflows.",
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
  const className = "soft-pill soft-pill-md focus:outline-none focus:ring-2 focus:ring-stone-950/30";

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

export default function ExperiencePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="experience" />

      <section className="px-6 pb-10 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            Experience
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                Real systems, real users, real constraints.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                This page separates professional work from personal projects. It shows where I worked on
                production constraints, internal users, university workflows, accessibility, performance, and
                maintainable systems.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PillLink href="/projects">
                  View projects
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

      <section className="px-6 pb-20 pt-4 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6">
          {experienceItems.map((item) => (
            <Surface key={item.slug}>
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
                      {item.dates}
                    </p>

                    <Link
                      href={`/experience/${item.slug}`}
                      aria-label={`Read experience details for ${item.company}`}
                      className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
                    >
                      <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
                    </Link>
                  </div>

                  <h2 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-stone-950 sm:text-5xl">
                    {item.company}
                  </h2>

                  <p className="mt-3 text-sm font-medium text-stone-500">
                    {item.role} · {item.location}
                  </p>

                  <p className="mt-6 text-sm leading-7 text-stone-600">
                    {item.summary}
                  </p>

                  {item.links && item.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
                        >
                          {link.label}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] border border-stone-200 bg-[#f7f3ec]/70 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
                      What I did
                    </p>

                    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-3 h-px w-6 shrink-0 bg-stone-300" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] border border-stone-200 bg-[#f7f3ec]/70 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
                      Impact
                    </p>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {item.metrics.map((metric) => (
                        <p
                          key={metric}
                          className="rounded-full border border-stone-200 bg-[#fbf8f1]/80 px-3 py-2 text-sm text-stone-600"
                        >
                          {metric}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-stone-950 px-3 py-1.5 text-xs text-stone-50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-stone-200 pt-5">
                    <Link href={`/experience/${item.slug}`} className="soft-pill soft-pill-md">
                      Read experience
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </section>
    </main>
  );
}