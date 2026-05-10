import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  FlaskConical,
  Lightbulb,
  Route,
} from "lucide-react";
import { labItems } from "@/lib/lab";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const detailCopy: Record<
  string,
  {
    why: string;
    exploration: string;
    next: string;
    notes: string[];
  }
> = {
  "code-visualizer": {
    why:
      "I want this to become a tool that helps people understand code behavior by making execution flow and state changes visible.",
    exploration:
      "The hard part is choosing the right level of detail. Too little visualization is useless; too much becomes noise.",
    next:
      "The next useful milestone is a small Python-only MVP with examples for loops, branches, function calls, and variable state.",
    notes: [
      "Start with Python only instead of trying to support every language too early.",
      "Keep examples small enough that the visualization teaches instead of distracts.",
      "Treat the first version as a learning tool, not a full debugger.",
    ],
  },
  "defi-protocol-safety": {
    why:
      "Protocol safety is difficult to judge when evidence is scattered across audits, docs, governance, TVL, incidents, and technical assumptions.",
    exploration:
      "The central question is how to show risk signals with evidence instead of pretending a single score can explain everything.",
    next:
      "The next step is a first risk-signal schema and comparison interface that makes uncertainty visible.",
    notes: [
      "Avoid turning protocol safety into a fake confidence score.",
      "Separate evidence, assumptions, and uncertainty so users can inspect the reasoning.",
      "Start with a small schema before building a large dashboard.",
    ],
  },
  "momentum-app": {
    why:
      "Most productivity tools become task graveyards. I want to explore a calmer system that keeps goals, daily action, and progress connected.",
    exploration:
      "The challenge is avoiding feature creep while still making progress feel visible and motivating.",
    next:
      "The next step is a focused flow for goals, daily actions, progress history, and habit continuity.",
    notes: [
      "Keep the product closer to momentum than task management.",
      "Make progress visible without turning the app into another dashboard of guilt.",
      "Resist adding features until the core daily loop feels useful.",
    ],
  },
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

function NotebookRow({
  number,
  label,
  title,
  body,
  icon,
}: {
  number: string;
  label: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-t border-stone-200 py-7 md:grid-cols-[4rem_1fr]">
      <div className="self-start pt-1">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
          {number}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-600">
            {icon}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
            {label}
          </p>
        </div>

        <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
          {title}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
          {body}
        </p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return labItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = labItems.find((entry) => entry.slug === slug);

  if (!item) {
    return {
      title: "Lab | Dhyey Patel",
    };
  }

  return {
    title: `${item.title} | Lab | Dhyey Patel`,
    description: item.summary,
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = labItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const copy = detailCopy[item.slug];

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="lab" />

      <section className="px-6 pb-8 pt-32 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/lab" className="soft-pill soft-pill-md">
            <ArrowLeft className="h-4 w-4" />
            Back to lab
          </Link>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
                Lab note
              </p>

              <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                {item.title}
              </h1>

              <p className="mt-5 text-sm font-medium text-stone-500">
                {item.status} · active exploration
              </p>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                {item.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Dhyey-Patel28"
                  target="_blank"
                  rel="noreferrer"
                  className="soft-pill soft-pill-md"
                >
                  GitHub
                  <GitHubIcon className="h-4 w-4" />
                </a>

                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="soft-pill soft-pill-md">
                  Resume
                  <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <Surface className="p-0">
            <div className="border-b border-stone-200 bg-[#f7f3ec]/70 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
                    Experiment notebook
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    This is intentionally not presented like finished work. It shows what I am
                    shaping, what is uncertain, and what I am trying next.
                  </p>
                </div>

                <span className="rounded-full border border-stone-300 px-4 py-2 text-xs font-medium text-stone-600">
                  {item.status}
                </span>
              </div>
            </div>

            <div className="px-6">
              <NotebookRow
                number="01"
                label="Why this exists"
                title="The problem is still forming."
                body={copy?.why ?? item.summary}
                icon={<Lightbulb className="h-4 w-4" />}
              />

              <NotebookRow
                number="02"
                label="Current milestone"
                title="The next useful version is deliberately small."
                body={item.currentMilestone}
                icon={<Route className="h-4 w-4" />}
              />

              <NotebookRow
                number="03"
                label="Technical challenge"
                title="The hard part is choosing what not to build yet."
                body={copy?.exploration ?? item.technicalChallenge}
                icon={<FlaskConical className="h-4 w-4" />}
              />

              <NotebookRow
                number="04"
                label="Next step"
                title="Make the experiment concrete."
                body={copy?.next ?? item.currentMilestone}
                icon={<ArrowRight className="h-4 w-4" />}
              />
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[0.55fr_1.45fr]">
          <Surface className="self-start">
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

                  <span className="text-sm font-medium text-stone-700">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
              Working notes
            </p>

            <div className="mt-5 space-y-4">
              {(copy?.notes ?? []).map((note, index) => (
                <div
                  key={note}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-stone-700">{note}</p>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <Surface className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
                Continue
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                Finished work lives somewhere else.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                The Lab is for active thinking. For polished and shipped work, start with Projects
                or Experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="soft-pill soft-pill-md">
                Projects
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/experience" className="soft-pill soft-pill-md">
                Experience
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Surface>
        </div>
      </section>
    </main>
  );
}