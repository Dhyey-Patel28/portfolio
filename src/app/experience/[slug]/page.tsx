import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ImageIcon,
  MousePointerClick,
} from "lucide-react";
import VisualGallery from "@/components/visual-gallery";
import { experienceItems } from "@/lib/experience";
import SiteNav from "@/components/site-nav";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

function TimelineItem({
  index,
  title,
  subtitle,
  problem,
  build,
  result,
  links,
}: {
  index: number;
  title: string;
  subtitle: string;
  problem: string;
  build: string;
  result: string;
  links?: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <li className="relative pl-12">
      <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-[#fbf8f1] font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
        0{index + 1}
      </span>

      <div className="border-b border-stone-200 pb-8">
        <h3 className="text-3xl font-medium tracking-[-0.045em] text-stone-950">
          {title}
        </h3>

        <p className="mt-3 text-sm font-medium text-stone-500">{subtitle}</p>

        {links && links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-sm"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Problem
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{problem}</p>
          </div>

          <div className="rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Build
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{build}</p>
          </div>

          <div className="rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Result
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{result}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function generateStaticParams() {
  return experienceItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = experienceItems.find((entry) => entry.slug === slug);

  if (!item) {
    return {
      title: "Experience | Dhyey Patel",
    };
  }

  return {
    title: `${item.company} | Experience | Dhyey Patel`,
    description: item.summary,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = experienceItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="experience" />

      <section className="px-6 pb-8 pt-32 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/experience" className="soft-pill soft-pill-md">
            <ArrowLeft className="h-4 w-4" />
            Back to experience
          </Link>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
                Experience detail
              </p>

              <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                {item.company}
              </h1>

              <p className="mt-5 text-sm font-medium text-stone-500">
                {item.role} · {item.location} · {item.dates}
              </p>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                {item.headline}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="soft-pill soft-pill-md">
                  Resume
                  <FileText className="h-4 w-4" />
                </a>

                {item.links?.slice(0, 2).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soft-pill soft-pill-md"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {item.visuals && item.visuals.length > 0 && (
        <section className="px-6 py-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <Surface>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-stone-500" />
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                  Public proof
                </p>
              </div>

              <div className="mt-5">
                <VisualGallery visuals={item.visuals} gridClassName="grid gap-5 lg:grid-cols-3" />
              </div>
            </Surface>
          </div>
        </section>
      )}

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="grid gap-6 lg:sticky lg:top-28">
            <Surface>
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-stone-500" />
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                  Reviewer guide
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-stone-950">
                {item.reviewGuide.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {item.reviewGuide.summary}
              </p>

              <ol className="mt-5 space-y-3">
                {item.reviewGuide.steps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-7 text-stone-700">{step}</span>
                  </li>
                ))}
              </ol>
            </Surface>

            <Surface>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                Impact
              </p>

              <div className="mt-5 space-y-3">
                {item.metrics.map((metric, index) => (
                  <div
                    key={metric}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.1rem] border border-stone-200 bg-[#f7f3ec]/70 px-4 py-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-stone-700">{metric}</p>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                Stack
              </p>

              <div className="mt-5 space-y-3">
                {item.stack.map((tech, index) => (
                  <div
                    key={tech}
                    className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[1.1rem] border border-stone-200 bg-[#f7f3ec]/70 px-4 py-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium text-stone-700">{tech}</span>
                  </div>
                ))}
              </div>
            </Surface>
          </div>

          <div className="grid gap-6">
            <Surface className="p-0">
              <div className="border-b border-stone-200 bg-[#f7f3ec]/70 px-6 py-5">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
                  Role map
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  The shape of the role: context, ownership, and why the work mattered.
                </p>
              </div>

              <div className="divide-y divide-stone-200 px-6">
                <div className="py-7">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                    Context
                  </p>
                  <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                    The environment I was building inside.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                    {item.context}
                  </p>
                </div>

                <div className="py-7">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                    Ownership
                  </p>
                  <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                    The work I was trusted to ship.
                  </h2>

                  <ul className="mt-5 space-y-4 text-sm leading-7 text-stone-700">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-7">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                    Signal
                  </p>
                  <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                    What this role proves.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                    {item.signal}
                  </p>
                </div>
              </div>
            </Surface>

            {item.workstreams && item.workstreams.length > 0 && (
              <Surface>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
                  Work timeline
                </p>

                <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.055em] text-stone-950">
                  The role was not one project. It was a set of real workflow problems.
                </h2>

                <ol className="relative mt-8 space-y-8 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-stone-200">
                  {item.workstreams.map((workstream, index) => (
                    <TimelineItem
                      key={workstream.title}
                      index={index}
                      title={workstream.title}
                      subtitle={workstream.subtitle}
                      problem={workstream.problem}
                      build={workstream.build}
                      result={workstream.result}
                      links={workstream.links}
                    />
                  ))}
                </ol>
              </Surface>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}