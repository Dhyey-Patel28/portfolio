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
import { featuredProjects, moreProjects } from "@/lib/projects";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

const allProjects = [...featuredProjects, ...moreProjects];

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

function CaseStudyRow({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-t border-stone-200 py-7 md:grid-cols-[4rem_1fr]">
      <div className="self-start pt-1">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
          {number}
        </span>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
          {label}
        </p>

        <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em] text-stone-950">
          {title}
        </h2>

        <div className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return allProjects.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = allProjects.find((project) => project.slug === slug);

  if (!item) {
    return {
      title: "Project | Dhyey Patel",
    };
  }

  return {
    title: `${item.title} | Project | Dhyey Patel`,
    description: item.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = allProjects.find((project) => project.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="projects" />

      <section className="px-6 pb-8 pt-32 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/projects" className="soft-pill soft-pill-md">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
                Project case study
              </p>

              <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                {item.title}
              </h1>

              <p className="mt-5 text-sm font-medium text-stone-500">
                {item.type} · {item.status}
              </p>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                {item.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {item.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soft-pill soft-pill-md"
                  >
                    {link.label}
                    {link.label === "GitHub" ? (
                      <GitHubIcon className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                  </a>
                ))}

                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="soft-pill soft-pill-md">
                  Resume
                  <FileText className="h-4 w-4" />
                </a>
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
                  Visual proof
                </p>
              </div>

              <div className="mt-5">
                <VisualGallery visuals={item.visuals} />
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

          <Surface className="p-0">
            <div className="border-b border-stone-200 bg-[#f7f3ec]/70 px-6 py-5">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
                Case study
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                A quick read of the problem, the build, and what the project proves.
              </p>
            </div>

            <div className="px-6">
              <CaseStudyRow
                number="01"
                label="Problem"
                title="What needed solving."
              >
                <p>{item.problem}</p>
              </CaseStudyRow>

              <CaseStudyRow
                number="02"
                label="Build"
                title="What I made."
              >
                <p>{item.build}</p>
              </CaseStudyRow>

              <CaseStudyRow
                number="03"
                label="Outcome"
                title="Why it matters."
              >
                <ul className="space-y-4 text-stone-700">
                  {item.proof.map((proof) => (
                    <li key={proof} className="flex gap-3">
                      <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
                      <span>{proof}</span>
                    </li>
                  ))}
                </ul>
              </CaseStudyRow>

              <CaseStudyRow
                number="04"
                label="Takeaway"
                title="What this project shows."
              >
                <p>{item.takeaway}</p>
              </CaseStudyRow>

              {item.next && (
                <CaseStudyRow
                  number="05"
                  label="Next"
                  title="What I am exploring now."
                >
                  <p>{item.next}</p>
                </CaseStudyRow>
              )}
            </div>
          </Surface>
        </div>
      </section>
    </main>
  );
}