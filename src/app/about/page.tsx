import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  GraduationCap,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import SiteNav from "@/components/site-nav";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

export const metadata: Metadata = {
  title: "About | Dhyey Patel",
  description:
    "About Dhyey Patel: a software engineer building useful systems across full-stack tools, data-rich interfaces, and practical ML work.",
};

const credentials = [
  {
    title: "AWS Academy Graduate — Cloud Architecting",
    issuer: "Amazon Web Services",
    href: "https://www.credly.com/badges/3619a03c-9004-44b1-9a7a-4670acffc452/linked_in_profile",
  },
  {
    title: "Cybersecurity Virtual Apprenticeship",
    issuer: "iQ4 / Cybersecurity Workforce Alliance",
    href: "https://prod.iq4.com/servlet/aws/Dhyey_Patel-iQ4-UC__1_.pdf?r=6975/I/879fe201-b560-437b-b8f6-1fd646ce0d78/Dhyey_Patel-iQ4-UC__1_.pdf&a=inline",
  },
  {
    title: "IBM Data Science Practitioner",
    issuer: "IBM",
    href: "https://www.credly.com/badges/65c777c7-c479-4e94-b2a9-9863e3cc40b6?source=linked_in_profile",
  },
  {
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    href: "https://www.credly.com/badges/574256e8-81ed-4816-9b74-d452587c55ee?source=linked_in_profile",
  },
];

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

function Eyebrow({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
        {children}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav active="about" />

      <section className="px-6 pb-8 pt-32 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
            About
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-end">
            <div>
              <h1 className="max-w-5xl text-6xl font-medium leading-[0.9] tracking-[-0.075em] text-stone-950 sm:text-8xl">
                I like problems that need a little untangling.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                I am Dhyey Patel, a software engineer and M.S. Computer Science student at Eastern
                Michigan University. I enjoy building software around problems that do not arrive
                neatly packaged: messy workflows, branching decisions, large datasets, and systems
                that only start to make sense after you break them into smaller pieces.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/projects" className="soft-pill soft-pill-md">
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </Link>

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

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Surface>
            <Eyebrow>How I got here</Eyebrow>

            <h2 className="mt-4 max-w-xl text-4xl font-medium tracking-[-0.055em] text-stone-950">
              A lot of how I build started with how I learned.
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
              <p>
                I grew up in a family of teachers, so learning and explaining were ordinary parts of
                life long before they became job titles. My mother and aunts shaped a lot of how I
                work now: be patient, keep learning, and try to understand the person on the other
                side of the problem.
              </p>

              <p>
                That background is probably why I kept gravitating toward teaching roles alongside
                software: tutor, teaching assistant, peer educator, and mentor. It also explains the
                kind of engineering I enjoy most. I like finding the structure inside something
                confusing and turning it into software that feels easier to use than what came before.
              </p>

              <p>
                Programming appealed to me because it is one of the few places where logic and
                creativity are not opposites. The work I enjoy most usually has both: careful
                reasoning underneath, and enough room to make the final experience thoughtful.
              </p>
            </div>
          </Surface>

          <div className="grid gap-6">
            <Surface>
              <Eyebrow icon={<Sparkles className="h-4 w-4 text-stone-500" />}>
                How I work
              </Eyebrow>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-stone-950">
                Break it down. Build it better.
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                I like problems without a straight-line solution. My instinct is usually to split
                them into smaller pieces, understand how those pieces connect, and keep working until
                the larger system becomes clear.
              </p>
            </Surface>

            <Surface>
              <Eyebrow icon={<HeartHandshake className="h-4 w-4 text-stone-500" />}>
                Away from code
              </Eyebrow>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-stone-950">
                Chess, anime, and table tennis.
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                Outside software, I play chess, watch a lot of anime and films, recently started
                learning spades, and still enjoy table tennis more than my results suggest.
              </p>
            </Surface>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Surface>
            <Eyebrow icon={<GraduationCap className="h-4 w-4 text-stone-500" />}>
              Education
            </Eyebrow>

            <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
              Still learning. Already shipping.
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
              <div>
                <p className="font-medium text-stone-800">Eastern Michigan University</p>
                <p>M.S. Computer Science · 4.0 GPA · Expected Dec 2026</p>
              </div>

              <div>
                <p className="font-medium text-stone-800">University of Cincinnati</p>
                <p>B.S. Computer Science · Math Minor · Cum Laude</p>
              </div>
            </div>
          </Surface>

          <Surface>
            <Eyebrow>Selected credentials</Eyebrow>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {credentials.map((credential) => (
                <a
                  key={credential.title}
                  href={credential.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.25rem] border border-stone-300/80 bg-[#f7f3ec]/80 p-4 transition hover:-translate-y-0.5 hover:border-stone-950 hover:bg-stone-950"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium leading-6 text-stone-800 transition group-hover:text-[#fbf8f1]">
                        {credential.title}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-stone-500 transition group-hover:text-[#fbf8f1]/75">
                        {credential.issuer}
                      </p>
                    </div>

                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition group-hover:text-[#fbf8f1]" />
                  </div>
                </a>
              ))}
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <Surface className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Eyebrow>What I’m looking for</Eyebrow>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                Good teams, difficult problems, and software people actually use.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                I am looking for software engineering internships and new-grad opportunities where I
                can keep growing on strong teams and contribute across product engineering, internal
                tools, data-rich interfaces, or practical ML systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:dpatel48@emich.edu" className="soft-pill soft-pill-md">
                Email me
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/dhyey-patel-page/"
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-md"
              >
                LinkedIn
                <LinkedInIcon className="h-4 w-4" />
              </a>

              <a
                href="https://github.com/Dhyey-Patel28"
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-md"
              >
                GitHub
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <Surface className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Eyebrow>Continue</Eyebrow>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-stone-950">
                The best explanation is still the work.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                The About page tells you where some of my instincts come from. The Experience and
                Projects pages show what I do with them.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/experience" className="soft-pill soft-pill-md">
                Experience
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/projects" className="soft-pill soft-pill-md">
                Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Surface>
        </div>
      </section>
    </main>
  );
}