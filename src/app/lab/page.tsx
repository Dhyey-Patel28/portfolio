import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileText } from "lucide-react";
import { labItems } from "@/lib/lab";
import SiteNav from "@/components/site-nav";
import { GitHubIcon } from "@/components/brand-icons";

export const metadata: Metadata = {
  title: "Lab | Dhyey Patel",
  description:
    "Active builds and experiments in developer tools, DeFi protocol safety, productivity software, and practical software ideas.",
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

export default function LabPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="lab" />

      <section className="px-6 pb-10 pt-32 md:pb-12 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            Lab
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                What I’m still building.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                The lab is intentionally separate from finished projects. It shows momentum:
                the developer tools, safety interfaces, and product ideas I am actively shaping.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PillLink href="/projects">
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </PillLink>
                <PillLink href="https://github.com/Dhyey-Patel28" external>
                  GitHub
                  <GitHubIcon className="h-4 w-4" />
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
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {labItems.map((item) => (
            <Surface key={item.slug} className="h-full">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
                  {item.status}
                </p>

                <Link
                  href={`/lab/${item.slug}`}
                  aria-label={`Read lab note for ${item.title}`}
                  className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
                >
                  <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
                </Link>
              </div>

              <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-stone-950">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600">{item.summary}</p>

              <div className="mt-6 space-y-5 border-t border-stone-200 pt-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                    Current milestone
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {item.currentMilestone}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                    Technical challenge
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {item.technicalChallenge}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-stone-200 pt-5">
                <Link href={`/lab/${item.slug}`} className="soft-pill soft-pill-md">
                  Read lab note
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Surface>
          ))}
        </div>
      </section>
    </main>
  );
}