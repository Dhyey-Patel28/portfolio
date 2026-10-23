import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FlaskConical,
  Hammer,
  Route,
  Signpost,
} from "lucide-react";
import { labItems } from "@/lib/lab";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, graph, pageMetadata, projectSchema, webPageSchema } from "@/lib/seo";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

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

function NotebookRow({
  number,
  label,
  title,
  icon,
  children,
}: {
  number: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-t border-stone-200 py-7 first:border-t-0 md:grid-cols-[4rem_1fr]">
      <div className="self-start pt-1">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
          {number}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-600">
            {icon}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
            {label}
          </p>
        </div>

        <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
          {title}
        </h2>

        <div className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">{children}</div>
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
      title: "Lab",
    };
  }

  return pageMetadata({
    title: `${item.title} · Lab`,
    description: item.summary,
    path: `/lab/${item.slug}`,
  });
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = labItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <JsonLd
        data={graph(
          webPageSchema({
            name: `${item.title} — Dhyey Patel`,
            description: item.summary,
            path: `/lab/${item.slug}`,
            extra: { mainEntity: projectSchema(item) },
          }),
          breadcrumbSchema([
            { name: "Lab", path: "/lab" },
            { name: item.title, path: `/lab/${item.slug}` },
          ])
        )}
      />
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
                {item.status} · {item.context}
              </p>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[1.45fr_0.55fr]">
          <Surface className="p-0">
            <div className="border-b border-stone-200 bg-[#f7f3ec]/70 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
                    Experiment notebook
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    Not finished work: what exists today, where it stands, and what is hard about it.
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
                label="Built so far"
                title="What exists in the code."
                icon={<Hammer className="h-4 w-4" />}
              >
                <ul className="space-y-3 text-stone-700">
                  {item.built.map((entry) => (
                    <li key={entry} className="flex gap-3">
                      <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </NotebookRow>

              <NotebookRow
                number="02"
                label="Status"
                title="Where it stands."
                icon={<Signpost className="h-4 w-4" />}
              >
                <p>{item.whereItStands}</p>
              </NotebookRow>

              <NotebookRow
                number="03"
                label="Technical challenge"
                title="The hard part."
                icon={<FlaskConical className="h-4 w-4" />}
              >
                <p>{item.technicalChallenge}</p>
              </NotebookRow>

              {item.next && (
                <NotebookRow
                  number="04"
                  label="Next step"
                  title="The next useful version."
                  icon={<Route className="h-4 w-4" />}
                >
                  <p>{item.next}</p>
                </NotebookRow>
              )}
            </div>
          </Surface>

          <Surface className="lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
              Stack
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-stone-300/80 bg-[#f7f3ec]/70 px-3 py-1.5 text-xs text-stone-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <Surface className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
                Continue
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                Finished work lives elsewhere.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                The Lab holds prototypes and paused experiments. For deployed work, start with
                Projects or Experience.
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
