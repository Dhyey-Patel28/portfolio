import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  Presentation,
} from "lucide-react";
import VisualGallery from "@/components/visual-gallery";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";
import {
  earlierResearch,
  ongoingResearch,
  presentations,
  publications,
  type PipelineStep,
  type ResearchItem,
} from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied machine learning research by Dhyey Patel: accepted IEEE MLSP 2026 and IEEE ICTAI 2026 papers on bioacoustics and prompt-injection detection, ongoing traffic-audio research, and earlier neonatal lung MRI segmentation.",
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

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-6">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
        {title}
      </h2>
      {body && (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">{body}</p>
      )}
    </div>
  );
}

function Bullets({ items, strong = false }: { items: string[]; strong?: boolean }) {
  return (
    <ul className={`mt-4 space-y-3 text-sm leading-7 ${strong ? "text-stone-700" : "text-stone-600"}`}>
      {items.map((entry) => (
        <li key={entry} className="flex gap-3">
          {strong ? (
            <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-950" />
          ) : (
            <span className="mt-3 h-px w-6 shrink-0 bg-stone-300" />
          )}
          <span>{entry}</span>
        </li>
      ))}
    </ul>
  );
}

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-[#f7f3ec]/70 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <figure className="mt-8 border-t border-stone-200 pt-6">
      <figcaption className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500">
        How it works
      </figcaption>
      <ol className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="relative rounded-[1.25rem] border border-stone-300/80 bg-[#fbf8f1] p-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
              0{index + 1}
            </span>
            <p className="mt-2 text-sm font-medium leading-6 text-stone-900">{step.label}</p>
            <p className="mt-1 text-xs leading-5 text-stone-600">{step.detail}</p>
            {index < steps.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-[#f7f3ec] text-stone-500 md:block"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <Surface>
      <article id={item.slug} className="scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
              {item.status}
            </p>

            <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-stone-950">
              {item.title}
            </h3>

            <p className="mt-3 text-sm text-stone-600">{item.authors}</p>

            <p className="mt-2 text-sm font-medium text-stone-500">
              {item.role} · {item.dates}
            </p>

            <p className="mt-6 text-sm leading-7 text-stone-600">{item.summary}</p>

            <p className="mt-4 border-l-2 border-stone-300 pl-4 text-sm leading-7 text-stone-700">
              {item.question}
            </p>

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

            {item.links && item.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soft-pill soft-pill-sm font-medium"
                  >
                    {link.label}
                    {link.label === "GitHub" || link.label === "Code" ? (
                      <GitHubIcon className="h-3.5 w-3.5" />
                    ) : (
                      <ExternalLink className="h-3.5 w-3.5" />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid content-start gap-4">
            <Panel label="My contribution">
              <Bullets items={item.contributions} />
            </Panel>

            {item.results && item.results.length > 0 && (
              <Panel label="Reported results">
                <Bullets items={item.results} strong />
                {item.resultsNote && (
                  <p className="mt-4 border-t border-stone-200 pt-4 text-xs leading-6 text-stone-500">
                    {item.resultsNote}
                  </p>
                )}
              </Panel>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-stone-200 pt-6 md:grid-cols-3">
          <Panel label="Approach">
            <Bullets items={item.approach} />
          </Panel>
          <Panel label="What we learned">
            <Bullets items={item.findings} />
          </Panel>
          <Panel label="Limitations">
            <Bullets items={item.limitations} />
          </Panel>
        </div>

        {item.pipeline && <Pipeline steps={item.pipeline} />}

        {item.visuals && item.visuals.length > 0 && (
          <div className="mt-8 border-t border-stone-200 pt-6">
            <VisualGallery
              visuals={item.visuals}
              gridClassName="mx-auto grid max-w-md gap-5"
            />
          </div>
        )}
      </article>
    </Surface>
  );
}

const allResearch = [...publications, ...ongoingResearch, ...earlierResearch];

export default function ResearchPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="research" />

      <section className="px-6 pb-10 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            Research
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
              Applied ML, evaluated carefully.
            </h1>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                Team research at Eastern Michigan University in bioacoustics, AI security, and
                traffic audio, plus my undergraduate capstone in medical imaging. Each entry
                separates what I contributed from the team&apos;s work, and lists limitations
                alongside results.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/experience" className="soft-pill soft-pill-md">
                  View experience
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="soft-pill soft-pill-md"
                >
                  Resume
                  <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-4 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Publications"
            title="Accepted papers."
            body="Both papers are accepted to IEEE conferences in 2026. The arXiv pages are the reference versions."
          />
          <div className="grid gap-6">
            {publications.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Ongoing research"
            title="Work in progress."
            body="Continuing collaborative research. Findings are summarized qualitatively until results are peer-reviewed."
          />
          <div className="grid gap-6">
            {ongoingResearch.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <SectionIntro eyebrow="Earlier research" title="Undergraduate capstone." />
          <div className="grid gap-6">
            {earlierResearch.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="posters" className="scroll-mt-28 px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Presentations"
            title="Michigan AI Symposium posters."
            body="Our group presented three posters at the 2026 Michigan AI Symposium. Each card lists the authors, who presented it, and my role. Select a poster to zoom in."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {presentations.map((talk) => (
              <Surface key={talk.title} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Presentation className="h-4 w-4 text-stone-500" />
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
                    Poster · {talk.year}
                  </p>
                </div>
                <h3 className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em] text-stone-950">
                  {talk.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">
                  {allResearch.find((item) => item.slug === talk.researchSlug)?.authors}
                </p>
                <p className="mt-3 text-sm font-medium text-stone-700">{talk.presenter}</p>
                <p className="mt-1 text-sm leading-7 text-stone-500">{talk.myRole}</p>

                {talk.poster && (
                  <div className="mt-auto pt-5">
                    <VisualGallery visuals={[talk.poster]} />
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <a
                        href={talk.poster.src}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open full-size poster: ${talk.title}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
                      >
                        Full-size poster
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {talk.posterPdf && (
                        <a
                          href={talk.posterPdf}
                          download
                          aria-label={`Download PDF: ${talk.title}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
                        >
                          PDF
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
                <a
                  href={`#${talk.researchSlug}`}
                  className={`${talk.poster ? "" : "mt-auto "}inline-flex items-center gap-2 pt-5 text-sm font-medium text-stone-700 transition hover:text-stone-950`}
                >
                  Read the research
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Surface>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
